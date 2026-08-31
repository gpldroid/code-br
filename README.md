# QR Pro Tools — brcode.online

موقع Static احترافي لإنشاء وفحص رموز QR، مبني للعمل مباشرة على GitHub Pages أو Cloudflare Pages.

## الوظائف
- إنشاء QR للرابط والنص وWi‑Fi وVCard وWhatsApp والبريد الإلكتروني.
- فحص QR بالكاميرا أو من صورة.
- تحميل QR بصيغة PNG بعد الإنشاء.
- العربية والإنجليزية عبر JavaScript مع حفظ اللغة.
- RTL/LTR تلقائي.
- Dark / Light Mode مع حفظ الاختيار.
- Back to Top.
- إشعارات Toast وإدارة Cookie consent.
- صفحات منظمة: من نحن، اتصل بنا، سياسة الخصوصية، سياسة الاستخدام، وخريطة الموقع.
- SEO: title, description, keywords, canonical, hreflang, Open Graph, robots وXML sitemap.
- AdSense وGoogle Analytics الموجودان للموقع.
- Responsive design للموبايل والكمبيوتر.

## البنية
- `index.html` — التطبيق الرئيسي.
- `assets/app.js` — وظائف QR والماسح واللغة والثيم.
- `assets/style.css` — التصميم المتجاوب.
- `assets/pages.js` — اللغة والثيم للصفحات الداخلية.
- `sitemap.xml` — خريطة XML لمحركات البحث.
- `sitemap.html` — خريطة مرئية للمستخدم.
- `_headers` و`_redirects` — إعدادات Cloudflare Pages.

## Cloudflare Pages
اربط المستودع بـ Cloudflare Pages، اترك Build command فارغًا، واجعل Output directory هو جذر المشروع (`.`). لا توجد حاجة إلى Node.js أو عملية Build.

## GitHub Pages
فعّل Pages من فرع `main` ومن مجلد الجذر.
