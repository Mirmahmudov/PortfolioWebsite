"use strict";

/**
 * CMS sozlamalari.
 *
 * Muhim: Supabase jadvallari (schema.sql) hali yaratilmagan bo'lsa
 * `enabled: false` qoldiring — brauzerda 404 chiqmaydi.
 * Schema Run qilingach `enabled: true` qiling.
 */
window.SUPABASE_CONFIG = {
  /** false = faqat lokal CMS (localStorage + data/cms.json). 404 yo'q. */
  enabled: false,
  url: "https://mvekvbigjqtsygilalap.supabase.co",
  /**
   * Dashboard → Project Settings → API → anon / publishable key
   */
  anonKey: "sb_publishable_iTMv-CnN9neY-DNBibg5GA_HwR009Sw",
};

/** Lokal admin (Supabase user shart emas) */
window.LOCAL_ADMIN = {
  email: "admin",
  password: "admin123",
};

window.CMS_STORAGE_KEY = "portfolio_cms_v1";
window.CMS_SESSION_KEY = "portfolio_admin_session";
window.CMS_CLOUD_FLAG = "portfolio_cms_cloud_ok";
window.CMS_SEED_URL = "/data/cms.json";

/** Cloud o'chiq yoki jadvallar yo'q — REST chaqirilmasin */
window.supabaseCloud = {
  isEnabled() {
    return !!(window.SUPABASE_CONFIG && window.SUPABASE_CONFIG.enabled);
  },
  isKnownMissing() {
    if (!this.isEnabled()) return true;
    return localStorage.getItem(window.CMS_CLOUD_FLAG) !== "1";
  },
  isKnownReady() {
    if (!this.isEnabled()) return false;
    return localStorage.getItem(window.CMS_CLOUD_FLAG) === "1";
  },
  markMissing() {
    localStorage.setItem(window.CMS_CLOUD_FLAG, "0");
  },
  markReady() {
    localStorage.setItem(window.CMS_CLOUD_FLAG, "1");
  },
  reset() {
    localStorage.removeItem(window.CMS_CLOUD_FLAG);
  },
  isSchemaError(error) {
    if (!error) return false;
    const code = String(error.code || "");
    const msg = String(error.message || "").toLowerCase();
    return (
      code === "PGRST205" ||
      code === "42P01" ||
      msg.includes("could not find") ||
      msg.includes("does not exist") ||
      msg.includes("schema cache") ||
      (msg.includes("relation") && msg.includes("does not exist"))
    );
  },
  async isAvailable(sb, opts) {
    if (!this.isEnabled() || !sb) return false;
    if (!opts?.force) return this.isKnownReady();
    try {
      const { error } = await sb.from("projects").select("id").limit(1);
      if (error) {
        if (this.isSchemaError(error)) {
          this.markMissing();
          return false;
        }
        this.markReady();
        return true;
      }
      this.markReady();
      return true;
    } catch {
      this.markMissing();
      return false;
    }
  },
};

window.createSupabaseClient = function createSupabaseClient() {
  if (!window.SUPABASE_CONFIG || !window.SUPABASE_CONFIG.enabled) {
    return null;
  }
  if (typeof window.supabase === "undefined" || !window.supabase.createClient) {
    console.error("Supabase JS yuklanmagan");
    return null;
  }
  const { url, anonKey } = window.SUPABASE_CONFIG;
  if (!url || !anonKey) {
    console.error("SUPABASE_CONFIG to'liq emas");
    return null;
  }
  return window.supabase.createClient(url, anonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  });
};

function emptyCms() {
  return { projects: [], posts: [], profile: null };
}

function normalizeCms(data) {
  if (!data || typeof data !== "object") return emptyCms();
  return {
    projects: Array.isArray(data.projects) ? data.projects : [],
    posts: Array.isArray(data.posts) ? data.posts : [],
    profile: data.profile || null,
  };
}

/** Local CMS store */
window.cmsStore = {
  _seedPromise: null,

  read() {
    try {
      const raw = localStorage.getItem(window.CMS_STORAGE_KEY);
      if (!raw) return emptyCms();
      return normalizeCms(JSON.parse(raw));
    } catch {
      return emptyCms();
    }
  },

  write(data) {
    localStorage.setItem(window.CMS_STORAGE_KEY, JSON.stringify(normalizeCms(data)));
  },

  saveProjects(projects) {
    const d = this.read();
    d.projects = projects;
    this.write(d);
  },

  savePosts(posts) {
    const d = this.read();
    d.posts = posts;
    this.write(d);
  },

  saveProfile(profile) {
    const d = this.read();
    d.profile = profile;
    this.write(d);
  },

  isEmpty(data) {
    const d = data || this.read();
    return !d.projects.length && !d.posts.length && !d.profile;
  },

  /** data/cms.json dan bir marta yuklab localStorage ga yozadi (bo'sh bo'lsa) */
  async ensureSeeded() {
    if (!this.isEmpty()) return this.read();
    if (this._seedPromise) return this._seedPromise;

    this._seedPromise = (async () => {
      try {
        const res = await fetch(window.CMS_SEED_URL + "?t=" + Date.now(), {
          cache: "no-store",
        });
        if (!res.ok) return this.read();
        const json = normalizeCms(await res.json());
        if (!this.isEmpty(json)) {
          // Faqat hali ham bo'sh bo'lsa yozamiz (race)
          if (this.isEmpty()) this.write(json);
        }
      } catch (err) {
        console.warn("CMS seed yuklanmadi:", err);
      }
      return this.read();
    })();

    return this._seedPromise;
  },

  /** Seed yoki local — birlashtirilgan o'qish */
  async load() {
    await this.ensureSeeded();
    return this.read();
  },
};
