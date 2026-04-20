/* ============================================
   ROOMS — detail modal
   ============================================ */

function RoomModal({ roomId, onClose }) {
  const area = AREAS.find(a => a.id === roomId);
  const detail = ROOM_DETAILS[roomId];
  const [lights, setLights] = React.useState(detail.lights);

  if (!area || !detail) return null;

  const toggleLight = (id) => {
    setLights(ls => ls.map(l => l.id === id
      ? { ...l, on: !l.on, brightness: l.on ? 0 : (l.brightness || 80) }
      : l));
  };
  const setBrightness = (id, b) => {
    setLights(ls => ls.map(l => l.id === id ? { ...l, brightness: b, on: b > 0 } : l));
  };

  return (
    <div className="modal-scrim" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-head">
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{
              width: 44, height: 44,
              background: area.color,
              border: "2.5px solid var(--paper)",
              borderRadius: 8,
              display: "grid", placeItems: "center",
              color: "var(--ink)",
            }}>
              <Icon name={area.icon} size={26} stroke={2.5} />
            </div>
            <div>
              <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.14em", opacity: 0.7 }}>AREA</div>
              <div className="title">{area.name.toUpperCase()}</div>
            </div>
          </div>
          <button className="close" onClick={onClose}><Icon name="x" size={16} stroke={3}/></button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", flex: 1, minHeight: 0 }}>
          {/* LEFT: illustration */}
          <div style={{
            position: "relative",
            background: `url(${detail.bg}) center/cover`,
            borderRight: "3px solid var(--ink)",
            minHeight: 420,
          }}>
            <div style={{
              position: "absolute", inset: 0,
              background: "radial-gradient(ellipse at 50% 80%, transparent 40%, rgba(26,20,16,0.4))",
            }}/>
            {/* halftone overlay */}
            <div style={{
              position: "absolute", inset: 0,
              backgroundImage: "radial-gradient(circle, rgba(26,20,16,0.35) 20%, transparent 22%)",
              backgroundSize: "5px 5px",
              opacity: 0.22, mixBlendMode: "multiply",
            }}/>
            {/* Speech bubble */}
            <div style={{ position: "absolute", top: 18, left: 18, maxWidth: "70%" }}>
              <div className="bubble" style={{ fontSize: 16 }}>{detail.blurb}</div>
            </div>
            {/* Occupants */}
            {detail.occupants.length > 0 && (
              <div style={{ position: "absolute", bottom: 14, left: 14, display: "flex", gap: 8, alignItems: "flex-end" }}>
                <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.1em", color: "var(--paper)", background: "var(--ink)", padding: "3px 8px", borderRadius: 999 }}>
                  HERE NOW
                </div>
                {detail.occupants.map(oid => {
                  const p = FAMILY.find(f => f.id === oid);
                  return p ? <Avatar key={oid} person={p} size={48} /> : null;
                })}
              </div>
            )}
            {/* Temp kapow */}
            <div style={{ position: "absolute", top: 14, right: 14 }}>
              <div className="kapow" style={{ fontSize: 18 }}>{area.temp}°F</div>
            </div>
          </div>

          {/* RIGHT: controls */}
          <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 14, overflowY: "auto" }}>
            {/* Sensors */}
            <div>
              <div className="eyebrow" style={{ marginBottom: 6 }}>Sensors</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
                {detail.sensors.map(s => (
                  <div key={s.label} style={{
                    padding: "8px 10px",
                    border: "2px solid var(--ink)", borderRadius: 6,
                    background: "var(--paper)",
                    boxShadow: "2px 2px 0 var(--ink)",
                  }}>
                    <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.7 }}>{s.label}</div>
                    <div style={{ fontFamily: "var(--font-serif)", fontWeight: 700, fontSize: 16 }}>{s.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Lights */}
            <div>
              <div className="eyebrow" style={{ marginBottom: 6 }}>Lights</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {lights.map(l => (
                  <div key={l.id} style={{
                    padding: "8px 10px",
                    border: "2px solid var(--ink)", borderRadius: 6,
                    background: l.on ? "var(--pop-yellow)" : "var(--paper)",
                    boxShadow: "2px 2px 0 var(--ink)",
                    display: "flex", alignItems: "center", gap: 10,
                  }}>
                    <button onClick={() => toggleLight(l.id)} style={{
                      width: 34, height: 34, flexShrink: 0,
                      border: "2px solid var(--ink)", borderRadius: "50%",
                      background: l.on ? "var(--paper)" : "rgba(26,20,16,0.1)",
                      cursor: "pointer",
                      display: "grid", placeItems: "center",
                      color: "var(--ink)",
                    }}>
                      <Icon name="lightbulb" size={18} stroke={2.2} />
                    </button>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: "0.04em" }}>{l.name}</div>
                      <input type="range" min="0" max="100" value={l.brightness}
                        onChange={e => setBrightness(l.id, parseInt(e.target.value))}
                        style={{ width: "100%", accentColor: "var(--pop-red)" }} />
                    </div>
                    <div style={{
                      fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 700,
                      minWidth: 34, textAlign: "right",
                    }}>{l.brightness}%</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Appliances */}
            {detail.appliances && (
              <div>
                <div className="eyebrow" style={{ marginBottom: 6 }}>Devices</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {detail.appliances.map(a => (
                    <div key={a.name} style={{
                      padding: "8px 10px",
                      border: "2px solid var(--ink)", borderRadius: 6,
                      background: "var(--pop-sky)",
                      boxShadow: "2px 2px 0 var(--ink)",
                      display: "flex", justifyContent: "space-between", alignItems: "center",
                    }}>
                      <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: "0.04em" }}>{a.name}</div>
                      <div style={{ fontFamily: "var(--font-serif)", fontWeight: 700, fontSize: 13 }}>{a.status}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { RoomModal });
