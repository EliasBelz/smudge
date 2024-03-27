"use strict";

(function() {

   window.addEventListener("load", init);


   function init() {
    qs("button").addEventListener("click", async () => {await fingerPrint()});
    id("uab").addEventListener("click", userAgentAlert);
    id("cua").addEventListener("click", changeUserAgent);
    //  id("oscpu").addEventListener("click", oscpu);
    //  id("gpu").addEventListener("click", gpu);
   }

   async function fingerPrint() {
    // https://developer.mozilla.org/en-US/docs/Web/API/Navigator
    const nav = window.navigator;
    const p = qs("p");
    p.textContent = "";
    p.textContent += `Bluetooth: ${nav.bluetooth}\n`; // await nav.bluetooth.getDevices()
    p.textContent += `connection: ${nav.connection}\n`;
    p.textContent += `contacts: ${nav.contacts}\n`;
    p.textContent += `cookies Enabled: ${nav.cookieEnabled}\n`;
    p.textContent += `credentials: ${nav.credentials}\n`;
    p.textContent += `device Memory: ${nav.deviceMemory}\n`;
    p.textContent += `geo location: ${nav.geolocation}\n`;
    p.textContent += `gpu: ${nav.gpu}\n`;
    p.textContent += `hardware concurrency: ${nav.hardwareConcurrency}\n`;
    p.textContent += `hid: ${nav.hid}\n`;
    p.textContent += `ink: ${nav.ink}\n`;
    p.textContent += `keyboard: ${nav.keyboard}\n`;
    p.textContent += `language: ${nav.language}\n`;
    p.textContent += `languages: ${nav.languages}\n`;
    p.textContent += `locks: ${nav.locks}\n`;
    p.textContent += `login: ${nav.login}\n`;
    p.textContent += `max touch points: ${nav.maxTouchPoints}\n`;
    p.textContent += `media Capabilities: ${nav.mediaCapabilities}\n`;
    p.textContent += `media devices: ${nav.mediaDevices}\n`;
    p.textContent += `media session: ${nav.mediaSession}\n`;
    p.textContent += `onLine: ${nav.onLine}\n`;
    p.textContent += `pdf viewer enabled: ${nav.pdfViewerEnabled}\n`;
    p.textContent += `permissions: ${nav.permissions}\n`;
    p.textContent += `presentation: ${nav.presentation}\n`;
    p.textContent += `presentation: ${nav.presentation}\n`;
    p.textContent += `scheduling: ${nav.scheduling}\n`;
    p.textContent += `serial: ${nav.serial}\n`;
    p.textContent += `service worker: ${nav.serviceWorker}\n`;
    p.textContent += `storage: ${nav.storage}\n`;
    p.textContent += `usb: ${nav.usb}\n`;
    p.textContent += `user activation: ${nav.userActivation}\n`;
    p.textContent += `user agent: ${nav.userAgent}\n`;
    p.textContent += `user agent data: ${nav.userAgentData}\n`;
    p.textContent += `virtual keyboard: ${nav.virtualKeyboard}\n`;
    p.textContent += `wake lock: ${nav.wakeLock}\n`;
    p.textContent += `webdriver: ${nav.webdriver}\n`;
    p.textContent += `window controls overlay: ${nav.windowControlsOverlay}\n`;
    p.textContent += `XR system: ${nav.xr}\n`;
    p.textContent += `build ID: ${nav.buildID}\n`;
    p.textContent += `global privacy control: ${nav.globalPrivacyControl}\n`;
    p.textContent += `standalone mode: ${nav.standalone}\n`;
    p.textContent += `active VR displays: ${nav.activeVRDisplays}\n`;
    p.textContent += `app code name: ${nav.appCodeName}\n`;
    p.textContent += `app name: ${nav.appName}\n`;
    p.textContent += `app version: ${nav.appVersion}\n`;
    p.textContent += `do not track: ${nav.doNotTrack}\n`;
    p.textContent += `mime types: ${nav.mimeTypes}\n`;
    p.textContent += `os cpu: ${nav.oscpu}\n`;
    p.textContent += `platform: ${nav.platform}\n`;
    p.textContent += `plugins: ${nav.plugins}\n`;
    p.textContent += `product: ${nav.product}\n`;
    p.textContent += `product sub: ${nav.productSub}\n`;
    p.textContent += `vendor: ${nav.vendor}\n`;
    p.textContent += `vendor sub: ${nav.vendorSub}\n`;
    const platform = nav.platform;
    p.textContent += `Platform: ${platform}\n`;
   }

   function userAgentAlert() {
     alert(window.navigator.userAgent);
     console.log(window.navigator)
    }

    function oscpu() {
     alert(window.navigator.oscpu);
     console.log(window.navigator)
    }

    function gpu() {
     alert(window.navigator.gpu);
     console.log(window.navigator)
    }

    function changeUserAgent() {
      navigator.__defineGetter__('userAgent', function(){
        return 'test' // customized user agent
    });
      console.log(window.navigator)
    }



   /** ------------------------------ Helper Functions  ------------------------------ */
   /**
   * Note: You may use these in your code, but remember that your code should not have
   * unused functions. Remove this comment in your own code.
   */

   /**
   * Returns the element that has the ID attribute with the specified value.
   * @param {string} idName - element ID
   * @returns {object} DOM object associated with id.
   */
   function id(idName) {
     return document.getElementById(idName);
   }

   /**
   * Returns the first element that matches the given CSS selector.
   * @param {string} selector - CSS query selector.
   * @returns {object} The first DOM object matching the query.
   */
   function qs(selector) {
     return document.querySelector(selector);
   }

   /**
   * Returns the array of elements that match the given CSS selector.
   * @param {string} selector - CSS query selector
   * @returns {object[]} array of DOM objects matching the query.
   */
   function qsa(selector) {
     return document.querySelectorAll(selector);
   }

   /**
   * Returns a new element with the given tag name.
   * @param {string} tagName - HTML tag name for new DOM element.
   * @returns {object} New DOM object for given HTML tag.
   */
   function gen(tagName) {
     return document.createElement(tagName);
   }

})();