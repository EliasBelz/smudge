// seems to work on amiunique
chrome.webRequest.onBeforeSendHeaders.addListener(
    async (details) => {
        const userAgent = (await browser.storage.local.get('settings'))?.settings?.userAgent;
        details.requestHeaders
            .filter(({ name }) => name === 'User-Agent')
            .forEach(header => header.value = userAgent);
        return { requestHeaders: details.requestHeaders };
    },
    {
        urls: ["<all_urls>"]
    },
    [
        "blocking",
        "requestHeaders"
    ]
);