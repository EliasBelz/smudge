import { trackEvent } from './tracking.service.js';

browser.runtime.onMessage.addListener(async (message) => {
  if (message.type === 'trackEvent') {
    console.log('Received trackEvent message', message);
    await trackEvent(message.eventName, message.eventValue);
  }
});