/* ============================================
   Comic-style inline SVG icons
   Thick black strokes, optional fill, hand-drawn feel
   ============================================ */

const Ic = ({ children, size = 24, stroke = 2.5, fill = "none", ...rest }) => (
  <svg
    width={size} height={size}
    viewBox="0 0 32 32"
    fill={fill}
    stroke="currentColor"
    strokeWidth={stroke}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ display: "block" }}
    {...rest}
  >
    {children}
  </svg>
);

const ICONS = {
  home:    (p) => <Ic {...p}><path d="M5 15 L16 5 L27 15"/><path d="M7 14 V26 H25 V14"/><path d="M14 26 V19 H18 V26"/></Ic>,
  grid:    (p) => <Ic {...p}><rect x="5" y="5" width="9" height="9"/><rect x="18" y="5" width="9" height="9"/><rect x="5" y="18" width="9" height="9"/><rect x="18" y="18" width="9" height="9"/></Ic>,
  bolt:    (p) => <Ic {...p}><path d="M17 4 L8 17 H15 L14 28 L24 14 H17 L17 4 Z" fill="currentColor"/></Ic>,
  list:    (p) => <Ic {...p}><line x1="7" y1="9" x2="25" y2="9"/><line x1="7" y1="16" x2="25" y2="16"/><line x1="7" y1="23" x2="25" y2="23"/></Ic>,
  chart:   (p) => <Ic {...p}><path d="M5 26 V10"/><path d="M5 26 H27"/><rect x="9" y="18" width="3" height="8"/><rect x="15" y="14" width="3" height="12"/><rect x="21" y="10" width="3" height="16"/></Ic>,
  calendar:(p) => <Ic {...p}><rect x="5" y="7" width="22" height="20" rx="1.5"/><line x1="5" y1="13" x2="27" y2="13"/><line x1="11" y1="4" x2="11" y2="10"/><line x1="21" y1="4" x2="21" y2="10"/></Ic>,
  house:   (p) => <Ic {...p}><path d="M5 16 L16 6 L27 16 V26 H5 Z"/><path d="M12 26 V18 H20 V26"/></Ic>,
  areas:   (p) => <Ic {...p}><rect x="5" y="5" width="10" height="10"/><rect x="17" y="5" width="10" height="10"/><rect x="5" y="17" width="10" height="10"/><rect x="17" y="17" width="10" height="10"/></Ic>,
  film:    (p) => <Ic {...p}><rect x="5" y="7" width="22" height="18" rx="1"/><circle cx="10" cy="11" r="1.2" fill="currentColor"/><circle cx="22" cy="11" r="1.2" fill="currentColor"/><circle cx="10" cy="21" r="1.2" fill="currentColor"/><circle cx="22" cy="21" r="1.2" fill="currentColor"/></Ic>,
  book:    (p) => <Ic {...p}><path d="M6 7 Q6 6 7 6 H14 Q16 6 16 9 V26 Q16 24 14 24 H7 Q6 24 6 25 Z"/><path d="M26 7 Q26 6 25 6 H18 Q16 6 16 9 V26 Q16 24 18 24 H25 Q26 24 26 25 Z"/></Ic>,
  settings:(p) => <Ic {...p}><circle cx="16" cy="16" r="4"/><path d="M16 4 V8 M16 24 V28 M4 16 H8 M24 16 H28 M7.5 7.5 L10.3 10.3 M21.7 21.7 L24.5 24.5 M7.5 24.5 L10.3 21.7 M21.7 10.3 L24.5 7.5"/></Ic>,
  bell:    (p) => <Ic {...p}><path d="M9 20 Q9 11 16 11 Q23 11 23 20 L25 23 H7 Z"/><path d="M13 26 Q13 28 16 28 Q19 28 19 26"/></Ic>,
  plus:    (p) => <Ic {...p}><line x1="16" y1="6" x2="16" y2="26"/><line x1="6" y1="16" x2="26" y2="16"/></Ic>,
  search:  (p) => <Ic {...p}><circle cx="14" cy="14" r="8"/><line x1="20" y1="20" x2="27" y2="27"/></Ic>,
  bubble:  (p) => <Ic {...p}><path d="M5 9 Q5 6 8 6 H24 Q27 6 27 9 V19 Q27 22 24 22 H14 L9 27 V22 H8 Q5 22 5 19 Z"/></Ic>,
  edit:    (p) => <Ic {...p}><path d="M6 26 H11 L26 11 L21 6 L6 21 Z"/><line x1="19" y1="8" x2="24" y2="13"/></Ic>,
  x:       (p) => <Ic {...p}><line x1="8" y1="8" x2="24" y2="24"/><line x1="24" y1="8" x2="8" y2="24"/></Ic>,
  chevL:   (p) => <Ic {...p}><polyline points="20 6 10 16 20 26"/></Ic>,
  chevR:   (p) => <Ic {...p}><polyline points="12 6 22 16 12 26"/></Ic>,

  // weather
  sun:     (p) => <Ic {...p}><circle cx="16" cy="16" r="5" fill="var(--pop-yellow)"/><path d="M16 5 V8 M16 24 V27 M5 16 H8 M24 16 H27 M8.3 8.3 L10.5 10.5 M21.5 21.5 L23.7 23.7 M8.3 23.7 L10.5 21.5 M21.5 10.5 L23.7 8.3"/></Ic>,
  moon:    (p) => <Ic {...p}><path d="M22 20 Q14 21 12 12 Q11 8 14 5 Q8 7 7 15 Q7 24 16 25 Q22 25 24 20 Z" fill="var(--pop-yellow)"/></Ic>,
  cloud:   (p) => <Ic {...p}><path d="M9 22 Q4 22 4 17 Q4 13 9 13 Q10 8 16 8 Q22 8 22 14 Q27 14 27 18 Q27 22 23 22 Z" fill="var(--pop-sky)"/></Ic>,
  partly:  (p) => <Ic {...p}><circle cx="11" cy="12" r="4" fill="var(--pop-yellow)"/><path d="M11 4 V6 M11 18 V20 M3 12 H5 M17 12 H19"/><path d="M13 24 Q9 24 9 20 Q9 17 13 17 Q14 14 18 14 Q23 14 23 18 Q27 18 27 21 Q27 24 24 24 Z" fill="var(--pop-sky)"/></Ic>,
  rain:    (p) => <Ic {...p}><path d="M9 18 Q4 18 4 14 Q4 10 9 10 Q10 6 16 6 Q22 6 22 12 Q27 12 27 15 Q27 18 23 18 Z" fill="var(--pop-sky)"/><line x1="10" y1="22" x2="8" y2="27"/><line x1="16" y1="22" x2="14" y2="27"/><line x1="22" y1="22" x2="20" y2="27"/></Ic>,
  wind:    (p) => <Ic {...p}><path d="M4 12 H20 Q23 12 23 9 Q23 6 20 6"/><path d="M4 18 H24"/><path d="M4 24 H18 Q22 24 22 21"/></Ic>,

  // areas
  armchair:(p) => <Ic {...p}><path d="M7 16 Q7 11 11 11 H21 Q25 11 25 16 V22 H7 Z" fill="var(--pop-peach)"/><path d="M5 20 Q5 15 9 15 V22 H5 Z" fill="var(--pop-peach)"/><path d="M27 20 Q27 15 23 15 V22 H27 Z" fill="var(--pop-peach)"/><line x1="7" y1="26" x2="25" y2="26"/><line x1="9" y1="22" x2="9" y2="27"/><line x1="23" y1="22" x2="23" y2="27"/></Ic>,
  fridge:  (p) => <Ic {...p}><rect x="8" y="4" width="16" height="24" rx="1" fill="var(--pop-sky)"/><line x1="8" y1="13" x2="24" y2="13"/><line x1="11" y1="8" x2="11" y2="11"/><line x1="11" y1="16" x2="11" y2="20"/></Ic>,
  door:    (p) => <Ic {...p}><rect x="8" y="4" width="16" height="24" fill="var(--pop-tan)"/><circle cx="20" cy="17" r="1.2" fill="currentColor"/></Ic>,
  garage:  (p) => <Ic {...p}><path d="M4 14 L16 6 L28 14"/><rect x="6" y="14" width="20" height="14" fill="var(--pop-tan)"/><line x1="6" y1="18" x2="26" y2="18"/><line x1="6" y1="22" x2="26" y2="22"/></Ic>,
  plant:   (p) => <Ic {...p}><path d="M11 26 H21 V20 H11 Z" fill="var(--pop-tan)"/><path d="M16 20 Q16 14 20 11 Q22 15 19 18" fill="var(--pop-green)"/><path d="M16 20 Q16 14 12 11 Q10 15 13 18" fill="var(--pop-green)"/><path d="M16 20 Q16 15 16 10"/></Ic>,
  bed:     (p) => <Ic {...p}><path d="M4 22 H28 V26 H4 Z"/><path d="M4 22 V16 Q4 14 6 14 H22 Q24 14 24 16 V22"/><circle cx="10" cy="18" r="2" fill="currentColor"/></Ic>,
  compass: (p) => <Ic {...p}><circle cx="16" cy="16" r="11"/><polygon points="16 7 19 16 16 25 13 16" fill="var(--pop-red)"/></Ic>,

  // utility
  lightbulb: (p) => <Ic {...p}><path d="M10 14 Q10 8 16 8 Q22 8 22 14 Q22 18 18 20 V23 H14 V20 Q10 18 10 14 Z" fill="var(--pop-yellow)"/><line x1="14" y1="26" x2="18" y2="26"/></Ic>,
  wifi:      (p) => <Ic {...p}><path d="M4 13 Q16 3 28 13"/><path d="M8 18 Q16 11 24 18"/><path d="M12 23 Q16 19 20 23"/><circle cx="16" cy="26" r="1.3" fill="currentColor"/></Ic>,
  shield:    (p) => <Ic {...p}><path d="M16 4 L26 8 V17 Q26 24 16 28 Q6 24 6 17 V8 Z"/><polyline points="11 16 15 19 22 12"/></Ic>,
  cam:       (p) => <Ic {...p}><rect x="4" y="10" width="18" height="14" rx="1.5" fill="var(--pop-sky)"/><path d="M22 14 L28 11 V23 L22 20"/><circle cx="13" cy="17" r="3" fill="var(--paper)"/><circle cx="13" cy="17" r="1.2" fill="currentColor"/></Ic>,
  play:      (p) => <Ic {...p}><polygon points="10 6 24 16 10 26" fill="currentColor"/></Ic>,
  pause:     (p) => <Ic {...p}><rect x="9"  y="6" width="4" height="20" fill="currentColor"/><rect x="19" y="6" width="4" height="20" fill="currentColor"/></Ic>,
  skip:      (p) => <Ic {...p}><polygon points="8 6 20 16 8 26" fill="currentColor"/><rect x="22" y="6" width="3" height="20" fill="currentColor"/></Ic>,
  backup:    (p) => <Ic {...p}><ellipse cx="16" cy="9" rx="10" ry="3" fill="var(--pop-lilac)"/><path d="M6 9 V22 Q6 25 16 25 Q26 25 26 22 V9"/><path d="M6 15 Q6 18 16 18 Q26 18 26 15"/></Ic>,
  solar:     (p) => <Ic {...p}><rect x="5" y="8" width="22" height="14" fill="var(--pop-blue)" transform="skewX(-10)"/><line x1="12" y1="8" x2="10" y2="22"/><line x1="19" y1="8" x2="18" y2="22"/><line x1="26" y1="8" x2="26" y2="22"/><line x1="5" y1="15" x2="27" y2="15"/><line x1="3" y1="26" x2="29" y2="26"/></Ic>,
  arrow_up:  (p) => <Ic {...p}><line x1="16" y1="26" x2="16" y2="6"/><polyline points="8 14 16 6 24 14"/></Ic>,
  arrow_dn:  (p) => <Ic {...p}><line x1="16" y1="6" x2="16" y2="26"/><polyline points="8 18 16 26 24 18"/></Ic>,
  sparkle:   (p) => <Ic {...p}><polygon points="16 4 18 14 28 16 18 18 16 28 14 18 4 16 14 14" fill="currentColor"/></Ic>,
  star:      (p) => <Ic {...p}><polygon points="16 4 20 12 28 13 22 19 24 27 16 23 8 27 10 19 4 13 12 12" fill="currentColor"/></Ic>,
};

const Icon = ({ name, ...props }) => {
  const I = ICONS[name];
  return I ? I(props) : null;
};

Object.assign(window, { Icon, ICONS });
