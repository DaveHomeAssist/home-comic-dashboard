/* ============================================
   WIDGETS — weather, calendar, lights, WAN, media, cameras, solar
   ============================================ */

const panelStyles = {
  weather: {
    display: "flex", flexDirection: "column",
    height: "100%",
  },
};

// -------- Small atoms --------
const PanelHeader = ({ title, icon, rightText }) => (
  <div style={{
    display: "flex", alignItems: "center", gap: 8,
    padding: "8px 12px",
    background: "var(--ink)", color: "var(--paper)",
    borderBottom: "2.5px solid var(--ink)",
    minWidth: 0,
  }}>
    {icon && <div style={{ flexShrink: 0 }}><Icon name={icon} size={18} stroke={2.5} /></div>}
    <div style={{
      fontFamily: "var(--font-display)", fontSize: 18, letterSpacing: "0.05em",
      whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
      flex: "0 1 auto", minWidth: 0,
    }}>
      {title}
    </div>
    {rightText && (
      <div style={{
        marginLeft: "auto", fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", opacity: 0.7,
        whiteSpace: "nowrap", flexShrink: 0,
      }}>
        {rightText}
      </div>
    )}
  </div>
);

const MiniStat = ({ label, value, color }) => (
  <div style={{
    padding: "6px 10px",
    border: "2px solid var(--ink)",
    borderRadius: 6,
    background: color || "var(--paper)",
    boxShadow: "2px 2px 0 var(--ink)",
    flex: 1,
    minWidth: 0,
  }}>
    <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.75 }}>{label}</div>
    <div style={{ fontFamily: "var(--font-serif)", fontWeight: 700, fontSize: 15, marginTop: 2 }}>{value}</div>
  </div>
);

// -------- WEATHER --------
function WeatherPanel() {
  const w = WEATHER;
  const isNight = w.conditionText.toLowerCase().includes("night");
  return (
    <div className="panel panel-lg" style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <PanelHeader title="Sun & Sky" icon={isNight ? "moon" : "sun"} rightText="OAKLYN" />
      <div style={{ padding: "12px 14px", display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
        {/* Hero */}
        <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
          <div style={{
            width: 74, height: 74, flexShrink: 0,
            background: "var(--pop-blue)",
            border: "2.5px solid var(--ink)",
            borderRadius: 10,
            boxShadow: "3px 3px 0 var(--ink)",
            display: "grid", placeItems: "center",
            color: "var(--paper)",
          }}>
            <Icon name={isNight ? "moon" : "sun"} size={44} stroke={2.8} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div className="eyebrow" style={{ marginBottom: 2 }}>Current</div>
            <div className="value-hero" style={{ fontSize: 28, lineHeight: 1, fontStyle: "italic", color: "var(--pop-red)" }}>{w.conditionText}</div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginTop: 6 }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 44, lineHeight: 1 }}>{w.tempF}<span style={{ fontSize: 20 }}>°F</span></div>
              <div style={{ fontSize: 11, fontFamily: "var(--font-body)", fontWeight: 600, opacity: 0.7 }}>
                feels {w.feelsF}° · {w.windMph} mph {w.windDir}
              </div>
            </div>
          </div>
        </div>

        {/* Forecast strip */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 6 }}>
          {w.forecast.map((d, i) => (
            <div key={d.day} style={{
              padding: "6px 4px",
              border: "2px solid var(--ink)",
              borderRadius: 6,
              background: i === 0 ? "var(--pop-yellow)" : "var(--paper)",
              boxShadow: "2px 2px 0 var(--ink)",
              textAlign: "center",
            }}>
              <div className="eyebrow" style={{ fontSize: 9 }}>{d.day}</div>
              <div style={{ margin: "4px auto", display: "grid", placeItems: "center" }}>
                <Icon name={d.icon} size={22} stroke={2.2} />
              </div>
              <div style={{ fontFamily: "var(--font-serif)", fontWeight: 700, fontSize: 14 }}>{d.hi}°</div>
              <div style={{ fontFamily: "var(--font-serif)", fontSize: 11, opacity: 0.6 }}>{d.lo}°</div>
            </div>
          ))}
        </div>

        {/* Sun/moon facts */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
          <MiniStat label="Sunrise" value={w.sunrise} />
          <MiniStat label="Sunset" value={w.sunset} />
          <MiniStat label="Precip" value={w.precip} />
          <MiniStat label="Wind" value={`${w.windMph} mph`} />
        </div>
      </div>
    </div>
  );
}

// -------- INTERNET / WAN --------
function InternetPanel() {
  const n = NET;
  return (
    <div className="panel panel-lg" style={{ display: "flex", flexDirection: "column" }}>
      <PanelHeader title="Internet" icon="wifi" rightText={`${n.devices} DEVICES`} />
      <div style={{ padding: "12px 14px", display: "flex", flexDirection: "column", gap: 10 }}>
        {/* WAN up */}
        <div style={{
          padding: "10px 12px",
          background: "var(--pop-green-bright)",
          border: "2.5px solid var(--ink)",
          borderRadius: 8,
          boxShadow: "3px 3px 0 var(--ink)",
          display: "flex", alignItems: "center", gap: 10,
        }}>
          <div style={{
            width: 14, height: 14, borderRadius: "50%",
            background: "var(--pop-green)",
            border: "2px solid var(--ink)",
            animation: "pulse 1.8s infinite",
          }} />
          <div style={{ flex: 1 }}>
            <div className="eyebrow">WAN Status</div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 20, lineHeight: 1 }}>
              CONNECTED
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.1em" }}>LATENCY</div>
            <div style={{ fontFamily: "var(--font-serif)", fontWeight: 700, fontSize: 18 }}>{n.latencyMs}ms</div>
          </div>
        </div>

        {/* Down/Up */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          <div style={{
            padding: 12,
            border: "2.5px solid var(--ink)", borderRadius: 8,
            background: "var(--pop-yellow)",
            boxShadow: "3px 3px 0 var(--ink)",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <Icon name="arrow_dn" size={16} stroke={2.5} />
              <div className="eyebrow">Download</div>
            </div>
            <div style={{ fontFamily: "var(--font-serif)", fontWeight: 700, fontSize: 22, marginTop: 4 }}>
              {n.downMbps} <span style={{ fontSize: 12, fontWeight: 500 }}>MB/s</span>
            </div>
          </div>
          <div style={{
            padding: 12,
            border: "2.5px solid var(--ink)", borderRadius: 8,
            background: "var(--pop-sky)",
            boxShadow: "3px 3px 0 var(--ink)",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <Icon name="arrow_up" size={16} stroke={2.5} />
              <div className="eyebrow">Upload</div>
            </div>
            <div style={{ fontFamily: "var(--font-serif)", fontWeight: 700, fontSize: 22, marginTop: 4 }}>
              {n.upMbps} <span style={{ fontSize: 12, fontWeight: 500 }}>MB/s</span>
            </div>
          </div>
        </div>

        {/* SSID */}
        <div style={{
          padding: "6px 10px",
          border: "2px solid var(--ink)",
          borderRadius: 6,
          background: "var(--paper)",
          display: "flex", justifyContent: "space-between",
          fontSize: 11, fontWeight: 700,
        }}>
          <span style={{ letterSpacing: "0.1em" }}>SSID</span>
          <span style={{ fontFamily: "var(--font-mono)" }}>{n.ssid}</span>
        </div>
      </div>
    </div>
  );
}

// -------- SYSTEM / BACKUPS --------
function SystemPanel() {
  const s = SYSTEM;
  return (
    <div className="panel" style={{ display: "flex", flexDirection: "column" }}>
      <PanelHeader title="System" icon="shield" />
      <div style={{ padding: "10px 12px", display: "flex", flexDirection: "column", gap: 8 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
          <div style={{
            padding: "8px 10px",
            border: "2px solid var(--ink)", borderRadius: 6,
            background: "var(--pop-lilac)",
            boxShadow: "2px 2px 0 var(--ink)",
            minWidth: 0,
          }}>
            <div className="eyebrow" style={{ fontSize: 9, whiteSpace: "nowrap" }}>Last Backup</div>
            <div style={{ fontFamily: "var(--font-serif)", fontWeight: 700, fontSize: 15, whiteSpace: "nowrap" }}>
              {s.lastBackupHoursAgo}h ago
            </div>
          </div>
          <div style={{
            padding: "8px 10px",
            border: "2px solid var(--ink)", borderRadius: 6,
            background: "var(--paper)",
            boxShadow: "2px 2px 0 var(--ink)",
          }}>
            <div className="eyebrow" style={{ fontSize: 9 }}>Backup State</div>
            <div style={{ fontFamily: "var(--font-serif)", fontWeight: 700, fontSize: 15 }}>{s.backupState}</div>
          </div>
        </div>
        <div style={{
          padding: "8px 10px",
          border: "2px solid var(--ink)", borderRadius: 6,
          background: "var(--paper)",
          boxShadow: "2px 2px 0 var(--ink)",
          display: "flex", alignItems: "center", gap: 6, minWidth: 0,
        }}>
          <div style={{ flexShrink: 0 }}><Icon name="calendar" size={14} stroke={2.2} /></div>
          <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: "0.1em", whiteSpace: "nowrap" }}>NEXT</div>
          <div style={{ marginLeft: "auto", fontFamily: "var(--font-serif)", fontWeight: 700, fontSize: 13, whiteSpace: "nowrap" }}>{s.nextScheduledIn}</div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
          <div style={{ padding: 6, border: "2px solid var(--ink)", borderRadius: 6, background: "var(--paper)" }}>
            <div className="eyebrow" style={{ fontSize: 9 }}>CPU</div>
            <BarGauge pct={s.cpu} color="var(--pop-green-bright)" />
            <div style={{ fontFamily: "var(--font-serif)", fontWeight: 700, fontSize: 13, marginTop: 2 }}>{s.cpu}%</div>
          </div>
          <div style={{ padding: 6, border: "2px solid var(--ink)", borderRadius: 6, background: "var(--paper)" }}>
            <div className="eyebrow" style={{ fontSize: 9 }}>Memory</div>
            <BarGauge pct={s.memory} color="var(--pop-yellow)" />
            <div style={{ fontFamily: "var(--font-serif)", fontWeight: 700, fontSize: 13, marginTop: 2 }}>{s.memory}%</div>
          </div>
        </div>
      </div>
    </div>
  );
}

const BarGauge = ({ pct, color }) => (
  <div style={{
    height: 10,
    border: "2px solid var(--ink)",
    borderRadius: 999,
    background: "var(--paper)",
    overflow: "hidden",
    marginTop: 4,
  }}>
    <div style={{
      width: `${pct}%`, height: "100%",
      background: color,
      borderRight: "2px solid var(--ink)",
      transition: "width 240ms ease",
    }} />
  </div>
);

// -------- CALENDAR --------
function CalendarPanel() {
  const c = CALENDAR;
  // April 2026: April 1 = Wednesday (weekday 3). 30 days.
  const startOffset = 3; // Sun=0
  const days = 30;
  const cells = [];
  // previous month trailing: Mar 29, 30, 31
  const prevTrail = [29, 30, 31];
  for (let i = 0; i < startOffset; i++) cells.push({ d: prevTrail[i], muted: true });
  for (let d = 1; d <= days; d++) cells.push({ d, muted: false });
  while (cells.length % 7 !== 0) cells.push({ d: cells.length - startOffset - days + 1, muted: true });

  const [view, setView] = React.useState("month");

  return (
    <div className="panel panel-lg" style={{ display: "flex", flexDirection: "column" }}>
      <PanelHeader title="Schedule" icon="calendar" />
      <div style={{ padding: "10px 14px", display: "flex", flexDirection: "column", gap: 8 }}>
        {/* Title */}
        <div>
          <div style={{
            fontFamily: "var(--font-serif)", fontStyle: "italic",
            fontWeight: 700, fontSize: 20, color: "var(--pop-red)",
          }}>{c.title}</div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 4 }}>
            <div style={{ fontFamily: "var(--font-serif)", fontWeight: 700, fontSize: 18 }}>{c.monthLabel}</div>
            <div style={{ display: "flex", gap: 4 }}>
              <button className="btn" style={{ padding: "4px 8px", fontSize: 12, boxShadow: "2px 2px 0 var(--ink)" }}><Icon name="chevL" size={14} stroke={2.5} /></button>
              <button className="btn" style={{ padding: "4px 8px", fontSize: 12, boxShadow: "2px 2px 0 var(--ink)" }}><Icon name="chevR" size={14} stroke={2.5} /></button>
            </div>
          </div>
        </div>

        {/* View switcher */}
        <div style={{ display: "flex", gap: 6 }}>
          <button className="btn yellow" style={{ flex: "0 0 auto", padding: "4px 10px", fontSize: 12, fontFamily: "var(--font-body)", fontWeight: 800, letterSpacing: "0.06em" }}>TODAY</button>
          <div style={{ flex: 1 }} />
          {["month","week","day"].map(v => (
            <button key={v}
              onClick={() => setView(v)}
              className="btn"
              style={{
                padding: "4px 10px", fontSize: 12,
                fontFamily: "var(--font-body)", fontWeight: 800, letterSpacing: "0.06em",
                background: view === v ? "var(--pop-blue)" : "var(--paper)",
                color: view === v ? "var(--paper)" : "var(--ink)",
              }}>
              {v.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Weekday headers */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 2 }}>
          {["SUN","MON","TUE","WED","THU","FRI","SAT"].map(d => (
            <div key={d} style={{ textAlign: "center", fontSize: 10, fontWeight: 800, letterSpacing: "0.1em", padding: 4, opacity: 0.6 }}>{d}</div>
          ))}
        </div>

        {/* Grid */}
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(7, 1fr)",
          gap: 3,
          background: "var(--ink)",
          padding: 3,
          borderRadius: 8,
          border: "2.5px solid var(--ink)",
          boxShadow: "3px 3px 0 var(--ink)",
        }}>
          {cells.map((cell, i) => {
            const ev = !cell.muted ? c.events[cell.d] : null;
            const isToday = !cell.muted && cell.d === c.today;
            return (
              <div key={i} style={{
                aspectRatio: "1",
                background: isToday ? "var(--pop-red)" : "var(--paper)",
                color: isToday ? "var(--paper)" : (cell.muted ? "rgba(26,20,16,0.3)" : "var(--ink)"),
                padding: 4,
                display: "flex",
                flexDirection: "column",
                position: "relative",
                borderRadius: 3,
                cursor: cell.muted ? "default" : "pointer",
              }}>
                <div style={{
                  fontFamily: "var(--font-serif)",
                  fontWeight: 700,
                  fontSize: 13,
                }}>{cell.d}</div>
                {ev && (
                  <div style={{
                    position: "absolute",
                    bottom: 4, left: 4,
                    width: 8, height: 8, borderRadius: "50%",
                    background: ev.dot,
                    border: "1.5px solid var(--ink)",
                  }} title={ev.label}/>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// -------- FAMILY PROFILES (header) --------
function FamilyStrip() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
      <div className="bubble" style={{ marginBottom: 2, fontSize: 14 }}>Winding down…</div>
      <div style={{ display: "flex", gap: 10 }}>
        {FAMILY.map(p => <Avatar key={p.id} person={p} size={74} />)}
      </div>
    </div>
  );
}

function Avatar({ person: p, size = 74, labelBelow }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
      <div style={{
        width: size, height: size,
        background: p.color,
        border: "2.5px solid var(--ink)",
        borderRadius: 10,
        boxShadow: "3px 3px 0 var(--ink)",
        position: "relative",
        overflow: "hidden",
        cursor: "pointer",
      }}>
        <ComicPortrait person={p} />
      </div>
      {labelBelow && (
        <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.1em" }}>{p.name.toUpperCase()}</div>
      )}
    </div>
  );
}

// Hand-drawn SVG comic portrait (silver age vibes)
function ComicPortrait({ person: p }) {
  // Variants based on id
  const skinColor = "#f2d3ae";
  const hairColors = { blonde: "#d9a84a", brown: "#6b3a1f", dark: "#2b1a0e" };
  const hair = hairColors[p.hair] || "#4a2e1a";
  return (
    <svg viewBox="0 0 100 100" style={{ width: "100%", height: "100%" }} preserveAspectRatio="xMidYMid slice">
      {/* bg halftone spots */}
      <defs>
        <pattern id={`dot-${p.id}`} x="0" y="0" width="5" height="5" patternUnits="userSpaceOnUse">
          <circle cx="2.5" cy="2.5" r="1" fill={p.accent} opacity="0.5"/>
        </pattern>
      </defs>
      <rect width="100" height="100" fill={`url(#dot-${p.id})`}/>

      {/* Mom - wavy hair, earrings */}
      {p.id === "mom" && (<>
        {/* shoulders */}
        <path d="M15 100 Q15 76 30 72 Q50 68 70 72 Q85 76 85 100 Z" fill="#7a2e26" stroke="#1a1410" strokeWidth="2.5"/>
        {/* neck */}
        <rect x="42" y="60" width="16" height="14" fill={skinColor} stroke="#1a1410" strokeWidth="2.5"/>
        {/* hair back */}
        <path d="M25 42 Q25 18 50 18 Q75 18 75 42 L78 68 Q72 62 65 62 L35 62 Q28 62 22 68 Z" fill={hair} stroke="#1a1410" strokeWidth="2.5"/>
        {/* face */}
        <ellipse cx="50" cy="46" rx="18" ry="22" fill={skinColor} stroke="#1a1410" strokeWidth="2.5"/>
        {/* hair front bangs */}
        <path d="M32 36 Q45 28 60 32 Q68 34 70 44 Q62 38 55 42 Q47 46 38 42 Q33 40 32 36 Z" fill={hair} stroke="#1a1410" strokeWidth="2"/>
        {/* eyes */}
        <ellipse cx="42" cy="46" rx="2.5" ry="3" fill="#1a1410"/>
        <ellipse cx="58" cy="46" rx="2.5" ry="3" fill="#1a1410"/>
        {/* lashes */}
        <path d="M38 42 L40 44 M44 42 L43 44 M54 42 L55 44 M60 42 L58 44" stroke="#1a1410" strokeWidth="1.5" strokeLinecap="round"/>
        {/* nose */}
        <path d="M50 48 Q49 54 52 56" stroke="#1a1410" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        {/* lips */}
        <path d="M44 60 Q50 63 56 60 Q54 58 50 58 Q46 58 44 60 Z" fill="#c8413a" stroke="#1a1410" strokeWidth="1.5"/>
      </>)}

      {/* Dad - short hair, tie */}
      {p.id === "dad" && (<>
        <path d="M15 100 Q15 74 40 70 L60 70 Q85 74 85 100 Z" fill="#2a5a8f" stroke="#1a1410" strokeWidth="2.5"/>
        {/* tie */}
        <path d="M46 70 L50 76 L54 70 L55 96 L45 96 Z" fill="#c8413a" stroke="#1a1410" strokeWidth="2"/>
        <rect x="42" y="60" width="16" height="14" fill={skinColor} stroke="#1a1410" strokeWidth="2.5"/>
        {/* face */}
        <ellipse cx="50" cy="46" rx="18" ry="22" fill={skinColor} stroke="#1a1410" strokeWidth="2.5"/>
        {/* hair */}
        <path d="M31 38 Q33 24 50 22 Q68 24 70 40 L66 36 Q62 32 55 34 Q48 36 42 34 Q36 32 33 36 Z" fill={hair} stroke="#1a1410" strokeWidth="2.5"/>
        {/* eyes */}
        <ellipse cx="42" cy="48" rx="2" ry="2.5" fill="#1a1410"/>
        <ellipse cx="58" cy="48" rx="2" ry="2.5" fill="#1a1410"/>
        {/* brows */}
        <path d="M38 42 L46 42 M54 42 L62 42" stroke="#1a1410" strokeWidth="2" strokeLinecap="round"/>
        {/* nose */}
        <path d="M50 50 Q48 55 52 57" stroke="#1a1410" strokeWidth="1.5" fill="none"/>
        {/* mouth */}
        <path d="M44 62 Q50 64 56 62" stroke="#1a1410" strokeWidth="2" fill="none" strokeLinecap="round"/>
        {/* jaw shadow */}
        <path d="M34 52 Q50 70 66 52" stroke="#1a1410" strokeWidth="1" fill="none" opacity="0.3"/>
      </>)}

      {/* Son - spiky hair */}
      {p.id === "son" && (<>
        <path d="M15 100 Q15 74 38 70 L62 70 Q85 74 85 100 Z" fill="#1a1410" stroke="#1a1410" strokeWidth="2.5"/>
        <path d="M30 78 L50 72 L70 78 L65 90 L35 90 Z" fill="#e8c542" stroke="#1a1410" strokeWidth="2"/>
        <rect x="42" y="60" width="16" height="14" fill={skinColor} stroke="#1a1410" strokeWidth="2.5"/>
        <ellipse cx="50" cy="46" rx="18" ry="22" fill={skinColor} stroke="#1a1410" strokeWidth="2.5"/>
        {/* hair spikes */}
        <path d="M30 36 L34 22 L40 34 L46 20 L52 34 L58 20 L64 34 L70 24 L72 38 Q62 32 50 34 Q38 36 30 36 Z" fill={hair} stroke="#1a1410" strokeWidth="2.5"/>
        <ellipse cx="42" cy="48" rx="2" ry="2.5" fill="#1a1410"/>
        <ellipse cx="58" cy="48" rx="2" ry="2.5" fill="#1a1410"/>
        <path d="M38 42 L44 42 M56 42 L62 42" stroke="#1a1410" strokeWidth="2" strokeLinecap="round"/>
        <path d="M50 50 Q48 55 52 57" stroke="#1a1410" strokeWidth="1.5" fill="none"/>
        <path d="M42 62 Q50 66 58 62" stroke="#1a1410" strokeWidth="2" fill="none" strokeLinecap="round"/>
      </>)}
    </svg>
  );
}

// -------- LIGHTS PANEL --------
function LightsPanel() {
  const [states, setStates] = React.useState(() => {
    const out = {};
    AREAS.forEach(a => {
      out[a.id] = { lightsOn: a.lightsOn, total: a.lights };
    });
    return out;
  });

  const toggleAll = (id) => {
    setStates(s => ({
      ...s,
      [id]: {
        ...s[id],
        lightsOn: s[id].lightsOn > 0 ? 0 : s[id].total,
      }
    }));
  };

  const totalOn = Object.values(states).reduce((a,b) => a + b.lightsOn, 0);
  const totalAll = Object.values(states).reduce((a,b) => a + b.total, 0);

  return (
    <div className="panel" style={{ display: "flex", flexDirection: "column" }}>
      <PanelHeader title="Lights" icon="lightbulb" rightText={`${totalOn} / ${totalAll} ON`} />
      <div style={{ padding: "10px 12px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
        {AREAS.map(a => {
          const s = states[a.id];
          const on = s.lightsOn > 0;
          return (
            <button key={a.id}
              onClick={() => toggleAll(a.id)}
              className="halftone-fill"
              style={{
                padding: "8px 10px",
                border: "2px solid var(--ink)",
                borderRadius: 6,
                background: on ? "var(--pop-yellow)" : "var(--paper)",
                boxShadow: on ? "3px 3px 0 var(--ink)" : "2px 2px 0 var(--ink)",
                display: "flex", alignItems: "center", gap: 8,
                cursor: "pointer",
                transition: "all 120ms",
                textAlign: "left",
                fontFamily: "var(--font-body)",
              }}>
              <div style={{
                width: 28, height: 28,
                borderRadius: 999,
                border: "2px solid var(--ink)",
                background: on ? "var(--paper)" : "rgba(26,20,16,0.1)",
                display: "grid", placeItems: "center",
                zIndex: 1, position: "relative",
              }}>
                <Icon name="lightbulb" size={16} stroke={2.2} />
              </div>
              <div style={{ zIndex: 1, position: "relative", flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.06em", textTransform: "uppercase" }}>{a.name}</div>
                <div style={{ fontFamily: "var(--font-serif)", fontWeight: 700, fontSize: 13, opacity: 0.75 }}>
                  {s.lightsOn}/{s.total}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// -------- MEDIA PANEL --------
function MediaPanel() {
  const [playing, setPlaying] = React.useState(MEDIA.playing);
  const [elapsed, setElapsed] = React.useState(MEDIA.elapsed);

  React.useEffect(() => {
    if (!playing) return;
    const t = setInterval(() => setElapsed(e => (e + 1) % MEDIA.duration), 1000);
    return () => clearInterval(t);
  }, [playing]);

  const pct = (elapsed / MEDIA.duration) * 100;
  const fmt = s => `${Math.floor(s/60)}:${String(s%60).padStart(2,'0')}`;

  return (
    <div className="panel" style={{ display: "flex", flexDirection: "column" }}>
      <PanelHeader title="Now Playing" icon="film" />
      <div style={{ padding: "12px", display: "flex", gap: 12, alignItems: "center" }}>
        {/* album art — comic-style */}
        <div className="halftone-fill" style={{
          width: 64, height: 64, flexShrink: 0,
          background: "var(--pop-red)",
          border: "2.5px solid var(--ink)",
          borderRadius: 6,
          boxShadow: "3px 3px 0 var(--ink)",
          display: "grid", placeItems: "center",
          position: "relative",
        }}>
          <div style={{
            fontFamily: "var(--font-display)", fontSize: 24,
            color: "var(--paper)",
            zIndex: 1,
            position: "relative",
          }}>BTR</div>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: "var(--font-serif)", fontWeight: 700, fontSize: 16, fontStyle: "italic", color: "var(--pop-red)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {MEDIA.track}
          </div>
          <div style={{ fontSize: 12, fontWeight: 600, opacity: 0.7 }}>{MEDIA.artist} · {MEDIA.album}</div>
          {/* progress */}
          <div style={{
            marginTop: 6,
            height: 8,
            border: "2px solid var(--ink)",
            borderRadius: 999,
            background: "var(--paper)",
            overflow: "hidden",
            position: "relative",
          }}>
            <div style={{
              width: `${pct}%`, height: "100%",
              background: "var(--pop-yellow)",
              borderRight: "2px solid var(--ink)",
              transition: "width 1s linear",
            }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, fontFamily: "var(--font-mono)", marginTop: 3, opacity: 0.7 }}>
            <span>{fmt(elapsed)}</span>
            <span>{fmt(MEDIA.duration)}</span>
          </div>
        </div>
        <button
          onClick={() => setPlaying(!playing)}
          style={{
            width: 44, height: 44, flexShrink: 0,
            border: "2.5px solid var(--ink)",
            borderRadius: "50%",
            background: playing ? "var(--pop-red)" : "var(--pop-green-bright)",
            color: "var(--paper)",
            cursor: "pointer",
            display: "grid", placeItems: "center",
            boxShadow: "3px 3px 0 var(--ink)",
            transition: "transform 80ms",
          }}
          onMouseDown={e => e.currentTarget.style.transform = "translate(2px,2px)"}
          onMouseUp={e => e.currentTarget.style.transform = ""}
          onMouseLeave={e => e.currentTarget.style.transform = ""}
        >
          <Icon name={playing ? "pause" : "play"} size={18} stroke={0} fill="currentColor" />
        </button>
      </div>
    </div>
  );
}

// -------- CAMERAS PANEL --------
function CamerasPanel() {
  return (
    <div className="panel" style={{ display: "flex", flexDirection: "column" }}>
      <PanelHeader title="Cameras" icon="cam" rightText="4 LIVE" />
      <div style={{ padding: 10, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        {CAMERAS.map(c => (
          <div key={c.id} className="halftone-fill" style={{
            aspectRatio: "16/10",
            border: "2.5px solid var(--ink)",
            borderRadius: 6,
            background: c.motion ? "var(--pop-red)" : "var(--pop-blue)",
            boxShadow: "2px 2px 0 var(--ink)",
            padding: 6,
            position: "relative",
            color: "var(--paper)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            cursor: "pointer",
          }}>
            <div style={{ zIndex: 1, position: "relative", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div style={{
                padding: "1px 6px",
                border: "1.5px solid var(--paper)",
                borderRadius: 999,
                fontSize: 8,
                fontWeight: 800,
                letterSpacing: "0.1em",
                background: c.motion ? "var(--ink)" : "transparent",
              }}>
                {c.motion ? "● LIVE" : "CLEAR"}
              </div>
              <Icon name="cam" size={14} stroke={2} />
            </div>
            <div style={{ zIndex: 1, position: "relative" }}>
              <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.06em", textTransform: "uppercase" }}>{c.name}</div>
              {c.lastEvent && <div style={{ fontSize: 9, opacity: 0.8, fontFamily: "var(--font-body)", fontWeight: 600 }}>{c.lastEvent}</div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// -------- SOLAR PANEL --------
function SolarPanel() {
  const s = SOLAR;
  return (
    <div className="panel" style={{ display: "flex", flexDirection: "column" }}>
      <PanelHeader title="Energy" icon="solar" rightText={`${s.dayTotalKwh} kWh today`} />
      <div style={{ padding: "10px 12px", display: "flex", flexDirection: "column", gap: 8 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6 }}>
          <div style={{ padding: "8px", border: "2px solid var(--ink)", borderRadius: 6, background: "var(--pop-yellow)", boxShadow: "2px 2px 0 var(--ink)", textAlign: "center" }}>
            <div className="eyebrow" style={{ fontSize: 9 }}>Producing</div>
            <div style={{ fontFamily: "var(--font-serif)", fontWeight: 700, fontSize: 17 }}>{s.producingKw}</div>
            <div style={{ fontSize: 9, opacity: 0.7, fontWeight: 700 }}>kW</div>
          </div>
          <div style={{ padding: "8px", border: "2px solid var(--ink)", borderRadius: 6, background: "var(--pop-peach)", boxShadow: "2px 2px 0 var(--ink)", textAlign: "center" }}>
            <div className="eyebrow" style={{ fontSize: 9 }}>Using</div>
            <div style={{ fontFamily: "var(--font-serif)", fontWeight: 700, fontSize: 17 }}>{s.usingKw}</div>
            <div style={{ fontSize: 9, opacity: 0.7, fontWeight: 700 }}>kW</div>
          </div>
          <div style={{ padding: "8px", border: "2px solid var(--ink)", borderRadius: 6, background: "var(--pop-green-bright)", boxShadow: "2px 2px 0 var(--ink)", textAlign: "center" }}>
            <div className="eyebrow" style={{ fontSize: 9 }}>Grid</div>
            <div style={{ fontFamily: "var(--font-serif)", fontWeight: 700, fontSize: 17 }}>{Math.abs(s.gridKw)}↑</div>
            <div style={{ fontSize: 9, opacity: 0.7, fontWeight: 700 }}>EXPORT</div>
          </div>
        </div>
        <div style={{
          padding: "6px 10px",
          border: "2px solid var(--ink)", borderRadius: 6,
          background: "var(--paper)",
          display: "flex", alignItems: "center", gap: 10,
        }}>
          <div className="eyebrow">Battery</div>
          <div style={{ flex: 1, height: 10, border: "2px solid var(--ink)", borderRadius: 999, overflow: "hidden" }}>
            <div style={{ width: `${s.batteryPct}%`, height: "100%", background: "var(--pop-green-bright)" }} />
          </div>
          <div style={{ fontFamily: "var(--font-serif)", fontWeight: 700, fontSize: 14 }}>{s.batteryPct}%</div>
        </div>
      </div>
    </div>
  );
}

// -------- AREAS GRID --------
function AreasGrid({ onOpen }) {
  return (
    <div className="panel panel-lg" style={{ display: "flex", flexDirection: "column" }}>
      <PanelHeader title="Areas" icon="areas" rightText={`${AREAS.length} ROOMS`} />
      <div style={{ padding: 10, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        {AREAS.map(a => (
          <button key={a.id}
            onClick={() => onOpen(a.id)}
            className="halftone-fill"
            style={{
              padding: "10px",
              border: "2.5px solid var(--ink)",
              borderRadius: 8,
              background: a.color,
              boxShadow: "3px 3px 0 var(--ink)",
              cursor: "pointer",
              textAlign: "left",
              display: "flex",
              gap: 10,
              alignItems: "center",
              fontFamily: "var(--font-body)",
              transition: "transform 120ms, box-shadow 120ms",
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translate(-2px,-2px)"; e.currentTarget.style.boxShadow = "5px 5px 0 var(--ink)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "3px 3px 0 var(--ink)"; }}
          >
            <div style={{
              width: 48, height: 48,
              background: "var(--paper)",
              border: "2.5px solid var(--ink)",
              borderRadius: 6,
              display: "grid", placeItems: "center",
              flexShrink: 0,
              zIndex: 1,
              position: "relative",
              color: "var(--ink)",
            }}>
              <Icon name={a.icon} size={28} stroke={2.5} />
            </div>
            <div style={{ zIndex: 1, position: "relative", flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 18, letterSpacing: "0.04em", lineHeight: 1 }}>{a.name}</div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, alignItems: "center" }}>
                <span style={{ fontFamily: "var(--font-serif)", fontWeight: 700, fontSize: 13 }}>{a.temp}°F</span>
                <span style={{ fontSize: 10, fontWeight: 700, opacity: 0.7 }}>·</span>
                <span style={{ fontSize: 11, fontWeight: 700 }}>
                  <Icon name="lightbulb" size={11} stroke={2} style={{ display: "inline", verticalAlign: "-2px", marginRight: 2 }}/>
                  {a.lightsOn}/{a.lights}
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// Exports
Object.assign(window, {
  PanelHeader, MiniStat, BarGauge,
  WeatherPanel, InternetPanel, SystemPanel, CalendarPanel,
  FamilyStrip, Avatar, ComicPortrait,
  LightsPanel, MediaPanel, CamerasPanel, SolarPanel,
  AreasGrid,
});
