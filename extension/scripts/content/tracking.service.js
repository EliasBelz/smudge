'use strict';

let queue = Promise.resolve();

window.addEventListener('trackEvent', function (e) {
    queueEvent(e.detail.eventName, e.detail.eventValue);
});

window.addEventListener('trackUserAgent', function (e) {
    // Assuming trackUserAgent is defined somewhere else
    queueEvent(trackUserAgent);
});

window.addEventListener('trackMultipleEvents', function (e) {
    for (const event of e.detail) {
        queueEvent(event.eventName, event.eventValue);
    }
});

function queueEvent(eventName, eventValue) {
    queue = queue.then(() => trackEvent(eventName, eventValue)).catch(console.error);
}

async function trackEvent(eventName, eventValue) {
    const data = await browser.storage.local.get('eventTrackingData');

    if (!data.eventTrackingData) {
        data.eventTrackingData = {};
    }

    if (!data.eventTrackingData[eventName]) {
        data.eventTrackingData[eventName] = {};
    }

    if (!data.eventTrackingData[eventName][eventValue]) {
        data.eventTrackingData[eventName][eventValue] = 0;
    }

    data.eventTrackingData[eventName][eventValue] += 1;

    await browser.storage.local.set({ eventTrackingData: data.eventTrackingData });
}

async function getEventTrackingData() {
    const data = await browser.storage.local.get('eventTrackingData');
    return data?.eventTrackingData;
}

async function clearEventTrackingData() {
    await browser.storage.local.remove('eventTrackingData');
}

async function clearCategoryEventTrackingData(category) {
    const data = await browser.storage.local.get('eventTrackingData');
    if (data.eventTrackingData) {
        delete data.eventTrackingData[category];
    } else {
        data.eventTrackingData = {};
    }
    await browser.storage.local.set({ eventTrackingData: data.eventTrackingData });
}