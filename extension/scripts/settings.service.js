class SettingsService {
  async getSettings() {
    let data = await browser.storage.local.get('settings');
    return data.settings;
  }

  async setSettings(settings) {
    await browser.storage.local.set({ 'settings': settings });
  }
}