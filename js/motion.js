"use strict";

/**
 * Lightweight motion: reveal-on-section, stagger cards, magnetic buttons.
 * Respects prefers-reduced-motion.
 */

const prefersReduced =
  window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const REVEAL_SELECTORS = [
  ".section-title",
  ".about-text",
  ".personal-info",
  ".skills .skill-item",
  ".timeline-item",
  ".service-item",
  ".portfolio-item",
  ".contact-info-item",
  ".contact-form",
  ".portfolio-heading",
].join(", ");

function prepareReveals(root) {
  const scope = root || document;
  const items = scope.querySelectorAll(REVEAL_SELECTORS);
  items.forEach((el, index) => {
    if (el.classList.contains("reveal-item")) return;
    el.classList.add("reveal-item");
    /* Stagger within a section, cap delay so long lists don't feel slow */
    const delay = Math.min((index % 8) * 70, 420);
    el.style.setProperty("--reveal-delay", `${delay}ms`);
  });
}

function showRevealsIn(section) {
  if (!section) return;
  if (prefersReduced) {
    section.querySelectorAll(".reveal-item").forEach((el) => {
      el.classList.add("is-visible");
    });
    return;
  }

  /* Reset then re-trigger for re-entry animation */
  const items = section.querySelectorAll(".reveal-item");
  items.forEach((el) => el.classList.remove("is-visible"));

  requestAnimationFrame(() => {
    items.forEach((el) => {
      /* force reflow so transition restarts */
      void el.offsetWidth;
      el.classList.add("is-visible");
    });
  });
}

/* Also reveal items as user scrolls inside a long section */
function observeSectionScroll(section) {
  if (prefersReduced || !("IntersectionObserver" in window)) return;

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        }
      });
    },
    {
      root: section,
      threshold: 0.12,
      rootMargin: "0px 0px -8% 0px",
    }
  );

  section.querySelectorAll(".reveal-item").forEach((el) => io.observe(el));
}

/* Magnetic buttons (desktop pointer only) */
function initMagneticButtons() {
  if (prefersReduced) return;
  if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

  document.querySelectorAll(".magnetic").forEach((btn) => {
    btn.addEventListener("pointermove", (event) => {
      const rect = btn.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.18}px, ${y * 0.22}px)`;
    });
    btn.addEventListener("pointerleave", () => {
      btn.style.transform = "";
    });
  });
}

/* Public hook for navigation */
function onSectionEnter(sectionId) {
  const section = document.getElementById(sectionId);
  if (!section) return;
  showRevealsIn(section);
}

/* Init */
function initMotion() {
  prepareReveals(document);
  initMagneticButtons();

  document.querySelectorAll(".section").forEach((section) => {
    observeSectionScroll(section);
  });

  const active = document.querySelector(".section.active");
  if (active) showRevealsIn(active);
}

function hideLoader() {
  document.body.classList.remove("is-loading");
  document.body.classList.add("is-ready");
}

function boot() {
  initMotion();
  /* Loader biroz ko'rinsin, lekin sekin tarmoqda ham osilib qolmasin */
  const maxWait = setTimeout(hideLoader, 900);
  window.addEventListener(
    "load",
    () => {
      clearTimeout(maxWait);
      setTimeout(hideLoader, 180);
    },
    { once: true }
  );
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot);
} else {
  boot();
}

window.PortfolioMotion = { onSectionEnter, prepareReveals, showRevealsIn };
