"use strict";
(function() {

  const settingsService = new SettingsService();

  window.addEventListener('load', init);
  async function init () {
    const settings = await settingsService.getSettings();
    if (!settings) {
      await settingsService.setSettings({
        "enabled": true
      });
    }
    qs('#enabled').checked = settings.enabled;
    qs('#enabled').addEventListener('change', async function () {
      console.log('enabled', this.checked);
      await settingsService.setSettings({
        "enabled": this.checked
      });
    });
  }







  function qs (selector) {
    return document.querySelector(selector);
  }

  function qsa (selector) {
    return document.querySelectorAll(selector);
  }

  function gen (tag) {
    return document.createElement(tag);
  }

})();