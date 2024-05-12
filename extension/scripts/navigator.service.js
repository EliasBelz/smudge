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
            browser
        } = settings;
        const userAgent = makeUserAgent({ platform, browser });
        settings.userAgent = userAgent;
        await browser.storage.local.set({ settings: { ...settings } });
        console.log(`extension UA ${userAgent}`);
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

    function makeUserAgent({platform, browser}) {
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