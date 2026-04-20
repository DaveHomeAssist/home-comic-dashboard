/* ============================================
   TWEAKS PANEL + edit-mode integration
   ============================================ */

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "layout": "reference",
  "bg": "on",
  "bgRoom": "living",
  "mode": "day",
  "comicIntensity": "balanced",
  "halftone": "on"
}/*EDITMODE-END*/;

function TweaksPanel({ tweaks, setTweaks, visible }) {
  if (!visible) return null;
  const set = (k, v) => {
    const next = { ...tweaks, [k]: v };
    setTweaks(next);
    window.parent.postMessage({ type: '__edit_mode_set_keys', edits: { [k]: v } }, '*');
  };

  const Section = ({ title, children }) => (
    <div style={{ marginBottom: 12 }}>
      <div className="eyebrow" style={{ marginBottom: 6 }}>{title}</div>
      <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>{children}</div>
    </div>
  );

  const Opt = ({ active, onClick, children }) => (
    <button onClick={onClick} style={{
      padding: "5px 10px",
      border: "2px solid var(--ink)",
      borderRadius: 6,
      background: active ? "var(--pop-red)" : "var(--paper)",
      color: active ? "var(--paper)" : "var(--ink)",
      boxShadow: active ? "2px 2px 0 var(--ink)" : "1px 1px 0 var(--ink)",
      fontFamily: "var(--font-body)",
      fontSize: 11,
      fontWeight: 800,
      letterSpacing: "0.05em",
      textTransform: "uppercase",
      cursor: "pointer",
    }}>{children}</button>
  );

  return (
    <div style={{
      position: "fixed",
      right: 16, bottom: 16,
      zIndex: 100,
      width: 280,
      background: "var(--paper)",
      border: "3px solid var(--ink)",
      borderRadius: 12,
      boxShadow: "6px 6px 0 var(--ink)",
      overflow: "hidden",
      fontFamily: "var(--font-body)",
    }}>
      <div style={{
        background: "var(--ink)", color: "var(--paper)",
        padding: "8px 12px",
        display: "flex", alignItems: "center", gap: 8,
      }}>
        <Icon name="sparkle" size={16} stroke={0} fill="var(--pop-yellow)"/>
        <div style={{ fontFamily: "var(--font-display)", fontSize: 20, letterSpacing: "0.06em" }}>TWEAKS</div>
      </div>
      <div style={{ padding: "10px 12px 6px" }}>
        <Section title="Layout">
          <Opt active={tweaks.layout === "reference"} onClick={() => set("layout","reference")}>Reference</Opt>
          <Opt active={tweaks.layout === "remix"} onClick={() => set("layout","remix")}>Remix</Opt>
        </Section>
        <Section title="Background">
          <Opt active={tweaks.bg === "on"} onClick={() => set("bg","on")}>Illustration</Opt>
          <Opt active={tweaks.bg === "off"} onClick={() => set("bg","off")}>Paper</Opt>
        </Section>
        {tweaks.bg === "on" && (
          <Section title="Room backdrop">
            {[
              ["living","Living"],
              ["kitchen","Kitchen"],
              ["front","Front"],
              ["garage","Garage"],
              ["garden","Garden"],
            ].map(([k, label]) => (
              <Opt key={k} active={tweaks.bgRoom === k} onClick={() => set("bgRoom", k)}>{label}</Opt>
            ))}
          </Section>
        )}
        <Section title="Mode">
          <Opt active={tweaks.mode === "day"}   onClick={() => set("mode","day")}>Day</Opt>
          <Opt active={tweaks.mode === "night"} onClick={() => set("mode","night")}>Night</Opt>
        </Section>
        <Section title="Comic intensity">
          <Opt active={tweaks.comicIntensity === "subtle"}   onClick={() => set("comicIntensity","subtle")}>Subtle</Opt>
          <Opt active={tweaks.comicIntensity === "balanced"} onClick={() => set("comicIntensity","balanced")}>Balanced</Opt>
          <Opt active={tweaks.comicIntensity === "max"}      onClick={() => set("comicIntensity","max")}>Pulp!</Opt>
        </Section>
      </div>
    </div>
  );
}

Object.assign(window, { TWEAK_DEFAULTS, TweaksPanel });
