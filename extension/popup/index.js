'use strict';
import {getUserAgent} from "../scripts/userAgent.service.js";

(function () {

    /**
     * Global instance of the SettingsService class.
     * Used for saving variables to local storage.
     * @type {SettingsService}
     */
    let settingsService;

    let blacklistService;

    // Load the saved settings, and check the box in the UI appropriately.
    // If there are no saved settings, save minimal base settings.
    // Then, load the options from json.
    window.addEventListener('load', async function () {
        settingsService = new SettingsService();
        blacklistService = new BlacklistService();

        await loadEnabledCheckbox();

        await loadCanvasCheckbox();

        await loadOptions();

        await loadTimezoneDropdown();

        await loadBlacklistCheckBox();

        loadCommitButton();

        loadRandomButton();
    });

    // Load and update on the popup the settings for the 'enabled' checkbox.
    async function loadEnabledCheckbox() {
        const hasSettings = await settingsService.hasSettings();
        if (!hasSettings) {
            await settingsService.setSettings({ enabled: false });
        }

        const { enabled } = await settingsService.getSettings();

        const enabledEl = document.querySelector('#enabled');
        enabledEl.checked = enabled;

        enabledEl.addEventListener('change', async function () {
            await settingsService.updateSettings('enabled', this.checked);
        });
    }

    async function loadCanvasCheckbox() {
        const { canvasDisabled } = await settingsService.getSettings();
        const canvasDisabledEl = document.getElementById('canvasDisabled');
        canvasDisabledEl.checked = canvasDisabled;
        canvasDisabledEl.addEventListener('change', async function () {
            await settingsService.updateSettings('canvasDisabled', this.checked);
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
                opt.textContent = 'Default: ' + userVal;
                selectEl.appendChild(opt);
            }

            for (let option of options) {
                const opt = document.createElement('option');
                opt.value = option;
                // Very gross way to handle the default value for Firefox. im sorry :(
                opt.textContent = option === "Firefox" ? 'Default: ' + option : option;
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
        const jsonFileUrl = browser.extension.getURL('assets/timezones.json');
        const res = await fetch(jsonFileUrl);
        const timeZones = await res.json();
        const selectEl = document.createElement('select');
        selectEl.id = 'timezone';
        selectEl.addEventListener('change', async function () {
            await settingsService.updateSettings('timezoneOffset', this.value);
            let removedDefault = (this.options[this.selectedIndex].textContent).split(':');
            removedDefault = removedDefault[1] ? removedDefault[1] : removedDefault[0];
            await settingsService.updateSettings('timezone', removedDefault.trim());
        });

        // Set create user default
        const opt = document.createElement('option');
        const userOffset = new Date().getTimezoneOffset();
        const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        opt.value = userOffset;
        opt.textContent = 'Default: ' + userTimeZone;
        selectEl.appendChild(opt);

        // If there isn't a timezoneOffset saved, set it to the user's default.
        if (!(await settingsService.getSettings())['timezoneOffset']) {
            await settingsService.updateSettings('timezoneOffset', userOffset);
            await settingsService.updateSettings('timezone', userTimeZone);
        }

        for (let timeZone of timeZones) {
            const opt = document.createElement('option');
            opt.value = timeZone.offset;
            opt.textContent = timeZone.timeZone;
            selectEl.appendChild(opt);
        }

        const currentSetting = (await settingsService.getSettings())['timezoneOffset'];
        if (currentSetting && Array.from(selectEl.options).filter(option => option.value === currentSetting).length > 0) {
            selectEl.value = currentSetting;
        } else {
            selectEl.value = userOffset;
            await settingsService.updateSettings('timezoneOffset', userOffset);
            await settingsService.updateSettings('timezone', userTimeZone);
        }

        const label = document.createElement('label');
        label.textContent = 'Timezone: ';
        label.htmlFor = 'timezone';
        const div = document.createElement('div');
        div.appendChild(label);
        div.appendChild(selectEl);
        document.querySelector('#dropdowns').appendChild(div);
    }

    async function loadBlacklistCheckBox() {
        const blacklistCb = document.getElementById('blacklist');

        blacklistCb.checked = await blacklistService.isBlacklisted();

        blacklistCb.addEventListener('click', async function () {
            await blacklistService.toggleBlacklist();
            blacklistCb.checked = await blacklistService.isBlacklisted();
        });

    }


    function loadCommitButton() {
        const commitBtn = document.getElementById('commit');
        commitBtn.addEventListener('click', function () {
            browser.tabs.reload();
        });
    }

    function loadRandomButton() {
        const randomBtn = document.getElementById('randomize');
        randomBtn.addEventListener('click', async function () {
            const dropdowns = document.querySelectorAll('#dropdowns select');
            for (let i = 0; i < dropdowns.length; i++) {
                let selectEl = dropdowns[i];
                const randomIndex = Math.floor(Math.random() * selectEl.options.length);
                selectEl.selectedIndex = randomIndex;
                let key = selectEl.id;
                let option = selectEl.options[randomIndex];
                if (key === 'timezone'){
                    let removedDefault = (option.textContent).split(':');
                    removedDefault = removedDefault[1] ? removedDefault[1] : removedDefault[0];
                    await settingsService.updateSettings('timezone', removedDefault.trim());
                    //await settingsService.updateSettings('timezone',option.textContent);
                    await settingsService.updateSettings('timezoneOffset',option.value);
                } else {
                    await settingsService.updateSettings(key, option.value);
                }

            }

        });

    }

})();