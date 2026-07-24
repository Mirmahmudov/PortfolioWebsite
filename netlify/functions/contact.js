/**
 * Portfolio contact form → Telegram bot.
 * Secrets: TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID (Netlify env / local .env)
 */

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Content-Type": "application/json; charset=utf-8",
};

function json(statusCode, body) {
  return { statusCode, headers: CORS, body: JSON.stringify(body) };
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function clean(value, max) {
  return String(value || "")
    .trim()
    .slice(0, max);
}

async function resolveChatId(token, preferred) {
  if (preferred) return String(preferred);

  const res = await fetch(
    `https://api.telegram.org/bot${token}/getUpdates?limit=30`
  );
  const data = await res.json();
  if (!data.ok || !Array.isArray(data.result)) return null;

  const privateMsgs = data.result
    .map((u) => u.message || u.edited_message)
    .filter((m) => m && m.chat && m.chat.type === "private");

  if (!privateMsgs.length) return null;
  return String(privateMsgs[privateMsgs.length - 1].chat.id);
}

async function sendTelegram(token, chatId, text) {
  const res = await fetch(
    `https://api.telegram.org/bot${token}/sendMessage`,
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
  return res.json();
}

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers: CORS, body: "" };
  }

  if (event.httpMethod !== "POST") {
    return json(405, { ok: false, error: "method_not_allowed" });
  }

  try {
    const payload = JSON.parse(event.body || "{}");

    // Honeypot
    if (payload.website) {
      return json(200, { ok: true, spam: true });
    }

    const name = clean(payload.name, 80);
    const email = clean(payload.email, 120);
    const subject = clean(payload.subject, 120);
    const message = clean(payload.message, 2000);

    if (!name || !email || !subject || !message) {
      return json(400, { ok: false, error: "missing_fields" });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return json(400, { ok: false, error: "invalid_email" });
    }

    const token = process.env.TELEGRAM_BOT_TOKEN;
    if (!token) {
      return json(500, { ok: false, error: "not_configured" });
    }

    // Fallback chat id (Asadbek) — env bo'lmasa ham ishlaydi
    const chatId = await resolveChatId(
      token,
      process.env.TELEGRAM_CHAT_ID || "1723108222"
    );

    if (!chatId) {
      return json(500, {
        ok: false,
        error: "no_chat_id",
        hint: "Open t.me/asadbek_dev_bot and press Start, then retry.",
      });
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

    const tg = await sendTelegram(token, chatId, text);

    if (!tg.ok) {
      return json(502, {
        ok: false,
        error: "telegram_error",
        detail: tg.description || null,
      });
    }

    return json(200, { ok: true });
  } catch (error) {
    return json(500, { ok: false, error: "server_error" });
  }
};
