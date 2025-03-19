import { AppView, currentViewIs} from "./viewHandler";
import './titleHandler';

const selectedFileInput = document.getElementById('selected-file') as HTMLInputElement;
const formatFileButton = document.getElementById('format-file') as HTMLButtonElement;
const selectFileButton = document.getElementById('select-file') as HTMLButtonElement;
const formatFileSpinner = document.getElementById('format-file-spinner') as HTMLDivElement;
const addDaysInput = document.getElementById('add-days') as HTMLInputElement;

const setFileSelectedState = (filePath) => {
    if(!filePath) {
        return;
    }
    selectedFileInput.value = filePath
    formatFileButton.disabled = false;
    addDaysInput.disabled = false;
}

selectFileButton.addEventListener('click', async () => {
    const filePaths = await window.electronAPI.openDialog()
    setFileSelectedState(filePaths[0]);
});

formatFileButton.addEventListener('click', async () => {
    formatFileSpinner.style.visibility = 'visible';

    if(currentViewIs(AppView.FormatFile)) {
        await window.electronAPI.formatFile(selectedFileInput.value)
    } else if (currentViewIs(AppView.ChangeDate)) {
        await window.electronAPI.changeDate(selectedFileInput.value, Number(addDaysInput.value.trim()))
    }

    formatFileSpinner.style.visibility = 'hidden';
    selectedFileInput.value = 'Klart! Filen har formaterats';
    formatFileButton.disabled = true;
    addDaysInput.value = ""
    addDaysInput.disabled = true;
});

document.body.addEventListener("dragover", evt => {
    evt.preventDefault();
});

document.body.addEventListener("drop", evt => {
    evt.preventDefault();
    const filePath = window.electronAPI.pathForFile(evt.dataTransfer.files[0]);
    setFileSelectedState(filePath);
});