# Est8Core — شاشات الواجهة التفاعلية (Tailwind + Alpine)

> نماذج HTML تفاعلية مستقلة، **RTL**، بثيم **Trust & Authority** (كحلي `#0B1F3A` + ذهبي `#C8A24B`).
> الغرض: مرجع بصري + سلوكي للفرونت اند (Next.js) — كل صفحة موثّقة بـ endpoint حقيقي أعلى الملف.
> **Stack:** Tailwind (Play CDN، الـ config مضمّن) + Alpine.js v3. تُفتح مباشرةً عبر **Live Server**.

---

## 📁 الهيكل (مرتّب حسب السطح + بادئة رقمية تعكس التبعية)

```
interactive/
├── _shared/              ← أصول مشتركة (اللوجو الذهبي)
│   └── logo-gold.png
├── 1-marketing/          ← صفحات عامة قبل الدخول
│   ├── landing.html      ← الصفحة التسويقية (16 قسم + فيديو + roadmap)
│   └── changelog.html    ← سجل التحديثات (client-facing)
├── 2-auth/               ← مسار دخول الشركات (Tenant) — Wave 1
│   ├── register.html · login.html · verify-email.html · 2fa.html
│   └── forgot-password.html · reset-password.html · accept-invite.html
├── 3-platform-admin/     ← Super Admin (المنصة) — Wave 9 (11 شاشة)
│   ├── login.html        ← بوابة المنصة (standalone، خارج الـ shell)
│   ├── dashboard.html · tenants.html · tenant-detail.html
│   ├── plans.html · invoices.html · settings.html · audit-log.html
│   └── notifications.html · profile.html · admins.html (فريق المنصة)
└── 4-tenant-app/         ← (قادم) شاشات CRM داخل التطبيق (Wave 2+)
```

> **أدوات البناء** (ليست واجهة): `../_ds_build/admin/` — انظر "خط إنتاج المنصة" أدناه.

---

## 🔗 خريطة التبعيات (من → إلى)

**سطح التسويق + الدخول (Tenant):**
```
1-marketing/landing.html ──┬─→ 2-auth/register.html        (CTA: ابدأ مجاناً / أنشئ حسابك)
                           ├─→ 2-auth/login.html           (دخول)
                           ├─→ 1-marketing/changelog.html  (ما الجديد)
                           └─→ ../../../design/…/Launch Video.html  (iframe، autoplay عند الظهور)
1-marketing/changelog.html → landing.html · 2-auth/register.html

2-auth/  (حلقة مترابطة):
  login → register · forgot-password · 2fa (عند mfaRequired)
  register → login
  forgot-password → reset-password · login
  reset-password → login · forgot-password
  verify-email → login   ·   2fa → login   ·   accept-invite → login
```

**سطح المنصة (Super Admin) — منفصل تماماً (auth مستقل):**
```
3-platform-admin/login.html ─→ dashboard.html
dashboard ─┬─→ tenants ─→ tenant-detail        (sidebar + بطاقات + جدول)
           ├─→ plans · invoices · audit-log · settings
sidebar (كل الصفحات المُغلَّفة) ─→ dashboard·tenants·plans·invoices·settings·audit-log
```

> الطبقتان **لا تتقاطعان**: دخول الشركات (`2-auth`) جداوله `users` داخل schema الـ tenant · دخول المنصة (`3-platform-admin/login`) جدوله `admin_users` في الـ master DB. راجع `CLAUDE.md §2.5`.

---

## 🔌 الـ endpoints لكل شاشة (المصدر: `Server/Src` · موثّق في `.Pm/38` و `.Pm/39`)

| الشاشة | الـ Endpoint(s) الرئيسية |
|--------|---------------------------|
| 1-marketing/landing | `GET /api/v1/public/{plans,settings}` (عام، مكاش) |
| 2-auth/register | `POST /api/v1/tenant/register` |
| 2-auth/login | `POST /api/v1/auth/login` · `/auth/social/*` |
| 2-auth/2fa | `POST /api/v1/auth/verify-2fa` |
| 2-auth/verify-email | `POST /api/v1/auth/{verify-email,resend-verification}` |
| 2-auth/forgot-password | `POST /api/v1/auth/forgot-password[-otp]` |
| 2-auth/reset-password | `POST /api/v1/auth/reset-password[-otp]` |
| 2-auth/accept-invite | `POST /api/v1/users/accept-invite` |
| 3-platform-admin/login | `POST /api/v1/admin/auth/login` · `/admin/auth/verify-2fa` |
| 3-platform-admin/dashboard | `GET /api/v1/admin/dashboard` · `/admin/db-stats` · `/admin/diagnostics` · `/admin/platform/queues` |
| 3-platform-admin/tenants | `GET /api/v1/admin/tenants` · `POST .../:id/{suspend,activate,impersonate}` · `DELETE .../:id` |
| 3-platform-admin/tenant-detail | `GET /api/v1/admin/tenants/:id` · `/admin/billing/subscriptions/tenant/:id` · `/admin/billing/tenants/:id/usage` · `POST .../:id/{reprovision,override-limits,…}` |
| 3-platform-admin/plans | `GET/POST/PATCH/DELETE /api/v1/admin/billing/plans` · `/subscriptions` · `/coupons` |
| 3-platform-admin/invoices | `GET /api/v1/admin/billing/invoices[/pending]` · `POST .../:id/verify` · `/invoices/custom` · `/refunds` |
| 3-platform-admin/settings | `GET/PUT /api/v1/admin/settings/:group/:key` · `/admin/maintenance` · `/admin/platform/feature-flags` |
| 3-platform-admin/audit-log | `GET /api/v1/admin/audit` (diff مقروء + JSON viewer كامل) |
| 3-platform-admin/admins (فريق المنصة) | `GET/POST /api/v1/admin/admins` · `PUT .../:id` · `POST .../{activate,deactivate}` · `DELETE .../:id` (أدوار: super_admin/admin/support/billing/viewer) |
| 3-platform-admin/notifications | تنبيهات تشغيلية مشتقّة: `GET /admin/billing/invoices/pending` · `/admin/platform/queues` · `/admin/tenants?status=` |
| 3-platform-admin/profile | `GET /api/v1/admin/auth/me` · `POST /admin/2fa/{setup,enable,disable,backup-codes/regenerate}` |
| (مُخطَّط) الدعم الفني — Tickets | **لا backend بعد** — مواصفة الموديول في [`.Pm/40`](../../40-Support-Tickets-Module-Plan.md) |

---

## 🏭 خط إنتاج المنصة (HARD DRY)

شاشات `3-platform-admin/` المُغلَّفة (كل شيء ما عدا `login.html`) **مُجمَّعة حتمياً** لضمان أن الـ shell (الـ `<head>` + الـ sidebar + الـ topbar + مكتبة المكوّنات `.adm-*`) متطابق بايت-ببايت عبر كل الشاشات:

```
../_ds_build/admin/
├── shell-head.html       ← الـ <head> + Tailwind config + كل مكوّنات .adm-* + الـ sidebar/topbar (يمين، RTL)
├── shell-foot.html       ← إغلاق + shell() Alpine + active-nav + helpers (fmtNum/fmtMoney/fmtDate/timeAgo)
├── bodies/<id>.html      ← محتوى كل شاشة فقط (layout + markup + سكربت Alpine الخاص بها)
└── build-admin.mjs       ← يحقن shell-head + body + shell-foot → 3-platform-admin/<id>.html
```

**لإعادة البناء بعد أي تعديل:** `bun .Pm/design-system/_ds_build/admin/build-admin.mjs`

> القاعدة: أي مكوّن جديد يُضاف لـ `shell-head.html` `<style>` أولاً ثم يُستخدَم — **ممنوع اختراع مكوّن داخل شاشة**. (راجع memory `est8core-design-system`.)

---

## ▶️ المعاينة

افتح أي ملف عبر **Live Server** (لا file://) — مطلوب للفيديو (iframe) وعدّادات Alpine.
نقطتا الدخول: `1-marketing/landing.html` (العميل) · `3-platform-admin/login.html` (المنصة).
