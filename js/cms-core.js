"use strict";

/**
 * Lokal CMS yadrosi — admin, sayt va blog bir xil store dan o'qiydi.
 * Supabase shart emas.
 */
(function (global) {
  const STORAGE_KEY = "portfolio_cms_v1";
  const SESSION_KEY = "portfolio_admin_session";
  const SEED_URLS = ["/data/cms.json", "../data/cms.json", "./data/cms.json"];

  const FALLBACK_SEED = {
    projects: [
      {
        id: "p-mixel",
        slug: "mixel-uz",
        sort_order: 1,
        title_uz: "Mixel.uz",
        title_ru: "Mixel.uz",
        title_en: "Mixel.uz",
        desc_uz: "Zamonaviy e-commerce veb-sayt — mahsulotlar, savat va responsive dizayn.",
        desc_ru: "Современный e-commerce сайт — товары, корзина и адаптивный дизайн.",
        desc_en: "Modern e-commerce site — products, cart and responsive design.",
        tech: ["React", "CSS", "API"],
        image_url: "./images/portfolio/portfolio-1.webp",
        github_url: "https://github.com/Mirmahmudov/mixel.uz",
        live_url: "https://mixel-uz-eight.vercel.app/",
        is_private: false,
        is_featured: true,
        published: true,
      },
      {
        id: "p-movie",
        slug: "movie",
        sort_order: 2,
        title_uz: "Movie App",
        title_ru: "Movie App",
        title_en: "Movie App",
        desc_uz: "Filmlar katalogi, qidiruv va batafsil sahifalar.",
        desc_ru: "Каталог фильмов, поиск и детальные страницы.",
        desc_en: "Movie catalog with search and detail pages.",
        tech: ["React", "API"],
        image_url: "./images/portfolio/portfolio-2.webp",
        github_url: "https://github.com/Mirmahmudov/movie",
        live_url: "https://movie-rho-flame.vercel.app/",
        is_private: false,
        is_featured: false,
        published: true,
      },
      {
        id: "p-country",
        slug: "country",
        sort_order: 3,
        title_uz: "Country Explorer",
        title_ru: "Country Explorer",
        title_en: "Country Explorer",
        desc_uz: "Davlatlar ma'lumoti, filtrlash va qidiruv.",
        desc_ru: "Информация о странах, фильтры и поиск.",
        desc_en: "Country data with filters and search.",
        tech: ["React", "REST API"],
        image_url: "./images/portfolio/portfolio-3.webp",
        github_url: "https://github.com/Mirmahmudov/country",
        live_url: "https://country-gamma-three.vercel.app/",
        is_private: false,
        is_featured: false,
        published: true,
      },
      {
        id: "p-crm",
        slug: "crm",
        sort_order: 4,
        title_uz: "CRM Dashboard",
        title_ru: "CRM Dashboard",
        title_en: "CRM Dashboard",
        desc_uz: "Mijozlar va vazifalarni boshqarish paneli.",
        desc_ru: "Панель управления клиентами и задачами.",
        desc_en: "Client and task management dashboard.",
        tech: ["React", "CSS"],
        image_url: "./images/portfolio/portfolio-4.webp",
        github_url: "https://github.com/Mirmahmudov/crm",
        live_url: "https://crm-ten-ruby.vercel.app/",
        is_private: false,
        is_featured: false,
        published: true,
      },
      {
        id: "p-shop",
        slug: "exclusive-shop",
        sort_order: 5,
        title_uz: "Exclusive Shop",
        title_ru: "Exclusive Shop",
        title_en: "Exclusive Shop",
        desc_uz: "Onlayn do'kon interfeysi.",
        desc_ru: "Интерфейс интернет-магазина.",
        desc_en: "Online shop interface.",
        tech: ["React", "CSS"],
        image_url: "./images/portfolio/portfolio-5.webp",
        github_url: "https://github.com/Mirmahmudov/ExclusiveShop",
        live_url: "https://exclusive-shop-ten.vercel.app/",
        is_private: false,
        is_featured: false,
        published: true,
      },
      {
        id: "p-devfinder",
        slug: "devfinder",
        sort_order: 6,
        title_uz: "DevFinder",
        title_ru: "DevFinder",
        title_en: "DevFinder",
        desc_uz: "GitHub foydalanuvchilarini qidirish.",
        desc_ru: "Поиск пользователей GitHub.",
        desc_en: "Search GitHub users.",
        tech: ["React", "API"],
        image_url: "./images/portfolio/portfolio-6.webp",
        github_url: "https://github.com/Mirmahmudov/devfinder",
        live_url: "https://devfinder-three-theta.vercel.app/",
        is_private: false,
        is_featured: false,
        published: true,
      },
      {
        id: "p-jarvis",
        slug: "jarvis",
        sort_order: 7,
        title_uz: "Jarvis",
        title_ru: "Jarvis",
        title_en: "Jarvis",
        desc_uz: "Interaktiv UI tajribasi.",
        desc_ru: "Интерактивный UI-опыт.",
        desc_en: "Interactive UI experience.",
        tech: ["JavaScript", "CSS"],
        image_url: "./images/portfolio/portfolio-7.webp",
        github_url: "https://github.com/Mirmahmudov/Jarvis",
        live_url: "https://jarvis-pied-five.vercel.app/",
        is_private: false,
        is_featured: false,
        published: true,
      },
      {
        id: "p-music",
        slug: "music-player",
        sort_order: 8,
        title_uz: "Music Player",
        title_ru: "Music Player",
        title_en: "Music Player",
        desc_uz: "Brauzerda musiqa pleyeri.",
        desc_ru: "Музыкальный плеер в браузере.",
        desc_en: "In-browser music player.",
        tech: ["JavaScript", "CSS"],
        image_url: "./images/portfolio/portfolio-8.webp",
        github_url: "https://github.com/Mirmahmudov/Music-Player",
        live_url: "https://music-player-iota-plum.vercel.app/",
        is_private: false,
        is_featured: false,
        published: true,
      },
      {
        id: "p-halloween",
        slug: "halloween",
        sort_order: 9,
        title_uz: "Halloween",
        title_ru: "Halloween",
        title_en: "Halloween",
        desc_uz: "Mavzuli landing page.",
        desc_ru: "Тематический лендинг.",
        desc_en: "Themed landing page.",
        tech: ["HTML", "CSS", "JS"],
        image_url: "./images/portfolio/portfolio-9.webp",
        github_url: "https://github.com/Mirmahmudov/Halloween",
        live_url: "https://halloween-rust.vercel.app/",
        is_private: false,
        is_featured: false,
        published: true,
      },
      {
        id: "p-gamification-1",
        slug: "gamification-login",
        sort_order: 10,
        title_uz: "Gamification — Login",
        title_ru: "Gamification — Login",
        title_en: "Gamification — Login",
        desc_uz: "Maxfiy gamification loyihasi (live yo'q).",
        desc_ru: "Закрытый gamification проект (без live).",
        desc_en: "Private gamification project (no live).",
        tech: ["React", "Node"],
        image_url: "./images/portfolio/gamification-1-login.webp",
        github_url: null,
        live_url: null,
        is_private: true,
        is_featured: true,
        published: true,
      },
      {
        id: "p-gamification-2",
        slug: "gamification-dashboard",
        sort_order: 11,
        title_uz: "Gamification — Dashboard",
        title_ru: "Gamification — Dashboard",
        title_en: "Gamification — Dashboard",
        desc_uz: "Maxfiy gamification dashboard (live yo'q).",
        desc_ru: "Закрытый gamification dashboard (без live).",
        desc_en: "Private gamification dashboard (no live).",
        tech: ["React", "API"],
        image_url: "./images/portfolio/gamification-2-dashboard.webp",
        github_url: null,
        live_url: null,
        is_private: true,
        is_featured: true,
        published: true,
      },
    ],
    posts: [
      {
        id: "b1",
        slug: "frontend-teaching",
        sort_order: 1,
        tag_uz: "Mentorlik",
        tag_ru: "Менторство",
        tag_en: "Mentoring",
        title_uz: "Frontend o'qitish menga nima o'rgatdi",
        title_ru: "Чему меня научило преподавание frontend",
        title_en: "What teaching frontend taught me",
        excerpt_uz: "O'quvchilarga tushuntirish orqali o'zim ham chuqurroq tushunib oldim.",
        excerpt_ru: "Объясняя ученикам, я сам глубже понял материал.",
        excerpt_en: "Teaching others helped me understand the craft more deeply.",
        body_uz:
          "Mentorlik jarayonida oddiy savollar eng murakkab tushunchalarni ochib beradi. Men kodni nafaqat yozish, balki tushuntirishni ham o'rgandim. Bu portfolio va real loyihalarda sifatni oshirdi.",
        body_ru:
          "В процессе менторства простые вопросы раскрывают сложные темы. Я научился не только писать код, но и объяснять его.",
        body_en:
          "Mentoring shows how simple questions unlock complex ideas. I learned to explain code as well as write it.",
        published_at: "2025-11-12",
        published: true,
      },
      {
        id: "b2",
        slug: "gamification-system",
        sort_order: 2,
        tag_uz: "Loyihalar",
        tag_ru: "Проекты",
        tag_en: "Projects",
        title_uz: "Real gamification tizimini qurish",
        title_ru: "Как я строил реальную систему геймификации",
        title_en: "Building a real gamification system",
        excerpt_uz: "Ballar, darajalar va motivatsiya mexanikasi haqida amaliy tajriba.",
        excerpt_ru: "Практический опыт с баллами, уровнями и механикой мотивации.",
        excerpt_en: "Practical experience with points, levels and motivation mechanics.",
        body_uz:
          "Gamification tizimida foydalanuvchi xatti-harakatini o'lchash va mukofotlash muhim. UI, API va holat boshqaruvi birga ishlashi kerak.",
        body_ru:
          "В геймификации важно измерять и вознаграждать действия. UI, API и state должны работать вместе.",
        body_en:
          "Gamification needs measuring and rewarding behavior. UI, API and state must work together.",
        published_at: "2026-02-20",
        published: true,
      },
      {
        id: "b3",
        slug: "react-structure",
        sort_order: 3,
        tag_uz: "React",
        tag_ru: "React",
        tag_en: "React",
        title_uz: "React loyihalarini qanday tuzaman",
        title_ru: "Как я структурирую React-проекты",
        title_en: "How I structure React projects",
        excerpt_uz: "Papkalar, komponentlar va o'sishga tayyor arxitektura.",
        excerpt_ru: "Папки, компоненты и архитектура, готовая к росту.",
        excerpt_en: "Folders, components and architecture that scales.",
        body_uz:
          "Kichik loyihalarda oddiy struktura yetarli. Loyiha o'sganda feature-based yondashuv va aniq chegaralar yordam beradi.",
        body_ru:
          "В маленьких проектах достаточно простой структуры. При росте помогает feature-based подход.",
        body_en:
          "Small projects need simple structure. As they grow, feature-based boundaries help.",
        published_at: "2026-05-08",
        published: true,
      },
    ],
    profile: {
      id: 1,
      full_name: "Asadbek Mirmahmudov",
      phone: "+998 91 344 44 68",
      email: "asadbekmirmahmudov3@gmail.com",
      telegram: "https://t.me/MirmahmudovAsadbek",
      linkedin: "https://www.linkedin.com/in/asadbek-mirmahmudov-744b94282/",
      github: "https://github.com/Mirmahmudov",
      website: "https://bekportfoliosite.netlify.app/",
      birthday: "2003-09-23",
      city_uz: "Chust, Namangan",
      city_ru: "Чуст, Наманган",
      city_en: "Chust, Namangan",
      degree_uz: "Bakalavr — Kompyuter injiniringi",
      degree_ru: "Бакалавр — Компьютерная инженерия",
      degree_en: "Bachelor's — Computer Engineering",
      freelance_uz: "Mavjud",
      freelance_ru: "Доступен",
      freelance_en: "Available",
      role_uz: "Frontend dasturchi",
      role_ru: "Frontend-разработчик",
      role_en: "Frontend Developer",
      home_bio_uz: "",
      home_bio_ru: "",
      home_bio_en: "",
      about_p1_uz: "",
      about_p1_ru: "",
      about_p1_en: "",
      about_p2_uz: "",
      about_p2_ru: "",
      about_p2_en: "",
    },
  };

  function empty() {
    return { projects: [], posts: [], profile: null };
  }

  function normalize(data) {
    if (!data || typeof data !== "object") return empty();
    return {
      projects: Array.isArray(data.projects) ? data.projects : [],
      posts: Array.isArray(data.posts) ? data.posts : [],
      profile: data.profile || null,
    };
  }

  function isEmpty(data) {
    const d = data || empty();
    return !d.projects.length && !d.posts.length;
  }

  const store = {
    key: STORAGE_KEY,
    sessionKey: SESSION_KEY,
    _seedPromise: null,

    read() {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return empty();
        return normalize(JSON.parse(raw));
      } catch {
        return empty();
      }
    },

    write(data) {
      const n = normalize(data);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(n));
      try {
        global.dispatchEvent(new CustomEvent("cms:updated", { detail: n }));
      } catch {
        /* ignore */
      }
      return n;
    },

    saveProjects(projects) {
      const d = this.read();
      d.projects = projects;
      return this.write(d);
    },

    savePosts(posts) {
      const d = this.read();
      d.posts = posts;
      return this.write(d);
    },

    saveProfile(profile) {
      const d = this.read();
      d.profile = profile;
      return this.write(d);
    },

    isEmpty(data) {
      return isEmpty(data || this.read());
    },

    async ensureSeeded(force) {
      if (!force && !this.isEmpty()) return this.read();
      if (this._seedPromise && !force) return this._seedPromise;

      this._seedPromise = (async () => {
        // Prefer file seed
        for (const url of SEED_URLS) {
          try {
            const res = await fetch(url + (url.includes("?") ? "&" : "?") + "t=" + Date.now(), {
              cache: "no-store",
            });
            if (!res.ok) continue;
            const json = normalize(await res.json());
            if (!isEmpty(json)) {
              if (force || this.isEmpty()) this.write(json);
              return this.read();
            }
          } catch {
            /* try next */
          }
        }
        // Inline fallback
        if (force || this.isEmpty()) this.write(FALLBACK_SEED);
        return this.read();
      })();

      try {
        return await this._seedPromise;
      } finally {
        this._seedPromise = null;
      }
    },

    async load() {
      await this.ensureSeeded(false);
      return this.read();
    },

    exportJson() {
      return JSON.stringify(this.read(), null, 2);
    },

    importJson(text) {
      const data = normalize(JSON.parse(text));
      if (isEmpty(data) && !data.profile) {
        throw new Error("Bo'sh yoki noto'g'ri JSON");
      }
      this.write(data);
      return this.read();
    },

    resetToSeed() {
      return this.ensureSeeded(true);
    },
  };

  // Auth helpers for admin
  const AUTH = {
    users: [
      { login: "admin", password: "admin123", email: "admin" },
      { login: "admin@local", password: "admin123", email: "admin@local" },
    ],
    login(login, password) {
      const l = String(login || "").trim().toLowerCase();
      const p = String(password || "");
      const u = this.users.find(
        (x) => x.login.toLowerCase() === l && x.password === p
      );
      if (!u) return null;
      const session = { email: u.email, mode: "local", at: Date.now() };
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
      return session;
    },
    logout() {
      sessionStorage.removeItem(SESSION_KEY);
    },
    session() {
      try {
        const raw = sessionStorage.getItem(SESSION_KEY);
        return raw ? JSON.parse(raw) : null;
      } catch {
        return null;
      }
    },
  };

  global.CMS_STORAGE_KEY = STORAGE_KEY;
  global.CMS_SESSION_KEY = SESSION_KEY;
  global.CMS_SEED_URL = "/data/cms.json";
  global.cmsStore = store;
  global.cmsAuth = AUTH;
  global.CMS_FALLBACK_SEED = FALLBACK_SEED;
})(typeof window !== "undefined" ? window : globalThis);
