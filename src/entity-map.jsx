/* ============================================
   ENTITY MAP — maps mock data.jsx fields to live HA entity_ids
   Used by data-live.jsx to overlay real values when HA is ready.
   ============================================ */

const ENTITY_MAP = {
  weather: {
    entity: "weather.forecast_home",
    // attrs: temperature, apparent_temperature, wind_speed, wind_bearing, precipitation
  },

  sun: {
    elevation:   "sensor.sun_solar_elevation",
    rising:      "binary_sensor.sun_solar_rising",
    nextDawn:    "sensor.sun_next_dawn",
    nextSetting: "sensor.sun_next_setting",
    sunEntity:   "sun.sun",
  },

  router: {
    wan:         "binary_sensor.verizon_router_wan_status",
    down:        "sensor.verizon_router_download_speed",
    up:          "sensor.verizon_router_upload_speed",
    externalIp:  "sensor.verizon_router_external_ip",
    uptime:      "sensor.verizon_router_uptime",
  },

  backup: {
    state:    "sensor.backup_backup_manager_state",
    last:     "sensor.backup_last_successful_automatic_backup",
    next:     "sensor.backup_next_scheduled_automatic_backup",
  },

  calendar: "calendar.phillies_2026",

  todo: "todo.shopping_list",

  persons: {
    dave: "person.david_t_robertson",
    lisa: "person.lisa",
    tom:  "person.tom",
  },

  media: {
    livingRoom: "media_player.65_tcl_roku_tv",
    davidsRoom: "media_player.jerry",
  },

  // Per-room live sensors. Null means "mock stays until integration lands."
  rooms: {
    living: {
      motion:      "binary_sensor.echo_dot_motion",
      temperature: "sensor.echo_dot_temperature",
      illuminance: "sensor.echo_dot_illuminance",
      connectivity:"binary_sensor.echo_dot_connectivity",
    },
    kitchen: {
      connectivity: "binary_sensor.kitchen_alexa_connectivity",
      timer:        "sensor.kitchen_alexa_next_timer",
    },
    front:   {},
    garage:  {},
    garden:  {},
    laundry: {
      motion:      "binary_sensor.echo_spot_motion",
      illuminance: "sensor.echo_spot_illuminance",
    },
    davids:  {
      media: "media_player.jerry",
    },
  },

  // Cameras stay mocked until Ring integration is added (HA Rebuild roadmap).
  cameras: null,

  // Solar stays mocked until a PV monitoring integration is added.
  solar: null,
};

window.ENTITY_MAP = ENTITY_MAP;
