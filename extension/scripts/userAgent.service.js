
/**
 * Returns a accurate user agent string for a given platform and browser.
 */
export function getUserAgent({platform, browser}) {
  if (!browser || !platform) {
    return null;
  }

  return makeUAString({platform, browser});
}

function makeUAString({platform, browser}) {
  return `Mozilla/5.0 (${getSystemInfo(platform)}) ${getBrowserInfo(browser)}`;
}

/**
 * Returns the system information for a given platform.
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
      return 'AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.3';
    case 'Firefox':
      return 'Gecko/20100101 Firefox/126.0';
    case 'Opera':
      return 'AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36 OPR/110.0.0.0';
    case 'Microsoft Edge':
      return 'AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36 Edg/122.0.0.';
    case 'Safari':
      return 'AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Safari/605.1.15';
    default:
      return '';
  }
}