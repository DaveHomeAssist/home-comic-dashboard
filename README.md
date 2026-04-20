# Home Comic Dashboard

Family-facing Home Assistant dashboard with a pulp comic book aesthetic.

![Comic theme reference](uploads/comic-book-theme.png)

## Live

https://davehomeassist.github.io/home-comic-dashboard/ — Tailscale-connected clients only (calls back to `http://192.168.1.10:8123`).

## Stack

Pure static site. No build step.

- React 18 UMD + Babel standalone (inline JSX)
- Vanilla CSS with CSS custom properties
- Home Assistant REST + WebSocket for live state
- GitHub Pages for deploy

## First-run setup

1. Create a long-lived access token in HA: **Profile → Security → Long-lived access tokens → Create Token**.
2. Open this site. It will prompt for the token and the HA URL (`http://192.168.1.10:8123` on LAN, or `http://100.100.62.111:8123` on Tailscale).
3. Token persists in `localStorage`. To reset: open browser console → `HA.resetAuth()`.

## File layout

| File | Role |
|---|---|
| `src/ha-client.js` | Token prompt, REST prime, WebSocket subscribe, exposes `window.HA` |
| `src/entity-map.jsx` | Maps mock fields → HA `entity_id`s |
| `src/data.jsx` | Mock state (shipped values; overridden once HA ready) |
| `src/data-live.jsx` | Overlays live HA state onto mocks every state_changed event |
| `src/icons.jsx` | SVG icon set |
| `src/widgets.jsx` | Individual cards (weather, calendar, network, system…) |
| `src/rooms.jsx` | Per-room modal |
| `src/dashboard.jsx` | Layout + card grid |
| `src/tweaks.jsx` | Mode/bg/intensity settings panel |
| `src/app.jsx` | Root component + mount |
| `styles.css` | Pulp palette, halftone, paper grain, ink strokes |
| `assets/` | Room reference images + design system refs |
| `uploads/` | Sketchbook images (theme references, exploration) |

## Integration status

| Widget | Live? | Source |
|---|---|---|
| Weather | ✅ | `weather.forecast_home` |
| Sun (sunrise/sunset) | ✅ | `sensor.sun_next_dawn`, `sensor.sun_next_setting` |
| Network | ✅ | `binary_sensor.verizon_router_wan_status`, `sensor.verizon_router_*_speed` |
| Backups | ✅ | `sensor.backup_*` |
| Family presence | ✅ | `person.david_t_robertson`, `person.lisa`, `person.tom` |
| Media (Living Room) | ✅ | `media_player.65_tcl_roku_tv` |
| Calendar | ⚠️ | `calendar.phillies_2026` exists; wiring pending |
| Cameras | ❌ | Mocked — Ring integration pending (HA Rebuild roadmap) |
| Solar | ❌ | Mocked — no PV monitoring integrated |
| Per-room sensors | partial | Living + Laundry Echo devices live; others stay mocked |

## Related

- [Home Assistant Rebuild (Notion)](https://www.notion.so/Home-Assistant-Rebuild-347255fc8f44809fa5bcdb460923f727) — the master HA doc
- Engineer-facing dashboard: HA Lovelace on `dominic`
- Tailscale network: `daves-macbook-air` ↔ `dominic` ↔ `duncan` ↔ `walter`

## License

Personal project. Not redistributable without the entity data stripped.
