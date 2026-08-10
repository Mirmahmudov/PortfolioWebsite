"use strict";

const FALLBACK_IDS = ["b1", "b2", "b3"];

function getParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    slug: params.get("slug") || "",
    id: (params.get("id") || "").toLowerCase(),
  };
}

function lang() {
  return (window.I18N && I18N.lang) || localStorage.getItem("lang") || "uz";
}

function field(row, base) {
  const l = lang();
  return (
    row[`${base}_${l}`] ||
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

function renderFromObject(post) {
  const tag = document.getElementById("post-tag");
  const date = document.getElementById("post-date");
  const title = document.getElementById("post-title");
  const excerpt = document.getElementById("post-excerpt");
  const body = document.getElementById("post-body");
  if (!title) return;

  const postTitle = field(post, "title") || post.title || "—";
  const postBody = field(post, "body") || post.body || "";
  const postExcerpt = field(post, "excerpt") || post.excerpt || "";
  const postTag = field(post, "tag") || post.tag || "";
  const postDate = post.published_at || post.date || "";

  if (tag) tag.textContent = postTag;
  if (date) date.textContent = postDate;
  title.textContent = postTitle;
  if (excerpt) excerpt.textContent = postExcerpt;

  if (body) {
    const parts = String(postBody)
      .split(/(?<=[.!?])\s+/)
      .map((p) => p.trim())
      .filter(Boolean);
    const chunks = [];
    for (let i = 0; i < parts.length; i += 2) {
      chunks.push(parts.slice(i, i + 2).join(" "));
    }
    body.innerHTML = (chunks.length ? chunks : [postBody])
      .map((p) => `<p>${escapeHtml(p)}</p>`)
      .join("");
  }

  document.title = `${postTitle} — Asadbek Mirmahmudov`;
}

function renderFromI18n(id) {
  if (!window.I18N || !FALLBACK_IDS.includes(id)) id = "b1";
  renderFromObject({
    title: I18N.t(`blog.${id}.title`),
    body: I18N.t(`blog.${id}.body`),
    excerpt: I18N.t(`blog.${id}.excerpt`),
    tag: I18N.t(`blog.${id}.tag`),
    published_at: I18N.t(`blog.${id}.date`),
  });
}

function matchPost(posts, slug, id) {
  if (!Array.isArray(posts)) return null;
  if (slug) {
    const bySlug = posts.find(
      (p) => String(p.slug || "").toLowerCase() === slug.toLowerCase()
    );
    if (bySlug) return bySlug;
  }
  if (id) {
    return (
      posts.find(
        (p) =>
          String(p.id || "").toLowerCase() === id ||
          String(p.slug || "").toLowerCase() === id
      ) || null
    );
  }
  return null;
}

async function loadLocalPosts() {
  if (window.cmsStore) {
    const data = await window.cmsStore.load();
    return (data.posts || []).filter((p) => p.published !== false);
  }
  try {
    const res = await fetch("/data/cms.json?t=" + Date.now(), { cache: "no-store" });
    if (res.ok) {
      const data = await res.json();
      return (data.posts || []).filter((p) => p.published !== false);
    }
  } catch {
    /* ignore */
  }
  return [];
}

async function loadPost() {
  const { slug, id } = getParams();
  const posts = await loadLocalPosts();
  const local = matchPost(posts, slug, id);
  if (local) {
    renderFromObject(local);
    return;
  }

  if (id && FALLBACK_IDS.includes(id)) {
    renderFromI18n(id);
    return;
  }

  const map = {
    "frontend-teaching": "b1",
    "gamification-system": "b2",
    "react-structure": "b3",
  };
  renderFromI18n(map[slug] || "b1");
}

function boot() {
  loadPost();
  if (window.I18N && typeof I18N.onChange === "function") {
    I18N.onChange(() => loadPost());
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot);
} else {
  boot();
}
