class SettingsService {
  async getSettings() {
    let data = await browser.storage.local.get('settings');
    return data.settings;
  }

  async setSettings(settings) {
    await browser.storage.local.set({ 'settings': settings });
  }

  async updateSettings(key, value) {
    let data = await browser.storage.local.get('settings');
    let newSettings = Object.assign(data.settings, {[key]: value});
    await browser.storage.local.set({ 'settings': newSettings });
  }
}