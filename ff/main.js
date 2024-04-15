// seems to not work on amiunique
navigator.__defineGetter__("userAgent", function () {
    return "test 1"
})

// seems to work on amiunique
chrome.webRequest.onBeforeSendHeaders.addListener(details => {
    details.requestHeaders
        .filter(({ name }) => name === "User-Agent")
        .forEach(header => header.value = "test 2")
    return { requestHeaders: details.requestHeaders };
}, { urls: ["<all_urls>"] }, ["blocking", "requestHeaders"]);

console.log(navigator.userAgent)