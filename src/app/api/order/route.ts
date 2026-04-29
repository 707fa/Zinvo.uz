import { NextResponse } from "next/server";

type OrderPayload = {
  firstName?: string;
  lastName?: string;
  phone?: string;
  projectType?: string;
  comment?: string;
  telegramUsername?: string;
  telegramId?: string;
  telegramFirstName?: string;
  telegramLastName?: string;
};

function clean(value: unknown) {
  return String(value || "").trim();
}

function buildMessage(payload: OrderPayload) {
  const telegramLine = payload.telegramUsername
    ? `@${payload.telegramUsername}`
    : payload.telegramId
      ? `ID: ${payload.telegramId}`
      : "не определен";

  return [
    "Новая заявка с сайта ZINVO",
    "",
    `Имя: ${clean(payload.firstName)}`,
    `Фамилия: ${clean(payload.lastName)}`,
    `Телефон: ${clean(payload.phone)}`,
    `Тип проекта: ${clean(payload.projectType) || "не указан"}`,
    clean(payload.comment) ? `Комментарий: ${clean(payload.comment)}` : "",
    `Telegram: ${telegramLine}`,
    payload.telegramFirstName || payload.telegramLastName
      ? `Telegram name: ${clean(`${payload.telegramFirstName || ""} ${payload.telegramLastName || ""}`)}`
      : "",
  ]
    .filter(Boolean)
    .join("\n");
}

export async function POST(request: Request) {
  const payload = (await request.json()) as OrderPayload;
  const firstName = clean(payload.firstName);
  const lastName = clean(payload.lastName);
  const phone = clean(payload.phone);

  if (!firstName || !lastName || !phone) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    return NextResponse.json(
      { error: "Telegram bot is not configured" },
      { status: 500 },
    );
  }

  const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: buildMessage(payload),
    }),
  });

  if (!response.ok) {
    return NextResponse.json({ error: "Telegram request failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
