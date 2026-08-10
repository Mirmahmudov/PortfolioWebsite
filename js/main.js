"use strict";

const nav = document.querySelector(".nav");
const navLinks = Array.from(nav.querySelectorAll("a"));
const allSection = Array.from(document.querySelectorAll(".section"));
const navTogglerBtn = document.querySelector(".nav-toggler");
const aside = document.querySelector(".aside");
const backdrop = document.querySelector(".nav-backdrop");
const scrollTopBtn = document.querySelector(".scroll-top");

const SECTION_IDS = allSection.map((section) => section.id);
const DEFAULT_SECTION = "home";

/* ---------- Typing effekti (til almashganda qayta ishga tushadi) ---------- */

let typedInstance = null;

function startTyping() {
  if (typeof Typed === "undefined") return;

  if (typedInstance) typedInstance.destroy();

  typedInstance = new Typed(".typing", {
    strings: [
      I18N.t("typed.1"),
      I18N.t("typed.2"),
      I18N.t("typed.3"),
      I18N.t("typed.4"),
    ],
    typeSpeed: 100,
    backSpeed: 60,
    backDelay: 1500,
    loop: true,
  });
}

startTyping();
I18N.onChange(startTyping);

/* ---------- CV yuklab olish: tilga qarab UZ yoki EN PDF ---------- */

function updateCvLink() {
  const cv = document.querySelector(".js-cv-download");
  if (!cv) return;

  if (I18N.lang === "uz") {
    cv.href = "./images/Resume-UZ.pdf";
    cv.setAttribute("download", "Asadbek-Mirmahmudov-CV-UZ.pdf");
  } else if (I18N.lang === "ru") {
    cv.href = "./images/Resume-RU.pdf";
    cv.setAttribute("download", "Asadbek-Mirmahmudov-CV-RU.pdf");
  } else {
    cv.href = "./images/Resume-EN.pdf";
    cv.setAttribute("download", "Asadbek-Mirmahmudov-CV-EN.pdf");
  }
}

updateCvLink();
I18N.onChange(updateCvLink);

/* ---------- Skill barlar ---------- */

const progressBars = Array.from(document.querySelectorAll(".progress-in"));

function setSkillBars(filled) {
  if (!filled) {
    progressBars.forEach((bar) => {
      bar.style.width = "0";
    });
    return;
  }

  /* Avval 0, keyin haqiqiy kenglik — CSS transition ishlashi uchun */
  progressBars.forEach((bar) => {
    bar.style.width = "0";
  });
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      progressBars.forEach((bar) => {
        bar.style.width = bar.dataset.width || "0";
      });
    });
  });
}

/* ---------- Navigatsiya ---------- */

function currentSection() {
  return allSection.find((section) => section.classList.contains("active"));
}

function updateNav(targetId) {
  navLinks.forEach((link) => {
    const isActive = link.getAttribute("href") === "#" + targetId;
    link.classList.toggle("active", isActive);
    /* Skrinrider "hozir shu sahifadasiz" deb aytishi uchun */
    if (isActive) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

/*
  Bo'limni ko'rsatadi. Chiqib ketayotgan bo'limni orqa qatlamga qo'yamiz,
  shunda slide animatsiyasi ustma-ust tushadi.
*/
function navigateTo(targetId, { focus = true } = {}) {
  if (!SECTION_IDS.includes(targetId)) targetId = DEFAULT_SECTION;

  const target = document.getElementById(targetId);
  const previous = currentSection();
  if (previous === target) return;

  allSection.forEach((section) => {
    section.classList.remove("back-section", "active");
  });
  if (previous) previous.classList.add("back-section");

  target.classList.add("active");

  /* Bo'limga qayta kirganda eski skroll holatida emas, tepasidan boshlansin */
  target.scrollTop = 0;

  updateNav(targetId);
  updateScrollTopBtn();

  /* Skill barlar About har ochilganda qaytadan to'ladi */
  setSkillBars(targetId === "about");

  /* Motion reveals (cards, titles) */
  if (window.PortfolioMotion) {
    window.PortfolioMotion.onSectionEnter(targetId);
  }

  /*
    Klaviatura/skrinrider foydalanuvchisi uchun fokusni yangi bo'limga ko'chiramiz,
    aks holda ular hamon eski bo'lim ichida qolib ketardi.
  */
  if (focus) target.focus({ preventScroll: true });
}

function go(targetId) {
  if (targetId === currentSection()?.id) return;
  navigateTo(targetId);
  /* pushState — brauzerning "orqaga" tugmasi bo'limlar bo'ylab ishlaydi */
  history.pushState({ section: targetId }, "", "#" + targetId);
}

navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    go(link.getAttribute("href").slice(1));
    closeAside();
  });
});

document.querySelectorAll(".hire-me").forEach((hireMeBtn) => {
  hireMeBtn.addEventListener("click", (event) => {
    event.preventDefault();
    go("contact");
  });
});

/* Logotip ham bosh sahifaga qaytarsin */
const logoLink = document.querySelector(".logo a");
if (logoLink) {
  logoLink.addEventListener("click", (event) => {
    event.preventDefault();
    go("home");
    closeAside();
  });
}

/* Orqaga / oldinga tugmalari */
window.addEventListener("popstate", () => {
  navigateTo(location.hash.slice(1) || DEFAULT_SECTION, { focus: false });
});

/* Sahifa ochilganda: havoladagi #bo'lim (masalan site.com/#portfolio) */
const initialSection = location.hash.slice(1);
if (SECTION_IDS.includes(initialSection) && initialSection !== DEFAULT_SECTION) {
  navigateTo(initialSection, { focus: false });
} else {
  setSkillBars(false);
}
history.replaceState(
  { section: currentSection()?.id || DEFAULT_SECTION },
  "",
  location.hash || "#" + DEFAULT_SECTION
);

/* ---------- Yon menyu (mobil) ---------- */

function setAside(open) {
  aside.classList.toggle("open", open);
  navTogglerBtn.classList.toggle("open", open);
  navTogglerBtn.setAttribute("aria-expanded", String(open));
  allSection.forEach((section) => section.classList.toggle("open", open));

  if (open) {
    backdrop.hidden = false;
    /* Reflowni majburlaymiz — shundagina opacity o'tishi animatsiya bo'lib ko'rinadi.
       requestAnimationFrame ishlatib bo'lmaydi: brauzer fonidagi tabda u ishlamaydi
       va parda ko'rinmas holda ekranni to'sib qolardi. */
    void backdrop.offsetWidth;
    backdrop.classList.add("show");
  } else {
    backdrop.classList.remove("show");
    setTimeout(() => {
      if (!aside.classList.contains("open")) backdrop.hidden = true;
    }, 300);
  }
}

function closeAside() {
  if (aside.classList.contains("open")) setAside(false);
}

navTogglerBtn.addEventListener("click", () => {
  setAside(!aside.classList.contains("open"));
});

/* Menyudan tashqariga bosilsa yopiladi */
backdrop.addEventListener("click", closeAside);

/* ---------- Yuqoriga qaytish tugmasi ---------- */

function updateScrollTopBtn() {
  const section = currentSection();
  const show = !!section && section.scrollTop > 300;
  scrollTopBtn.classList.toggle("show", show);
  scrollTopBtn.hidden = !show;
}

allSection.forEach((section) => {
  section.addEventListener("scroll", updateScrollTopBtn, { passive: true });
});

scrollTopBtn.addEventListener("click", () => {
  currentSection()?.scrollTo({ top: 0, behavior: "smooth" });
});

/* ---------- Klaviatura ---------- */

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;

  /* Esc — ochiq narsalarni yopadi */
  closeAside();
  document.querySelector(".style-switcher")?.classList.remove("open");
});

/* ---------- Footer yil ---------- */
const yearEl = document.querySelector(".js-year");
if (yearEl) yearEl.textContent = String(new Date().getFullYear());

/* ---------- Yosh (tug'ilgan sanadan hisoblanadi) ---------- */

const ageEl = document.querySelector(".js-age");
if (ageEl) {
  const birthday = new Date(ageEl.dataset.birthday);
  const today = new Date();
  let age = today.getFullYear() - birthday.getFullYear();
  const monthDiff = today.getMonth() - birthday.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthday.getDate())
  ) {
    age--;
  }
  ageEl.textContent = String(age);
}

/* ---------- Kontakt formasi → Telegram bot ---------- */

function contactEndpoint() {
  const host = location.hostname;
  if (host === "localhost" || host === "127.0.0.1") {
    return "http://127.0.0.1:8787/contact";
  }
  return "/.netlify/functions/contact";
}

const contactForm = document.querySelector("#contact-form");
if (contactForm) {
  const status = contactForm.querySelector(".form-status");
  const submitBtn = contactForm.querySelector("button[type='submit']");
  const submitLabel = submitBtn ? submitBtn.querySelector("span") : null;

  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!status || !submitBtn) return;

    const formData = new FormData(contactForm);
    const payload = {
      name: String(formData.get("name") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      subject: String(formData.get("subject") || "").trim(),
      message: String(formData.get("message") || "").trim(),
      website: String(formData.get("website") || "").trim(),
    };

    if (
      !payload.name ||
      !payload.email ||
      !payload.subject ||
      !payload.message ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)
    ) {
      status.textContent = I18N.t("form.validation");
      status.className = "form-status error";
      return;
    }

    const originalLabel = submitLabel
      ? submitLabel.textContent
      : submitBtn.textContent;
    submitBtn.disabled = true;
    if (submitLabel) submitLabel.textContent = I18N.t("form.sending");
    status.textContent = I18N.t("form.sending");
    status.className = "form-status";

    try {
      const response = await fetch(contactEndpoint(), {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });

      let result = {};
      try {
        result = await response.json();
      } catch (_) {
        /* non-json */
      }

      if (response.ok && result.ok) {
        status.textContent = I18N.t("form.success");
        status.className = "form-status success";
        status.classList.add("pop");
        contactForm.reset();
        contactForm.classList.add("form-sent");
        setTimeout(() => {
          status.classList.remove("pop");
          contactForm.classList.remove("form-sent");
        }, 1200);
      } else if (result.error === "not_configured" || result.error === "no_chat_id") {
        status.textContent = I18N.t("form.notConfigured");
        status.className = "form-status error";
      } else {
        throw new Error(result.error || "Request failed");
      }
    } catch (error) {
      /* Lokalda proxy ishlamasa — aniqroq maslahat */
      const isLocal =
        location.hostname === "localhost" || location.hostname === "127.0.0.1";
      status.textContent = isLocal
        ? I18N.t("form.localHint") || I18N.t("form.error")
        : I18N.t("form.error");
      status.className = "form-status error";
    } finally {
      submitBtn.disabled = false;
      if (submitLabel) {
        submitLabel.textContent = I18N.t("contact.send") || originalLabel;
      }
    }
  });
}
