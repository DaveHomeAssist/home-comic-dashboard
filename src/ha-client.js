/* ============================================
   HA-CLIENT — live Home Assistant state overlay
   - Reads token + base URL from localStorage (first-run prompt)
   - Primes state via REST /api/states
   - Subscribes to state_changed over WebSocket
   - Exposes window.HA with { ready, getState, subscribe, callService }
   ============================================ */

(function () {
  const LS_TOKEN = "ha_token";
  const LS_BASE  = "ha_base";

  let states = {};
  let subs   = new Set();
  let ws     = null;
  let wsSeq  = 0;
  let ready  = false;

  function emit() {
    for (const fn of subs) {
      try { fn(states); } catch (e) { console.error(e); }
    }
  }

  function ensureConfig() {
    let token = localStorage.getItem(LS_TOKEN);
    let base  = localStorage.getItem(LS_BASE);
    if (!token) {
      token = prompt("Paste your Home Assistant long-lived access token:");
      if (!token) return null;
      localStorage.setItem(LS_TOKEN, token.trim());
    }
    if (!base) {
      base = prompt("Home Assistant URL (default http://192.168.1.10:8123):", "http://192.168.1.10:8123") || "http://192.168.1.10:8123";
      localStorage.setItem(LS_BASE, base.replace(/\/$/, ""));
    }
    return {
      token: localStorage.getItem(LS_TOKEN),
      base:  localStorage.getItem(LS_BASE),
    };
  }

  async function primeStates(cfg) {
    const res = await fetch(`${cfg.base}/api/states`, {
      headers: { Authorization: `Bearer ${cfg.token}` },
    });
    if (!res.ok) throw new Error(`HA REST ${res.status}`);
    const list = await res.json();
    for (const e of list) {
      states[e.entity_id] = e;
    }
    ready = true;
    emit();
  }

  function openWS(cfg) {
    const wsUrl = cfg.base.replace(/^http/, "ws") + "/api/websocket";
    ws = new WebSocket(wsUrl);
    ws.onmessage = (ev) => {
      const msg = JSON.parse(ev.data);
      if (msg.type === "auth_required") {
        ws.send(JSON.stringify({ type: "auth", access_token: cfg.token }));
      } else if (msg.type === "auth_ok") {
        ws.send(JSON.stringify({ id: ++wsSeq, type: "subscribe_events", event_type: "state_changed" }));
      } else if (msg.type === "event" && msg.event && msg.event.event_type === "state_changed") {
        const d = msg.event.data;
        if (d.new_state) states[d.entity_id] = d.new_state;
        else delete states[d.entity_id];
        emit();
      }
    };
    ws.onclose = () => {
      console.warn("HA WS closed — retrying in 5s");
      setTimeout(() => openWS(cfg), 5000);
    };
    ws.onerror = (e) => console.error("HA WS error", e);
  }

  async function init() {
    const cfg = ensureConfig();
    if (!cfg) return;
    try {
      await primeStates(cfg);
      openWS(cfg);
    } catch (e) {
      console.error("HA init failed", e);
      // Invalidate token on auth errors so next reload re-prompts
      if (String(e).includes("401")) localStorage.removeItem(LS_TOKEN);
    }
  }

  window.HA = {
    get ready() { return ready; },
    getState(entity_id) {
      const s = states[entity_id];
      return s ? s.state : null;
    },
    getAttr(entity_id, attr) {
      const s = states[entity_id];
      return s && s.attributes ? s.attributes[attr] : null;
    },
    getEntity(entity_id) {
      return states[entity_id] || null;
    },
    subscribe(fn) {
      subs.add(fn);
      if (ready) fn(states);
      return () => subs.delete(fn);
    },
    async callService(domain, service, data) {
      const cfg = { token: localStorage.getItem(LS_TOKEN), base: localStorage.getItem(LS_BASE) };
      return fetch(`${cfg.base}/api/services/${domain}/${service}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${cfg.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data || {}),
      });
    },
    resetAuth() {
      localStorage.removeItem(LS_TOKEN);
      localStorage.removeItem(LS_BASE);
      location.reload();
    },
  };

  init();
})();
