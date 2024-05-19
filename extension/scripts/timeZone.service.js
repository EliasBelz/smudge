// const moment = require('moment-timezone');

export class TimeZoneService {

  /**
   * Gets a list of timezones with offsets.
   */
  getTimeZones() {
    return  [
      { timeZone: 'Etc/GMT+12', offset: -720 },
      { timeZone: 'Etc/GMT+11', offset: -660 },
      { timeZone: 'Etc/GMT+10', offset: -600 },
      { timeZone: 'Pacific/Marquesas', offset: -570 },
      { timeZone: 'America/Adak', offset: -540 },
      { timeZone: 'America/Anchorage', offset: -480 },
      { timeZone: 'America/Creston', offset: -420 },
      { timeZone: 'America/Bahia_Banderas', offset: -360 },
      { timeZone: 'America/Atikokan', offset: -300 },
      { timeZone: 'America/Anguilla', offset: -240 },
      { timeZone: 'America/Araguaina', offset: -180 },
      { timeZone: 'America/St_Johns', offset: -150 },
      { timeZone: 'America/Miquelon', offset: -120 },
      { timeZone: 'America/Godthab', offset: -60 },
      { timeZone: 'Africa/Abidjan', offset: 0 },
      { timeZone: 'Africa/Algiers', offset: 60 },
      { timeZone: 'Africa/Blantyre', offset: 120 },
      { timeZone: 'Africa/Addis_Ababa', offset: 180 },
      { timeZone: 'Asia/Tehran', offset: 210 },
      { timeZone: 'Asia/Baku', offset: 240 },
      { timeZone: 'Asia/Kabul', offset: 270 },
      { timeZone: 'Antarctica/Mawson', offset: 300 },
      { timeZone: 'Asia/Calcutta', offset: 330 },
      { timeZone: 'Asia/Kathmandu', offset: 345 },
      { timeZone: 'Asia/Bishkek', offset: 360 },
      { timeZone: 'Asia/Rangoon', offset: 390 },
      { timeZone: 'Antarctica/Davis', offset: 420 },
      { timeZone: 'Antarctica/Casey', offset: 480 },
      { timeZone: 'Australia/Eucla', offset: 525 },
      { timeZone: 'Asia/Chita', offset: 540 },
      { timeZone: 'Australia/Adelaide', offset: 570 },
      { timeZone: 'Antarctica/DumontDUrville', offset: 600 },
      { timeZone: 'Australia/LHI', offset: 630 },
      { timeZone: 'Asia/Magadan', offset: 660 },
      { timeZone: 'Antarctica/McMurdo', offset: 720 },
      { timeZone: 'NZ-CHAT', offset: 765 },
      { timeZone: 'Etc/GMT-13', offset: 780 },
      { timeZone: 'Etc/GMT-14', offset: 840 }
    ];
  }

  // fetchTimeZones() {
  //   const timeZones = moment.tz.names();
  //   const offsetSet = new Set();
  //   const offsets = timeZones.map(timeZone => {
  //     const offset = moment.tz(timeZone).utcOffset();
  //     if (!offsetSet.has(offset)) {
  //       offsetSet.add(offset);
  //       return {
  //         timeZone,
  //         offset
  //       };
  //     }
  //   }).filter(offset => offset).sort((a, b) => a.offset - b.offset);
  //   return offsets;
  // }
}
