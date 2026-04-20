/* ============================================
   APP — root, tweaks + edit mode + state
   ============================================ */

const BG_MAP = {
  living:  "assets/room-livingroom.png",
  kitchen: "assets/room-kitchen.jpg",
  front:   "assets/room-frontroom.jpg",
  garage:  "assets/room-garage.jpg",
  garden:  "assets/room-garden.png",
};

function App() {
  const [tweaks, setTweaks] = React.useState(TWEAK_DEFAULTS);
  const [editModeVisible, setEditModeVisible] = React.useState(false);
  const [openRoom, setOpenRoom] = React.useState(null);
  const [activeNav, setActiveNav] = React.useState("home");
  const [, forceTick] = React.useReducer(x => x + 1, 0);

  // Expose re-render hook for data-live.jsx
  React.useEffect(() => {
    window.__rerender = forceTick;
    return () => { delete window.__rerender; };
  }, []);

  // Edit mode protocol
  React.useEffect(() => {
    const handler = (e) => {
      if (!e.data || typeof e.data !== "object") return;
      if (e.data.type === "__activate_edit_mode")   setEditModeVisible(true);
      if (e.data.type === "__deactivate_edit_mode") setEditModeVisible(false);
    };
    window.addEventListener("message", handler);
    // Announce AFTER listener is wired
    window.parent.postMessage({ type: "__edit_mode_available" }, "*");
    return () => window.removeEventListener("message", handler);
  }, []);

  // Apply mode attr
  React.useEffect(() => {
    document.documentElement.dataset.mode = tweaks.mode;
    document.documentElement.dataset.bg = tweaks.bg;
    document.documentElement.dataset.intensity = tweaks.comicIntensity;
  }, [tweaks.mode, tweaks.bg, tweaks.comicIntensity]);

  // Apply halftone visibility by intensity
  const halftoneOpacity = {
    subtle: 0.08,
    balanced: 0.22,
    max: 0.45,
  }[tweaks.comicIntensity] || 0.22;

  React.useEffect(() => {
    const el = document.querySelector(".halftone-bg");
    if (el) el.style.opacity = halftoneOpacity;
  }, [halftoneOpacity]);

  return (
    <div style={{
      display: "flex",
      minHeight: "100vh",
      position: "relative",
      zIndex: 1,
    }}>
      <Sidebar active={activeNav} setActive={setActiveNav} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <Topbar layout={tweaks.layout} setLayout={v => setTweaks(t => ({ ...t, layout: v }))}/>
        <div className="stage" data-bg={tweaks.bg}>
          {tweaks.bg === "on" && (
            <div className="stage-bg" style={{
              backgroundImage: `url(${BG_MAP[tweaks.bgRoom] || BG_MAP.living})`,
              filter: tweaks.comicIntensity === "max"
                ? "saturate(1.2) contrast(1.1)"
                : tweaks.comicIntensity === "subtle"
                  ? "saturate(0.7) brightness(1.06)"
                  : "none",
            }}/>
          )}
          <Dashboard
            layout={tweaks.layout}
            bg={tweaks.bg}
            onOpenRoom={setOpenRoom}
          />
        </div>
      </div>

      {openRoom && <RoomModal roomId={openRoom} onClose={() => setOpenRoom(null)}/>}
      <TweaksPanel tweaks={tweaks} setTweaks={setTweaks} visible={editModeVisible}/>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App/>);
