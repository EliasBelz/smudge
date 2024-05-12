/**
 * @typedef {Object} SettingsService
 * @property {function(): Promise<boolean>} hasSettings - Checks existence of settings.
 * @property {function(): Promise<Object>} getSettings - Gets settings object.
 * @property {function(Object): Promise<void>} setSettings - Saves settings object.
 * @property {function(string, Object): Promise<void>} updateSettings - Updates settings object.
 */

/**
 * API to save and load the settings object.
 * @type {SettingsService}
 */
class SettingsService {

    /**
     * Checks if there are saved settings.
     * @returns {Promise<boolean>}
     */
    async hasSettings() {
        const { settings } = await browser.storage.local.get('settings');
        return Boolean(settings);
    }

    /**
     * Gets the saved settings from local storage.
     * @returns {Promise<Object>}
     */
    async getSettings() {
        const { settings } = await browser.storage.local.get('settings');
        return settings;
    }

    /**
     * Saves a settings object to local storage.
     * @param {Object} settings
     */
    async setSettings(settings) {
        await browser.storage.local.set({ settings });
    }

    /**
     * Saves or updates a key-value pair in settings in local storage.
     * @param {string} key
     * @param {Object} value
     */
    async updateSettings(key, value) {
        const { settings } = await browser.storage.local.get('settings');
        const newSettings = Object.assign(settings, { [key]: value });
        await browser.storage.local.set({ settings: newSettings });
    }

}