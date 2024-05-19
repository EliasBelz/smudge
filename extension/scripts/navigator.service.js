"use strict";
(async function () {
    const jsonFileUrl = browser.extension.getURL('assets/navigator.json');
    const res = await fetch(jsonFileUrl);
    const data = await res.json();

    const { settings } = (await browser.storage.local.get('settings'));
    if (settings?.enabled) {
        const script = document.createElement('script');
        const {
            platform,
            userAgent,
            timezoneOffset,
            timezone
        } = settings;

        const offsetHours = timezoneOffset / -60;
        const utcString = `UTC${offsetHours >= 0 ? '+' : ''}${offsetHours}`;
        script.textContent = `
            Object.defineProperty(navigator, 'platform', {
                get: function () {
                    window.dispatchEvent(new CustomEvent('trackEvent', { detail: { eventName: 'platform', eventValue: '${data.platform}' } }));
                    return '${platform}';
                }
            });

            Object.defineProperty(navigator, 'userAgent', {
                get: function () {
                    window.dispatchEvent(new CustomEvent('trackEvent', { detail: { eventName: 'userAgent', eventValue: '${userAgent}' } }));
                    return '${userAgent}';
                }
            });

            Date.prototype.getTimezoneOffset = function() {
                window.dispatchEvent(new CustomEvent('trackEvent', { detail: { eventName: 'timezoneOffset', eventValue: '${timezoneOffset}, ${utcString}' } }));
                return ${timezoneOffset};
            }

            const originalResolvedOptions = Intl.DateTimeFormat.prototype.resolvedOptions;
            Intl.DateTimeFormat.prototype.resolvedOptions = function() {
                const options = originalResolvedOptions.call(this);
                Object.defineProperty(options, 'timeZone', {
                    get: function () {
                        window.dispatchEvent(new CustomEvent('trackEvent', { detail: { eventName: 'timezone', eventValue: '${timezone}' } }));
                        return '${timezone}';
                    }
                });
                return options;
            };

            // Add more properties as needed
        `;
        (document.head || document.documentElement).appendChild(script);
        script.remove();
    }
})();