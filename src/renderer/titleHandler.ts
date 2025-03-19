window.onload = async () => {
    const appVersion = await window.electronAPI.getAppVersion()
    document.title = `${document.title} ${appVersion}`
}