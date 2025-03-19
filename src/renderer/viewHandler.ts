const enum AppView {
    FormatFile = 'format-file-view',
    ChangeDate = 'change-date-view'
}

let currentView = AppView.FormatFile

const formatFileViewButton = document.getElementById('format-file-view-button') as HTMLButtonElement;
const changeDateViewButton = document.getElementById('change-date-view-button') as HTMLButtonElement;
const selectedFileInput = document.getElementById('selected-file') as HTMLInputElement;

formatFileViewButton.addEventListener('click', () => {
    currentView = AppView.FormatFile
    setView(currentView);
});

changeDateViewButton.addEventListener('click', () => {
    currentView = AppView.ChangeDate
    setView(currentView);
});

const setView = (view: AppView) => {
    const changeDateDiv = document.getElementById('change-date-div') as HTMLDivElement;
    selectedFileInput.value = '';
    if (view === AppView.FormatFile) {
        changeDateDiv.style.display = 'none';
        formatFileViewButton.style.color = "black";
        changeDateViewButton.style.color = "grey";
    }
    if (view === AppView.ChangeDate) {
        changeDateDiv.style.display = 'block';
        changeDateViewButton.style.color = "black";
        formatFileViewButton.style.color = "grey";
    }
}

const currentViewIs = (view: AppView) => {
    return currentView === view;
}

export { AppView, currentViewIs }