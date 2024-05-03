// seems to work on amiunique
chrome.webRequest.onBeforeSendHeaders.addListener(async (details) => {

    let ua = (await browser.storage.local.get('settings'))?.settings?.userAgent;
    details.requestHeaders
        .filter(({ name }) => name === "User-Agent")
        .forEach(async (header) => header.value = ua);
    return { requestHeaders: details.requestHeaders };
}, { urls: ["<all_urls>"] }, ["blocking", "requestHeaders"]);