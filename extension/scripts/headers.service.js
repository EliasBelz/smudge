// seems to work on amiunique
chrome.webRequest.onBeforeSendHeaders.addListener(details => {
    details.requestHeaders
        .filter(({ name }) => name === "User-Agent")
        .forEach(header => header.value = "Fake user agent header");
    return { requestHeaders: details.requestHeaders };
}, { urls: ["<all_urls>"] }, ["blocking", "requestHeaders"]);