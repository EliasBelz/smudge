// seems to work on amiunique
chrome.webRequest.onBeforeSendHeaders.addListener(
    async (details) => {
        const userAgent = (await browser.storage.local.get('settings'))?.settings?.userAgent;
        const newRequestHeaders = details.requestHeaders
            .filter(({ name }) => name === 'User-Agent')
            .map(async header => header.value = userAgent);
        return { requestHeaders: newRequestHeaders };
    },
    {
        urls: ["<all_urls>"]
    },
    [
        "blocking",
        "requestHeaders"
    ]
);