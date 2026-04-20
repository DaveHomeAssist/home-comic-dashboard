/* ============================================
   DASHBOARD — top-level layout
   ============================================ */

function Sidebar({ active, setActive }) {
  const items = [
    { id: "home",   icon: "home" },
    { id: "areas",  icon: "areas" },
    { id: "energy", icon: "bolt" },
    { id: "list",   icon: "list" },
    { id: "chart",  icon: "chart" },
    { id: "cal",    icon: "calendar" },
    { id: "map",    icon: "house" },
    { id: "media",  icon: "film" },
    { id: "book",   icon: "book" },
  ];
  return (
    <div className="sidebar">
      <div style={{
        fontFamily: "var(--font-display)",
        fontSize: 14,
        background: "var(--pop-red)",
        color: "var(--paper)",
        padding: 6,
        border: "2px solid var(--ink)",
        borderRadius: 6,
        lineHeight: 1,
        boxShadow: "2px 2px 0 var(--ink)",
        marginBottom: 6,
      }}>☰</div>
      {items.map(it => (
        <button key={it.id}
          className={"icon-btn" + (active === it.id ? " active" : "")}
          onClick={() => setActive(it.id)}>
          <Icon name={it.icon} size={20} stroke={2.5}/>
        </button>
      ))}
      <div className="badge" style={{ marginTop: "auto", fontSize: 12 }}>
        <Icon name="settings" size={18} stroke={2.2}/>
      </div>
      <div className="badge" style={{ marginTop: 6 }}>
        <Icon name="bell" size={18} stroke={2.2}/>
      </div>
    </div>
  );
}

function Topbar({ layout, setLayout }) {
  return (
    <div className="topbar">
      <div className="brand" style={{ whiteSpace: "nowrap", flexShrink: 0 }}>OUR <em>HOME</em></div>
      <div style={{ display: "flex", gap: 6, marginLeft: 8, flexWrap: "wrap" }}>
        <div className="nav-pill active"><Icon name="home" size={14} stroke={2.5}/> Overview</div>
        <div className="nav-pill"><Icon name="areas" size={14} stroke={2.5}/> Areas</div>
        <div className="nav-pill"><Icon name="bolt" size={14} stroke={2.5}/> Energy</div>
        <div className="nav-pill"><Icon name="calendar" size={14} stroke={2.5}/> Schedule</div>
        <div className="nav-pill"><Icon name="shield" size={14} stroke={2.5}/> Secure</div>
      </div>
      <div style={{ marginLeft: "auto", display: "flex", gap: 6, alignItems: "center" }}>
        <button className="btn" style={{ padding: "4px 10px", fontSize: 13 }}>
          <Icon name="plus" size={14} stroke={2.8}/>
        </button>
        <button className="btn" style={{ padding: "4px 10px", fontSize: 13 }}>
          <Icon name="search" size={14} stroke={2.5}/>
        </button>
        <button className="btn" style={{ padding: "4px 10px", fontSize: 13 }}>
          <Icon name="bubble" size={14} stroke={2.5}/>
        </button>
        <button className="btn red" style={{ padding: "4px 10px", fontSize: 13 }}>
          <Icon name="edit" size={14} stroke={2.8}/>
        </button>
      </div>
    </div>
  );
}

function Dashboard({ layout, bg, onOpenRoom }) {
  // Reference layout: 3 columns. Left = weather + calendar, Middle = family + hub (internet/system/media/solar), Right = areas
  // Remix layout: clean 12-col grid with rhythmic variety
  if (layout === "remix") {
    return (
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(12, 1fr)",
        gridAutoRows: "min-content",
        gap: 14,
        maxWidth: 1400,
        margin: "0 auto",
        position: "relative",
        zIndex: 2,
      }}>
        <div style={{ gridColumn: "span 12", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div className="eyebrow">Tonight at the Home of</div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 46, letterSpacing: "0.03em", lineHeight: 1 }}>
              <span style={{ color: "var(--pop-red)", fontStyle: "italic" }}>Linda, Bob</span> & Kevin
            </div>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            {FAMILY.map(p => <Avatar key={p.id} person={p} size={60} labelBelow />)}
          </div>
        </div>

        <div style={{ gridColumn: "span 5" }}><WeatherPanel/></div>
        <div style={{ gridColumn: "span 4" }}><InternetPanel/></div>
        <div style={{ gridColumn: "span 3" }}><SystemPanel/></div>

        <div style={{ gridColumn: "span 7" }}><AreasGrid onOpen={onOpenRoom}/></div>
        <div style={{ gridColumn: "span 5", display: "flex", flexDirection: "column", gap: 14 }}>
          <MediaPanel/>
          <SolarPanel/>
          <LightsPanel/>
        </div>

        <div style={{ gridColumn: "span 8" }}><CalendarPanel/></div>
        <div style={{ gridColumn: "span 4" }}><CamerasPanel/></div>
      </div>
    );
  }

  // Reference-match layout: 3 cols
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "1fr 1.1fr 1fr",
      gap: 14,
      position: "relative",
      zIndex: 2,
    }}>
      {/* LEFT COLUMN */}
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <WeatherPanel/>
        <CalendarPanel/>
      </div>

      {/* MIDDLE COLUMN */}
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <div style={{ display: "grid", placeItems: "center", padding: "4px 0 8px" }}>
          <FamilyStrip/>
        </div>
        <InternetPanel/>
        <SystemPanel/>
        <MediaPanel/>
      </div>

      {/* RIGHT COLUMN */}
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <AreasGrid onOpen={onOpenRoom}/>
        <SolarPanel/>
        <CamerasPanel/>
      </div>
    </div>
  );
}

Object.assign(window, { Sidebar, Topbar, Dashboard });
