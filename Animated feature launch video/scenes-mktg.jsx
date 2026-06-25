// scenes-mktg.jsx — SceneValue (kinetic bridge statement) + SceneFeatures (why Est8Core).

// ── SCENE — VALUE STATEMENT : "تخيّل كل ده في مكان واحد" ─────────────────────
function SceneValue() {
  const { localTime, duration } = useSprite();
  const op = sceneFade(localTime, duration, 0.45, 0.55);

  const l1 = rise(localTime, { delay: 0.3, dist: 26, dur: 0.6 });
  const p2 = clamp((localTime - 0.95) / 0.7, 0, 1);
  const e2 = Easing.easeOutBack(p2);
  const sweep = clamp((localTime - 1.5) / 0.7, 0, 1);

  return (
    <div style={{ position: 'absolute', inset: 0, opacity: op, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', direction: 'rtl' }}>
      <div style={{ position: 'absolute', width: 1000, height: 1000, borderRadius: '50%', background: 'radial-gradient(circle, rgba(200,162,75,0.10) 0%, transparent 60%)', opacity: clamp(localTime / 0.8, 0, 1) }} />
      <div style={{ textAlign: 'center' }}>
        <div style={{ ...l1, fontFamily: E8.body, fontSize: 28, fontWeight: 500, color: 'rgba(247,243,234,0.6)', marginBottom: 18 }}>
          بدل الفوضى…
        </div>
        <div style={{ transform: `scale(${0.86 + 0.14 * e2})`, opacity: p2, fontFamily: E8.display, fontSize: 92, fontWeight: 700, color: '#fff', lineHeight: 1.15 }}>
          تخيّل كل ده في <span style={{ color: E8.gold }}>مكان واحد</span>.
        </div>
        <div style={{ width: 360 * sweep, height: 3, margin: '32px auto 0', borderRadius: 2, background: `linear-gradient(90deg, transparent, ${E8.gold}, transparent)` }} />
      </div>
    </div>
  );
}

// ── SCENE — FEATURES : why Est8Core (4 value props) ─────────────────────────
function FeatureCard({ icon, title, sub, delay, localTime, tone }) {
  const t = clamp((localTime - delay) / 0.55, 0, 1);
  const e = Easing.easeOutBack(t);
  const tones = {
    gold:    { bg: '#F7EACC', fg: '#8C6E27' },
    navy:    { bg: '#C5D5E9', fg: '#102A4C' },
    teal:    { bg: 'rgba(21,201,160,0.16)', fg: '#0E8A6E' },
    success: { bg: '#E8F5EE', fg: '#1A8C4E' },
  };
  const c = tones[tone];
  return (
    <div style={{
      flex: 1, background: E8.card, borderRadius: 20, padding: '34px 28px', borderTop: `3px solid ${E8.gold}`,
      boxShadow: '0 24px 60px rgba(0,0,0,0.35)', opacity: t, transform: `translateY(${(1 - e) * 34}px) scale(${0.92 + 0.08 * e})`,
      transformOrigin: 'bottom center', direction: 'rtl', textAlign: 'right',
    }}>
      <div style={{ width: 60, height: 60, borderRadius: 14, background: c.bg, color: c.fg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 22 }}>
        <Icon name={icon} size={28} stroke={c.fg} />
      </div>
      <div style={{ fontFamily: E8.display, fontSize: 26, fontWeight: 700, color: E8.navy, marginBottom: 10 }}>{title}</div>
      <div style={{ fontFamily: E8.body, fontSize: 17, color: E8.n500, lineHeight: 1.6 }}>{sub}</div>
    </div>
  );
}

function SceneFeatures() {
  const { localTime, duration } = useSprite();
  const op = sceneFade(localTime, duration, 0.45, 0.5);

  return (
    <div style={{ position: 'absolute', inset: 0, opacity: op, direction: 'rtl' }}>
      <div style={{ position: 'absolute', right: 120, top: 110, width: 1000, textAlign: 'right' }}>
        <div style={{ fontFamily: E8.body, fontSize: 16, fontWeight: 700, letterSpacing: '0.18em', color: E8.gold, marginBottom: 14, ...rise(localTime, { delay: 0.15, dist: 12 }) }}>ليه Est8Core؟</div>
        <div style={{ fontFamily: E8.display, fontSize: 56, fontWeight: 700, color: '#fff', lineHeight: 1.15, ...rise(localTime, { delay: 0.3, dist: 18 }) }}>
          مبني للسوق المصري — <span style={{ color: E8.gold }}>من أول يوم.</span>
        </div>
      </div>

      <div style={{ position: 'absolute', left: 120, right: 120, top: 360, display: 'flex', gap: 26 }}>
        <FeatureCard icon="home"  tone="gold"    title="متعدّد الفروع" sub="فرّعك وفِرقك ووكلاءك في نظام واحد — بياناتهم منفصلة وآمنة." delay={0.55} localTime={localTime} />
        <FeatureCard icon="users" tone="navy"    title="صلاحيات دقيقة" sub="كل دور يشوف اللي يخصّه بس — من الوكيل للمدير العام." delay={0.72} localTime={localTime} />
        <FeatureCard icon="chat"  tone="teal"    title="عربي بالكامل" sub="واجهة RTL مصمّمة للسوق المحلي — سهلة لأي فريق." delay={0.89} localTime={localTime} />
        <FeatureCard icon="chart" tone="success" title="تقارير لحظية" sub="مؤشرات وأهداف وعمولات تتحدّث لحظة بلحظة." delay={1.06} localTime={localTime} />
      </div>

      <div style={{ position: 'absolute', left: 0, right: 0, top: 760, textAlign: 'center', ...rise(localTime, { delay: 1.4, dist: 18, dur: 0.6 }) }}>
        <div style={{ fontFamily: E8.display, fontSize: 46, fontWeight: 700, color: '#fff' }}>
          أقفل صفقات <span style={{ color: E8.gold }}>أكتر</span> — بمجهود <span style={{ color: E8.gold }}>أقل</span>.
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { SceneValue, SceneFeatures });
