// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import {webUtils} from "electron";

const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('electronAPI', {
    openDialog: () => ipcRenderer.invoke('open-dialog'),
    formatFile: (filePath: string) => ipcRenderer.invoke('format-file', filePath),
    pathForFile: (file) => webUtils.getPathForFile(file),
})
