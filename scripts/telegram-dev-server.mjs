/**
 * Local dev proxy for contact → Telegram (same logic as Netlify function).
 * Usage:
 *   1. Fill .env (TELEGRAM_BOT_TOKEN, optional TELEGRAM_CHAT_ID)
 *   2. Message the bot: https://t.me/asadbek_dev_bot → Start
 *   3. node scripts/telegram-dev-server.mjs
 *   4. Serve site and submit the form
 */
import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

function loadEnv() {
  const envPath = path.join(root, ".env");
  if (!fs.existsSync(envPath)) return;
  for (const line of fs.readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (!m) continue;
    let val = m[2];
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    if (!process.env[m[1]]) process.env[m[1]] = val;
  }
}

loadEnv();

const PORT = Number(process.env.TELEGRAM_DEV_PORT || 8787);
const TOKEN = process.env.TELEGRAM_BOT_TOKEN;

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

async function resolveChatId() {
  if (process.env.TELEGRAM_CHAT_ID) return process.env.TELEGRAM_CHAT_ID;

  // Known owner chat (Asadbek) — Start bosilgan bo'lsa ishlaydi
  const FALLBACK_CHAT_ID = "1723108222";

  try {
    const res = await fetch(
      `https://api.telegram.org/bot${TOKEN}/getUpdates?limit=30`
    );
    const data = await res.json();
    const privateMsgs = (data.result || [])
      .map((u) => u.message || u.edited_message)
      .filter((m) => m?.chat?.type === "private");
    if (privateMsgs.length) {
      return String(privateMsgs[privateMsgs.length - 1].chat.id);
    }
  } catch (_) {
    /* ignore */
  }

  return FALLBACK_CHAT_ID;
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on("data", (c) => chunks.push(c));
    req.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    req.on("error", reject);
  });
}

const server = http.createServer(async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.method === "GET" && req.url === "/health") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ ok: true, hasToken: Boolean(TOKEN) }));
    return;
  }

  if (req.method !== "POST" || !req.url.startsWith("/contact")) {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ ok: false, error: "not_found" }));
    return;
  }

  try {
    if (!TOKEN) {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ ok: false, error: "not_configured" }));
      return;
    }

    const payload = JSON.parse((await readBody(req)) || "{}");
    if (payload.website) {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ ok: true, spam: true }));
      return;
    }

    const name = String(payload.name || "").trim().slice(0, 80);
    const email = String(payload.email || "").trim().slice(0, 120);
    const subject = String(payload.subject || "").trim().slice(0, 120);
    const message = String(payload.message || "").trim().slice(0, 2000);

    if (!name || !email || !subject || !message) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ ok: false, error: "missing_fields" }));
      return;
    }

    const chatId = await resolveChatId();
    if (!chatId) {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          ok: false,
          error: "no_chat_id",
          hint: "Open https://t.me/asadbek_dev_bot and press Start",
        })
      );
      return;
    }

    // Persist discovered chat id for next runs
    if (!process.env.TELEGRAM_CHAT_ID) {
      process.env.TELEGRAM_CHAT_ID = chatId;
      console.log("Discovered TELEGRAM_CHAT_ID =", chatId);
    }

    const text = [
      "📩 <b>Portfolio — yangi xabar</b>",
      "",
      `<b>Ism:</b> ${escapeHtml(name)}`,
      `<b>Email:</b> ${escapeHtml(email)}`,
      `<b>Mavzu:</b> ${escapeHtml(subject)}`,
      "",
      "<b>Xabar:</b>",
      escapeHtml(message),
    ].join("\n");

    const tgRes = await fetch(
      `https://api.telegram.org/bot${TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text,
          parse_mode: "HTML",
          disable_web_page_preview: true,
        }),
      }
    );
    const tg = await tgRes.json();

    if (!tg.ok) {
      console.error("Telegram error:", tg);
      res.writeHead(502, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          ok: false,
          error: "telegram_error",
          detail: tg.description,
        })
      );
      return;
    }

    console.log("Message delivered to chat", chatId);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ ok: true }));
  } catch (error) {
    console.error(error);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ ok: false, error: "server_error" }));
  }
});

server.listen(PORT, () => {
  console.log(`Telegram contact proxy: http://127.0.0.1:${PORT}/contact`);
  console.log("1) Open https://t.me/asadbek_dev_bot and press Start");
  console.log("2) Submit the portfolio form (local site)");
});
