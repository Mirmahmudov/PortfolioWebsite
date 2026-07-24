"use strict";

/* Tanlangan rang va mavzu localStorage'da saqlanadi — sahifa yangilansa yo'qolmaydi.
   Sahifa chizilishidan oldin ularni index.html'dagi kichik inline script qo'llaydi. */

const styleSwitcher = document.querySelector(".style-switcher");
const styleSwitcherToggle = document.querySelector(".style-switcher-toggler");
const alternateStyles = document.querySelectorAll(".alternate-style");
const dayNightBtn = document.querySelector(".day-night");
const dayNightIcon = dayNightBtn.querySelector("i");

function safeSet(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    /* Private rejimda localStorage bloklangan bo'lishi mumkin — jim o'tamiz */
  }
}

styleSwitcherToggle.addEventListener("click", (event) => {
  event.stopPropagation();
  styleSwitcher.classList.toggle("open");
});

/* Panel tashqarisiga bosilsa yopiladi */
document.addEventListener("click", (event) => {
  if (!styleSwitcher.contains(event.target)) {
    styleSwitcher.classList.remove("open");
  }
});

/* Bo'limlar o'z ichida skroll qiladi (position: fixed), shuning uchun window emas,
   har bir .section skrollini tinglaymiz */
document.querySelectorAll(".section").forEach((section) => {
  section.addEventListener("scroll", () => {
    styleSwitcher.classList.remove("open");
  });
});

/* ---------- Rang ---------- */

function setActiveStyle(color) {
  alternateStyles.forEach((style) => {
    if (color === style.getAttribute("title")) {
      style.removeAttribute("disabled");
    } else {
      style.setAttribute("disabled", "true");
    }
  });
  safeSet("skin-color", color);
}

document.querySelectorAll(".colors [data-color]").forEach((button) => {
  button.addEventListener("click", () => setActiveStyle(button.dataset.color));
});

/* ---------- Yorug' / qorong'i rejim ---------- */

function applyTheme(isDark, persist) {
  document.documentElement.classList.toggle("dark", isDark);
  dayNightIcon.classList.toggle("fa-sun", isDark);
  dayNightIcon.classList.toggle("fa-moon", !isDark);

  /* Tugmaning izohi holatga qarab o'zgaradi, tarjimasi bilan birga */
  const labelKey = isDark ? "switcher.toLight" : "switcher.toDark";
  dayNightBtn.dataset.i18nAriaLabel = labelKey;
  dayNightBtn.setAttribute("aria-label", I18N.t(labelKey));

  if (persist) safeSet("theme", isDark ? "dark" : "light");
}

dayNightBtn.addEventListener("click", () => {
  applyTheme(!document.documentElement.classList.contains("dark"), true);
});

/* Til almashganda tugma izohi ham yangi tilda bo'lsin */
I18N.onChange(() => {
  applyTheme(document.documentElement.classList.contains("dark"), false);
});

/* Ikonkani sahifa yuklanganidagi haqiqiy holatga moslaymiz.
   Bu yerda saqlamaymiz — foydalanuvchi hali tanlov qilmagan bo'lsa,
   operatsion tizim mavzusiga ergashib turaversin. */
applyTheme(document.documentElement.classList.contains("dark"), false);
