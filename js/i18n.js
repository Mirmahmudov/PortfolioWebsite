"use strict";

/*
  Uch tilli tizim (uz / ru / en).

  HTML'da ishlatilishi:
    data-i18n="key"              -> elementning matni almashadi
    data-i18n-placeholder="key"  -> placeholder atributi almashadi
    data-i18n-aria-label="key"   -> aria-label atributi almashadi
    data-i18n-alt="key"          -> rasmning alt matni almashadi

  Yangi matn qo'shish uchun: quyidagi uchala tilga ham kalit qo'shing,
  keyin HTML'da data-i18n="o'sha_kalit" deb yozing.
*/

const TRANSLATIONS = {
  uz: {
    "meta.title": "Asadbek Mirmahmudov — Frontend Dasturchi",
    "meta.description":
      "Asadbek Mirmahmudov — Namangan, O'zbekistondan Frontend dasturchi va mentor. 2+ yil tajriba, React, JavaScript, TypeScript. Codial Academy o'qituvchisi. Frilansga ochiq.",

    "skip.link": "Asosiy qismga o'tish",

    "nav.home": "Bosh sahifa",
    "nav.about": "Men haqimda",
    "nav.services": "Xizmatlar",
    "nav.portfolio": "Portfolio",
    "nav.contact": "Aloqa",

    "home.hello": "Salom, mening ismim",
    "home.name": "Asadbek Mirmahmudov",
    "home.imA": "Men",
    "home.bio":
      "2 yildan ortiq tajribaga ega Frontend dasturchi va mentor. AsosIT va Raqamli Nazorat MCHJ da ishlayman, Codial Academy da dars beraman. React, JavaScript va TypeScript bilan to'liq veb-loyihalar yarataman.",
    "home.downloadCV": "CV yuklab olish",
    "home.heroAlt": "Asadbek Mirmahmudovning surati",

    "typed.1": "Frontend dasturchi",
    "typed.2": "React dasturchi",
    "typed.3": "Frontend o'qituvchi",
    "typed.4": "Frilanser",

    "about.title": "Men haqimda",
    "about.headingPrefix": "Men Asadbek Mirmahmudovman,",
    "about.headingRole": "Frontend dasturchi",
    "about.p1":
      "Farg'ona davlat texnika universitetini Kompyuter injiniringi yo'nalishi bo'yicha bakalavr (muhandis-dasturchi) sifatida tamomlaganman (GPA 4.54/5). Hozir AsosIT da Frontend dasturchi va loyiha menejeri, Raqamli Nazorat MCHJ da Frontend dasturchi, Codial Academy da Frontend o'qituvchisi bo'lib ishlayman.",
    "about.p2":
      "React, JavaScript, TypeScript, HTML/CSS (SCSS, Tailwind, Bootstrap), Git va Vite bilan ishlayman. Codial uchun Gamification V1/V2 (70+ va 100+ foydalanuvchi, admin dashboard, auksion) yaratganman. Frilans va yangi loyihalarga ochiqman.",

    "info.birthday": "Tug'ilgan sana",
    "info.birthdayValue": "23-sentabr, 2003",
    "info.age": "Yosh",
    "info.website": "Veb-sayt",
    "info.email": "Email",
    "info.degree": "Ma'lumot",
    "info.degreeValue": "Bakalavr — Kompyuter injiniringi",
    "info.phone": "Telefon",
    "info.city": "Shahar",
    "info.cityValue": "Chust, Namangan",
    "info.freelance": "Frilans",
    "info.freelanceValue": "Mavjud",
    "info.hireMe": "Ishga taklif qilish",

    "edu.title": "Ta'lim",
    "edu1.date": "2021 — 2025",
    "edu1.title": "Farg'ona davlat texnika universiteti — Bakalavr",
    "edu1.text":
      "Kompyuter injiniringi yo'nalishi. Kvalifikatsiya: muhandis-dasturchi. Diplom: 30.06.2025. GPA: 4.54/5. Bitiruv ishi: «CODIAL COIN» o'quv markaz baholash tizimini loyihalash.",
    "edu2.date": "Mart 2023 — Dekabr 2023",
    "edu2.title": "Codial Academy — Frontend dasturlash kursi",
    "edu2.text":
      "React va UI muhandisligiga yo'naltirilgan intensiv amaliy kurs. Frontend asoslari va real loyiha ishlari.",

    "exp.title": "Tajriba",
    "exp1.date": "2026 — hozirgacha",
    "exp1.title": "Frontend dasturchi va loyiha menejeri — AsosIT",
    "exp1.text":
      "Frontend ishlanmalarni olib boraman va loyiha jarayonini muvofiqlashtiraman: vazifalarni rejalashtirish, jamoa bilan ishlash, muddat va sifat nazorati. React asosida zamonaviy interfeyslar yarataman.",
    "exp2.date": "2026 — hozirgacha",
    "exp2.title": "Frontend dasturchi — Raqamli Nazorat MCHJ",
    "exp2.text":
      "Kompaniya mahsulotlari uchun moslashuvchan veb-interfeyslar ishlab chiqaman. React va JavaScript yordamida foydalanuvchi interfeysi, komponentlar va API integratsiya.",
    "exp3.date": "Yanvar 2024 — hozirgacha",
    "exp3.title": "Frontend o'qituvchi — Codial Academy, Farg'ona",
    "exp3.text":
      "2024 boshida yordamchi o'qituvchi, 2025-yil iyulidan to'liq Frontend o'qituvchisi. Amaliy mashg'ulotlar, UI komponentlar, API, UX va talabalarni ish/suhbatga tayyorlash.",
    "exp4.date": "2025 — 2026",
    "exp4.title": "Codial Gamification tizimlari (V1 va V2)",
    "exp4.text":
      "V1 (React, CSS) — 70+ foydalanuvchi. V2 (React, Tailwind) — 100+ foydalanuvchi, multi-role, admin dashboard, auksion, statistika. Real ishlab turgan ichki tizim (havola maxfiy).",

    "services.title": "Xizmatlar",
    "services.web.title": "Veb-sayt ishlab chiqish",
    "services.web.desc":
      "Biznes va shaxsiy brend uchun zamonaviy, tezkor va SEO ga mos landing hamda ko'p sahifali saytlar.",
    "services.spa.title": "React SPA",
    "services.spa.desc":
      "Komponentlarga asoslangan bir sahifali ilovalar: qulay navigatsiya, API integratsiya va qayta ishlatiladigan UI.",
    "services.ui.title": "UI / Responsive dizayn",
    "services.ui.desc":
      "Dizaynni piksel aniqligida kodga o'tkazish — telefon, planshet va desktopda bir xil sifat.",
    "services.js.title": "JavaScript",
    "services.js.desc":
      "Interaktiv interfeyslar, REST API integratsiyasi va zamonaviy ES6+ uslubida yozilgan toza mantiq.",
    "services.react.title": "React",
    "services.react.desc":
      "Hooklar, routing va komponent arxitekturasi bilan barqaror frontend yechimlar.",
    "services.mentor.title": "Frontend mentorlik",
    "services.mentor.desc":
      "Codial Academy tajribasi asosida HTML, CSS, JS va React bo'yicha dars va mentoring.",

    "portfolio.title": "Portfolio",
    "portfolio.heading": "Mening loyihalarim",
    "portfolio.code": "Kod",
    "portfolio.live": "Sayt",
    "portfolio.private": "Maxfiy loyiha",

    "g2.title": "Codial Gamification V2",
    "g2.desc":
      "100+ foydalanuvchili multi-role tizim: admin dashboard, statistika, auksion, o'quvchi/ustoz/admin rollari. React + Tailwind. (Real mijoz loyihasi — live ochiq emas.)",
    "g2.alt": "Codial Gamification V2 admin dashboard skrinshoti",
    "g1.title": "Codial Gamification V1",
    "g1.desc":
      "O'quvchilar va ustozlar uchun gamification platformasi — 70+ foydalanuvchi. React + CSS. (Real mijoz loyihasi — live ochiq emas.)",
    "g1.alt": "Codial Gamification V1 kirish sahifasi skrinshoti",

    "p1.title": "Mixel.uz",
    "p1.desc": "Korporativ sayt uchun landing sahifa.",
    "p1.alt": "Mixel.uz saytining skrinshoti",
    "p2.title": "Movie App",
    "p2.desc": "Kinolarni API orqali qidirish va ko'rish.",
    "p2.alt": "Movie ilovasining skrinshoti",
    "p3.title": "Country Explorer",
    "p3.desc": "Davlatlarni qidirish va mintaqa bo'yicha ma'lumot ko'rish.",
    "p3.alt": "Country ilovasining skrinshoti",
    "p4.title": "CRM Dashboard",
    "p4.desc": "Jadval, forma va grafiklarga ega admin panel.",
    "p4.alt": "CRM boshqaruv panelining skrinshoti",
    "p5.title": "Exclusive Shop",
    "p5.desc": "Savat va mahsulot sahifalariga ega onlayn do'kon.",
    "p5.alt": "Exclusive Shop onlayn do'konining skrinshoti",
    "p6.title": "DevFinder",
    "p6.desc": "GitHub foydalanuvchilarini qidirish va profilini ko'rish.",
    "p6.alt": "DevFinder ilovasining skrinshoti",
    "p7.title": "Jarvis",
    "p7.desc": "Ovozli yordamchi uslubidagi interfeys tajribasi.",
    "p7.alt": "Jarvis loyihasining skrinshoti",
    "p8.title": "Music Player",
    "p8.desc": "Pleylist va trek boshqaruviga ega audio pleyer.",
    "p8.alt": "Music Player ilovasining skrinshoti",
    "p9.title": "Halloween Landing",
    "p9.desc": "CSS animatsiyalari bilan bezatilgan mavzuli landing.",
    "p9.alt": "Halloween landing sahifasining skrinshoti",

    "contact.title": "Aloqa",
    "contact.q1": "Savollaringiz bormi?",
    "contact.sub1": "XIZMATINGIZGA TAYYORMAN",
    "contact.callMe": "Qo'ng'iroq qiling",
    "contact.location": "Manzil",
    "contact.locationValue": "Chust, Namangan, O'zbekiston",
    "contact.email": "Email",
    "contact.github": "GitHub",
    "contact.telegram": "Telegram",
    "contact.linkedin": "LinkedIn",
    "contact.q2": "MENGA XAT YOZING",
    "contact.sub2": "XABAR TELEGRAMGA KELADI",
    "contact.viaTelegram": "Xabar to'g'ridan-to'g'ri Telegram botimga yuboriladi",
    "contact.name": "Ism",
    "contact.emailPh": "Email",
    "contact.subject": "Mavzu",
    "contact.message": "Xabar",
    "contact.send": "Telegramga yuborish",
    "contact.labelName": "Ismingiz",
    "contact.labelEmail": "Emailingiz",
    "contact.labelSubject": "Mavzu",
    "contact.labelMessage": "Xabar",

    "form.notConfigured":
      "Forma sozlanmoqda. Iltimos, to'g'ridan-to'g'ri Telegram yoki email orqali yozing.",
    "form.sending": "Telegramga yuborilmoqda…",
    "form.success": "Rahmat! Xabaringiz Telegramga yuborildi.",
    "form.error":
      "Xatolik yuz berdi. Iltimos, @MirmahmudovAsadbek ga yozing yoki email yuboring.",
    "form.validation": "Iltimos, barcha maydonlarni to'g'ri to'ldiring.",
    "form.localHint":
      "Lokal server kerak: terminalda «node scripts/telegram-dev-server.mjs» ni ishga tushiring, keyin qayta yuboring.",

    "a11y.scrollTop": "Yuqoriga qaytish",
    "switcher.themeColors": "Mavzu ranglari",
    "switcher.language": "Til",
    "switcher.toggleColors": "Rang panelini ochish",
    "switcher.toDark": "Qorong'i rejimga o'tish",
    "switcher.toLight": "Yorug' rejimga o'tish",
    "switcher.toggleMenu": "Menyuni ochish/yopish",
    "switcher.colorRed": "Qizil mavzu",
    "switcher.colorOrange": "To'q sariq mavzu",
    "switcher.colorGreen": "Yashil mavzu",
    "switcher.colorBlue": "Ko'k mavzu",
    "switcher.colorPink": "Pushti mavzu",
  },

  ru: {
    "meta.title": "Асадбек Мирмахмудов — Frontend-разработчик",
    "meta.description":
      "Асадбек Мирмахмудов — Frontend-разработчик и ментор из Намангана, Узбекистан. 2+ года опыта, React, JavaScript, TypeScript. Преподаватель Codial Academy. Открыт для фриланса.",

    "skip.link": "Перейти к содержимому",

    "nav.home": "Главная",
    "nav.about": "Обо мне",
    "nav.services": "Услуги",
    "nav.portfolio": "Портфолио",
    "nav.contact": "Контакты",

    "home.hello": "Привет, меня зовут",
    "home.name": "Асадбек Мирмахмудов",
    "home.imA": "Я —",
    "home.bio":
      "Frontend-разработчик и ментор с опытом более 2 лет. Работаю в AsosIT и Raqamli Nazorat MCHJ, преподаю в Codial Academy. Создаю веб-приложения на React, JavaScript и TypeScript.",
    "home.downloadCV": "Скачать резюме",
    "home.heroAlt": "Портрет Асадбека Мирмахмудова",

    "typed.1": "Frontend-разработчик",
    "typed.2": "React-разработчик",
    "typed.3": "Преподаватель Frontend",
    "typed.4": "Фрилансер",

    "about.title": "Обо мне",
    "about.headingPrefix": "Я Асадбек Мирмахмудов,",
    "about.headingRole": "Frontend-разработчик",
    "about.p1":
      "Окончил бакалавриат Ферганского государственного технического университета по направлению «Компьютерная инженерия» (инженер-программист, GPA 4.54/5). Работаю Frontend-разработчиком и project manager в AsosIT, Frontend-разработчиком в Raqamli Nazorat MCHJ и преподавателем Frontend в Codial Academy.",
    "about.p2":
      "Стек: React, JavaScript, TypeScript, HTML/CSS (SCSS, Tailwind, Bootstrap), Git, Vite. Разработал Codial Gamification V1/V2 (70+ и 100+ пользователей, admin dashboard, аукцион). Открыт для фриланса и новых проектов.",

    "info.birthday": "Дата рождения",
    "info.birthdayValue": "23 сентября 2003",
    "info.age": "Возраст",
    "info.website": "Сайт",
    "info.email": "Эл. почта",
    "info.degree": "Образование",
    "info.degreeValue": "Бакалавр — Компьютерная инженерия",
    "info.phone": "Телефон",
    "info.city": "Город",
    "info.cityValue": "Чуст, Наманган",
    "info.freelance": "Фриланс",
    "info.freelanceValue": "Доступен",
    "info.hireMe": "Нанять меня",

    "edu.title": "Образование",
    "edu1.date": "2021 — 2025",
    "edu1.title": "Ферганский гос. технический университет — Бакалавр",
    "edu1.text":
      "Направление: компьютерная инженерия. Квалификация: инженер-программист. Диплом: 30.06.2025. GPA: 4.54/5. Дипломная работа: проектирование системы оценки «CODIAL COIN».",
    "edu2.date": "Март 2023 — Декабрь 2023",
    "edu2.title": "Codial Academy — курс Frontend-разработки",
    "edu2.text":
      "Интенсивный практический курс с фокусом на React и UI-инженерию. Основы frontend и работа над реальными проектами.",

    "exp.title": "Опыт работы",
    "exp1.date": "2026 — настоящее время",
    "exp1.title": "Frontend-разработчик и project manager — AsosIT",
    "exp1.text":
      "Веду frontend-разработку и координирую проект: планирование задач, работа с командой, контроль сроков и качества. Создаю современные интерфейсы на React.",
    "exp2.date": "2026 — настоящее время",
    "exp2.title": "Frontend-разработчик — Raqamli Nazorat MCHJ",
    "exp2.text":
      "Разрабатываю адаптивные веб-интерфейсы для продуктов компании. React и JavaScript: UI, компоненты и интеграция с API.",
    "exp3.date": "Январь 2024 — настоящее время",
    "exp3.title": "Преподаватель Frontend — Codial Academy, Фергана",
    "exp3.text":
      "С начала 2024 — ассистент, с июля 2025 — полный Frontend-инструктор: практика, UI-компоненты, API, UX, подготовка к работе и собеседованиям.",
    "exp4.date": "2025 — 2026",
    "exp4.title": "Codial Gamification Systems (V1 и V2)",
    "exp4.text":
      "V1 (React, CSS) — 70+ пользователей. V2 (React, Tailwind) — 100+ пользователей, multi-role, admin dashboard, аукцион, статистика. Реальная внутренняя система (ссылка закрыта).",

    "services.title": "Услуги",
    "services.web.title": "Разработка сайтов",
    "services.web.desc":
      "Современные быстрые лендинги и многостраничные сайты для бизнеса и личного бренда, с учётом SEO.",
    "services.spa.title": "React SPA",
    "services.spa.desc":
      "Одностраничные приложения на компонентах: удобная навигация, API и переиспользуемый UI.",
    "services.ui.title": "UI / адаптивная вёрстка",
    "services.ui.desc":
      "Перенос дизайна в код с пиксельной точностью — одинаковое качество на телефоне, планшете и десктопе.",
    "services.js.title": "JavaScript",
    "services.js.desc":
      "Интерактивные интерфейсы, интеграция REST API и чистая логика на современном ES6+.",
    "services.react.title": "React",
    "services.react.desc":
      "Надёжные frontend-решения с хуками, роутингом и компонентной архитектурой.",
    "services.mentor.title": "Менторство Frontend",
    "services.mentor.desc":
      "Обучение HTML, CSS, JS и React — опыт преподавателя Codial Academy.",

    "portfolio.title": "Портфолио",
    "portfolio.heading": "Мои проекты",
    "portfolio.code": "Код",
    "portfolio.live": "Сайт",
    "portfolio.private": "Закрытый проект",

    "g2.title": "Codial Gamification V2",
    "g2.desc":
      "Система на 100+ пользователей: multi-role, admin dashboard, статистика, аукцион. React + Tailwind. (Реальный клиентский проект — live закрыт.)",
    "g2.alt": "Скриншот admin dashboard Codial Gamification V2",
    "g1.title": "Codial Gamification V1",
    "g1.desc":
      "Платформа геймификации для студентов и менторов — 70+ пользователей. React + CSS. (Реальный клиентский проект — live закрыт.)",
    "g1.alt": "Скриншот страницы входа Codial Gamification V1",

    "p1.title": "Mixel.uz",
    "p1.desc": "Лендинг корпоративного сайта.",
    "p1.alt": "Скриншот сайта Mixel.uz",
    "p2.title": "Movie App",
    "p2.desc": "Поиск и просмотр фильмов через API.",
    "p2.alt": "Скриншот приложения Movie",
    "p3.title": "Country Explorer",
    "p3.desc": "Поиск стран и просмотр данных по регионам.",
    "p3.alt": "Скриншот приложения Country",
    "p4.title": "CRM Dashboard",
    "p4.desc": "Админ-панель с таблицами, формами и графиками.",
    "p4.alt": "Скриншот CRM-панели",
    "p5.title": "Exclusive Shop",
    "p5.desc": "Интернет-магазин с корзиной и страницами товаров.",
    "p5.alt": "Скриншот интернет-магазина Exclusive Shop",
    "p6.title": "DevFinder",
    "p6.desc": "Поиск пользователей GitHub и просмотр их профилей.",
    "p6.alt": "Скриншот приложения DevFinder",
    "p7.title": "Jarvis",
    "p7.desc": "Эксперимент с интерфейсом голосового помощника.",
    "p7.alt": "Скриншот проекта Jarvis",
    "p8.title": "Music Player",
    "p8.desc": "Аудиоплеер с плейлистом и управлением треками.",
    "p8.alt": "Скриншот приложения Music Player",
    "p9.title": "Halloween Landing",
    "p9.desc": "Тематический лендинг с CSS-анимациями.",
    "p9.alt": "Скриншот лендинга Halloween",

    "contact.title": "Контакты",
    "contact.q1": "Остались вопросы?",
    "contact.sub1": "Я К ВАШИМ УСЛУГАМ",
    "contact.callMe": "Позвоните мне",
    "contact.location": "Локация",
    "contact.locationValue": "Чуст, Наманган, Узбекистан",
    "contact.email": "Эл. почта",
    "contact.github": "GitHub",
    "contact.telegram": "Telegram",
    "contact.linkedin": "LinkedIn",
    "contact.q2": "НАПИШИТЕ МНЕ",
    "contact.sub2": "СООБЩЕНИЕ ПРИДЁТ В TELEGRAM",
    "contact.viaTelegram": "Сообщение сразу уходит в мой Telegram-бот",
    "contact.name": "Имя",
    "contact.emailPh": "Эл. почта",
    "contact.subject": "Тема",
    "contact.message": "Сообщение",
    "contact.send": "Отправить в Telegram",
    "contact.labelName": "Ваше имя",
    "contact.labelEmail": "Ваша эл. почта",
    "contact.labelSubject": "Тема",
    "contact.labelMessage": "Сообщение",

    "form.notConfigured":
      "Форма настраивается. Напишите в Telegram или на почту.",
    "form.sending": "Отправка в Telegram…",
    "form.success": "Спасибо! Сообщение отправлено в Telegram.",
    "form.error":
      "Ошибка. Напишите @MirmahmudovAsadbek или на email.",
    "form.validation": "Пожалуйста, заполните все поля корректно.",
    "form.localHint":
      "Нужен локальный сервер: запустите «node scripts/telegram-dev-server.mjs», затем отправьте снова.",

    "a11y.scrollTop": "Наверх",
    "switcher.themeColors": "Цвета темы",
    "switcher.language": "Язык",
    "switcher.toggleColors": "Открыть выбор цвета",
    "switcher.toDark": "Включить тёмную тему",
    "switcher.toLight": "Включить светлую тему",
    "switcher.toggleMenu": "Открыть/закрыть меню",
    "switcher.colorRed": "Красная тема",
    "switcher.colorOrange": "Оранжевая тема",
    "switcher.colorGreen": "Зелёная тема",
    "switcher.colorBlue": "Синяя тема",
    "switcher.colorPink": "Розовая тема",
  },

  en: {
    "meta.title": "Asadbek Mirmahmudov — Frontend Developer",
    "meta.description":
      "Asadbek Mirmahmudov — Frontend Developer and mentor from Namangan, Uzbekistan. 2+ years experience with React, JavaScript, TypeScript. Instructor at Codial Academy. Open to freelance.",

    "skip.link": "Skip to content",

    "nav.home": "Home",
    "nav.about": "About",
    "nav.services": "Services",
    "nav.portfolio": "Portfolio",
    "nav.contact": "Contact",

    "home.hello": "Hello, my name is",
    "home.name": "Asadbek Mirmahmudov",
    "home.imA": "I'm a",
    "home.bio":
      "Frontend Developer and mentor with 2+ years of experience. I work at AsosIT and Raqamli Nazorat LLC, teach at Codial Academy, and build web apps with React, JavaScript, and TypeScript.",
    "home.downloadCV": "Download CV",
    "home.heroAlt": "Portrait of Asadbek Mirmahmudov",

    "typed.1": "Frontend Developer",
    "typed.2": "React Developer",
    "typed.3": "Frontend Instructor",
    "typed.4": "Freelancer",

    "about.title": "About Me",
    "about.headingPrefix": "I'm Asadbek Mirmahmudov and",
    "about.headingRole": "Frontend Developer",
    "about.p1":
      "I earned a Bachelor's degree in Computer Engineering (Engineer-programmer) from Fergana State Technical University (GPA 4.54/5). I work as Frontend Developer & Project Manager at AsosIT, Frontend Developer at Raqamli Nazorat LLC, and Frontend Instructor at Codial Academy.",
    "about.p2":
      "Stack: React, JavaScript, TypeScript, HTML/CSS (SCSS, Tailwind, Bootstrap), Git, and Vite. Built Codial Gamification V1/V2 (70+ and 100+ users, admin dashboard, auction). Open to freelance and new opportunities.",

    "info.birthday": "Birthday",
    "info.birthdayValue": "23 Sep 2003",
    "info.age": "Age",
    "info.website": "Website",
    "info.email": "Email",
    "info.degree": "Degree",
    "info.degreeValue": "Bachelor's — Computer Engineering",
    "info.phone": "Phone",
    "info.city": "City",
    "info.cityValue": "Chust, Namangan",
    "info.freelance": "Freelance",
    "info.freelanceValue": "Available",
    "info.hireMe": "Hire Me",

    "edu.title": "Education",
    "edu1.date": "2021 — 2025",
    "edu1.title": "Fergana State Technical University — Bachelor's",
    "edu1.text":
      "Field: Computer Engineering. Qualification: Engineer-programmer. Diploma issued 30 Jun 2025. GPA: 4.54/5. Graduation project: designing the evaluation system for “CODIAL COIN” training center.",
    "edu2.date": "Mar 2023 — Dec 2023",
    "edu2.title": "Codial Academy — Frontend Development Course",
    "edu2.text":
      "Intensive hands-on course focused on React and UI engineering. Frontend fundamentals and real project work.",

    "exp.title": "Experience",
    "exp1.date": "2026 — present",
    "exp1.title": "Frontend Developer & Project Manager — AsosIT",
    "exp1.text":
      "I lead frontend development and coordinate the project: task planning, teamwork, deadlines, and quality control. Building modern interfaces with React.",
    "exp2.date": "2026 — present",
    "exp2.title": "Frontend Developer — Raqamli Nazorat LLC",
    "exp2.text":
      "I build responsive web interfaces for company products using React and JavaScript — UI components and API integration.",
    "exp3.date": "Jan 2024 — present",
    "exp3.title": "Frontend Instructor — Codial Academy, Fergana",
    "exp3.text":
      "Started as assistant instructor in early 2024. Full Frontend Instructor since July 2025: hands-on training, UI components, API, UX, and job/interview prep.",
    "exp4.date": "2025 — 2026",
    "exp4.title": "Codial Gamification Systems (V1 & V2)",
    "exp4.text":
      "V1 (React, CSS) — 70+ users. V2 (React, Tailwind) — 100+ users, multi-role, admin dashboard, auction, stats. Real production system (link private).",

    "services.title": "Services",
    "services.web.title": "Website Development",
    "services.web.desc":
      "Modern, fast landing pages and multi-page sites for business and personal brands, with SEO in mind.",
    "services.spa.title": "React SPA",
    "services.spa.desc":
      "Component-based single-page apps: smooth navigation, API integration, and reusable UI.",
    "services.ui.title": "UI / Responsive Design",
    "services.ui.desc":
      "Pixel-accurate implementation of designs that look great on phone, tablet, and desktop.",
    "services.js.title": "JavaScript",
    "services.js.desc":
      "Interactive interfaces, REST API integration, and clean logic in modern ES6+.",
    "services.react.title": "React",
    "services.react.desc":
      "Solid frontend solutions with hooks, routing, and component architecture.",
    "services.mentor.title": "Frontend Mentoring",
    "services.mentor.desc":
      "Teaching HTML, CSS, JS, and React — based on Codial Academy instructor experience.",

    "portfolio.title": "Portfolio",
    "portfolio.heading": "My Projects",
    "portfolio.code": "Code",
    "portfolio.live": "Live",
    "portfolio.private": "Private project",

    "g2.title": "Codial Gamification V2",
    "g2.desc":
      "Multi-role system for 100+ users: admin dashboard, stats, auction, student/mentor/admin roles. React + Tailwind. (Real client project — live is private.)",
    "g2.alt": "Screenshot of Codial Gamification V2 admin dashboard",
    "g1.title": "Codial Gamification V1",
    "g1.desc":
      "Gamification platform for students and mentors — 70+ users. React + CSS. (Real client project — live is private.)",
    "g1.alt": "Screenshot of Codial Gamification V1 login page",

    "p1.title": "Mixel.uz",
    "p1.desc": "Corporate website landing page.",
    "p1.alt": "Screenshot of the Mixel.uz website",
    "p2.title": "Movie App",
    "p2.desc": "Browse and search films from a movie API.",
    "p2.alt": "Screenshot of the Movie app",
    "p3.title": "Country Explorer",
    "p3.desc": "Search countries and view details by region.",
    "p3.alt": "Screenshot of the Country info app",
    "p4.title": "CRM Dashboard",
    "p4.desc": "Admin panel with tables, forms and charts.",
    "p4.alt": "Screenshot of the CRM dashboard",
    "p5.title": "Exclusive Shop",
    "p5.desc": "E-commerce storefront with cart and product pages.",
    "p5.alt": "Screenshot of the Exclusive Shop e-commerce site",
    "p6.title": "DevFinder",
    "p6.desc": "Search GitHub users and view their profiles.",
    "p6.alt": "Screenshot of the DevFinder app",
    "p7.title": "Jarvis",
    "p7.desc": "Voice-assistant style interface experiment.",
    "p7.alt": "Screenshot of the Jarvis project",
    "p8.title": "Music Player",
    "p8.desc": "Audio player with playlist and track controls.",
    "p8.alt": "Screenshot of the Music Player app",
    "p9.title": "Halloween Landing",
    "p9.desc": "Themed landing page with CSS animations.",
    "p9.alt": "Screenshot of the Halloween landing page",

    "contact.title": "Contact Me",
    "contact.q1": "Have You Any Questions?",
    "contact.sub1": "I'M AT YOUR SERVICE",
    "contact.callMe": "Call Me On",
    "contact.location": "Location",
    "contact.locationValue": "Chust, Namangan, Uzbekistan",
    "contact.email": "Email",
    "contact.github": "GitHub",
    "contact.telegram": "Telegram",
    "contact.linkedin": "LinkedIn",
    "contact.q2": "SEND ME A MESSAGE",
    "contact.sub2": "DELIVERED TO MY TELEGRAM",
    "contact.viaTelegram": "Your message is sent straight to my Telegram bot",
    "contact.name": "Name",
    "contact.emailPh": "Email",
    "contact.subject": "Subject",
    "contact.message": "Message",
    "contact.send": "Send to Telegram",
    "contact.labelName": "Your name",
    "contact.labelEmail": "Your email",
    "contact.labelSubject": "Subject",
    "contact.labelMessage": "Message",

    "form.notConfigured":
      "Form is being set up. Please email me or message me on Telegram.",
    "form.sending": "Sending to Telegram…",
    "form.success": "Thanks! Your message was sent to Telegram.",
    "form.error":
      "Something went wrong. Message @MirmahmudovAsadbek or email me.",
    "form.validation": "Please fill in all fields correctly.",
    "form.localHint":
      "Local proxy needed: run «node scripts/telegram-dev-server.mjs», then try again.",

    "a11y.scrollTop": "Back to top",
    "switcher.themeColors": "Theme Colors",
    "switcher.language": "Language",
    "switcher.toggleColors": "Toggle colour picker",
    "switcher.toDark": "Switch to dark mode",
    "switcher.toLight": "Switch to light mode",
    "switcher.toggleMenu": "Toggle navigation menu",
    "switcher.colorRed": "Red theme",
    "switcher.colorOrange": "Orange theme",
    "switcher.colorGreen": "Green theme",
    "switcher.colorBlue": "Blue theme",
    "switcher.colorPink": "Pink theme",
  },
};

const SUPPORTED_LANGS = ["uz", "ru", "en"];
/* Birinchi tashrifda default — o'zbek tili */
const FALLBACK_LANG = "uz";

function detectLang() {
  try {
    const saved = localStorage.getItem("lang");
    if (saved && SUPPORTED_LANGS.includes(saved)) return saved;
  } catch (error) {
    /* localStorage bloklangan bo'lishi mumkin */
  }

  /* Saqlangan til bo'lmasa — o'zbekcha (foydalanuvchi tanlovi) */
  return FALLBACK_LANG;
}

const I18N = {
  lang: detectLang(),
  listeners: [],

  /* Kalit bo'yicha matn. Topilmasa — o'zbekchaga, u ham bo'lmasa kalitning o'ziga qaytadi. */
  t(key) {
    const dict = TRANSLATIONS[this.lang] || {};
    if (key in dict) return dict[key];

    const fallback = TRANSLATIONS[FALLBACK_LANG];
    if (fallback && key in fallback) {
      console.warn(`[i18n] "${key}" kaliti "${this.lang}" tilida yo'q`);
      return fallback[key];
    }

    const en = TRANSLATIONS.en;
    if (en && key in en) return en[key];

    console.warn(`[i18n] noma'lum kalit: "${key}"`);
    return key;
  },

  onChange(callback) {
    this.listeners.push(callback);
  },

  apply(lang) {
    if (!SUPPORTED_LANGS.includes(lang)) lang = FALLBACK_LANG;
    this.lang = lang;

    document.documentElement.setAttribute("lang", lang);
    document.title = this.t("meta.title");

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", this.t("meta.description"));

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      el.textContent = this.t(el.dataset.i18n);
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      el.setAttribute("placeholder", this.t(el.dataset.i18nPlaceholder));
    });
    document.querySelectorAll("[data-i18n-aria-label]").forEach((el) => {
      el.setAttribute("aria-label", this.t(el.dataset.i18nAriaLabel));
    });
    document.querySelectorAll("[data-i18n-alt]").forEach((el) => {
      el.setAttribute("alt", this.t(el.dataset.i18nAlt));
    });

    document.querySelectorAll(".lang-switcher [data-lang]").forEach((btn) => {
      const isActive = btn.dataset.lang === lang;
      btn.classList.toggle("active", isActive);
      btn.setAttribute("aria-pressed", String(isActive));
    });

    this.listeners.forEach((callback) => callback(lang));
  },

  set(lang) {
    this.apply(lang);
    try {
      localStorage.setItem("lang", lang);
    } catch (error) {
      /* saqlab bo'lmasa ham til baribir almashadi */
    }
  },
};

window.I18N = I18N;

/* Sahifa chizilishidan oldin qo'llaymiz — matn boshqa tilda "miltillab" ketmasligi uchun */
I18N.apply(I18N.lang);

document.querySelectorAll(".lang-switcher [data-lang]").forEach((btn) => {
  btn.addEventListener("click", () => I18N.set(btn.dataset.lang));
});
