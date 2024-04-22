if (window.localStorage.getItem("smudgeEnabled")) {
    // seems to work on amiunique
    chrome.webRequest.onBeforeSendHeaders.addListener(details => {
        details.requestHeaders
            .filter(({ name }) => name === "User-Agent")
            .forEach(header => header.value = "test 2");
        return { requestHeaders: details.requestHeaders };
    }, { urls: ["<all_urls>"] }, ["blocking", "requestHeaders"]);
}