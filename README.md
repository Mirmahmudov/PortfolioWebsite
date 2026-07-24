# Portfolio — Asadbek Mirmahmudov

Shaxsiy portfolio: HTML, CSS, JavaScript. 3 til (UZ / RU / EN), dark mode, motion, Telegram forma.

**Live:** https://bekportfoliosite.netlify.app/

## Tezkor ishga tushirish

```bash
# Sayt + Telegram proxy birga
npm run dev

# yoki alohida:
npm run start      # http://localhost:5500  ← PORTFOLIO SHU YERDA
npm run telegram   # http://127.0.0.1:8787  (faqat forma API, brauzerda ochilmaydi)
```

**Muhim:** `http://localhost:3000` boshqa loyiha (Aviora/NestJS) bo‘lishi mumkin — portfolio uchun **5500** portini oching.

Brauzerda: http://localhost:5500 → Contact → test xabar → `@asadbek_dev_bot`

## Nimalar bor

- UZ (default) / RU / EN — `localStorage`
- Dark / light + 5 rang
- Motion: orbs, reveal, magnetic tugmalar, skill barlar
- Kontakt → Telegram bot (`@asadbek_dev_bot`)
- CV: `Resume-UZ.pdf`, `Resume-EN.pdf`, `Resume-RU.pdf`
- Gamification loyihalari maxfiy (live yo‘q)
- Responsive: mobil, planshet, desktop

## Netlify deploy

1. Reponi Netlify’ga ulang (`publish` = root, `netlify.toml` tayyor).
2. **Environment variables:**
   - `TELEGRAM_BOT_TOKEN` — BotFather tokeni
   - `TELEGRAM_CHAT_ID` — `1723108222` (yoki o‘zingizniki)
3. Deploy qiling.
4. Live saytdan forma yuborib tekshiring.

Lokal `.env` faqat dev uchun (gitignore’da). Tokenni GitHub’ga commit qilmang.

## Resume yangilash

```bash
npm run resumes
```

## Struktura

```
index.html
css/          style.css, motion.css, skins/
js/           i18n.js, main.js, motion.js, style-switcher.js
netlify/functions/contact.js
scripts/      telegram-dev-server.mjs, build-resumes-pdf.mjs
images/       webp + CV PDF
```

## Kontakt

| | |
|--|--|
| Email | asadbekmirmahmudov3@gmail.com |
| Tel | +998 91 344 44 68 |
| Telegram | https://t.me/MirmahmudovAsadbek |
| Bot | https://t.me/asadbek_dev_bot |
| LinkedIn | https://www.linkedin.com/in/asadbek-mirmahmudov-744b94282/ |
| GitHub | https://github.com/Mirmahmudov |
