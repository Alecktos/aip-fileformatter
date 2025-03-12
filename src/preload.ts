// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import {webUtils} from "electron";

const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('electronAPI', {
    openDialog: () => ipcRenderer.invoke('open-dialog'),
    formatFile: (filePath: string) => ipcRenderer.invoke('format-file', filePath),
    changeDate: (filePath: string, daysToAdd: number) => ipcRenderer.invoke('change-date', filePath, daysToAdd),
    pathForFile: (file) => webUtils.getPathForFile(file),
})
