const TELEGRAM_API = "https://api.telegram.org";

export async function sendTelegramNotification(lead: {
  id: string;
  name: string;
  email: string;
  phone: string;
  program: string;
  message: string;
  locale: string;
  createdAt: string;
}): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  console.log("[Telegram] token:", token ? "✅ есть" : "❌ нет");
  console.log("[Telegram] chatId:", chatId ? `✅ ${chatId}` : "❌ нет");

  if (!token || !chatId) {
    console.warn("[Telegram] Токены не заданы — пропускаю.");
    return;
  }

  const programLabels: Record<string, string> = {
    "sat-standard": "SAT Standard (3 мес.)",
    "sat-intensive": "SAT Intensive (2 мес.)",
    "ielts-standard": "IELTS Standard (3 мес.)",
    "ielts-intensive": "IELTS Intensive (2 мес.)",
  };

  const localeFlag: Record<string, string> = { ru: "🇷🇺", kk: "🇰🇿", en: "🇬🇧" };

  const date = new Date(lead.createdAt).toLocaleString("ru-RU", {
    timeZone: "Asia/Almaty",
    day: "2-digit", month: "2-digit", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });

  const lines = [
    `🎯 *Новая заявка — Kezen Education*`,
    ``,
    `👤 *Имя:* ${lead.name}`,
    `📧 *Email:* ${lead.email}`,
    `📞 *Телефон:* ${lead.phone || "не указан"}`,
    `📚 *Программа:* ${programLabels[lead.program] || lead.program || "не указана"}`,
    `${localeFlag[lead.locale] || ""} *Язык:* ${lead.locale.toUpperCase()}`,
    lead.message ? `💬 *Сообщение:* ${lead.message}` : null,
    ``,
    `🕐 ${date} (Алматы)`,
  ].filter(Boolean).join("\n");

  console.log("[Telegram] Отправляю сообщение...");

  const res = await fetch(`${TELEGRAM_API}/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text: lines, parse_mode: "Markdown" }),
  });

  const result = await res.json();
  console.log("[Telegram] Ответ:", JSON.stringify(result));
}