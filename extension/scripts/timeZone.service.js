const moment = require('moment-timezone');

export class TimeZoneService {

  /**
   * Used to get a list of timezones with offsets.
   */
  fetchTimeZones() {
    const timeZones = moment.tz.names();
    const offsetSet = new Set();
    const offsets = timeZones.map(timeZone => {
      const offset = moment.tz(timeZone).utcOffset();
      if (!offsetSet.has(offset)) {
        offsetSet.add(offset);
        return {
          timeZone,
          offset
        };
      }
    }).filter(offset => offset).sort((a, b) => a.offset - b.offset);
    return offsets;
  }
}
