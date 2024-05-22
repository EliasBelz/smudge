// seems to work on amiunique
chrome.webRequest.onBeforeSendHeaders.addListener(
    async (details) => {
        const {userAgent, enabled} = (await browser.storage.local.get('settings'))?.settings;
        const {blacklist} = (await browser.storage.local.get('blacklist'));
        if (!enabled || blacklist?.includes(await getHostName())) {
            return { requestHeaders: details.requestHeaders };
        }
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

/**
 * Gets the host name of the currently active tab
 */
async function getHostName() {
    try {
    const url = (await browser.tabs.query({currentWindow: true, active: true}))[0].url;
    let j = url.indexOf("://");
    let host = "";
    for (let i = j + 3; i < url.length; i++) {
        if (url.charAt(i) != '/') {
            host = host + "" + url.charAt(i);
        } else {
            break;
        }
    }
        return host;
    } catch (error) {
        console.log('error', error);
        return null
    }
}