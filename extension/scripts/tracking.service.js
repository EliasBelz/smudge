"use strict";
(function() {

  window.addEventListener("load" , function() {
    window.addEventListener('trackEvent', async function (e) {
      await trackEvent(e.detail.eventName, e.detail.eventValue);
    });
  })

  async function trackEvent(eventName, eventValue) {

    console.log('TrackEvent', eventName, eventValue);
    let data = await browser.storage.local.get('eventTrackingData');

    if (!data.eventTrackingData) {
      data.eventTrackingData = {};
    }

    if (!data.eventTrackingData[eventName]) {
      data.eventTrackingData[eventName] = {};
    }

    if (!data.eventTrackingData[eventName][eventValue]) {
      data.eventTrackingData[eventName][eventValue] = 1;
    } else {
      data.eventTrackingData[eventName][eventValue] += 1;
    }

    await browser.storage.local.set({ 'eventTrackingData': data.eventTrackingData });
  }

})();
