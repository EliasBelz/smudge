// seems to work on amiunique
chrome.webRequest.onBeforeSendHeaders.addListener(details => {
    details.requestHeaders
        .filter(({ name }) => name === "User-Agent")
        .forEach(header => header.value = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.3");
    return { requestHeaders: details.requestHeaders };
}, { urls: ["<all_urls>"] }, ["blocking", "requestHeaders"]);