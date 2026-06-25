// screens.jsx — Est8Core real product screens (RTL), faithful to the DS mock.
// Load after brand.jsx.

// ── Sidebar (navy, right side in RTL) ───────────────────────────────────────
function SideNavItem({ icon, label, active, badge }) {
  return (
    <div style={{
      display:'flex', alignItems:'center', gap:12, padding:'11px 12px', borderRadius:8,
      fontFamily:E8.body, fontSize:14, position:'relative',
      background: active ? 'rgba(200,162,75,0.15)' : 'transparent',
      color: active ? E8.gold : 'rgba(255,255,255,0.55)', fontWeight: active ? 600 : 400,
    }}>
      {active && <div style={{ position:'absolute', right:0, top:'20%', width:3, height:'60%', background:E8.gold, borderRadius:'9999px 0 0 9999px' }} />}
      <Icon name={icon} size={16} />
      <span style={{ whiteSpace:'nowrap' }}>{label}</span>
      {badge && <span style={{ marginInlineStart:'auto', background:E8.gold, color:E8.navy900, fontSize:11, fontWeight:800, borderRadius:999, padding:'1px 7px', minWidth:18, textAlign:'center' }}>{badge}</span>}
    </div>
  );
}

function Sidebar({ active = 'leads' }) {
  return (
    <div style={{ width:240, background:E8.navy, display:'flex', flexDirection:'column', flexShrink:0, borderInlineStart:'1px solid rgba(200,162,75,0.1)' }}>
      <div style={{ padding:'18px 20px', borderBottom:'1px solid rgba(255,255,255,0.05)', display:'flex', alignItems:'center', gap:12 }}>
        <Logo size={1} />
      </div>
      <div style={{ padding:'2px 16px 0', fontSize:10, fontWeight:700, letterSpacing:'0.15em', color:'rgba(255,255,255,0.25)', marginTop:16, marginBottom:4, fontFamily:E8.body }}>القائمة الرئيسية</div>
      <div style={{ padding:'0 12px', display:'flex', flexDirection:'column', gap:2 }}>
        <SideNavItem icon="grid" label="لوحة التحكم" active={active==='dashboard'} />
        <SideNavItem icon="users" label="العملاء (Leads)" active={active==='leads'} badge="١٤" />
        <SideNavItem icon="home" label="العقارات" />
        <SideNavItem icon="deal" label="الصفقات" active={active==='deals'} />
        <SideNavItem icon="chat" label="المحادثات" />
        <SideNavItem icon="doc" label="المستندات" />
      </div>
      <div style={{ padding:'2px 16px 0', fontSize:10, fontWeight:700, letterSpacing:'0.15em', color:'rgba(255,255,255,0.25)', marginTop:18, marginBottom:4, fontFamily:E8.body }}>إدارة الفريق</div>
      <div style={{ padding:'0 12px', display:'flex', flexDirection:'column', gap:2 }}>
        <SideNavItem icon="users" label="الوكلاء" active={active==='agents'} />
        <SideNavItem icon="chart" label="التقارير" active={active==='reports'} />
        <SideNavItem icon="gear" label="الإعدادات" />
      </div>
      <div style={{ marginTop:'auto', padding:'16px 20px', borderTop:'1px solid rgba(255,255,255,0.05)', display:'flex', alignItems:'center', gap:12 }}>
        <Avatar code="سد" tone="gold" size={36} />
        <div>
          <div style={{ fontFamily:E8.body, fontSize:14, fontWeight:600, color:'rgba(255,255,255,0.85)' }}>صبري داود</div>
          <div style={{ fontFamily:E8.body, fontSize:12, color:'rgba(255,255,255,0.35)' }}>مدير الفرع الرئيسي</div>
        </div>
      </div>
    </div>
  );
}

// ── Top bar ─────────────────────────────────────────────────────────────────
function TopBar({ title, breadcrumb, titleIcon = 'users' }) {
  return (
    <div style={{ background:E8.card, borderBottom:`1px solid ${E8.n200}`, padding:'14px 24px', display:'flex', alignItems:'center', justifyContent:'space-between', flexShrink:0 }}>
      <div>
        <div style={{ fontFamily:E8.display, fontSize:20, fontWeight:700, color:E8.navy, display:'flex', alignItems:'center', gap:10 }}>
          <Icon name={titleIcon} size={18} stroke={E8.navy} /> {title}
        </div>
        <div style={{ fontFamily:E8.body, fontSize:12, color:E8.n400, marginTop:2, whiteSpace:'nowrap' }}>{breadcrumb}</div>
      </div>
      <div style={{ display:'flex', alignItems:'center', gap:12 }}>
        <div style={{ display:'flex', alignItems:'center', gap:8, background:E8.n100, border:`1px solid ${E8.n200}`, borderRadius:8, padding:'9px 12px', fontFamily:E8.body, fontSize:14, color:E8.n400, minWidth:220, whiteSpace:'nowrap' }}>
          <Icon name="search" size={14} stroke={E8.n400} /> بحث في العملاء...
        </div>
        <button style={{ width:38, height:38, borderRadius:8, background:E8.n100, border:`1px solid ${E8.n200}`, color:E8.n600, display:'flex', alignItems:'center', justifyContent:'center' }}><Icon name="bars" size={15} /></button>
        <button style={{ display:'flex', alignItems:'center', gap:7, padding:'9px 16px', borderRadius:8, background:E8.navy, color:'#fff', border:'none', fontFamily:E8.body, fontSize:13, fontWeight:600 }}>
          <Icon name="plus" size={13} sw={2.5} /> عميل جديد
        </button>
      </div>
    </div>
  );
}

// ── App frame (rounded shadow window: sidebar right + main left) ─────────────
function AppFrame({ w, h, active, children, style }) {
  return (
    <div style={{
      width:w, height:h, borderRadius:24, overflow:'hidden', display:'flex', direction:'rtl',
      boxShadow:'0 50px 130px rgba(0,0,0,0.5), 0 0 0 1px rgba(200,162,75,0.16)', background:E8.bg, ...style,
    }}>
      <Sidebar active={active} />
      <div style={{ flex:1, display:'flex', flexDirection:'column', minWidth:0, background:E8.bg }}>{children}</div>
    </div>
  );
}

// ── Lead card (kanban) ──────────────────────────────────────────────────────
function LeadCard({ name, refId, prop, value, assignee, date, badge, priority, commission, highlight, won, style }) {
  const accent = priority === 'high' ? E8.danger : priority === 'gold' ? E8.gold : null;
  return (
    <div style={{
      background:E8.card, border:`1px solid ${highlight ? E8.gold : E8.n200}`, borderRadius:12, padding:16,
      boxShadow: highlight ? '0 16px 40px rgba(200,162,75,0.3)' : '0 1px 2px rgba(11,31,58,0.06)',
      position:'relative', direction:'rtl', ...style,
    }}>
      {accent && <div style={{ position:'absolute', right:0, top:12, width:3, height:24, background:accent, borderRadius:'9999px 0 0 9999px' }} />}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:12 }}>
        <div>
          <div style={{ fontFamily:E8.body, fontSize:14, fontWeight:700, color:E8.navy, lineHeight:1.3 }}>{name}</div>
          <div style={{ fontFamily:E8.body, fontSize:11, color:E8.n400, marginTop:1, direction:'ltr', textAlign:'right' }}>{refId}</div>
        </div>
        {badge && <Badge tone={badge.tone} size={11}>{badge.text}</Badge>}
      </div>
      <div style={{ display:'flex', alignItems:'center', gap:5, fontFamily:E8.body, fontSize:12, color:E8.n600, marginBottom:12 }}>
        <Icon name="home" size={11} stroke={E8.n500} /> {prop}
      </div>
      <div style={{ fontFamily:E8.display, fontSize:15, fontWeight:700, color: won ? E8.successDark : E8.gold700, marginBottom: commission ? 4 : 12 }}>{value}</div>
      {commission && <div style={{ fontFamily:E8.body, fontSize:12, color:E8.success, marginBottom:12 }}>عمولة: {commission}</div>}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <div style={{ display:'flex', alignItems:'center', gap:8, fontFamily:E8.body, fontSize:12, color:E8.n500 }}>
          <Avatar code={assignee.code} tone={assignee.tone} size={24} /> {assignee.name}
        </div>
        <div style={{ fontFamily:E8.body, fontSize:11, color:E8.n400 }}>{date}</div>
      </div>
    </div>
  );
}

// ── Kanban column ───────────────────────────────────────────────────────────
function KanbanCol({ dot, title, count, children, w = 248 }) {
  return (
    <div style={{ width:w, flexShrink:0, display:'flex', flexDirection:'column', gap:12 }}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'11px 14px', background:E8.card, borderRadius:8, border:`1px solid ${E8.n200}` }}>
        <div style={{ display:'flex', alignItems:'center', gap:8, fontFamily:E8.body, fontSize:14, fontWeight:700, color:E8.n700, whiteSpace:'nowrap' }}>
          <div style={{ width:8, height:8, borderRadius:'50%', background:dot, flexShrink:0 }} /> {title}
        </div>
        <span style={{ fontFamily:E8.body, fontSize:12, fontWeight:700, background:E8.n100, color:E8.n500, borderRadius:999, padding:'2px 9px' }}>{toAr(count)}</span>
      </div>
      <div style={{ display:'flex', flexDirection:'column', gap:12 }}>{children}</div>
    </div>
  );
}

// ── KPI card (dashboard) ────────────────────────────────────────────────────
const KPI_ICON = {
  navy:    { bg:'#C5D5E9', fg:'#102A4C', bar:'#D4A23E' },
  gold:    { bg:'#F7EACC', fg:'#8C6E27', bar:'#D4A23E' },
  success: { bg:'#E8F5EE', fg:'#1A8C4E', bar:'#1A8C4E' },
  warning: { bg:'#FEF7E6', fg:'#D4860A', bar:'#D4860A' },
};
function KpiCard({ icon, tone, value, label, trend, style }) {
  const c = KPI_ICON[tone];
  return (
    <div style={{ flex:1, background:E8.card, border:`1px solid ${E8.n200}`, borderRadius:16, padding:'22px 24px', boxShadow:'0 2px 6px rgba(11,31,58,0.08)', direction:'rtl', position:'relative', overflow:'hidden', ...style }}>
      <div style={{ position:'absolute', top:0, left:0, width:80, height:80, borderRadius:'0 0 80px 0', background:c.fg, opacity:0.05 }} />
      <div style={{ width:44, height:44, borderRadius:8, background:c.bg, color:c.fg, display:'flex', alignItems:'center', justifyContent:'center', marginBottom:14 }}><Icon name={icon} size={20} stroke={c.fg} /></div>
      <div style={{ width:32, height:2, background:c.bar, borderRadius:999, marginBottom:12 }} />
      <div style={{ fontFamily:E8.display, fontSize:34, fontWeight:700, color:E8.navy, lineHeight:1, marginBottom:8 }}>{value}</div>
      <div style={{ fontFamily:E8.body, fontSize:14, color:E8.n500, marginBottom:12 }}>{label}</div>
      <div style={{ display:'flex', alignItems:'center', gap:5, fontFamily:E8.body, fontSize:12, fontWeight:600, color: trend.dir==='down' ? E8.danger : E8.success }}>
        <Icon name={trend.dir==='down'?'down':'up'} size={12} sw={2.5} /> {trend.text}
      </div>
    </div>
  );
}

// ── Commission navy card ────────────────────────────────────────────────────
function CommissionCard({ value, style }) {
  return (
    <div style={{ background:E8.navy, border:`1px solid ${E8.navy700}`, borderRadius:16, padding:24, color:'#fff', direction:'rtl', boxShadow:'0 8px 32px rgba(11,31,58,0.13)', ...style }}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:18 }}>
        <div style={{ fontFamily:E8.display, fontSize:18, fontWeight:700 }}>إجمالي العمولات</div>
        <span style={{ background:'rgba(200,162,75,0.2)', color:E8.gold, fontFamily:E8.body, fontWeight:700, fontSize:11, padding:'3px 10px', borderRadius:999 }}>هذا الشهر</span>
      </div>
      <div style={{ fontFamily:E8.display, fontSize:38, fontWeight:700, color:E8.gold, lineHeight:1 }}>
        {value} <span style={{ fontSize:18, color:'rgba(255,255,255,0.5)' }}>ج.م</span>
      </div>
      <div style={{ fontFamily:E8.body, fontSize:14, color:'rgba(255,255,255,0.5)', marginTop:8 }}>من ١٢ صفقة مكتملة</div>
      <div style={{ height:1, background:'rgba(200,162,75,0.2)', margin:'18px 0' }} />
      <div style={{ fontFamily:E8.body, fontSize:13, color:'rgba(255,255,255,0.45)' }}>↑ ٢٣٪ عن الشهر السابق</div>
    </div>
  );
}

// ── Toast ───────────────────────────────────────────────────────────────────
function Toast({ kind = 'navy', icon = 'check', children, style }) {
  const gold = kind === 'gold';
  return (
    <div style={{
      display:'flex', alignItems:'center', gap:14, padding:'16px 20px', borderRadius:12, direction:'rtl',
      background: gold ? E8.gold : E8.navy, color: gold ? E8.navy900 : '#fff',
      boxShadow:'0 16px 48px rgba(11,31,58,0.3)', minWidth:300, fontFamily:E8.body, fontSize:15, fontWeight:500, ...style,
    }}>
      <div style={{ width:34, height:34, borderRadius:6, flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center',
        background: gold ? 'rgba(11,31,58,0.15)' : 'rgba(200,162,75,0.2)', color: gold ? E8.navy900 : E8.gold }}>
        <Icon name={icon} size={18} sw={2.5} />
      </div>
      <div style={{ whiteSpace:'nowrap' }}>{children}</div>
    </div>
  );
}

Object.assign(window, { Sidebar, TopBar, AppFrame, LeadCard, KanbanCol, KpiCard, CommissionCard, Toast });
