export async function TrackEvent(eventName, eventValue) {
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