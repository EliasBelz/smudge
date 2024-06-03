"use strict";
(async function () {
    const script = document.createElement('script');
    const { settings } = (await browser.storage.local.get('settings'));
    const isBlackListed = await browser.runtime.sendMessage({ command: 'isBlacklisted' });

    if (settings?.enabled && !isBlackListed) {
        const {
            platform,
            userAgent,
            timezoneOffset,
            timezone,
            browser
        } = settings;
        console.log('platform', platform);
        console.log('userAgent', userAgent);

        const offsetHours = timezoneOffset / -60;
        const utcString = `UTC${offsetHours >= 0 ? '+' : ''}${offsetHours}`;

        let scriptContent = '';
        scriptContent += `
            Object.defineProperty(navigator, 'platform', {
                get: function () {
                    window.dispatchEvent(new CustomEvent('trackEvent', { detail: { eventName: 'platform', eventValue: '${platform}' } }));
                    return '${platform}';
                }
            });

            Object.defineProperty(navigator, 'userAgent', {
                get: function () {
                    window.dispatchEvent(new CustomEvent('trackMultipleEvents', { detail: [
                            { eventName: 'userAgent', eventValue: '${userAgent}' },
                            { eventName: 'browser', eventValue: '${browser}' },
                            { eventName: 'platform', eventValue: '${platform}' }]}));
                    return '${userAgent}';
                }
            });

            Date.prototype.getTimezoneOffset = function() {
                window.dispatchEvent(new CustomEvent('trackEvent', { detail: { eventName: 'timeZoneOffset', eventValue: '${timezoneOffset}, (${utcString})' } }));
                return ${timezoneOffset};
            }

            const originalResolvedOptions = Intl.DateTimeFormat.prototype.resolvedOptions;
            Intl.DateTimeFormat.prototype.resolvedOptions = function() {
                const options = originalResolvedOptions.call(this);
                Object.defineProperty(options, 'timeZone', {
                    get: function () {
                        window.dispatchEvent(new CustomEvent('trackEvent', { detail: { eventName: 'timeZone', eventValue: '${timezone}' } }));
                        return '${timezone}';
                    }
                });
                return options;
            };

            // Add more properties as needed

        `;

        if (settings?.canvasDisabled) {
            scriptContent += `
                HTMLCanvasElement.prototype.getContext = function () {};
            `;
        }

        script.textContent = scriptContent;

        (document.head || document.documentElement).appendChild(script);


        script.remove();
    }

     /**
     * Gets the host name of the currently active tab
     */
    async function getHostName() {
        try {
        const url = (await browser.tabs.query({currentWindow: true, active: true}))[0].url;
        let j = url.indexOf("://");
        let host = "";
        for (let i = j + 3; i < url.length; i++) {
            if (url.charAt(i) != '/') {
                host = host + "" + url.charAt(i);
            } else {
                break;
            }
        }
            return host;
        } catch (error) {
            console.error('error', error);
            return null
        }
    }
})();