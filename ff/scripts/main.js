browser.runtime.onMessage.addListener(message => {
    if (message.smudgeEnabled) {
        window.location.reload()
    }
})