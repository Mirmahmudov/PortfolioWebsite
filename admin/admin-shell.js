"use strict";

/**
 * Admin multi-page shell: auth guard, sidebar, toast, helpers.
 */
(function (global) {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

  const PAGES = [
    { id: "dashboard", href: "dashboard.html", icon: "fa-gauge", label: "Dashboard" },
    { id: "projects", href: "projects.html", icon: "fa-briefcase", label: "Portfolio" },
    { id: "blog", href: "blog.html", icon: "fa-pen", label: "Blog" },
    { id: "profile", href: "profile.html", icon: "fa-user", label: "Profil" },
    { id: "tools", href: "tools.html", icon: "fa-wrench", label: "Vositalar" },
  ];

  function toast(text, ok = true) {
    let el = $("#admin-toast");
    if (!el) {
      el = document.createElement("div");
      el.id = "admin-toast";
      el.className = "toast";
      document.body.appendChild(el);
    }
    el.textContent = text;
    el.className = "toast show " + (ok ? "ok" : "err");
    clearTimeout(el._t);
    el._t = setTimeout(() => el.classList.remove("show"), 2800);
  }

  function requireAuth() {
    if (!global.cmsAuth) {
      document.body.innerHTML =
        '<div style="padding:40px;font-family:system-ui;background:#0b0d12;color:#fff;min-height:100vh">' +
        "<h1>CMS yuklanmadi</h1><p><code>js/cms-core.js</code> yo‘lini tekshiring.</p>" +
        '<p><a href="index.html" style="color:#ff6b81">Login</a></p></div>';
      return null;
    }
    const session = global.cmsAuth.session();
    if (!session || session.mode !== "local") {
      location.replace("index.html");
      return null;
    }
    return session;
  }

  function mountShell(activeId, session) {
    const shell = $("#app-root");
    if (!shell) return;

    const navHtml = PAGES.map(
      (p) =>
        `<a href="${p.href}" class="${p.id === activeId ? "active" : ""}">` +
        `<i class="fa ${p.icon}"></i> ${p.label}</a>`
    ).join("");

    shell.innerHTML = `
      <div class="mobile-bar">
        <button type="button" class="btn btn-ghost btn-sm" id="nav-toggle" aria-label="Menyu">
          <i class="fa fa-bars"></i> Menyu
        </button>
        <strong>Admin</strong>
        <span class="chip">${session.email || "admin"}</span>
      </div>
      <div class="app-shell">
        <aside class="aside" id="aside">
          <div class="brand">
            <span class="brand-mark">A</span>
            <div>
              <strong>Admin CMS</strong>
              <small>local</small>
            </div>
          </div>
          <nav class="nav">${navHtml}</nav>
          <div class="aside-foot">
            <a class="site-link" href="../index.html" target="_blank" rel="noopener">
              <i class="fa fa-external-link"></i> Saytni ochish
            </a>
            <button type="button" class="btn btn-ghost btn-block" id="logout-btn">Chiqish</button>
          </div>
        </aside>
        <main class="main" id="page-main"></main>
      </div>
    `;

    const pageMain = $("#page-main");
    const content = $("#page-content");
    if (content && pageMain) {
      pageMain.appendChild(content);
      content.hidden = false;
    }

    $("#logout-btn")?.addEventListener("click", () => {
      global.cmsAuth.logout();
      location.href = "index.html";
    });

    $("#nav-toggle")?.addEventListener("click", () => {
      document.body.classList.toggle("nav-open");
    });

    // close nav on link click (mobile)
    $$(".nav a").forEach((a) => {
      a.addEventListener("click", () => document.body.classList.remove("nav-open"));
    });
  }

  function slugify(str) {
    return String(str || "")
      .toLowerCase()
      .trim()
      .replace(/['"]/g, "")
      .replace(/[^a-z0-9\u0400-\u04ff]+/gi, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 80);
  }

  function techToArray(str) {
    return String(str || "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  }

  function uid() {
    if (global.crypto?.randomUUID) return crypto.randomUUID();
    return "id-" + Date.now() + "-" + Math.random().toString(36).slice(2, 9);
  }

  function escapeHtml(str) {
    return String(str || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function badge(yes, yesText, noText) {
    return `<span class="badge ${yes ? "badge-yes" : "badge-no"}">${
      yes ? yesText : noText
    }</span>`;
  }

  /** Admin sahifasidan sayt rasmlarini to'g'ri ko'rsatish */
  function resolveAssetUrl(url) {
    if (!url) return "";
    if (/^(https?:|data:|blob:)/i.test(url)) return url;
    if (url.startsWith("../")) return url;
    if (url.startsWith("./images/")) return "../" + url.slice(2);
    if (url.startsWith("/images/")) return ".." + url;
    if (url.startsWith("images/")) return "../" + url;
    return url;
  }

  /** Saqlash uchun asosiy saytga mos yo'l */
  function normalizeSaveImageUrl(url) {
    if (!url) return null;
    if (/^(https?:|data:|blob:)/i.test(url)) return url;
    if (url.startsWith("../images/")) return "./" + url.slice(3);
    if (url.startsWith("/images/")) return "." + url;
    return url;
  }

  global.AdminUI = {
    $,
    $$,
    toast,
    requireAuth,
    mountShell,
    slugify,
    techToArray,
    uid,
    escapeHtml,
    badge,
    resolveAssetUrl,
    normalizeSaveImageUrl,
    PAGES,
  };
})(window);
