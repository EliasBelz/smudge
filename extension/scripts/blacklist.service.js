async function getBlacklist() {
  const { blacklist } = await browser.storage.local.get('blacklist');
  if (!blacklist) {
    await browser.storage.local.set({ blacklist: [] });
    return [];
  }
  return blacklist;
}

function getUrl() {
  let url = window.location.href;
  console.log(url);
  return url;
}