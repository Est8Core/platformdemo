// scenes-social.jsx — SceneStats (credibility numbers) + SceneTestimonials (waitlist quotes).
// NOTE: numbers & quotes are placeholders — replace with real figures before launch.

// ── SCENE — STATS : الثقة بدأت تكبر ─────────────────────────────────────────
function StatBlock({ to, suffix, prefix, label, delay, localTime, last }) {
  const t = clamp((localTime - delay) / 0.5, 0, 1);
  const e = Easing.easeOutCubic(t);
  const n = Math.round(countUp(localTime, { to, delay: delay, dur: 1.1 }));
  return (
    <div style={{ flex: 1, textAlign: 'center', opacity: t, transform: `translateY(${(1 - e) * 22}px)`, position: 'relative', direction: 'rtl' }}>
      <div style={{ fontFamily: E8.display, fontWeight: 700, fontSize: 96, color: E8.gold, lineHeight: 1, textShadow: '0 6px 30px rgba(200,162,75,0.25)' }}>
        {prefix || ''}{toAr(n)}{suffix || ''}
      </div>
      <div style={{ fontFamily: E8.body, fontSize: 21, fontWeight: 500, color: 'rgba(247,243,234,0.7)', marginTop: 14 }}>{label}</div>
      {!last && <div style={{ position: 'absolute', left: 0, top: '14%', height: '72%', width: 1, background: 'linear-gradient(180deg, transparent, rgba(200,162,75,0.4), transparent)' }} />}
    </div>
  );
}

function SceneStats() {
  const { localTime, duration } = useSprite();
  const op = sceneFade(localTime, duration, 0.45, 0.5);
  return (
    <div style={{ position: 'absolute', inset: 0, opacity: op, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', direction: 'rtl' }}>
      <div style={{ textAlign: 'center', marginBottom: 70 }}>
        <div style={{ fontFamily: E8.body, fontSize: 16, fontWeight: 700, letterSpacing: '0.18em', color: E8.gold, marginBottom: 16, ...rise(localTime, { delay: 0.15, dist: 12 }) }}>قبل ما نطلق رسمياً</div>
        <div style={{ fontFamily: E8.display, fontSize: 58, fontWeight: 700, color: '#fff', lineHeight: 1.15, ...rise(localTime, { delay: 0.3, dist: 18 }) }}>
          والثقة <span style={{ color: E8.gold }}>بدأت تكبر</span>.
        </div>
      </div>
      <div style={{ display: 'flex', width: 1500, gap: 0 }}>
        <StatBlock to={120} prefix="+" label="شركة وساطة في قائمة الانتظار" delay={0.6} localTime={localTime} />
        <StatBlock to={400} prefix="+" label="وكيل سجّلوا اهتمامهم" delay={0.78} localTime={localTime} />
        <StatBlock to={8} label="مدن مصرية جاهزة للإطلاق" delay={0.96} localTime={localTime} />
        <StatBlock to={100} suffix="٪" label="عربي · RTL أصيل" delay={1.14} localTime={localTime} last />
      </div>
    </div>
  );
}

// ── SCENE — TESTIMONIALS : قالوا عننا ───────────────────────────────────────
function Stars() {
  return <div style={{ display: 'flex', gap: 3, direction: 'ltr', color: E8.gold, fontSize: 18 }}>{'★★★★★'.split('').map((s, i) => <span key={i}>{s}</span>)}</div>;
}

function TestimonialCard({ quote, name, role, code, tone, delay, localTime }) {
  const t = clamp((localTime - delay) / 0.55, 0, 1);
  const e = Easing.easeOutBack(t);
  return (
    <div style={{ flex: 1, background: E8.card, borderRadius: 20, padding: '32px 30px', boxShadow: '0 28px 64px rgba(0,0,0,0.38)', opacity: t, transform: `translateY(${(1 - e) * 32}px) scale(${0.93 + 0.07 * e})`, transformOrigin: 'bottom center', direction: 'rtl', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
        <Stars />
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, whiteSpace: 'nowrap', fontFamily: E8.body, fontSize: 12, fontWeight: 700, color: '#0E8A6E', background: 'rgba(21,201,160,0.14)', border: '1px solid rgba(21,201,160,0.35)', borderRadius: 999, padding: '4px 12px' }}>وصول مبكّر</span>
      </div>
      <div style={{ fontFamily: E8.display, fontSize: 24, fontWeight: 700, color: E8.navy, lineHeight: 1.6, flex: 1 }}>«{quote}»</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 22, paddingTop: 20, borderTop: `1px solid ${E8.n100}` }}>
        <Avatar code={code} tone={tone} size={46} />
        <div>
          <div style={{ fontFamily: E8.body, fontWeight: 700, fontSize: 17, color: E8.navy }}>{name}</div>
          <div style={{ fontFamily: E8.body, fontSize: 14, color: E8.n500 }}>{role}</div>
        </div>
      </div>
    </div>
  );
}

function SceneTestimonials() {
  const { localTime, duration } = useSprite();
  const op = sceneFade(localTime, duration, 0.45, 0.5);
  return (
    <div style={{ position: 'absolute', inset: 0, opacity: op, direction: 'rtl' }}>
      <div style={{ position: 'absolute', right: 120, top: 120, width: 1000, textAlign: 'right' }}>
        <div style={{ fontFamily: E8.body, fontSize: 16, fontWeight: 700, letterSpacing: '0.18em', color: E8.gold, marginBottom: 14, ...rise(localTime, { delay: 0.15, dist: 12 }) }}>قالوا عننا</div>
        <div style={{ fontFamily: E8.display, fontSize: 56, fontWeight: 700, color: '#fff', lineHeight: 1.15, ...rise(localTime, { delay: 0.3, dist: 18 }) }}>
          مستنيينه <span style={{ color: E8.gold }}>بفارغ الصبر</span>.
        </div>
      </div>
      <div style={{ position: 'absolute', left: 120, right: 120, top: 360, display: 'flex', gap: 26, alignItems: 'stretch' }}>
        <TestimonialCard delay={0.55} localTime={localTime} code="كع" tone="navy"
          quote="أخيراً نظام عربي بيفهم شغل الوساطة فعلاً. مستني الإطلاق بفارغ الصبر."
          name="كريم عادل" role="مدير مكتب عقاري · القاهرة" />
        <TestimonialCard delay={0.75} localTime={localTime} code="مس" tone="teal"
          quote="التوزيع التلقائي للعملاء لوحده هيوفّر علينا ساعات كل يوم."
          name="مريم سعيد" role="وكيل عقاري · المعادي" />
        <TestimonialCard delay={0.95} localTime={localTime} code="سد" tone="gold"
          quote="أول مرة أحس إن في أداة معمولة للسوق المصري بجد." 
          name="سلمى عبد الحميد" role="مديرة شركة وساطة · الجيزة" />
      </div>
      <div style={{ position: 'absolute', left: 0, right: 0, top: 800, textAlign: 'center', ...rise(localTime, { delay: 1.3, dist: 16, dur: 0.6 }) }}>
        <div style={{ fontFamily: E8.body, fontSize: 18, color: 'rgba(247,243,234,0.5)' }}>* آراء توضيحية من قائمة الوصول المبكّر — تُستبدل بآراء حقيقية عند الإطلاق</div>
      </div>
    </div>
  );
}

Object.assign(window, { SceneStats, SceneTestimonials });
