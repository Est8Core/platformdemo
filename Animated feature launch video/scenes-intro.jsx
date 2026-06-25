// scenes-intro.jsx — SceneIntro (brand reveal) + SceneComingSoon (marketing close).
// Uses the real Est8Core logo (est8-logo.png).

const TEAL = '#15C9A0';
const BLUE = '#2B8DF4';

function LogoMark({ size = 160, style }) {
  return <img src="est8-logo.png" alt="Est8Core" style={{ width: size, height: size, objectFit: 'contain', display: 'block', ...style }} />;
}

// ── SCENE 0 — INTRO : brand reveal + قريباً ─────────────────────────────────
function SceneIntro() {
  const { localTime, duration } = useSprite();
  const op = sceneFade(localTime, duration, 0.4, 0.5);

  const markP = clamp(localTime / 0.8, 0, 1);
  const markE = Easing.easeOutBack(markP);
  const ringP = clamp((localTime - 0.2) / 1.1, 0, 1);
  const word = rise(localTime, { delay: 0.55, dist: 18, dur: 0.6 });
  const subT = rise(localTime, { delay: 0.85, dist: 14, dur: 0.6 });
  const pill = rise(localTime, { delay: 1.15, dist: 14, dur: 0.55 });
  const floatY = Math.sin(localTime * 1.4) * 5;

  return (
    <div style={{ position: 'absolute', inset: 0, opacity: op, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', direction: 'rtl' }}>
      {/* glow + expanding ring */}
      <div style={{ position: 'absolute', width: 900, height: 900, borderRadius: '50%', background: `radial-gradient(circle, ${BLUE}22 0%, transparent 60%)`, opacity: clamp(localTime / 0.7, 0, 1) }} />
      <div style={{ position: 'absolute', width: 240 + ringP * 520, height: 240 + ringP * 520, borderRadius: '50%', border: `1px solid ${TEAL}`, opacity: (1 - ringP) * 0.5 }} />

      <div style={{ transform: `scale(${0.7 + 0.3 * markE}) translateY(${floatY}px)`, opacity: markP, filter: `drop-shadow(0 18px 50px ${BLUE}55)` }}>
        <LogoMark size={188} />
      </div>

      <div style={{ ...word, fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 72, color: '#fff', marginTop: 26, letterSpacing: '0.01em' }}>
        Est8<span style={{ color: BLUE }}>Core</span>
      </div>
      <div style={{ ...subT, fontFamily: E8.body, fontSize: 26, color: 'rgba(247,243,234,0.6)', marginTop: 10, whiteSpace: 'nowrap' }}>
        منصة الوساطة العقارية الذكية
      </div>
      <div style={{ ...pill, marginTop: 26, display: 'inline-flex', alignItems: 'center', gap: 10, padding: '9px 22px', borderRadius: 999, border: `1px solid ${TEAL}66`, background: `${TEAL}1A` }}>
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: TEAL, boxShadow: `0 0 10px ${TEAL}` }} />
        <span style={{ fontFamily: E8.body, fontWeight: 700, fontSize: 16, color: TEAL, letterSpacing: '0.1em' }}>قريباً</span>
        <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 14, color: 'rgba(247,243,234,0.5)', letterSpacing: '0.28em', direction: 'ltr' }}>COMING SOON</span>
      </div>
    </div>
  );
}

// ── SCENE 6 — COMING SOON : marketing close ─────────────────────────────────
function SceneComingSoon() {
  const { localTime, duration } = useSprite();
  const op = sceneFade(localTime, duration, 0.5, 0.6);

  const lockup = rise(localTime, { delay: 0.15, dist: 20, dur: 0.6 });
  const headP = clamp((localTime - 0.55) / 0.7, 0, 1);
  const headE = Easing.easeOutBack(headP);
  const enP = clamp((localTime - 0.9) / 0.6, 0, 1);
  const tagT = rise(localTime, { delay: 1.15, dist: 16, dur: 0.6 });
  const ctaT = rise(localTime, { delay: 1.5, dist: 18, dur: 0.6 });
  const floatY = Math.sin(localTime * 1.3) * 5;

  return (
    <div style={{ position: 'absolute', inset: 0, opacity: op, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', direction: 'rtl' }}>
      <div style={{ position: 'absolute', width: 1100, height: 1100, borderRadius: '50%', background: `radial-gradient(circle, ${BLUE}1F 0%, rgba(200,162,75,0.05) 35%, transparent 62%)`, opacity: clamp(localTime / 0.8, 0, 1) }} />

      {/* lockup */}
      <div style={{ ...lockup, display: 'flex', alignItems: 'center', gap: 18 }}>
        <div style={{ transform: `translateY(${floatY}px)`, filter: `drop-shadow(0 12px 30px ${BLUE}44)` }}><LogoMark size={88} /></div>
        <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 46, color: '#fff' }}>Est8<span style={{ color: BLUE }}>Core</span></div>
      </div>

      {/* big قريباً */}
      <div style={{ marginTop: 30, textAlign: 'center', transform: `scale(${0.85 + 0.15 * headE})`, opacity: headP }}>
        <div style={{ fontFamily: E8.display, fontWeight: 700, fontSize: 120, color: E8.gold, lineHeight: 1, textShadow: '0 8px 40px rgba(200,162,75,0.3)' }}>قريباً</div>
        <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 22, color: 'rgba(247,243,234,0.45)', letterSpacing: '0.5em', marginTop: 8, direction: 'ltr', opacity: enP }}>COMING&nbsp;&nbsp;SOON</div>
      </div>

      <div style={{ ...tagT, fontFamily: E8.display, fontWeight: 700, fontSize: 38, color: '#fff', marginTop: 30 }}>
        من أوّل <span style={{ direction: 'ltr', display: 'inline-block' }}>lead</span> <span style={{ color: E8.gold }}>لإغلاق الصفقة.</span>
      </div>

      <div style={{ ...ctaT, marginTop: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 18 }}>
        <div style={{ background: E8.gold, color: E8.navy900, fontFamily: E8.body, fontWeight: 700, fontSize: 22, padding: '17px 34px', borderRadius: 10, boxShadow: '0 18px 44px rgba(200,162,75,0.35)', whiteSpace: 'nowrap' }}>
          كن أوّل من يجرّبها
        </div>
        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 22, color: 'rgba(247,243,234,0.85)', direction: 'ltr' }}>est8core.com</div>
      </div>
    </div>
  );
}

// persistent preview badge during the product scenes
function ComingSoonBadge({ from, to }) {
  const time = useTime();
  if (time < from || time > to) return null;
  const a = clamp((time - from) / 0.5, 0, 1) * clamp((to - time) / 0.5, 0, 1);
  return (
    <div style={{ position: 'absolute', top: 26, left: 30, opacity: a, display: 'inline-flex', alignItems: 'center', gap: 9, padding: '7px 16px', borderRadius: 999, background: 'rgba(6,15,30,0.6)', border: `1px solid ${TEAL}55`, backdropFilter: 'blur(4px)', direction: 'rtl' }}>
      <span style={{ width: 7, height: 7, borderRadius: '50%', background: TEAL, boxShadow: `0 0 8px ${TEAL}` }} />
      <span style={{ fontFamily: E8.body, fontWeight: 700, fontSize: 14, color: '#fff' }}>معاينة المنتج</span>
      <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 11, color: TEAL, letterSpacing: '0.2em', direction: 'ltr' }}>SOON</span>
    </div>
  );
}

Object.assign(window, { LogoMark, SceneIntro, SceneComingSoon, ComingSoonBadge, TEAL, BLUE });
