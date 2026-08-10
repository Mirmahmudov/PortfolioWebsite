"use strict";

/**
 * Sayt kontenti: localStorage (admin) → data/cms.json → HTML zaxira.
 */
(function () {
  const LANG = () =>
    (window.I18N && I18N.lang) || localStorage.getItem("lang") || "uz";

  function tField(row, base) {
    const lang = LANG();
    return (
      row[`${base}_${lang}`] ||
      row[`${base}_uz`] ||
      row[`${base}_en`] ||
      row[`${base}_ru`] ||
      ""
    );
  }

  function escapeHtml(str) {
    return String(str || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function normalizeImg(url) {
    if (!url) return "./images/portfolio/portfolio-1.webp";
    if (/^(https?:|data:|blob:)/i.test(url)) return url;
    // admin da ../images saqlangan bo'lishi mumkin
    if (url.startsWith("../images/")) return "./" + url.slice(3);
    if (url.startsWith("/images/")) return "." + url;
    if (url.startsWith("images/")) return "./" + url;
    return url;
  }

  function renderProjects(projects) {
    const grid = document.querySelector(".portfolio-grid");
    if (!grid || !projects.length) return;

    grid.innerHTML = projects
      .map((p) => {
        const title = escapeHtml(tField(p, "title"));
        const desc = escapeHtml(tField(p, "desc"));
        const tech = Array.isArray(p.tech) ? p.tech : [];
        const img = escapeHtml(normalizeImg(p.image_url));
        const techHtml = tech.map((t) => `<li>${escapeHtml(t)}</li>`).join("");

        let links = "";
        if (p.is_private) {
          links = `<span class="portfolio-badge">${escapeHtml(
            (window.I18N && I18N.t("portfolio.private")) || "Private"
          )}</span>`;
        } else {
          if (p.github_url) {
            links += `<a href="${escapeHtml(p.github_url)}" target="_blank" rel="noopener noreferrer">
              <i class="fa-brands fa-github" aria-hidden="true"></i>
              <span>${escapeHtml((window.I18N && I18N.t("portfolio.code")) || "Code")}</span>
            </a>`;
          }
          if (p.live_url) {
            links += `<a href="${escapeHtml(p.live_url)}" target="_blank" rel="noopener noreferrer">
              <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>
              <span>${escapeHtml((window.I18N && I18N.t("portfolio.live")) || "Live")}</span>
            </a>`;
          }
        }

        return `<article class="portfolio-item reveal-item is-visible">
          <div class="portfolio-item-inner shadow-dark">
            <div class="portfolio-img">
              <img src="${img}" width="800" height="450" loading="lazy" alt="${title}" />
            </div>
            <div class="portfolio-info">
              <h3>${title}</h3>
              <p>${desc}</p>
              <ul class="tech-list">${techHtml}</ul>
              <div class="portfolio-links">${links}</div>
            </div>
          </div>
        </article>`;
      })
      .join("");

    if (window.PortfolioMotion) {
      window.PortfolioMotion.prepareReveals(grid);
      window.PortfolioMotion.showRevealsIn(document.getElementById("portfolio"));
    }
  }

  function renderBlogList(posts) {
    const grid = document.querySelector(".blog-grid");
    if (!grid || !posts.length) return;

    grid.innerHTML = posts
      .map((p) => {
        const slug = escapeHtml(p.slug || p.id);
        const title = escapeHtml(tField(p, "title"));
        const excerpt = escapeHtml(tField(p, "excerpt"));
        const tag = escapeHtml(tField(p, "tag"));
        const date = p.published_at ? escapeHtml(String(p.published_at)) : "";
        const readMore = (window.I18N && I18N.t("blog.readMore")) || "Read more";

        return `<article class="blog-card reveal-item is-visible">
          <div class="blog-card-meta">
            <span class="blog-tag">${tag}</span>
            <time datetime="${date}">${date}</time>
          </div>
          <h3>${title}</h3>
          <p class="blog-excerpt">${excerpt}</p>
          <a class="blog-read-link" href="./blog/post.html?slug=${encodeURIComponent(
            p.slug || p.id
          )}">${escapeHtml(readMore)}</a>
        </article>`;
      })
      .join("");
  }

  function applyProfile(profile) {
    if (!profile) return;
    const lang = LANG();

    const homeBio = document.querySelector("#home [data-i18n='home.bio']");
    if (homeBio && profile[`home_bio_${lang}`]) {
      homeBio.textContent = profile[`home_bio_${lang}`];
    }

    const aboutP1 = document.querySelector("#about [data-i18n='about.p1']");
    const aboutP2 = document.querySelector("#about [data-i18n='about.p2']");
    if (aboutP1 && profile[`about_p1_${lang}`]) {
      aboutP1.textContent = profile[`about_p1_${lang}`];
    }
    if (aboutP2 && profile[`about_p2_${lang}`]) {
      aboutP2.textContent = profile[`about_p2_${lang}`];
    }

    document.querySelectorAll("[data-profile]").forEach((el) => {
      const key = el.getAttribute("data-profile");
      if (!key) return;
      if (key.endsWith("_lang")) {
        const base = key.replace(/_lang$/, "");
        const val =
          profile[`${base}_${lang}`] || profile[`${base}_uz`] || profile[key];
        if (val) el.textContent = val;
      } else if (profile[key]) {
        el.textContent = profile[key];
        if (el.tagName === "A" && key === "email") el.href = `mailto:${profile[key]}`;
        if (el.tagName === "A" && key === "phone") {
          el.href = `tel:${String(profile[key]).replace(/\s/g, "")}`;
        }
      }
    });

    window.__siteProfile = profile;
  }

  async function loadAll() {
    let data = null;
    if (window.cmsStore && typeof window.cmsStore.load === "function") {
      data = await window.cmsStore.load();
    } else {
      try {
        const res = await fetch("/data/cms.json?t=" + Date.now(), { cache: "no-store" });
        if (res.ok) data = await res.json();
      } catch {
        /* ignore */
      }
    }
    if (!data) return;

    const projects = (data.projects || [])
      .filter((p) => p.published !== false)
      .sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));
    const posts = (data.posts || [])
      .filter((p) => p.published !== false)
      .sort((a, b) => String(b.published_at || "").localeCompare(String(a.published_at || "")));

    if (projects.length) {
      window.__projects = projects;
      renderProjects(projects);
    }
    if (posts.length) {
      window.__blogPosts = posts;
      renderBlogList(posts);
    }
    if (data.profile) applyProfile(data.profile);
  }

  function rebindLang() {
    if (window.__projects) renderProjects(window.__projects);
    if (window.__blogPosts) renderBlogList(window.__blogPosts);
    if (window.__siteProfile) applyProfile(window.__siteProfile);
  }

  function boot() {
    loadAll().catch((err) => console.warn("CMS load:", err));
    if (window.I18N && typeof I18N.onChange === "function") {
      I18N.onChange(rebindLang);
    }
    window.addEventListener("cms:updated", () => loadAll());
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
