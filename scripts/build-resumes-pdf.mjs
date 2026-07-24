import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "..", "images");

const CONTENT = {
  en: {
    file: "Resume-EN.pdf",
    name: "Asadbek Mirmahmudov",
    role: "Frontend Developer  |  Namangan, Uzbekistan",
    contact:
      "asadbekmirmahmudov3@gmail.com  ·  +998 91 344 44 68  ·  t.me/MirmahmudovAsadbek  ·  linkedin.com/in/asadbek-mirmahmudov-744b94282  ·  github.com/Mirmahmudov",
    summary:
      "Frontend Developer and mentor with 2+ years of experience building full-scale web applications with React and modern JavaScript. Experienced in API integration, state management, and UI/UX optimization. Currently at AsosIT and Raqamli Nazorat LLC; teaching at Codial Academy.",
    sections: [
      {
        h: "WORK EXPERIENCE",
        items: [
          {
            t: "Frontend Developer & Project Manager — AsosIT",
            d: "2026 – Present",
            b: [
              "Lead frontend development and project coordination: planning, teamwork, deadlines, quality",
              "Build modern responsive interfaces with React, JavaScript, and TypeScript",
            ],
          },
          {
            t: "Frontend Developer — Raqamli Nazorat LLC",
            d: "2026 – Present",
            b: [
              "Develop responsive web UIs for company products",
              "Reusable components and REST API integration",
            ],
          },
          {
            t: "Frontend Instructor — Codial Academy, Fergana",
            d: "Jan 2024 – Present",
            b: [
              "Assistant instructor → full Frontend Instructor (from July 2025)",
              "Hands-on training: UI components, API, UX, job and interview prep",
              "Built Gamification V1 (70+ users) and V2 (100+ users, multi-role, dashboard, auction)",
            ],
          },
        ],
      },
      {
        h: "PROJECTS",
        items: [
          {
            t: "Codial Gamification V2  ·  React, Tailwind",
            d: "2026",
            b: [
              "Multi-role system (student, mentor, admin) for 100+ users",
              "Admin dashboard, stats, auction (private production system)",
            ],
          },
          {
            t: "Codial Gamification V1  ·  React, CSS",
            d: "2025",
            b: [
              "Gamification for students and mentors — 70+ users (private)",
            ],
          },
        ],
      },
      {
        h: "EDUCATION",
        items: [
          {
            t: "Fergana State Technical University — Bachelor's, Computer Engineering",
            d: "2021 – 2025",
            b: [
              "Engineer-programmer. GPA 4.54/5. Diploma 30 Jun 2025. Thesis: CODIAL COIN evaluation system.",
            ],
          },
          {
            t: "Codial Academy — Frontend Development Course",
            d: "Mar – Dec 2023",
            b: ["Intensive React and UI engineering course."],
          },
        ],
      },
      {
        h: "SKILLS",
        items: [
          {
            t: "Stack",
            d: "",
            b: [
              "Frontend: HTML, CSS, SCSS, Tailwind, Bootstrap, Material UI",
              "Programming: JavaScript, TypeScript, React",
              "Tools: Git, GitHub, Vite",
              "Languages: Uzbek (native), English (beginner), Russian (intermediate)",
            ],
          },
        ],
      },
    ],
  },
  uz: {
    file: "Resume-UZ.pdf",
    name: "Asadbek Mirmahmudov",
    role: "Frontend Dasturchi  |  Namangan, O'zbekiston",
    contact:
      "asadbekmirmahmudov3@gmail.com  ·  +998 91 344 44 68  ·  t.me/MirmahmudovAsadbek  ·  linkedin.com/in/asadbek-mirmahmudov-744b94282  ·  github.com/Mirmahmudov",
    summary:
      "2 yildan ortiq tajribaga ega Frontend dasturchi va mentor. React va zamonaviy JavaScript bilan to'liq veb-loyihalar yarataman. API, state management va UI/UX tajribasi. Hozir AsosIT va Raqamli Nazorat MCHJ da ishlayman, Codial Academy da dars beraman.",
    sections: [
      {
        h: "ISH TAJRIBASI",
        items: [
          {
            t: "Frontend dasturchi va loyiha menejeri — AsosIT",
            d: "2026 – hozirgacha",
            b: [
              "Frontend ishlanma va loyiha muvofiqlashtirish: reja, jamoa, muddat, sifat",
              "React, JavaScript, TypeScript bilan zamonaviy interfeyslar",
            ],
          },
          {
            t: "Frontend dasturchi — Raqamli Nazorat MCHJ",
            d: "2026 – hozirgacha",
            b: [
              "Kompaniya mahsulotlari uchun moslashuvchan veb-interfeyslar",
              "Qayta ishlatiladigan komponentlar va REST API",
            ],
          },
          {
            t: "Frontend o'qituvchi — Codial Academy, Farg'ona",
            d: "Yan 2024 – hozirgacha",
            b: [
              "Yordamchi o'qituvchi → to'liq Frontend o'qituvchi (Iyul 2025)",
              "UI, API, UX va ish/suhbatga tayyorlash amaliyoti",
              "Gamification V1 (70+) va V2 (100+, multi-role, dashboard, auksion)",
            ],
          },
        ],
      },
      {
        h: "LOYIHALAR",
        items: [
          {
            t: "Codial Gamification V2  ·  React, Tailwind",
            d: "2026",
            b: [
              "100+ foydalanuvchili multi-role tizim",
              "Admin dashboard, statistika, auksion (maxfiy production tizim)",
            ],
          },
          {
            t: "Codial Gamification V1  ·  React, CSS",
            d: "2025",
            b: [
              "O'quvchi/ustoz gamification — 70+ foydalanuvchi (maxfiy)",
            ],
          },
        ],
      },
      {
        h: "TA'LIM",
        items: [
          {
            t: "Farg'ona davlat texnika universiteti — Bakalavr, Kompyuter injiniringi",
            d: "2021 – 2025",
            b: [
              "Muhandis-dasturchi. GPA 4.54/5. Diplom 30.06.2025. Bitiruv: CODIAL COIN baholash tizimi.",
            ],
          },
          {
            t: "Codial Academy — Frontend dasturlash kursi",
            d: "Mart – Dek 2023",
            b: ["React va UI bo'yicha intensiv amaliy kurs."],
          },
        ],
      },
      {
        h: "KO'NIKMALAR",
        items: [
          {
            t: "Stack",
            d: "",
            b: [
              "Frontend: HTML, CSS, SCSS, Tailwind, Bootstrap, Material UI",
              "Dasturlash: JavaScript, TypeScript, React",
              "Vositalar: Git, GitHub, Vite",
              "Tillar: O'zbek (ona), Ingliz (boshlang'ich), Rus (o'rta)",
            ],
          },
        ],
      },
    ],
  },
  ru: {
    file: "Resume-RU.pdf",
    name: "Асадбек Мирмахмудов",
    role: "Frontend-разработчик  |  Наманган, Узбекистан",
    contact:
      "asadbekmirmahmudov3@gmail.com  ·  +998 91 344 44 68  ·  t.me/MirmahmudovAsadbek  ·  linkedin.com/in/asadbek-mirmahmudov-744b94282  ·  github.com/Mirmahmudov",
    summary:
      "Frontend-разработчик и ментор с опытом более 2 лет: веб-приложения на React и современном JavaScript. Опыт API, state management и UI/UX. Работаю в AsosIT и Raqamli Nazorat MCHJ, преподаю в Codial Academy.",
    sections: [
      {
        h: "ОПЫТ РАБОТЫ",
        items: [
          {
            t: "Frontend-разработчик и project manager — AsosIT",
            d: "2026 – настоящее время",
            b: [
              "Frontend-разработка и координация проекта: планирование, команда, сроки, качество",
              "Современные адаптивные интерфейсы на React, JavaScript и TypeScript",
            ],
          },
          {
            t: "Frontend-разработчик — Raqamli Nazorat MCHJ",
            d: "2026 – настоящее время",
            b: [
              "Адаптивные веб-интерфейсы для продуктов компании",
              "Переиспользуемые компоненты и интеграция REST API",
            ],
          },
          {
            t: "Преподаватель Frontend — Codial Academy, Фергана",
            d: "Янв 2024 – настоящее время",
            b: [
              "От ассистента до полного Frontend-инструктора (с июля 2025)",
              "Практика: UI-компоненты, API, UX, подготовка к работе и собеседованиям",
              "Gamification V1 (70+) и V2 (100+, multi-role, dashboard, аукцион)",
            ],
          },
        ],
      },
      {
        h: "ПРОЕКТЫ",
        items: [
          {
            t: "Codial Gamification V2  ·  React, Tailwind",
            d: "2026",
            b: [
              "Multi-role система на 100+ пользователей",
              "Admin dashboard, статистика, аукцион (закрытая production-система)",
            ],
          },
          {
            t: "Codial Gamification V1  ·  React, CSS",
            d: "2025",
            b: [
              "Геймификация для студентов и менторов — 70+ пользователей (закрыто)",
            ],
          },
        ],
      },
      {
        h: "ОБРАЗОВАНИЕ",
        items: [
          {
            t: "Ферганский гос. технический университет — Бакалавр, Компьютерная инженерия",
            d: "2021 – 2025",
            b: [
              "Инженер-программист. GPA 4.54/5. Диплом 30.06.2025. Дипломная: система оценки CODIAL COIN.",
            ],
          },
          {
            t: "Codial Academy — курс Frontend-разработки",
            d: "Март – Дек 2023",
            b: ["Интенсивный курс по React и UI-инженерии."],
          },
        ],
      },
      {
        h: "НАВЫКИ",
        items: [
          {
            t: "Стек",
            d: "",
            b: [
              "Frontend: HTML, CSS, SCSS, Tailwind, Bootstrap, Material UI",
              "Программирование: JavaScript, TypeScript, React",
              "Инструменты: Git, GitHub, Vite",
              "Языки: узбекский (родной), английский (начальный), русский (средний)",
            ],
          },
        ],
      },
    ],
  },
};

const FONT_REG =
  "C:/Windows/Fonts/arial.ttf";
const FONT_BOLD =
  "C:/Windows/Fonts/arialbd.ttf";
const FONT_ITALIC =
  "C:/Windows/Fonts/ariali.ttf";

function writeResume(lang) {
  const data = CONTENT[lang];
  const out = path.join(outDir, data.file);
  const doc = new PDFDocument({
    size: "A4",
    margins: { top: 40, bottom: 40, left: 48, right: 48 },
  });
  const stream = fs.createWriteStream(out);
  doc.pipe(stream);

  doc.registerFont("Body", FONT_REG);
  doc.registerFont("BodyBold", FONT_BOLD);
  doc.registerFont("BodyItalic", FONT_ITALIC);

  const pageWidth = doc.page.width - doc.page.margins.left - doc.page.margins.right;

  doc.font("BodyBold").fontSize(20).fillColor("#111827").text(data.name, { width: pageWidth });
  doc.moveDown(0.2);
  doc.font("Body").fontSize(10).fillColor("#374151").text(data.role, { width: pageWidth });
  doc.moveDown(0.15);
  doc.fontSize(8).fillColor("#4B5563").text(data.contact, { width: pageWidth });
  doc.moveDown(0.35);
  doc
    .moveTo(doc.page.margins.left, doc.y)
    .lineTo(doc.page.margins.left + pageWidth, doc.y)
    .strokeColor("#D1D5DB")
    .lineWidth(1)
    .stroke();
  doc.moveDown(0.45);
  doc.font("Body").fontSize(9.5).fillColor("#374151").text(data.summary, {
    width: pageWidth,
    align: "justify",
    lineGap: 1.5,
  });

  for (const section of data.sections) {
    doc.moveDown(0.55);
    doc.font("BodyBold").fontSize(11).fillColor("#111827").text(section.h, { width: pageWidth });
    doc
      .moveTo(doc.page.margins.left, doc.y + 2)
      .lineTo(doc.page.margins.left + pageWidth, doc.y + 2)
      .strokeColor("#E5E7EB")
      .lineWidth(0.8)
      .stroke();
    doc.moveDown(0.4);

    for (const item of section.items) {
      const titleY = doc.y;
      doc.font("BodyBold").fontSize(9.5).fillColor("#111827");
      const titleWidth = pageWidth * 0.72;
      doc.text(item.t, { width: titleWidth, continued: false });
      if (item.d) {
        doc.font("BodyItalic").fontSize(8.5).fillColor("#6B7280");
        doc.text(item.d, doc.page.margins.left + titleWidth, titleY, {
          width: pageWidth - titleWidth,
          align: "right",
        });
      }
      doc.x = doc.page.margins.left;
      doc.moveDown(0.15);
      for (const line of item.b) {
        doc.font("Body").fontSize(9).fillColor("#374151");
        doc.text("•  " + line, { width: pageWidth, lineGap: 1.2 });
      }
      doc.moveDown(0.25);
    }
  }

  doc.end();
  return new Promise((resolve, reject) => {
    stream.on("finish", () => {
      console.log("OK", data.file, fs.statSync(out).size);
      resolve();
    });
    stream.on("error", reject);
  });
}

await Promise.all(["en", "uz", "ru"].map(writeResume));
// Default download alias
fs.copyFileSync(path.join(outDir, "Resume-EN.pdf"), path.join(outDir, "Resume.pdf"));
console.log("All PDF resumes ready.");
