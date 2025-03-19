import { app, BrowserWindow, ipcMain, dialog } from 'electron';
import path from 'node:path';
import started from 'electron-squirrel-startup';
import {parseLine} from "./main/lineFormatter/lineFormatter";
import {readAllLinesFromFile, writeLinesToFile} from "./main/fileHandler/fileHandler";
import {changeDate} from "./main/dateFormatter/dateFormatter";
import {updateElectronApp, UpdateSourceType} from "update-electron-app";

updateElectronApp({
  updateSource: {
    type: UpdateSourceType.ElectronPublicUpdateService,
    repo: 'Alecktos/aip-fileformatter'
  },
});

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 510,
    height: 380,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  }

  mainWindow.removeMenu();

  // Open the DevTools.
   // mainWindow.webContents.openDevTools();
};

const handleOpenDialog = async () => {
  const { canceled, filePaths } = await dialog.showOpenDialog({ title: "Välj fil", properties: ['openFile'] })
  if(canceled) {
    return []
  }
  return filePaths
}

const handleFormatingFile = async (event, filePath) => {
  const newFileContent = readAllLinesFromFile(filePath).map((line) => {
      return parseLine(line);
    });
    writeLinesToFile(`${filePath}`, newFileContent)
    return true;
}

const handleChangingDate = async (event, filePath, daysToAdd) => {
  const newFileContent = readAllLinesFromFile(filePath).map((line) => {
    return changeDate(line, daysToAdd);
  });
  writeLinesToFile(`${filePath}`, newFileContent)
  return true;
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  ipcMain.handle('open-dialog', handleOpenDialog)
  ipcMain.handle('format-file', handleFormatingFile);
  ipcMain.handle('change-date', handleChangingDate);
  ipcMain.handle('get-app-version', () => app.getVersion());
  createWindow();
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
