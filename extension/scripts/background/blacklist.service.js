
/**
 * Gets the current blacklist and sets it in memory if it is not already set
 */
async function getBlacklist() {
  const { blacklist } = await browser.storage.local.get('blacklist');
  if (!blacklist) {
    await browser.storage.local.set({ blacklist: [] });
    return [];
  }
  return blacklist;
}

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
    console.error('error', error);
    return null
  }
}

/**
 * Checks if the current host name is in the blacklist
 */
async function isBlacklisted() {
  const host = await getHostName();
  const blacklist = await getBlacklist();
  return blacklist.includes(host);
}

/**
 * Adds the current host name to the blacklist
 */
async function addBlacklist() {
  const host = await getHostName();
  const blacklist = await getBlacklist();
  if (host === null || blacklist.includes(host)) {
    return;
  }
  blacklist.push(host);
  await browser.storage.local.set({ blacklist });
}

/**
 * Removes the current host name from the blacklist
 */
async function removeBlacklist() {
  const host = await getHostName();
  if (host === null) {
    return;
  }
  const blacklist = await getBlacklist();
  const index = blacklist.indexOf(host);
  if (index === -1) {
    return;
  }
  blacklist.splice(index, 1);
  await browser.storage.local.set({ blacklist });
}

/**
 * Toggles the current host name in the blacklist
 */
async function toggleBlacklist() {
  if (await isBlacklisted()) {
    await removeBlacklist();
  } else {
    await addBlacklist();
  }
}

/**
 * Listens for messages from content scripts
 */
browser.runtime.onMessage.addListener(async (message) => {
  if (message.command === "toggleBlacklist") {
    await toggleBlacklist();
  } else if (message.command === "isBlacklisted") {
    return await isBlacklisted();
  } else if (message.command === "getBlacklist") {
    return await getBlacklist();
  } else if (message.command === "addBlacklist") {
    await addBlacklist();
  } else if (message.command === "removeBlacklist") {
    await removeBlacklist();
  } else if (message.command === "getHostName") {
    return await getHostName();
  }
});



