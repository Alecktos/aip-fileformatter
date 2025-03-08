/**
 * This file will automatically be loaded by vite and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/tutorial/process-model
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.ts` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */

import './index.css';
import './spinner.css';

// Format File Page

const formatFileButton = document.getElementById('format-files') as HTMLButtonElement;
const selectFileButton = document.getElementById('select-file') as HTMLButtonElement;
const selectedFileInput = document.getElementById('selected-file') as HTMLInputElement;
const formatFileSpinner = document.getElementById('format-file-spinner') as HTMLDivElement;

const setFileSelectedState = (filePath) => {
    selectedFileInput.value = filePath
    formatFileButton.disabled = false;
}

selectFileButton.addEventListener('click', async () => {
    const filePaths = await window.electronAPI.openDialog()
    setFileSelectedState(filePaths[0]);
});

formatFileButton.addEventListener('click', async () => {
    formatFileSpinner.style.visibility = 'visible';

    await window.electronAPI.formatFile(selectedFileInput.value)
    formatFileSpinner.style.visibility = 'hidden';
    selectedFileInput.value = 'Klart! Filen har formaterats';
    formatFileButton.disabled = true;
});

document.body.addEventListener("dragover", evt => {
    evt.preventDefault();
});

document.body.addEventListener("drop", evt => {
    evt.preventDefault();
    const filePath = window.electronAPI.pathForFile(evt.dataTransfer.files[0]);
    setFileSelectedState(filePath);
});



