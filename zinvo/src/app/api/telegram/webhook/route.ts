import { NextResponse } from "next/server";

type TelegramChat = {
  id: number;
  first_name?: string;
  last_name?: string;
  username?: string;
  type?: string;
};

type TelegramMessage = {
  text?: string;
  chat?: TelegramChat;
  from?: TelegramChat;
};

type TelegramUpdate = {
  message?: TelegramMessage;
};

const botToken = process.env.TELEGRAM_BOT_TOKEN;
const adminChatId = process.env.TELEGRAM_CHAT_ID;
const channelUrl = process.env.TELEGRAM_CHANNEL_URL || "https://t.me/Zinvo_uz";

function clean(value: unknown) {
  return String(value || "").trim();
}

async function sendTelegramMessage(chatId: string | number, text: string, replyMarkup?: object) {
  if (!botToken) return;

  await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: "HTML",
      reply_markup: replyMarkup,
      disable_web_page_preview: true,
    }),
  });
}

function userLine(user?: TelegramChat) {
  if (!user) return "не определен";

  const username = user.username ? `@${user.username}` : "без username";
  const name = clean(`${user.first_name || ""} ${user.last_name || ""}`) || "без имени";

  return `${username} | ${name} | ID: ${user.id}`;
}

export async function POST(request: Request) {
  const update = (await request.json()) as TelegramUpdate;
  const message = update.message;
  const text = clean(message?.text);
  const chatId = message?.chat?.id;
  const user = message?.from || message?.chat;

  if (!chatId || !text.startsWith("/start")) {
    return NextResponse.json({ ok: true });
  }

  await sendTelegramMessage(
    chatId,
    [
      "Добро пожаловать в <b>ZINVO</b>.",
      "",
      "Мы создаем сайты, web-платформы, backend, автоматизацию и AI-инструменты для бизнеса.",
      "",
      "Подпишитесь на наш канал, там будут кейсы, новости и полезные материалы.",
    ].join("\n"),
    {
      inline_keyboard: [
        [{ text: "Открыть Telegram канал", url: channelUrl }],
      ],
    },
  );

  if (adminChatId) {
    await sendTelegramMessage(
      adminChatId,
      [
        "Клиент перешел в бота после формы ZINVO",
        "",
        `Telegram: ${userLine(user)}`,
      ].join("\n"),
    );
  }

  return NextResponse.json({ ok: true });
}
