'use strict';
import { getUserAgent } from "../scripts/userAgent.service.js";
import { TimeZoneService } from "../scripts/timeZone.service.js";
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

        await loadTimezoneDropdown();

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
              await settingsService.updateSettings(key, this.value);
              if (key === 'platform' || key === 'browser') {
                  const { platform, browser } = await settingsService.getSettings();
                  const userAgent = getUserAgent({ platform, browser });
                  await settingsService.updateSettings('userAgent', userAgent);
              }
            });
            const userVal = navigator[key];
            if (navigator[key]) {
                const opt = document.createElement('option');
                opt.value = userVal;
                opt.textContent = 'Default: ' + navigator[key];
                selectEl.appendChild(opt);
            }

            for (let option of options) {
                const opt = document.createElement('option');
                opt.value = option;
                opt.textContent = option;
                selectEl.appendChild(opt);
            }

            // set the dropdown to the current setting or to the users default.
            const currentSetting = (await settingsService.getSettings())[key];
            if (currentSetting && options.includes(currentSetting)) {
                selectEl.value = currentSetting;
            } else {
                selectEl.value = userVal;
                await settingsService.updateSettings(key, userVal);
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

    async function loadTimezoneDropdown() {
        let timeZoneService = new TimeZoneService();
        let timeZones = timeZoneService.getTimeZones();
        const selectEl = document.createElement('select');
        selectEl.id = 'timezone';
        selectEl.addEventListener('change', async function () {
            await settingsService.updateSettings('timezone', this.value);
        });
        const opt = document.createElement('option');
        const userOffset = new Date().getTimezoneOffset();
        opt.value = userOffset;
        opt.textContent = 'Default: ' + Intl.DateTimeFormat().resolvedOptions().timeZone;
        selectEl.appendChild(opt);
        if (!(await settingsService.getSettings()).timezone) {
            await settingsService.updateSettings('timezone', userOffset);
        }

        for (let timeZone of timeZones) {
            const opt = document.createElement('option');
            opt.value = timeZone.offset;
            opt.textContent = timeZone.timeZone;
            selectEl.appendChild(opt);
        }

        const currentSetting = (await settingsService.getSettings())['timezone'];
            if (currentSetting && timeZones.map(tz => tz.offset).includes(currentSetting)) {
                selectEl.value = currentSetting;
            } else {
                selectEl.value = userVal;
                await settingsService.updateSettings(key, userVal);
            }

        const label = document.createElement('label');
        label.textContent = 'Timezone: ';
        label.htmlFor = 'timezone';
        const div = document.createElement('div');
        div.appendChild(label);
        div.appendChild(selectEl);
        document.querySelector('#dropdowns').appendChild(div);
    }


    function loadCommitButton() {
        const commitBtn = document.getElementById('commit');
        commitBtn.addEventListener('click', function () {
            browser.tabs.reload();
        });
    }

})();