/**
 * Generates EN / UZ / RU resumes as .docx, then expects PDF conversion separately.
 */
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  AlignmentType,
  BorderStyle,
  TabStopType,
  TabStopPosition,
  ExternalHyperlink,
  LevelFormat,
} from "docx";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "..", "images");

const thinBorder = {
  top: { style: BorderStyle.NONE },
  bottom: { style: BorderStyle.SINGLE, size: 12, color: "1F2937", space: 1 },
  left: { style: BorderStyle.NONE },
  right: { style: BorderStyle.NONE },
};

function h1(text) {
  return new Paragraph({
    spacing: { after: 80 },
    children: [
      new TextRun({ text, bold: true, size: 36, font: "Calibri", color: "111827" }),
    ],
  });
}

function subtitle(text) {
  return new Paragraph({
    spacing: { after: 60 },
    children: [
      new TextRun({ text, size: 22, font: "Calibri", color: "374151" }),
    ],
  });
}

function contactLine(parts) {
  return new Paragraph({
    spacing: { after: 120 },
    border: thinBorder,
    children: parts.flatMap((p, i) => {
      const runs = [];
      if (i > 0) runs.push(new TextRun({ text: "  |  ", size: 18, font: "Calibri", color: "6B7280" }));
      if (p.href) {
        runs.push(
          new ExternalHyperlink({
            children: [
              new TextRun({
                text: p.label,
                size: 18,
                font: "Calibri",
                color: "2563EB",
                underline: {},
              }),
            ],
            link: p.href,
          })
        );
      } else {
        runs.push(new TextRun({ text: p.label, size: 18, font: "Calibri", color: "4B5563" }));
      }
      return runs;
    }),
  });
}

function section(title) {
  return new Paragraph({
    spacing: { before: 220, after: 100 },
    border: {
      top: { style: BorderStyle.NONE },
      bottom: { style: BorderStyle.SINGLE, size: 8, color: "D1D5DB", space: 1 },
      left: { style: BorderStyle.NONE },
      right: { style: BorderStyle.NONE },
    },
    children: [
      new TextRun({
        text: title.toUpperCase(),
        bold: true,
        size: 22,
        font: "Calibri",
        color: "111827",
      }),
    ],
  });
}

function jobTitle(title, date) {
  return new Paragraph({
    spacing: { before: 120, after: 40 },
    tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
    children: [
      new TextRun({ text: title, bold: true, size: 21, font: "Calibri", color: "111827" }),
      new TextRun({ text: "\t" + date, size: 18, font: "Calibri", color: "6B7280", italics: true }),
    ],
  });
}

function body(text) {
  return new Paragraph({
    spacing: { after: 80 },
    children: [new TextRun({ text, size: 20, font: "Calibri", color: "374151" })],
  });
}

function bullet(text, ref = "bullets") {
  return new Paragraph({
    numbering: { reference: ref, level: 0 },
    spacing: { after: 40 },
    children: [new TextRun({ text, size: 19, font: "Calibri", color: "374151" })],
  });
}

function skillLine(label, value) {
  return new Paragraph({
    spacing: { after: 40 },
    children: [
      new TextRun({ text: label + ": ", bold: true, size: 19, font: "Calibri", color: "111827" }),
      new TextRun({ text: value, size: 19, font: "Calibri", color: "374151" }),
    ],
  });
}

const DATA = {
  en: {
    name: "Asadbek Mirmahmudov",
    role: "Frontend Developer  |  Namangan, Uzbekistan",
    summary:
      "Frontend Developer and mentor with 2+ years of experience building full-scale web applications with React and modern JavaScript. Experienced in API integration, state management, and UI/UX optimization. Currently working at AsosIT and Raqamli Nazorat LLC while teaching at Codial Academy.",
    work: "WORK EXPERIENCE",
    jobs: [
      {
        title: "Frontend Developer & Project Manager — AsosIT",
        date: "2026 – Present",
        bullets: [
          "Lead frontend development and coordinate project delivery: planning, teamwork, deadlines, and quality",
          "Build modern, responsive interfaces with React, JavaScript, and TypeScript",
        ],
      },
      {
        title: "Frontend Developer — Raqamli Nazorat LLC",
        date: "2026 – Present",
        bullets: [
          "Develop responsive web UIs for company products",
          "Implement reusable components and REST API integration",
        ],
      },
      {
        title: "Frontend Instructor — Codial Academy, Fergana",
        date: "Jan 2024 – Present",
        bullets: [
          "Started as assistant instructor; full Frontend Instructor since July 2025",
          "Hands-on training in UI components, API integration, UX, and job/interview prep",
          "Built Codial Gamification System V1 (70+ users) and V2 (100+ users, multi-role, admin dashboard, auction)",
        ],
      },
    ],
    projects: "PROJECTS",
    projectItems: [
      {
        title: "Codial Gamification V2",
        date: "2026  ·  React, Tailwind",
        bullets: [
          "Multi-role platform (student, mentor, admin) for 100+ users",
          "Admin dashboard, monitoring, statistics, and auction module",
          "https://gamification2.vercel.app",
        ],
      },
      {
        title: "Codial Gamification V1",
        date: "2025  ·  React, CSS",
        bullets: [
          "Gamification platform for students and mentors — 70+ users",
          "https://gamificationinfo.vercel.app/",
        ],
      },
    ],
    education: "EDUCATION",
    edu: [
      {
        title: "Fergana State Technical University — Bachelor's, Computer Engineering",
        date: "2021 – 2025  ·  Fergana, Uzbekistan",
        text: "Qualification: Engineer-programmer. GPA: 4.54/5. Diploma: 30 Jun 2025. Graduation project: evaluation system for “CODIAL COIN” training center.",
      },
      {
        title: "Codial Academy — Frontend Development Course",
        date: "Mar 2023 – Dec 2023",
        text: "Intensive hands-on course focused on React and UI engineering.",
      },
    ],
    skills: "SKILLS",
    skillRows: [
      ["Frontend", "HTML, CSS, SCSS, Tailwind CSS, Bootstrap, Material UI, Swiper.js"],
      ["Programming", "JavaScript, TypeScript, React"],
      ["Tools", "Git, GitHub, Vite"],
      ["Languages", "Uzbek — Native · English — Beginner · Russian — Intermediate"],
    ],
    file: "Resume-EN.docx",
  },
  uz: {
    name: "Asadbek Mirmahmudov",
    role: "Frontend Dasturchi  |  Namangan, O'zbekiston",
    summary:
      "2 yildan ortiq tajribaga ega Frontend dasturchi va mentor. React va zamonaviy JavaScript bilan to'liq veb-loyihalar yarataman. API, state management va UI/UX optimallashtirish tajribasi bor. Hozir AsosIT va Raqamli Nazorat MCHJ da ishlayman, Codial Academy da dars beraman.",
    work: "ISH TAJRIBASI",
    jobs: [
      {
        title: "Frontend dasturchi va loyiha menejeri — AsosIT",
        date: "2026 – hozirgacha",
        bullets: [
          "Frontend ishlanma va loyiha muvofiqlashtirish: rejalashtirish, jamoa, muddat va sifat",
          "React, JavaScript va TypeScript bilan zamonaviy interfeyslar",
        ],
      },
      {
        title: "Frontend dasturchi — Raqamli Nazorat MCHJ",
        date: "2026 – hozirgacha",
        bullets: [
          "Kompaniya mahsulotlari uchun moslashuvchan veb-interfeyslar",
          "Qayta ishlatiladigan komponentlar va REST API integratsiya",
        ],
      },
      {
        title: "Frontend o'qituvchi — Codial Academy, Farg'ona",
        date: "Yan 2024 – hozirgacha",
        bullets: [
          "Yordamchi o'qituvchidan to'liq Frontend o'qituvchisiga o'sish (Iyul 2025)",
          "UI komponentlar, API, UX va ish/suhbatga tayyorlash bo'yicha amaliy dars",
          "Codial Gamification V1 (70+) va V2 (100+, multi-role, admin dashboard, auksion)",
        ],
      },
    ],
    projects: "LOYIHALAR",
    projectItems: [
      {
        title: "Codial Gamification V2",
        date: "2026  ·  React, Tailwind",
        bullets: [
          "100+ foydalanuvchili multi-role tizim (o'quvchi, ustoz, admin)",
          "Admin dashboard, monitoring, statistika va auksion moduli",
          "https://gamification2.vercel.app",
        ],
      },
      {
        title: "Codial Gamification V1",
        date: "2025  ·  React, CSS",
        bullets: [
          "O'quvchi va ustozlar uchun gamification — 70+ foydalanuvchi",
          "https://gamificationinfo.vercel.app/",
        ],
      },
    ],
    education: "TA'LIM",
    edu: [
      {
        title: "Farg'ona davlat texnika universiteti — Bakalavr, Kompyuter injiniringi",
        date: "2021 – 2025  ·  Farg'ona, O'zbekiston",
        text: "Kvalifikatsiya: muhandis-dasturchi. GPA: 4.54/5. Diplom: 30.06.2025. Bitiruv ishi: «CODIAL COIN» baholash tizimi.",
      },
      {
        title: "Codial Academy — Frontend dasturlash kursi",
        date: "Mart 2023 – Dekabr 2023",
        text: "React va UI muhandisligiga yo'naltirilgan intensiv amaliy kurs.",
      },
    ],
    skills: "KO'NIKMALAR",
    skillRows: [
      ["Frontend", "HTML, CSS, SCSS, Tailwind CSS, Bootstrap, Material UI, Swiper.js"],
      ["Dasturlash", "JavaScript, TypeScript, React"],
      ["Vositalar", "Git, GitHub, Vite"],
      ["Tillar", "O'zbek — ona tili · Ingliz — boshlang'ich · Rus — o'rta"],
    ],
    file: "Resume-UZ.docx",
  },
  ru: {
    name: "Асадбек Мирмахмудов",
    role: "Frontend-разработчик  |  Наманган, Узбекистан",
    summary:
      "Frontend-разработчик и ментор с опытом более 2 лет: полноценные веб-приложения на React и современном JavaScript. Опыт API-интеграции, state management и оптимизации UI/UX. Работаю в AsosIT и Raqamli Nazorat MCHJ, преподаю в Codial Academy.",
    work: "ОПЫТ РАБОТЫ",
    jobs: [
      {
        title: "Frontend-разработчик и project manager — AsosIT",
        date: "2026 – настоящее время",
        bullets: [
          "Веду frontend-разработку и координирую проект: планирование, команда, сроки, качество",
          "Создаю современные адаптивные интерфейсы на React, JavaScript и TypeScript",
        ],
      },
      {
        title: "Frontend-разработчик — Raqamli Nazorat MCHJ",
        date: "2026 – настоящее время",
        bullets: [
          "Разрабатываю адаптивные веб-интерфейсы для продуктов компании",
          "Переиспользуемые компоненты и интеграция REST API",
        ],
      },
      {
        title: "Преподаватель Frontend — Codial Academy, Фергана",
        date: "Янв 2024 – настоящее время",
        bullets: [
          "С ассистента до полного Frontend-инструктора (с июля 2025)",
          "Практика: UI-компоненты, API, UX, подготовка к работе и собеседованиям",
          "Codial Gamification V1 (70+) и V2 (100+, multi-role, admin dashboard, аукцион)",
        ],
      },
    ],
    projects: "ПРОЕКТЫ",
    projectItems: [
      {
        title: "Codial Gamification V2",
        date: "2026  ·  React, Tailwind",
        bullets: [
          "Multi-role система на 100+ пользователей (студент, ментор, админ)",
          "Admin dashboard, мониторинг, статистика и модуль аукциона",
          "https://gamification2.vercel.app",
        ],
      },
      {
        title: "Codial Gamification V1",
        date: "2025  ·  React, CSS",
        bullets: [
          "Платформа геймификации для студентов и менторов — 70+ пользователей",
          "https://gamificationinfo.vercel.app/",
        ],
      },
    ],
    education: "ОБРАЗОВАНИЕ",
    edu: [
      {
        title: "Ферганский гос. технический университет — Бакалавр, Компьютерная инженерия",
        date: "2021 – 2025  ·  Фергана, Узбекистан",
        text: "Квалификация: инженер-программист. GPA: 4.54/5. Диплом: 30.06.2025. Дипломная работа: система оценки «CODIAL COIN».",
      },
      {
        title: "Codial Academy — курс Frontend-разработки",
        date: "Март 2023 – Декабрь 2023",
        text: "Интенсивный практический курс с фокусом на React и UI-инженерию.",
      },
    ],
    skills: "НАВЫКИ",
    skillRows: [
      ["Frontend", "HTML, CSS, SCSS, Tailwind CSS, Bootstrap, Material UI, Swiper.js"],
      ["Программирование", "JavaScript, TypeScript, React"],
      ["Инструменты", "Git, GitHub, Vite"],
      ["Языки", "Узбекский — родной · Английский — начальный · Русский — средний"],
    ],
    file: "Resume-RU.docx",
  },
};

async function buildLang(key) {
  const d = DATA[key];
  const children = [
    h1(d.name),
    subtitle(d.role),
    contactLine([
      { label: "asadbekmirmahmudov3@gmail.com", href: "mailto:asadbekmirmahmudov3@gmail.com" },
      { label: "+998 91 344 44 68", href: "tel:+998913444468" },
      { label: "t.me/MirmahmudovAsadbek", href: "https://t.me/MirmahmudovAsadbek" },
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/asadbek-mirmahmudov-744b94282/",
      },
      { label: "GitHub", href: "https://github.com/Mirmahmudov" },
    ]),
    body(d.summary),
    section(d.work),
  ];

  for (const job of d.jobs) {
    children.push(jobTitle(job.title, job.date));
    for (const b of job.bullets) children.push(bullet(b));
  }

  children.push(section(d.projects));
  for (const p of d.projectItems) {
    children.push(jobTitle(p.title, p.date));
    for (const b of p.bullets) children.push(bullet(b));
  }

  children.push(section(d.education));
  for (const e of d.edu) {
    children.push(jobTitle(e.title, e.date));
    children.push(body(e.text));
  }

  children.push(section(d.skills));
  for (const [label, value] of d.skillRows) {
    children.push(skillLine(label, value));
  }

  const doc = new Document({
    styles: {
      default: {
        document: {
          run: { font: "Calibri", size: 20 },
        },
      },
    },
    numbering: {
      config: [
        {
          reference: "bullets",
          levels: [
            {
              level: 0,
              format: LevelFormat.BULLET,
              text: "•",
              alignment: AlignmentType.LEFT,
              style: {
                paragraph: {
                  indent: { left: 420, hanging: 220 },
                },
              },
            },
          ],
        },
      ],
    },
    sections: [
      {
        properties: {
          page: {
            size: { width: 11906, height: 16838 }, // A4
            margin: { top: 720, right: 720, bottom: 720, left: 720 },
          },
        },
        children,
      },
    ],
  });

  const buf = await Packer.toBuffer(doc);
  const outPath = path.join(outDir, d.file);
  fs.writeFileSync(outPath, buf);
  console.log("Wrote", outPath);
}

await Promise.all(["en", "uz", "ru"].map(buildLang));
console.log("All resumes ready.");
