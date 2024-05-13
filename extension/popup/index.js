'use strict';
(function () {

    /**
     * Global instance of the SettingsService class.
     * Used for saving variables to local storage.
     * @type {SettingsService}
     */
    let settingsService;

    // Load the saved settings, and check the box in the UI appropriately.
    // If there are no saved settings, save minimal base settings.
    // Then, load the options from json.
    window.addEventListener('load', async function () {
        settingsService = new SettingsService();

        await loadCheckbox();

        await loadOptions();

        loadCommitButton();
    });

    // Load and update on the popup the settings for the 'on' checkbox.
    async function loadCheckbox() {
        const hasSettings = await settingsService.hasSettings();
        if (!hasSettings) {
            await settingsService.setSettings({ enabled: true });
        }
        const { enabled } = await settingsService.getSettings();

        const enabledEl = document.querySelector('#enabled');
        enabledEl.checked = enabled;
        enabledEl.addEventListener('change', async function () {
            await settingsService.setSettings({ enabled: this.checked });
        });
    }

    // Load and update on the popup the options dropdowns.
    async function loadOptions() {
        const jsonFileUrl = browser.extension.getURL('assets/navigator.json');
        const res = await fetch(jsonFileUrl);
        const data = await res.json();

        for (let key of Object.keys(data)) {
            const options = data[key];
            const selectEl = document.createElement('select');
            selectEl.id = key;
            // updates the settings when the dropdown is changed.
            // if the platform or browser is changed, the user agent is updated.
            selectEl.addEventListener('change', async function () {
                if (key != 'userAgent ') {
                    await settingsService.updateSettings(key, this.value);
                }
                if (key === 'platform' || key === 'browser') {
                    const { platform, browser } = await settingsService.getSettings();
                    const userAgent = getUserAgent({ platform, browser });
                    await settingsService.updateSettings('userAgent', userAgent);
                }
            });

            if (navigator[key]) {
                const opt = document.createElement('option');
                opt.value = navigator[key];
                opt.textContent = 'Default: ' + navigator[key];
                selectEl.appendChild(opt);
            }

            for (let option of options) {
                const opt = document.createElement('option');
                opt.value = option;
                opt.textContent = option;
                selectEl.appendChild(opt);
            }

            // set the dropdown to the current setting or to the first option.
            const currentSetting = (await settingsService.getSettings())[key];
            if (currentSetting && options.includes(currentSetting)) {
                selectEl.value = currentSetting;
            } else {
                selectEl.value = options[0];
                await settingsService.updateSettings(key, options[0]);
            }

            const label = document.createElement('label');
            label.textContent = `${key}: `;
            label.htmlFor = key;

            const div = document.createElement('div');
            div.appendChild(label);
            div.appendChild(selectEl);

            document.querySelector('#dropdowns').appendChild(div);
        }
    }

    function loadCommitButton() {
        const commitBtn = document.getElementById('commit');
        commitBtn.addEventListener('click', function () {
            browser.tabs.reload();
        });
    }

    function getUserAgent({platform, browser}) {
        if (!browser || !platform) {
          return null;
        }

        return makeUAString({platform, browser});
      }

      function makeUAString({platform, browser}) {
        return `Mozilla/5.0 (${getSystemInfo(platform)}) ${getBrowserInfo(browser)}`;
      }

      /**
       * Defaults to Linux x86_64
       * @param {string} param0
       * @returns
       */
      function getSystemInfo(platform) {
        switch (platform) {
          case 'Windows':
            return 'Windows NT 10.0; Win64; x64';
          case 'Macintosh':
            return 'Macintosh; Intel Mac OS X 10.15; rv:125.0';
          default:
            return `${platform}; Linux x86_64`;
        }

      }

      /**
       * Returns the system information and extension for a given browser.
       * https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/User-Agent
       * @param {string} browser - browser name
       * @returns string - browser info
       */
      function getBrowserInfo(browser) {
        switch (browser) {
          case 'Chrome':
            return 'AppleWebKit/537.36 AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36';
          case 'Firefox':
            return 'Gecko/20100101 Firefox/68.0';
          case 'Opera':
            return 'AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.106 Safari/537.36 OPR/38.0.2220.41';
          case 'Microsoft Edge':
            return 'AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36 Edg/91.0.864.59';
          case 'Safari':
            return 'AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4.1 Safari/605.1.15';
          default:
            return '';
        }
      }

})();