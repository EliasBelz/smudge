(async function () {
    const jsonFileUrl = browser.extension.getURL('assets/navigator.json');
    const res = await fetch(jsonFileUrl);
    const data = await res.json();

    const { settings } = (await browser.storage.local.get('settings'));
    if (settings && settings?.enabled) {
        const script = document.createElement('script');
        const {
            platform,
            userAgent
        } = settings;

        script.textContent = `
            Object.defineProperty(navigator, 'platform', {
                get: function () {
                    window.dispatchEvent(new CustomEvent('trackEvent', { detail: { eventName: 'platform', eventValue: '${data.platform[40]}' } }));
                    return '${platform}';
                }
            });

            Object.defineProperty(navigator, 'userAgent', {
                get: function () {
                    window.dispatchEvent(new CustomEvent('trackEvent', { detail: { eventName: 'userAgent', eventValue: 'fake userAgent' } }));
                    return '${userAgent}';
                }
            });

            // Add more properties as needed
        `;

        (document.head || document.documentElement).appendChild(script);
        script.remove();
    }

    console.log(`extension UA ${navigator.userAgent}`);
    console.log(`extension platform ${navigator.platform}`);
})();