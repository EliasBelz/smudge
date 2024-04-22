window.addEventListener("load", () => {
    const toggleExtension = document.getElementById("toggleExtension")

    browser.storage.local.get("smudgeEnabled").then(res => {
        toggleExtension.checked = (res.smudgeEnabled !== false)
    })
    
    toggleExtension.addEventListener("change", () => {
        browser.storage.local.set({ smudgeEnabled: toggleExtension.checked })
        browser.runtime.sendMessage({ smudgeEnabled: toggleExtension.checked })
    })
})