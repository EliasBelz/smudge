// User-Agent: Mozilla/5.0 (<system-information>) <platform> (<platform-details>) <extensions>
"use strict";
export async function makeUserAgent({platform, browser}) {
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