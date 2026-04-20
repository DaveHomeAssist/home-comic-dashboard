/* ============================================
   DATA-LIVE — overlays live HA state onto the mock objects in data.jsx
   Runs once HA is ready and on every state_changed event.
   Never throws; if HA is down or a mapping is null, the mock data stays.
   ============================================ */

(function () {
  function num(v, fallback) {
    const n = parseFloat(v);
    return Number.isFinite(n) ? n : fallback;
  }

  function hydrate() {
    if (!window.HA || !window.HA.ready) return;
    const M = window.ENTITY_MAP;

    // Weather
    const wState = window.HA.getState(M.weather.entity);
    const wAttrs = window.HA.getEntity(M.weather.entity);
    if (wAttrs) {
      WEATHER.conditionText = (wState || "").replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase()) || WEATHER.conditionText;
      WEATHER.tempF   = num(wAttrs.attributes.temperature, WEATHER.tempF);
      WEATHER.feelsF  = num(wAttrs.attributes.apparent_temperature, WEATHER.feelsF);
      WEATHER.windMph = num(wAttrs.attributes.wind_speed, WEATHER.windMph);
      WEATHER.windDir = wAttrs.attributes.wind_bearing != null ? `${Math.round(wAttrs.attributes.wind_bearing)}°` : WEATHER.windDir;
    }

    // Sun
    WEATHER.sunrise = fmtTime(window.HA.getState(M.sun.nextDawn)) || WEATHER.sunrise;
    WEATHER.sunset  = fmtTime(window.HA.getState(M.sun.nextSetting)) || WEATHER.sunset;

    // Network
    NET.wanUp    = window.HA.getState(M.router.wan) === "on";
    NET.downMbps = num(window.HA.getState(M.router.down), NET.downMbps);
    NET.upMbps   = num(window.HA.getState(M.router.up), NET.upMbps);
    const extIp  = window.HA.getState(M.router.externalIp);
    if (extIp) NET.externalIp = extIp;

    // System / backups
    const bState = window.HA.getState(M.backup.state);
    if (bState) SYSTEM.backupState = titleCase(bState);
    const bLast = window.HA.getState(M.backup.last);
    if (bLast) SYSTEM.lastBackupHoursAgo = hoursSince(bLast);
    const bNext = window.HA.getState(M.backup.next);
    if (bNext) SYSTEM.nextScheduledIn = inFuture(bNext);
    const uptime = window.HA.getState(M.router.uptime);
    if (uptime) SYSTEM.uptime = uptime;

    // Persons → FAMILY[*].online
    FAMILY.forEach(f => {
      const eid = M.persons[f.id];
      if (!eid) return;
      const s = window.HA.getState(eid);
      f.online = s === "home";
      f.zone = s || "unknown";
    });

    // Media
    const mp = window.HA.getEntity(M.media.livingRoom);
    if (mp) {
      MEDIA.playing  = mp.state === "playing";
      MEDIA.track    = mp.attributes.media_title   || MEDIA.track;
      MEDIA.artist   = mp.attributes.media_artist  || MEDIA.artist;
      MEDIA.album    = mp.attributes.media_album_name || MEDIA.album;
      MEDIA.duration = num(mp.attributes.media_duration, MEDIA.duration);
      MEDIA.elapsed  = num(mp.attributes.media_position, MEDIA.elapsed);
    }

    // Rooms
    const r = ROOM_DETAILS;
    const lr = M.rooms.living;
    if (lr) {
      const temp = window.HA.getState(lr.temperature);
      if (temp) r.living.sensors[0].value = `${num(temp, 0).toFixed(1)}°F`;
      const motion = window.HA.getState(lr.motion) === "on";
      r.living.sensors[2].value = motion ? "Motion" : "Quiet";
    }
    const kt = M.rooms.kitchen;
    if (kt && r.kitchen) {
      // could hydrate kitchen timer here later
    }

    // Re-render
    if (window.__rerender) window.__rerender();
  }

  function fmtTime(iso) {
    if (!iso) return null;
    try {
      const d = new Date(iso);
      let h = d.getHours();
      const m = d.getMinutes().toString().padStart(2, "0");
      const ap = h >= 12 ? "PM" : "AM";
      h = h % 12 || 12;
      return `${h}:${m} ${ap}`;
    } catch { return null; }
  }

  function hoursSince(iso) {
    try {
      const then = new Date(iso).getTime();
      return Math.max(0, Math.round((Date.now() - then) / 3600000));
    } catch { return null; }
  }

  function inFuture(iso) {
    try {
      const target = new Date(iso).getTime();
      const hrs = Math.max(0, Math.round((target - Date.now()) / 3600000));
      return hrs < 24 ? `In ${hrs} hours` : `In ${Math.round(hrs / 24)} days`;
    } catch { return null; }
  }

  function titleCase(s) {
    return (s || "").replace(/\b\w/g, c => c.toUpperCase());
  }

  // Wire up: re-hydrate every HA state_changed event, debounced.
  let debounce = null;
  function queue() {
    clearTimeout(debounce);
    debounce = setTimeout(hydrate, 250);
  }

  function start() {
    if (!window.HA) { setTimeout(start, 200); return; }
    window.HA.subscribe(queue);
  }
  start();
})();
