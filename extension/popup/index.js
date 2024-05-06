"use strict";
(function() {

  let settingsService;

  window.addEventListener('load', init);
  async function init () {
    settingsService = new SettingsService();
    let settings =  await settingsService.getSettings();
    if (!settings) {
      await settingsService.setSettings({
        "enabled": true
      });
      settings =  await settingsService.getSettings();
    }

    qs('#enabled').checked = settings.enabled;
    qs('#enabled').addEventListener('change', async function () {
      await settingsService.setSettings({
        "enabled": this.checked
      });
    });

    await loadJson();
  }




  async function loadJson() {
    const jsonFileUrl = browser.extension.getURL('assets/navigator.json');
    const res = await fetch(jsonFileUrl);
    const data = await res.json();
    for (let key of Object.keys(data)) {
      let options = data[key];
      let select = document.createElement('select');
      select.id = key;
      select.addEventListener('change', async function () {
        console.log(`Updated ${key} to ${this.value}`);
        await settingsService.updateSettings(key, this.value);
      });

      if (navigator[key]) {
        let opt = document.createElement('option');
        opt.value = navigator[key];
        opt.textContent = "Default: " + navigator[key];
        select.appendChild(opt);
      }

      for (let option of options) {
        let opt = document.createElement('option');
        opt.value = option;
        opt.textContent = option;
        select.appendChild(opt);
      }

        let currentSetting = (await settingsService.getSettings())[key];

        if (currentSetting && options.includes(currentSetting)) {
          select.value = currentSetting;
        }

        if (!currentSetting) {
          select.value = options[0];
          await settingsService.updateSettings(key, options[0]);
        }

      let label = document.createElement('label');
      label.textContent = `${key}: `;
      label.htmlFor = key;

      let div = document.createElement('div');
      div.appendChild(label);
      div.appendChild(select);

      document.querySelector('#dropdowns').appendChild(div);
    }
  }

  function qs(selector) {
    return document.querySelector(selector);
  }

  function qsa (selector) {
    return document.querySelectorAll(selector);
  }

  function gen (tag) {
    return document.createElement(tag);
  }

})();