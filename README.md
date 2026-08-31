# QR Pro Tools

Professional static QR generator and scanner website.

## Languages

- Arabic is the default language.
- English is available from the language button using the existing JavaScript translation system on the home page (`?lang=en`).
- English legal/about pages are also provided as dedicated crawlable pages: `about-en.html`, `contact-en.html`, `privacy-en.html`, and `terms-en.html`.

## Deployment

### Cloudflare Pages
Connect this repository to Cloudflare Pages. No build command is required. Use the repository root (`.`) as the output directory.

### GitHub Pages
Upload the repository contents to GitHub and enable Pages from the `main` branch root.

## Notes

The project is intentionally static: HTML, CSS, JavaScript and public assets only. Third-party CDN libraries are used for Font Awesome, Google Fonts, QRCode.js and html5-qrcode.
