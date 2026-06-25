// scenes-a.jsx — Scene 1 Hook (chaos), Scene 2 Kanban (one pipeline), Scene 3 Deal stepper.

// ═════════════════════════════════════════════════════════════════════════════
// SCENE 1 — HOOK : عملاء مبعثرين (واتساب / إكسل / ملاحظات)
// ═════════════════════════════════════════════════════════════════════════════
function ScatterCard({ x, y, rot = 0, delay = 0, w, float = 8, localTime, dimAt, children }) {
  const ap = clamp((localTime - delay) / 0.6, 0, 1);
  const e = Easing.easeOutBack(ap);
  const appearY = (1 - ap) * 26;
  const floatY = Math.sin((localTime + delay * 2) * 1.05) * float;
  const floatR = Math.sin((localTime + delay) * 0.8) * 1.1;
  let dim = 1;
  if (dimAt != null && localTime > dimAt) dim = 1 - 0.55 * Easing.easeInCubic(clamp((localTime - dimAt) / 1.0, 0, 1));
  return (
    <div style={{ position:'absolute', left:x, top:y, width:w,
      transform:`rotate(${rot + floatR}deg) translateY(${appearY + floatY}px) scale(${0.85 + 0.15 * e})`,
      opacity: clamp(ap * 1.2, 0, 1) * dim, background:'#fff', borderRadius:14, padding:16,
      boxShadow:'0 24px 50px rgba(0,0,0,0.35)', fontFamily:E8.body, direction:'rtl' }}>
      {children}
    </div>
  );
}

function SceneHook() {
  const { localTime, duration } = useSprite();
  const op = sceneFade(localTime, duration, 0.4, 0.55);
  const headDelay = 1.9;
  return (
    <div style={{ position:'absolute', inset:0, opacity:op }}>
      {/* واتساب */}
      <ScatterCard x={1380} y={150} rot={6} delay={0.1} w={320} localTime={localTime} dimAt={2.7}>
        <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:10, direction:'ltr', flexDirection:'row-reverse' }}>
          <div style={{ width:26, height:26, borderRadius:'50%', background:'#25D366', display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontSize:14 }}>✆</div>
          <div style={{ fontSize:13, fontWeight:600, color:'#54616E' }}>واتساب</div>
        </div>
        <div style={{ background:'#DCF8C6', borderRadius:10, padding:'10px 12px', fontSize:15, color:'#0d1b12' }}>عندكم شقة للبيع في الزمالك؟</div>
        <div style={{ textAlign:'left', fontSize:11, color:'#9AA7A0', marginTop:6 }}>١١:٤٢ ✓✓</div>
      </ScatterCard>

      {/* إكسل */}
      <ScatterCard x={210} y={130} rot={-6} delay={0.35} w={340} localTime={localTime} dimAt={2.7}>
        <div style={{ height:22, background:'#1D6F42', borderRadius:'8px 8px 0 0', margin:-16, marginBottom:0, display:'flex', alignItems:'center', paddingRight:12, color:'#fff', fontSize:12, fontWeight:600, direction:'ltr' }}>leads_نهائي_v7.xlsx</div>
        <div style={{ marginTop:22 }}>
          {['أحمد ك. · ؟','نورا · متابعة','عميل جديد · ____','فيلا؟ · ضاع'].map((r,i)=>(
            <div key={i} style={{ display:'grid', gridTemplateColumns:'1fr 26px', borderBottom:'1px solid #E6E6E6', fontSize:13, color:'#5b5b5b' }}>
              <div style={{ padding:'6px 10px', whiteSpace:'nowrap', overflow:'hidden' }}>{r}</div>
              <div style={{ borderInlineStart:'1px solid #E6E6E6', padding:'6px 0', textAlign:'center', color:'#9b9b9b' }}>{toAr(i+1)}</div>
            </div>
          ))}
        </div>
      </ScatterCard>

      {/* ملاحظة لاصقة */}
      <ScatterCard x={250} y={640} rot={5} delay={0.6} w={250} localTime={localTime} dimAt={2.7}>
        <div style={{ background:'#FCE588', margin:-16, padding:20, borderRadius:14, transform:'rotate(-1deg)' }}>
          <div style={{ fontSize:19, fontWeight:700, color:'#5C4A12' }}>كلّم أحمد تاني!!</div>
          <div style={{ fontSize:14, color:'#7A6520', marginTop:6, direction:'ltr', textAlign:'right' }}>٠١١ ٩٨٧ ٤٤٢٠</div>
          <div style={{ fontSize:13, color:'#9C8430', marginTop:14 }}>…يمكن الثلاثاء؟</div>
        </div>
      </ScatterCard>

      {/* مكالمة فائتة */}
      <ScatterCard x={1420} y={650} rot={-5} delay={0.85} w={300} localTime={localTime} dimAt={2.7}>
        <div style={{ display:'flex', alignItems:'center', gap:12, flexDirection:'row-reverse', textAlign:'right' }}>
          <div style={{ width:40, height:40, borderRadius:'50%', background:'#FBE3E3', display:'flex', alignItems:'center', justifyContent:'center', color:'#D04545', fontSize:18 }}>✆</div>
          <div>
            <div style={{ fontSize:15, fontWeight:600, color:'#C0392B' }}>مكالمة فائتة</div>
            <div style={{ fontSize:13, color:'#8A8A8A' }}>رقم غير معروف · من يومين</div>
          </div>
        </div>
      </ScatterCard>

      {/* بريد */}
      <ScatterCard x={800} y={700} rot={3} delay={1.05} w={330} localTime={localTime} dimAt={2.7}>
        <div style={{ fontSize:12, fontWeight:600, color:'#8A94A0', marginBottom:6 }}>✉ استفسار من المعرض</div>
        <div style={{ fontSize:15, fontWeight:600, color:'#33424F' }}>طلب جديد — شقة ٣ غرف</div>
        <div style={{ fontSize:13, color:'#90A0AE', marginTop:4 }}>محوّل · محوّل · محوّل</div>
      </ScatterCard>

      <div style={{ position:'absolute', left:0, right:0, top:360, height:380,
        background:'radial-gradient(ellipse 50% 80% at 50% 50%, rgba(6,15,30,0.94) 0%, rgba(6,15,30,0) 75%)',
        opacity: clamp((localTime - headDelay + 0.4) / 0.5, 0, 1) }} />

      <Caption x={460} y={430} w={1000} align="center" localTime={localTime} delay={headDelay}
        kicker="من أوّل lead لإغلاق الصفقة"
        line={<span>عملاء مبعثرين في كل مكان.<br /><span style={{ color:E8.gold }}>وصفقات بتضيع.</span></span>} />
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// SCENE 2 — ONE PIPELINE : لوحة Kanban الحقيقية + التقاط وتوزيع تلقائي
// ═════════════════════════════════════════════════════════════════════════════
function SceneKanban() {
  const { localTime, duration } = useSprite();
  const op = sceneFade(localTime, duration, 0.45, 0.5);
  const win = rise(localTime, { delay:0.15, dist:40, dur:0.7 });

  const dropT = clamp((localTime - 1.3) / 0.6, 0, 1);
  const dropE = Easing.easeOutCubic(dropT);
  const assignT = clamp((localTime - 2.4) / 0.5, 0, 1);
  const assignE = Easing.easeOutBack(assignT);

  const FW = 1600, FH = 800;
  const fx = (1920 - FW) / 2;

  return (
    <div style={{ position:'absolute', inset:0, opacity:op }}>
      <Caption x={fx} y={56} w={FW} align="right" localTime={localTime} delay={0.3}
        kicker="مكان واحد"
        line={<span>كل عميل بيتسجّل ويتوزّع <span style={{ color:E8.gold }}>تلقائياً</span>.</span>} />

      <div style={{ position:'absolute', left:fx, top:230, ...win }}>
        <AppFrame w={FW} h={FH} active="leads">
          <TopBar title="العملاء المحتملون" breadcrumb="الرئيسية / Leads / قناة المبيعات" titleIcon="users" />
          {/* toolbar */}
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'14px 24px 0' }}>
            <div style={{ display:'flex', gap:0 }}>
              {['Kanban','قائمة','تقرير'].map((t,i)=>(
                <div key={i} style={{ padding:'8px 16px', fontFamily:E8.body, fontSize:14, fontWeight: i===0?700:500, color: i===0?E8.navy:E8.n500, borderBottom: i===0?`2px solid ${E8.gold}`:'2px solid transparent' }}>{t}</div>
              ))}
            </div>
            <div style={{ display:'flex', alignItems:'center', gap:14 }}>
              <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                <div style={{ display:'flex', direction:'ltr' }}>
                  {[['سد','navy'],['كع','gold'],['مس','teal']].map((a,i)=>(<div key={i} style={{ marginInlineStart:i?-10:0, border:'2px solid #fff', borderRadius:'50%' }}><Avatar code={a[0]} tone={a[1]} size={26} /></div>))}
                </div>
                <span style={{ fontFamily:E8.body, fontSize:12, color:E8.n500 }}>الفريق</span>
              </div>
              <div style={{ display:'flex', alignItems:'center', gap:6, fontFamily:E8.body, fontSize:13, color:E8.n600 }}><Icon name="filter" size={13} stroke={E8.n600}/> تصفية</div>
            </div>
          </div>
          {/* board */}
          <div style={{ flex:1, overflow:'hidden', padding:'18px 24px', display:'flex', gap:16, direction:'rtl' }}>
            <KanbanCol dot="#1A56C4" title="استفسار جديد" count={4}>
              {/* dropping new lead */}
              <div style={{ maxHeight: dropE * 180, overflow:'visible', opacity:dropE, transform:`translateY(${(1-dropE)*-12}px)` }}>
                <LeadCard name="محمود السيد" refId="#L-٢٠٢٦-٠٠٨٤" prop="شقة سكنية — الزمالك" value="٢٫٤ مليون ج.م" priority="gold" highlight
                  badge={{ tone:'gold', text:'جديد' }} date="الآن"
                  assignee={ assignT<=0 ? { code:'…', tone:'navy', name:'يوزّع…' } : { code:'سر', tone:'gold', name:'سارة' } }
                  style={ assignT>0 ? { } : {} } />
              </div>
              <LeadCard name="عمر خليل إبراهيم" refId="#L-٢٠٢٦-٠٠٨١" prop="أرض — التجمع الخامس" value="٨٫٠ مليون ج.م" priority="gold" badge={{tone:'gold',text:'VIP'}} assignee={{code:'كع',tone:'navy',name:'كريم عادل'}} date="منذ ساعة" />
            </KanbanCol>

            <KanbanCol dot={E8.gold} title="تم التواصل" count={3}>
              <LeadCard name="أحمد محمد منصور" refId="#L-٢٠٢٦-٠٠٧٥" prop="شقة سكنية — الزمالك" value="٢٫٨ مليون ج.م" priority="high" badge={{tone:'danger',text:'عاجل'}} assignee={{code:'سر',tone:'gold',name:'سارة ماهر'}} date="٧ أيام" />
              <LeadCard name="ليلى عبد الرحمن" refId="#L-٢٠٢٦-٠٠٧٦" prop="فيلا — القاهرة الجديدة" value="٤٫٢ مليون ج.م" assignee={{code:'كع',tone:'navy',name:'كريم عادل'}} date="٣ أيام" />
            </KanbanCol>

            <KanbanCol dot="#5B5FD4" title="معاينة مجدولة" count={2}>
              <LeadCard name="نور الدين أحمد" refId="#L-٢٠٢٦-٠٠٦٩" prop="فيلا — المعادي" value="٥٫٥ مليون ج.م" priority="gold" badge={{tone:'gold',text:'VIP'}} assignee={{code:'كع',tone:'navy',name:'كريم عادل'}} date="غداً ١٠ص" />
              <LeadCard name="رنا حسن علي" refId="#L-٢٠٢٦-٠٠٧٠" prop="شقة — الدقي" value="١٫٩ مليون ج.م" assignee={{code:'مس',tone:'teal',name:'مريم سعيد'}} date="الأحد ٢م" />
            </KanbanCol>

            <KanbanCol dot={E8.warning} title="عرض مقدَّم" count={3}>
              <LeadCard name="كريم سامي عوض" refId="#L-٢٠٢٦-٠٠٦١" prop="فيلا — الشيخ زايد" value="٧٫١ مليون ج.م" priority="high" badge={{tone:'warning',text:'مفاوضة'}} assignee={{code:'سر',tone:'gold',name:'سارة ماهر'}} date="٥ أيام" />
              <LeadCard name="إيمان حسين" refId="#L-٢٠٢٦-٠٠٦٢" prop="شقة — النزهة" value="٢٫١ مليون ج.م" assignee={{code:'أح',tone:'purple',name:'أحمد حسن'}} date="يومين" />
            </KanbanCol>

            <KanbanCol dot={E8.success} title="صفقة مكتملة" count={2}>
              <LeadCard name="فاطمة رضا السيد" refId="#L-٢٠٢٦-٠٠٥٢" prop="مكتب — مدينة نصر" value="١٫٢ مليون ج.م" won commission="٣٦٬٠٠٠ ج.م" badge={{tone:'success',text:'مكتمل'}} assignee={{code:'مس',tone:'teal',name:'مريم سعيد'}} date="١٠ يونيو" />
            </KanbanCol>
          </div>
        </AppFrame>
      </div>

      {/* toast */}
      {assignT > 0 && (
        <div style={{ position:'absolute', left:'50%', top:1010, transform:`translate(-50%, ${(1-assignE)*14}px)`, opacity:clamp(assignT*1.4,0,1) }}>
          <Toast kind="navy" icon="check">
            تم تعيين العميل تلقائياً إلى <strong style={{ color:E8.gold }}>سارة ماهر</strong>
          </Toast>
        </div>
      )}
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// SCENE 3 — MOVE THE DEAL : مراحل + عمولات / أقساط / موافقات
// ═════════════════════════════════════════════════════════════════════════════
const STAGES = [
  { label:'استفسار جديد', kind:'new' },
  { label:'تم التواصل',   kind:'contact' },
  { label:'معاينة',       kind:'viewing' },
  { label:'عرض مقدَّم',    kind:'offer' },
  { label:'صفقة مكتملة',  kind:'won' },
];

function SceneDeal() {
  const { localTime, duration } = useSprite();
  const op = sceneFade(localTime, duration, 0.45, 0.5);

  const tStart = 0.9, tEnd = 3.6;
  const tp = clamp((localTime - tStart) / (tEnd - tStart), 0, 1);
  const eased = Easing.easeInOutCubic(tp);
  const activeIdx = Math.min(STAGES.length - 1, Math.floor(eased * (STAGES.length - 0.001)));

  // geometry (RTL: stage 0 at right)
  const right = 1560, left = 360, span = right - left, trackY = 440;
  const nodeX = (i) => right - (span * i) / (STAGES.length - 1);
  const dealX = right - span * eased;

  const win = rise(localTime, { delay:0.1, dist:30, dur:0.6 });

  const results = [
    { title:'تقسيم العمولة', rows:[['الوكيل · سارة','٦٠٪'],['الفرع · الزمالك','٣٠٪'],['وسيط الإحالة','١٠٪']], delay:3.7 },
    { title:'الأقساط', rows:[['الخطة','١٢ شهر'],['أول دفعة','عند التوقيع'],['المتابعة','تلقائية']], delay:3.92 },
    { title:'الموافقات', rows:[['المدير','✓ معتمد'],['العقد','✓ تم إصداره'],['العمولة','✓ تم صرفها']], delay:4.14 },
  ];

  return (
    <div style={{ position:'absolute', inset:0, opacity:op, direction:'rtl' }}>
      <div style={{ position:'absolute', right:120, top:90, width:900, textAlign:'right' }}>
        <div style={{ fontFamily:E8.body, fontSize:16, fontWeight:700, letterSpacing:'0.18em', color:E8.gold, marginBottom:14, ...rise(localTime,{delay:0.2,dist:12}) }}>حرّك الصفقة</div>
        <div style={{ fontFamily:E8.display, fontSize:50, fontWeight:700, color:'#fff', lineHeight:1.2, ...rise(localTime,{delay:0.32,dist:18}) }}>
          من الاستفسار للإغلاق — <span style={{ color:E8.gold }}>العمولات والأقساط والموافقات تلقائياً.</span>
        </div>
      </div>

      {/* stepper */}
      <div style={{ position:'absolute', left:0, top:0, width:1920, ...win }}>
        <div style={{ position:'absolute', left:left, top:trackY, width:span, height:4, background:'rgba(255,255,255,0.12)', borderRadius:2 }} />
        <div style={{ position:'absolute', top:trackY, height:4, background:`linear-gradient(90deg, ${E8.gold400}, ${E8.gold})`, borderRadius:2, boxShadow:`0 0 16px ${E8.gold}`, right: 1920 - right, width: span * eased }} />
        {STAGES.map((s,i)=>{
          const done = i <= activeIdx, isAct = i === activeIdx;
          return (
            <div key={i} style={{ position:'absolute', left:nodeX(i), top:trackY, transform:'translate(-50%,-50%)', display:'flex', flexDirection:'column', alignItems:'center' }}>
              <div style={{ width:isAct?26:18, height:isAct?26:18, borderRadius:'50%', background:done?E8.gold:E8.navy700, border:`2px solid ${done?E8.gold400:'rgba(255,255,255,0.25)'}`, boxShadow:isAct?`0 0 0 8px ${E8.goldSoft}`:'none' }} />
              <div style={{ position:'absolute', top:36, fontFamily:E8.body, fontSize:16, fontWeight:done?700:500, color:done?'#fff':'rgba(255,255,255,0.5)', whiteSpace:'nowrap' }}>{s.label}</div>
            </div>
          );
        })}

        {/* travelling deal card */}
        <div style={{ position:'absolute', left:dealX, top:trackY - 158, transform:'translateX(-50%)' }}>
          <div style={{ position:'absolute', left:'50%', top:126, width:2, height:30, background:E8.gold, transform:'translateX(-50%)' }} />
          <div style={{ width:300, background:E8.card, borderRadius:14, padding:18, boxShadow:'0 24px 60px rgba(0,0,0,0.5)', border:`1px solid ${E8.gold}`, direction:'rtl' }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12 }}>
              <StatusChip kind={STAGES[activeIdx].kind} size={12}>{STAGES[activeIdx].label}</StatusChip>
              <span style={{ fontFamily:E8.body, fontSize:12, color:E8.n400, direction:'ltr' }}>#L-٢٠٢٦-٠٠٧٥</span>
            </div>
            <div style={{ fontFamily:E8.display, fontWeight:700, fontSize:22, color:E8.navy }}>فيلا — المعادي</div>
            <div style={{ fontFamily:E8.body, fontSize:15, color:E8.n500, marginTop:4 }}>العميل · نور الدين أحمد</div>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginTop:14, paddingTop:14, borderTop:`1px solid ${E8.n200}` }}>
              <span style={{ fontFamily:E8.body, fontSize:14, color:E8.n500 }}>القيمة</span>
              <span style={{ fontFamily:E8.display, fontWeight:700, fontSize:22, color:E8.gold700 }}>٥٫٥ مليون ج.م</span>
            </div>
          </div>
        </div>
      </div>

      {/* result cards */}
      <div style={{ position:'absolute', left:360, top:580, width:1200, display:'flex', gap:28, direction:'rtl' }}>
        {results.map((r,i)=>{
          const rt = clamp((localTime - r.delay) / 0.5, 0, 1);
          const re = Easing.easeOutBack(rt);
          return (
            <div key={i} style={{ flex:1, background:E8.card, borderRadius:18, padding:'24px 26px', boxShadow:'0 30px 70px rgba(0,0,0,0.4)', opacity:rt, transform:`translateY(${(1-re)*30}px) scale(${0.92+0.08*re})`, transformOrigin:'bottom center', borderTop:`3px solid ${E8.gold}` }}>
              <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:18 }}>
                <div style={{ width:26, height:26, borderRadius:'50%', background:E8.gold, display:'flex', alignItems:'center', justifyContent:'center' }}><Icon name="check" size={15} stroke={E8.navy900} sw={2.6} /></div>
                <div style={{ fontFamily:E8.display, fontWeight:700, fontSize:22, color:E8.navy }}>{r.title}</div>
              </div>
              {r.rows.map((row,j)=>(
                <div key={j} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', gap:10, padding:'10px 0', borderBottom: j<r.rows.length-1?`1px solid ${E8.n100}`:'none' }}>
                  <span style={{ fontFamily:E8.body, fontSize:16, color:E8.n500, whiteSpace:'nowrap' }}>{row[0]}</span>
                  <span style={{ fontFamily:E8.body, fontSize:17, fontWeight:700, color:E8.navy, whiteSpace:'nowrap' }}>{row[1]}</span>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

Object.assign(window, { SceneHook, SceneKanban, SceneDeal });
