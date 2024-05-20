class BlacklistService{

  /**
   * Gets the current blacklist and sets it in memory if it is not already set
   */
  async getBlacklist() {
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
  async getHostName() {
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

  /**
   * Checks if the current host name is in the blacklist
   */
  async isBlacklisted() {
    const host = await this.getHostName();
    const blacklist = await this.getBlacklist();
    return blacklist.includes(host);
  }

  /**
   * Adds the current host name to the blacklist
   */
  async addBlacklist() {
    const host = await this.getHostName();
    const blacklist = await this.getBlacklist();
    if (host === null || blacklist.includes(host)) {
      return;
    }
    blacklist.push(host);
    await browser.storage.local.set({ blacklist });
  }

  /**
   * Removes the current host name from the blacklist
   */
  async removeBlacklist() {
    const host = await this.getHostName();
    if (host === null) {
      return;
    }
    const blacklist = await this.getBlacklist();
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
  async toggleBlacklist() {
    if (await this.isBlacklisted()) {
      await this.removeBlacklist();
    } else {
      await this.addBlacklist();
    }
  }



}