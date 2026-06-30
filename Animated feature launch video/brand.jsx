// brand.jsx — Est8Core design-system tokens + RTL primitives (faithful to option-1 DS).
// Exports to window. Load after React + animations.jsx.

const E8 = {
  // primary navy
  navy:    '#0B1F3A',  // primary-800 ★
  navy700: '#102A4C',  // header ★
  navy900: '#060F1E',
  navy600: '#1A4590',
  navy100: '#C5D5E9',
  navy50:  '#EAF0F8',
  // gold accent
  gold:    '#C8A24B',  // accent-500 ★
  gold400: '#D4A23E',
  gold600: '#B08B35',
  gold700: '#8C6E27',
  gold200: '#EFD499',
  gold100: '#F7EACC',
  gold50:  '#FDF8EE',
  goldSoft:'rgba(200,162,75,0.15)',
  // neutrals
  n50:'#F8F9FB', n100:'#EEF0F5', n200:'#DDE1EA', n300:'#C4CBDA',
  n400:'#9BA6BB', n500:'#6E7F9C', n600:'#4D5F7A', n700:'#344260', n800:'#1E2A45',
  // surfaces
  bg:'#F4F6FA', card:'#FFFFFF',
  // semantic
  success:'#1A8C4E', successLight:'#E8F5EE', successDark:'#0F5C33',
  warning:'#D4860A', warningLight:'#FEF7E6', warningDark:'#8A5704',
  danger:'#C0392B',  dangerLight:'#FDECEA',  dangerDark:'#7D2318',
  info:'#1565C0',    infoLight:'#E6F2FD',    infoDark:'#0D3C72',
  // type
  display: "'Amiri', 'Playfair Display', Georgia, serif",
  body:    "'IBM Plex Sans Arabic', 'Inter', system-ui, sans-serif",
};

// avatar tones (from DS .av-* classes), keyed by short code
const AV = {
  navy:   { bg: '#102A4C', fg: '#fff' },
  gold:   { bg: '#C8A24B', fg: '#060F1E' },
  teal:   { bg: '#1A7A7A', fg: '#fff' },
  purple: { bg: '#5B3D8A', fg: '#fff' },
  rust:   { bg: '#8A3D1A', fg: '#fff' },
};

// ── arabic-indic numerals ───────────────────────────────────────────────────
const _ARD = '٠١٢٣٤٥٦٧٨٩';
const toAr = (s) => String(s).replace(/[0-9]/g, d => _ARD[+d]);
const groupAr = (n) => toAr(Math.round(n).toLocaleString('en-US')); // 485,000 -> ٤٨٥,٠٠٠ (commas kept)

// ── animation helpers ───────────────────────────────────────────────────────
function rise(localTime, { delay = 0, dur = 0.55, dist = 26, ease = Easing.easeOutCubic } = {}) {
  const t = clamp((localTime - delay) / dur, 0, 1);
  const e = ease(t);
  return { opacity: e, transform: `translateY(${(1 - e) * dist}px)` };
}
function sceneFade(localTime, duration, inDur = 0.45, outDur = 0.5) {
  let o = 1;
  if (localTime < inDur) o = Easing.easeOutCubic(clamp(localTime / inDur, 0, 1));
  else if (localTime > duration - outDur) o = 1 - Easing.easeInCubic(clamp((localTime - (duration - outDur)) / outDur, 0, 1));
  return o;
}
function countUp(localTime, { to, delay = 0, dur = 1.1, ease = Easing.easeOutCubic } = {}) {
  const t = clamp((localTime - delay) / dur, 0, 1);
  return to * ease(t);
}

// ── tiny SVG icon set (stroke) ──────────────────────────────────────────────
function Icon({ name, size = 16, stroke = 'currentColor', sw = 2 }) {
  const paths = {
    grid:   <g><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></g>,
    users:  <g><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></g>,
    home:   <g><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></g>,
    deal:   <g><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></g>,
    chat:   <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>,
    doc:    <g><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></g>,
    chart:  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>,
    gear:   <g><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></g>,
    check:  <polyline points="20 6 9 17 4 12"/>,
    clock:  <g><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></g>,
    phone:  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.64 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.55 1.1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.64a16 16 0 0 0 6.21 6.21l1.77-1.77a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>,
    search: <g><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></g>,
    plus:   <g><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></g>,
    filter: <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>,
    bars:   <g><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="14" y2="12"/><line x1="4" y1="18" x2="10" y2="18"/></g>,
    bell:   <g><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></g>,
    up:     <g><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></g>,
    down:   <g><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/><polyline points="17 18 23 18 23 12"/></g>,
    close:  <g><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></g>,
    chevron:<polyline points="6 9 12 15 18 9"/>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
      {paths[name]}
    </svg>
  );
}

// ── Logo (E8 gold mark + wordmark) ──────────────────────────────────────────
function Logo({ size = 1, light = true }) {
  const mk = 36 * size;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 * size, direction: 'ltr' }}>
      <div style={{
        width: mk, height: mk, borderRadius: 5 * size,
        background: `linear-gradient(135deg, ${E8.gold}, ${E8.gold400})`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 15 * size, color: E8.navy900,
        boxShadow: '0 2px 12px rgba(200,162,75,0.4)', flexShrink: 0,
      }}>E8</div>
      <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 19 * size, color: light ? '#fff' : E8.navy, letterSpacing: '0.02em' }}>
        Est8<span style={{ color: E8.gold }}>Core</span>
      </div>
    </div>
  );
}

// ── Avatar ──────────────────────────────────────────────────────────────────
function Avatar({ code = 'سم', tone = 'navy', size = 28, ring = false }) {
  const t = AV[tone] || AV.navy;
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%', background: t.bg, color: t.fg,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: E8.body, fontWeight: 700, fontSize: size * 0.4, flexShrink: 0,
      boxShadow: ring ? `0 0 0 2px ${E8.card}, 0 0 0 4px ${E8.gold}` : 'none',
    }}>{code}</div>
  );
}

// ── Status chip (DS .status-chip variants) ──────────────────────────────────
const CHIP = {
  new:     { bg:'#E8F1FF', fg:'#1A56C4', bd:'#BFCFEE' },
  contact: { bg:'#FDF8EE', fg:'#8C6E27', bd:'#EFD499' },
  viewing: { bg:'#EEF2FF', fg:'#5B5FD4', bd:'#C7C9ED' },
  offer:   { bg:'#FEF7E6', fg:'#8A5704', bd:'#F3C97E' },
  won:     { bg:'#E8F5EE', fg:'#0F5C33', bd:'#A3CEB7' },
};
function StatusChip({ kind = 'new', children, size = 13 }) {
  const c = CHIP[kind];
  return (
    <span style={{
      display:'inline-flex', alignItems:'center', gap:6, padding:`${size*0.3}px ${size*0.85}px`,
      background:c.bg, color:c.fg, border:`1px solid ${c.bd}`, borderRadius:4,
      fontFamily:E8.body, fontWeight:600, fontSize:size, lineHeight:1.5, whiteSpace:'nowrap',
    }}>{children}</span>
  );
}

// ── Badge (pill) ────────────────────────────────────────────────────────────
const BADGE = {
  gold:    { bg:'#F7EACC', fg:'#6A521B' },
  danger:  { bg:'#FDECEA', fg:'#7D2318' },
  success: { bg:'#E8F5EE', fg:'#0F5C33' },
  warning: { bg:'#FEF7E6', fg:'#8A5704' },
  navy:    { bg:'#C5D5E9', fg:'#102A4C' },
};
function Badge({ tone = 'gold', children, size = 12 }) {
  const c = BADGE[tone];
  return (
    <span style={{
      display:'inline-flex', alignItems:'center', gap:5, padding:'3px 10px',
      background:c.bg, color:c.fg, borderRadius:999, fontFamily:E8.body, fontWeight:700,
      fontSize:size, letterSpacing:'0.03em', whiteSpace:'nowrap', lineHeight:1.5,
    }}>{children}</span>
  );
}

// ── Caption (RTL kinetic copy: gold kicker + big Amiri line) ─────────────────
function Caption({ kicker, line, sub, x, y, w = 720, localTime, delay = 0, align = 'right', lineColor = '#fff' }) {
  const k = rise(localTime, { delay, dist: 16, dur: 0.5 });
  const l = rise(localTime, { delay: delay + 0.12, dist: 22, dur: 0.6 });
  const s = sub ? rise(localTime, { delay: delay + 0.3, dist: 16, dur: 0.55 }) : null;
  return (
    <div style={{ position:'absolute', left:x, top:y, width:w, textAlign:align, direction:'rtl' }}>
      {kicker && (
        <div style={{ ...k, fontFamily:E8.body, fontSize:17, fontWeight:700, letterSpacing:'0.18em', color:E8.gold, marginBottom:18 }}>
          {kicker}
        </div>
      )}
      <div style={{ ...l, fontFamily:E8.display, fontSize:60, fontWeight:700, color:lineColor, lineHeight:1.18, letterSpacing:'0' }}>
        {line}
      </div>
      {sub && (
        <div style={{ ...s, fontFamily:E8.body, fontSize:23, fontWeight:400, color:'rgba(247,243,234,0.62)', lineHeight:1.6, marginTop:22 }}>
          {sub}
        </div>
      )}
    </div>
  );
}

Object.assign(window, { E8, AV, toAr, groupAr, rise, sceneFade, countUp, Icon, Logo, Avatar, StatusChip, Badge, Caption });
