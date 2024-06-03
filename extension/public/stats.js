'use strict';

(function () {

  window.addEventListener('load', init);

  async function init() {
    const events = await getEventTrackingData() || {};

    qs('main > button').addEventListener('click', async () => {
      await clearEventTrackingData();
      window.location.reload();
    });

    await doNotSmudgeSection();

    createSection('user-agent', events, 'userAgent');
    createSection('platform', events, 'platform');
    createSection('browser', events, 'browser');
    createSection('timezone-offset', events, 'timeZoneOffset');
    createSection('timezone', events, 'timeZone');
  }


  async function doNotSmudgeSection() {
    qs('#dns-list .scroll').innerHTML = '';
    qs('#dns-list button').addEventListener('click', async () => {
      await clearBlacklist();
      window.location.reload();
    });
    const DNSList = await getBlacklist();
    let elm;

    if (DNSList.length === 0) {
      elm = document.createElement('p');
      elm.textContent = 'No listed hosts.';
      elm.classList.add('no-data');
    } else {
      elm = document.createElement('ul');
      elm.classList.add('stat-list');
      for (const host of DNSList) {
        const li = document.createElement('li');
        const a = document.createElement('a');
        // TODO maybe remove this cuz not everything is https
        a.href = 'https://' + host;
        a.textContent = host;
        a.target = '_blank';
        a.textContent = host;
        li.appendChild(a);
        elm.appendChild(li);
      }
    }
    qs('#dns-list .scroll').appendChild(elm);
  }


  function createSection(sectionId, events, eventName) {
    qs(`#${sectionId} .scroll`).innerHTML = '';
    qs(`#${sectionId} .scroll`).appendChild(makeList(events[eventName], `No ${eventName} data.`));
    qs(`#${sectionId} button`).addEventListener('click', async () => {
        await clearCategoryEventTrackingData(eventName);
        window.location.reload();
    });
  }

  function makeList(category, text = 'No data available') {
    const keys = Object.keys(category || {});
    if (!keys || keys.length === 0) {
      const p = document.createElement('p');
      p.textContent = text;
      p.classList.add('no-data');
      return p;
    }

    const list = document.createElement('ul');
    list.classList.add('stat-list');
    for (const key of keys) {
      const item = document.createElement('li');
      item.textContent = `${key}: ${category[key]}`;
      list.appendChild(item);
    }
    return list;
  }

  function id(id) {
    return document.getElementById(id);
  }

  function qs(selector) {
    return document.querySelector(selector);
  }

})();