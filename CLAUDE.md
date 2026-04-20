# Home Comic Dashboard

## Project Overview

Family-facing Home Assistant dashboard with a pulp comic book aesthetic. Pure static site (React UMD + Babel standalone, no build step). Reads live state from Home Assistant over REST + WebSocket via a long-lived access token, replaces the mocked data in `src/data.jsx` with real entities from dominic (Tailscale `100.100.62.111`, LAN `192.168.1.10:8123`).

Companion to the engineer-facing Lovelace Overview on `dominic`. This dashboard is what a tablet in the kitchen would show.

## Stack

- React 18 via UMD (`unpkg.com/react@18.3.1`)
- Babel Standalone 7.29 for inline JSX transform
- Vanilla CSS with CSS custom properties (Ben-Day halftone + paper grain backgrounds)
- Fonts from Google Fonts: Bangers, Kalam, Libre Caslon Text, Work Sans, IBM Plex Mono
- Home Assistant REST + WebSocket API
- Deploys to GitHub Pages at `davehomeassist.github.io/home-comic-dashboard/`
- Zero backend, zero build step

## Key Decisions

- **Mock-first, live-second**: the template ships with fully mocked `data.jsx`. `ha-client.jsx` overrides fields with live HA state once a token is present. UI never blocks on auth.
- **Token lives in `localStorage`** under key `ha_token`. First-run prompt asks for it; persisted across reloads.
- **Tailscale-first access**: assume family views via Tailscale-connected devices, so dashboard can hit `http://100.100.62.111:8123`. Fallback prompts for the HA URL.
- **No HA-side changes required**. The dashboard is read-mostly; any writes use REST `POST /api/services/...` and are additive, never destructive.
- **Entity mapping** lives in `src/entity-map.jsx` for easy swapping as HA integrations are added (Ring cameras, Nest, Govee) per the HA Rebuild roadmap.

## Documentation Maintenance

- Issues tracked in this `CLAUDE.md` under `## Issue Tracker`
- Session log rows go to `/Users/daverobertson/Desktop/Code/95-docs-personal/today.csv`
- No separate handoff doc yet

## Issue Tracker

| ID | Severity | Status | Title | Notes |
|----|----------|--------|-------|-------|
| 001 | P2 | open | Cameras are fully mocked | Real camera feeds require Ring integration (pending from HA rebuild roadmap) |
| 002 | P2 | open | Solar data is mocked | No solar integration in HA; either mock stays or add real PV monitoring |
| 003 | P3 | open | Day/night auto-switch | Currently toggled via `data-mode` attr; wire to `sun.sun` below-horizon event |
| 004 | P3 | open | Calendar hardcoded to Phillies | Already have `calendar.phillies_2026` in HA; wire live |
