# Portfolio — Asadbek Mirmahmudov

HTML / CSS / JS portfolio + **Admin CMS** (bo‘limli sahifalar).  
Tillar: **UZ · RU · EN**. Dark mode, motion, Telegram forma.

## Ishga tushirish

```bash
npm run start
```

| | URL |
|--|-----|
| Sayt | http://localhost:5500/ |
| **Admin login** | http://localhost:5500/admin/ |

### Admin
```
Login: admin
Parol: admin123
```
Yoki **Tezkor kirish**.

### Admin bo‘limlari
| Sahifa | Vazifa |
|--------|--------|
| `/admin/` | Login |
| `/admin/dashboard.html` | Statistika |
| `/admin/projects.html` | Portfolio CRUD |
| `/admin/blog.html` | Blog CRUD |
| `/admin/profile.html` | Profil |
| `/admin/tools.html` | JSON eksport/import/seed |

## Production

1. Admin da kontent tayyorlang  
2. **Vositalar → JSON eksport**  
3. `data/cms.json` ni almashtiring  
4. Netlify deploy (publish = `.`)  
5. Env: `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`

## Telegram (lokal)

```bash
npm run dev
```

## Struktura

```
index.html
admin/          login + dashboard + projects + blog + profile + tools
blog/post.html
css/  js/  data/cms.json
netlify/functions/contact.js
```

Batafsil: [HISOBOT.md](./HISOBOT.md)
