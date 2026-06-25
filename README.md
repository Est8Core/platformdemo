# Est8Core — معرض التصاميم التفاعلي (Demo)

> نماذج HTML تفاعلية، **RTL**، بثيم **Trust & Authority** (كحلي `#0B1F3A` + ذهبي `#C8A24B`).
> **Stack:** Tailwind (Play CDN) + Alpine.js. مرجع بصري/سلوكي للفرونت اند (Next.js).
> هذا الريبو **يُنشَر كـ GitHub Pages** — نقطة الدخول `index.html` (hub يشرح الأسطح الثلاثة).

---

## 📁 الهيكل — منظّم حسب الأسطح الثلاثة الإنتاجية (= [ADR-0011](../../ADR-0011-frontend-three-app-monorepo.md))

```
interactive/                         ← جذر الريبو + جذر النشر
├── index.html                       ← 🏠 HUB: يشرح نموذج الـ subdomains + يربط الكل
├── .nojekyll                        ← يعطّل Jekyll (وإلا _shared المبدوء بـ_ يُتجاهَل)
├── _shared/ logo-gold.png
├── Animated feature launch video/   ← فيديو الإطلاق (يُستخدَم في landing)
├── marketing/                       ← 🌐 est8core.com (عام)
│   ├── landing.html · changelog.html
│   └── register.html · verify-email.html      (التسجيل مركزي — لا subdomain بعد)
├── tenant-app/                      ← 🏢 {slug}.est8core.com (CRM)
│   └── auth/  login · 2fa · forgot-password · reset-password · accept-invite
│       (app/ شاشات CRM الداخلية — قريباً)
└── platform-admin/                  ← 👑 admin.est8core.com (11 شاشة)
    └── login · dashboard · tenants · tenant-detail · plans · invoices
        · settings · audit-log · notifications · profile · admins
```

## 🔗 نموذج الوصول (Production) ولماذا هذا التقسيم
- **التسجيل (register/verify) عام** — المستأجر لا يملك subdomain بعد ⇒ في `marketing`.
- **دخول المستأجر + كل auth** على **subdomain شركته** ⇒ في `tenant-app/auth` (هوية `users`+`tid`).
- **دخول المنصة** على `admin.est8core.com` ⇒ `platform-admin` (هوية `admin_users`، 2FA إجباري + IP allowlist).
- روابط `marketing` تشير لـ `tenant-app/auth/login` و `register` (داخل marketing)؛ روابط `tenant-app/auth` المتبادلة داخلية.

## 🏭 خط إنتاج شاشات المنصة (HARD DRY)
شاشات `platform-admin/` المُغلَّفة (عدا `login` المستقلة) **مُجمَّعة حتمياً**:
`../_ds_build/admin/` = `shell-head.html` + `shell-foot.html` (يحملان مكوّنات `.adm-*` + JSON viewer + floatMenu + helpers) + `bodies/<id>.html` + `build-admin.mjs`.
**إعادة البناء:** `bun .Pm/design-system/_ds_build/admin/build-admin.mjs` → يكتب في `platform-admin/`.

## 🚀 النشر على GitHub Pages
1. **Settings → Pages → Source = "GitHub Actions"** (مهم).
2. الـ workflow: `.github/workflows/deploy.yml` (نشر ثابت، يرفع الجذر كما هو بلا Jekyll).
3. `.nojekyll` يضمن نشر `_shared/` (المبدوء بـ`_`) وإلا يُتجاهَل ويكسر اللوجو.
4. الفيديو داخل الريبو (`Animated feature launch video/`) — لا تبعية خارجية.
- **معاينة محلية:** `python -m http.server` من جذر `interactive/` ثم افتح `/index.html` (أو Live Server).

## 🔌 الـ endpoints لكل شاشة
انظر [`../../39-Super-Admin-Screens-Plan.md`](../../39-Super-Admin-Screens-Plan.md) (شاشات المنصة) و [`../../38-UI-Screens-Build-Plan.md`](../../38-UI-Screens-Build-Plan.md) (الخطة الكاملة) — كل شاشة موثّقة بـ endpoint حقيقي أعلى ملفها.
