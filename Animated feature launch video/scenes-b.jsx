// scenes-b.jsx — Scene 4 Teams, Scene 5 Dashboard, Scene 6 Close.

// ═════════════════════════════════════════════════════════════════════════════
// SCENE 4 — BUILT FOR TEAMS : فروع / فِرق / وكلاء — نطاق مرئي
// ═════════════════════════════════════════════════════════════════════════════
function OrgNode({ x, y, label, sub, code, tone, w = 200, delay, localTime, bright, owner }) {
  const t = clamp((localTime - delay) / 0.5, 0, 1);
  const e = Easing.easeOutBack(t);
  const glow = bright >= 1 ? `0 0 0 2px ${E8.gold}, 0 0 34px ${E8.goldSoft}` : 'none';
  return (
    <div style={{ position:'absolute', left:x, top:y, width:w, transform:`translate(-50%,-50%) scale(${0.8+0.2*e})`, opacity:t*bright,
      background: owner ? E8.navy : E8.card, borderRadius:14, padding: owner?'16px 20px':'12px 16px',
      boxShadow:`0 18px 44px rgba(0,0,0,0.32), ${glow}`, display:'flex', alignItems:'center', gap:12, direction:'rtl',
      border: owner ? `1px solid ${E8.navy700}` : `1px solid ${E8.n200}` }}>
      <Avatar code={code} tone={tone} size={owner?42:34} ring={owner} />
      <div style={{ minWidth:0 }}>
        <div style={{ fontFamily:E8.body, fontWeight:700, fontSize:owner?18:15, color:owner?'#fff':E8.navy, whiteSpace:'nowrap' }}>{label}</div>
        <div style={{ fontFamily:E8.body, fontSize:owner?13:12, color:owner?E8.gold:E8.n500, whiteSpace:'nowrap' }}>{sub}</div>
      </div>
    </div>
  );
}

function SceneTeams() {
  const { localTime, duration } = useSprite();
  const op = sceneFade(localTime, duration, 0.45, 0.5);

  const owner = { x:960, y:250 };
  const branches = [
    { x:1460, y:480, label:'فرع الزمالك', sub:'فريق · ٦ وكلاء', code:'فز', tone:'navy' },
    { x:960,  y:480, label:'فرع المعادي', sub:'فريق · ٤ وكلاء', code:'فم', tone:'navy' },
    { x:460,  y:480, label:'فرع الجيزة',  sub:'فريق · ٥ وكلاء', code:'فج', tone:'navy' },
  ];
  const agents = [
    { bx:0, x:1560, label:'سارة ماهر', code:'سر', tone:'gold' }, { bx:0, x:1360, label:'كريم عادل', code:'كع', tone:'navy' },
    { bx:1, x:1060, label:'مريم سعيد', code:'مس', tone:'teal' }, { bx:1, x:860, label:'أحمد حسن', code:'أح', tone:'purple' },
    { bx:2, x:560, label:'هند سمير', code:'هس', tone:'rust' },   { bx:2, x:360, label:'يوسف رامي', code:'ير', tone:'navy' },
  ];
  const agentY = 700;
  const phaseB = localTime > 2.2 && localTime < 3.3;
  const phaseC = localTime >= 3.3;
  const scoped = 1; // المعادي

  const branchBright = (i) => phaseB ? (i===scoped?1:0.18) : 1;
  const agentBright = (a) => phaseB ? (a.bx===scoped ? (a.label==='مريم سعيد'?1:0.5) : 0.18) : 1;
  const linkOp = clamp((localTime-0.7)/0.6,0,1) * (phaseB?0.3:1);

  return (
    <div style={{ position:'absolute', inset:0, opacity:op }}>
      <svg width="1920" height="1080" style={{ position:'absolute', inset:0, pointerEvents:'none' }}>
        <g stroke={E8.gold} strokeWidth="2" fill="none" opacity={linkOp} strokeLinecap="round">
          {branches.map((b,i)=><path key={i} d={`M${owner.x},${owner.y+36} C${owner.x},${(owner.y+b.y)/2} ${b.x},${(owner.y+b.y)/2} ${b.x},${b.y-30}`} />)}
          {agents.map((a,i)=>{ const b=branches[a.bx]; return <path key={i} d={`M${b.x},${b.y+30} C${b.x},${(b.y+agentY)/2} ${a.x},${(b.y+agentY)/2} ${a.x},${agentY-24}`} opacity={0.7} />; })}
        </g>
      </svg>

      <OrgNode {...owner} label="صبري داود · المدير العام" sub="كل الفروع · كل الصفقات" code="سد" tone="gold" w={300} delay={0.2} localTime={localTime} bright={1} owner />
      {branches.map((b,i)=>(<OrgNode key={i} {...b} delay={0.5+i*0.12} localTime={localTime} bright={phaseC?1:branchBright(i)} />))}
      {agents.map((a,i)=>{ const b=branches[a.bx]; return <OrgNode key={i} x={a.x} y={agentY} label={a.label} sub="نطاقه فقط" code={a.code} tone={a.tone} w={172} delay={0.9+i*0.08} localTime={localTime} bright={phaseC?1:agentBright(a)} />; })}

      {phaseB && (
        <div style={{ position:'absolute', left:700, top:810, width:520, textAlign:'center', opacity:clamp((localTime-2.3)/0.3,0,1) }}>
          <span style={{ display:'inline-flex', alignItems:'center', gap:8, whiteSpace:'nowrap', background:E8.goldSoft, color:E8.gold700, border:`1px solid ${E8.gold200}`, padding:'8px 16px', borderRadius:999, fontFamily:E8.body, fontWeight:700, fontSize:15 }}>الوكيل يشوف عملاءه فقط</span>
        </div>
      )}
      {phaseC && (
        <div style={{ position:'absolute', left:1200, top:250, transform:'translateY(-50%)', opacity:clamp((localTime-3.4)/0.3,0,1) }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:E8.gold, color:E8.navy, padding:'9px 18px', borderRadius:999, fontFamily:E8.body, fontWeight:700, fontSize:16, direction:'rtl' }}>
            <Icon name="check" size={18} stroke={E8.navy} sw={2.6} /> المدير يشوف كل حاجة
          </div>
        </div>
      )}

      <div style={{ position:'absolute', right:120, top:90, width:640, textAlign:'right', direction:'rtl' }}>
        <div style={{ fontFamily:E8.body, fontSize:16, fontWeight:700, letterSpacing:'0.18em', color:E8.gold, marginBottom:12, ...rise(localTime,{delay:0.2,dist:12}) }}>مبني للفِرق</div>
        <div style={{ fontFamily:E8.display, fontSize:44, fontWeight:700, color:'#fff', lineHeight:1.25, ...rise(localTime,{delay:0.32,dist:16}) }}>
          فروع، فِرَق ووكلاء — كل واحد في نطاقه بالظبط.
        </div>
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// SCENE 5 — REAL-TIME DASHBOARD : مؤشرات + عمولات + إشعار فوري
// ═════════════════════════════════════════════════════════════════════════════
function MiniCard({ title, badge, children, accent, delay, localTime }) {
  return (
    <div style={{ flex:1, background:E8.card, borderRadius:16, border:`1px solid ${E8.n200}`, borderTop: accent?`3px solid ${E8.gold}`:`1px solid ${E8.n200}`, boxShadow:'0 2px 6px rgba(11,31,58,0.08)', overflow:'hidden', ...rise(localTime,{delay,dist:22}) }}>
      <div style={{ padding:'16px 20px', borderBottom:`1px solid ${E8.n200}`, display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <div style={{ fontFamily:E8.display, fontSize:17, fontWeight:700, color:E8.navy }}>{title}</div>
        {badge}
      </div>
      <div style={{ padding:'18px 20px' }}>{children}</div>
    </div>
  );
}

function SceneDashboard() {
  const { localTime, duration } = useSprite();
  const op = sceneFade(localTime, duration, 0.45, 0.5);
  const win = rise(localTime, { delay:0.1, dist:34, dur:0.65 });
  const toastT = clamp((localTime - 2.7) / 0.5, 0, 1);
  const toastE = Easing.easeOutBack(toastT);

  const FW = 1640, FH = 640, fx = (1920 - FW) / 2;
  const cu = (to, d) => Math.round(countUp(localTime, { to, delay:d, dur:1 }));

  return (
    <div style={{ position:'absolute', inset:0, opacity:op }}>
      <Caption x={fx} y={48} w={FW} align="right" localTime={localTime} delay={0.3}
        kicker="متابعة لحظية"
        line={<span>كل صفقة تنعكس على اللوحة <span style={{ color:E8.gold }}>فوراً</span>.</span>} />

      <div style={{ position:'absolute', left:fx, top:200, ...win }}>
        <AppFrame w={FW} h={FH} active="dashboard">
          <TopBar title="لوحة التحكم" breadcrumb="الرئيسية / لوحة التحكم" titleIcon="grid" />
          <div style={{ padding:24, display:'flex', flexDirection:'column', gap:18, direction:'rtl', flex:1 }}>
            <div style={{ display:'flex', alignItems:'baseline', justifyContent:'space-between' }}>
              <div style={{ fontFamily:E8.display, fontSize:26, fontWeight:700, color:E8.navy }}>صباح الخير، صبري</div>
              <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                <div style={{ width:9, height:9, borderRadius:'50%', background:E8.success, boxShadow:`0 0 0 4px ${E8.successLight}` }} />
                <span style={{ fontFamily:E8.body, fontSize:14, color:E8.n500 }}>مباشر · حُدّث الآن</span>
              </div>
            </div>

            {/* KPI row (RTL: ١٤ on right → ٢٤٧ on left) */}
            <div style={{ display:'flex', gap:16 }}>
              <KpiCard icon="clock" tone="warning" value={toAr(cu(14,0.5))} label="تحتاج متابعة عاجلة" trend={{dir:'down', text:'منذ أكثر من ٧ أيام'}} />
              <KpiCard icon="check" tone="success" value={toAr(cu(38,0.62))} label="صفقات مكتملة" trend={{dir:'up', text:'معدّل تحويل ٦٣٪'}} />
              <KpiCard icon="deal" tone="gold" value={`${toAr(cu(408,0.74))}م`} label="حجم الصفقات (ج.م)" trend={{dir:'up', text:'+٢٩٪ هذا الربع'}} />
              <KpiCard icon="users" tone="navy" value={toAr(cu(247,0.86))} label="إجمالي العملاء النشطين" trend={{dir:'up', text:'+١٢٪ هذا الشهر'}} />
            </div>

            {/* lower row */}
            <div style={{ display:'flex', gap:16 }}>
              <CommissionCard value={toAr(cu(485000,1.0).toLocaleString('en-US'))} style={{ flex:1, ...rise(localTime,{delay:1.0,dist:22}) }} />

              <MiniCard title="عميل مستهدف" accent delay={1.12} localTime={localTime}
                badge={<Badge tone="gold" size={11}>★ VIP</Badge>}>
                <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:14 }}>
                  <Avatar code="أم" tone="navy" size={40} />
                  <div>
                    <div style={{ fontFamily:E8.body, fontWeight:700, fontSize:15, color:E8.navy }}>أحمد منصور</div>
                    <div style={{ fontFamily:E8.body, fontSize:12, color:E8.n500 }}>مدير تنفيذي · عميل منذ ٢٠٢٣</div>
                  </div>
                </div>
                <div style={{ fontFamily:E8.body, fontSize:14, color:E8.n600 }}>يبحث عن فيلا سكنية ≥ ٥٠٠م²</div>
              </MiniCard>

              <MiniCard title="ملف العقار" delay={1.24} localTime={localTime}
                badge={<span style={{ display:'inline-flex', alignItems:'center', gap:6, fontFamily:E8.body, fontSize:12, fontWeight:700, color:E8.successDark }}><span style={{ width:7, height:7, borderRadius:'50%', background:E8.success }} /> متاح</span>}>
                <div style={{ fontFamily:E8.body, fontSize:14, color:E8.n600, marginBottom:14 }}>شقة ٣ غرف، ١٨٠م² — الزمالك، القاهرة</div>
                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                  <span style={{ fontFamily:E8.display, fontSize:22, fontWeight:700, color:E8.gold700 }}>٢٫٨ مليون ج.م</span>
                  <span style={{ fontFamily:E8.body, fontSize:13, fontWeight:600, color:E8.navy, border:`1.5px solid ${E8.navy}`, borderRadius:8, padding:'7px 14px' }}>تفاصيل</span>
                </div>
              </MiniCard>
            </div>
          </div>
        </AppFrame>
      </div>

      {/* gold incoming-call toast */}
      {toastT > 0 && (
        <div style={{ position:'absolute', left:fx + FW - 470, top:200 + FH + 22, transform:`translateY(${(1-toastE)*16}px)`, opacity:clamp(toastT*1.4,0,1) }}>
          <Toast kind="gold" icon="phone">
            مكالمة واردة · <strong>أحمد منصور</strong> — عميل VIP
          </Toast>
        </div>
      )}
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// SCENE 6 — CLOSE : شعار + شعار نصي + CTA
// ═════════════════════════════════════════════════════════════════════════════
function SceneClose() {
  const { localTime, duration } = useSprite();
  const op = sceneFade(localTime, duration, 0.5, 0.6);
  const logoT = rise(localTime, { delay:0.2, dist:24, dur:0.7 });
  const lineW = clamp((localTime - 0.7) / 0.6, 0, 1);
  const tagT = rise(localTime, { delay:0.95, dist:20, dur:0.6 });
  const subT = rise(localTime, { delay:1.2, dist:16, dur:0.6 });
  const ctaT = rise(localTime, { delay:1.5, dist:18, dur:0.6 });

  return (
    <div style={{ position:'absolute', inset:0, opacity:op, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', direction:'rtl' }}>
      <div style={{ position:'absolute', width:1100, height:1100, borderRadius:'50%', background:'radial-gradient(circle, rgba(200,162,75,0.16) 0%, rgba(200,162,75,0) 62%)', opacity:clamp(localTime/0.8,0,1) }} />
      <div style={{ position:'relative', textAlign:'center' }}>
        <div style={{ ...logoT, marginBottom:6, display:'flex', justifyContent:'center' }}>
          <Logo size={2} />
        </div>
        <div style={{ width:240*lineW, height:2, background:`linear-gradient(90deg, transparent, ${E8.gold}, transparent)`, margin:'34px auto 30px' }} />
        <div style={{ ...tagT, fontFamily:E8.display, fontWeight:700, fontSize:60, color:'#fff' }}>
          من أوّل <span style={{ direction:'ltr', display:'inline-block' }}>lead</span> <span style={{ color:E8.gold }}>لإغلاق الصفقة.</span>
        </div>
        <div style={{ ...subT, fontFamily:E8.body, fontSize:24, color:'rgba(247,243,234,0.62)', marginTop:20 }}>
          Est8Core — كل صفقة، كل فرع، في مكان واحد.
        </div>
        <div style={{ ...ctaT, marginTop:46, display:'flex', alignItems:'center', justifyContent:'center', gap:18 }}>
          <div style={{ background:E8.gold, color:E8.navy900, fontFamily:E8.body, fontWeight:700, fontSize:22, padding:'18px 34px', borderRadius:10, boxShadow:'0 18px 44px rgba(200,162,75,0.35)' }}>
            ابدأ تجربتك المجانية
          </div>
          <div style={{ fontFamily:"'Inter', sans-serif", fontSize:22, color:'rgba(247,243,234,0.85)', direction:'ltr' }}>est8core.com</div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { SceneTeams, SceneDashboard, SceneClose });
