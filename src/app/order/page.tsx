"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  MessageSquareText,
  Phone,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { LanguageSwitcher, type Lang, useLanguage } from "../i18n";

type TelegramUser = {
  id?: number;
  first_name?: string;
  last_name?: string;
  username?: string;
};

declare global {
  interface Window {
    Telegram?: {
      WebApp?: {
        initData?: string;
        initDataUnsafe?: {
          user?: TelegramUser;
        };
        ready?: () => void;
      };
    };
  }
}

const fadeUp = {
  hidden: { opacity: 0, y: 28, filter: "blur(10px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

const telegramBotLink = "https://t.me/Zinvo_uz_Bot?start=order_request";
const externalSiteLink = "#";

const orderCopy: Record<Lang, Record<string, string>> = {
  en: {
    back: "Back",
    site: "Open site",
    eyebrow: "Заявка на проект",
    title: "Tell us who to call back.",
    intro: "Leave your name and phone number. We will contact you, clarify the task, and suggest the best format: website, web app, mobile app, backend, automation, or AI tool.",
    step1: "Quick call",
    step2: "Work plan",
    step3: "Project estimate",
    formEyebrow: "Форма заказа",
    formTitle: "Order a project",
    formCopy: "Contacts will go to our Telegram. If the form is opened inside Telegram, the username is detected automatically.",
    telegramDetected: "Telegram detected automatically",
    firstName: "First name",
    firstNamePlaceholder: "For example, Farrux",
    lastName: "Last name",
    lastNamePlaceholder: "Enter last name",
    phone: "Phone number",
    type: "What do you need",
    comment: "Comment",
    commentPlaceholder: "Briefly describe the task if you already have an idea",
    send: "Send request",
    sending: "Sending...",
    success: "Request sent. If the form is opened through Telegram, the client's username was attached automatically.",
    error: "Could not send the request. Check Telegram bot token and chat id settings.",
  },
  ru: {
    back: "Назад",
    site: "Перейти на сайт",
    eyebrow: "Loyiha so'rovi",
    title: "Расскажите, кому перезвонить.",
    intro: "Оставьте имя и номер. Мы свяжемся, уточним задачу и предложим лучший формат разработки: сайт, web-приложение, мобильное приложение, backend, автоматизация или AI-инструмент.",
    step1: "Быстрый звонок",
    step2: "План работ",
    step3: "Оценка проекта",
    formEyebrow: "Buyurtma formasi",
    formTitle: "Заказать проект",
    formCopy: "Контакты попадут нам в Telegram. Если форма открыта внутри Telegram, username подтянется автоматически.",
    telegramDetected: "Telegram определен автоматически",
    firstName: "Имя",
    firstNamePlaceholder: "Например, Farrux",
    lastName: "Фамилия",
    lastNamePlaceholder: "Введите фамилию",
    phone: "Номер телефона",
    type: "Что нужно сделать",
    comment: "Комментарий",
    commentPlaceholder: "Коротко опишите задачу, если уже есть идея",
    send: "Отправить заявку",
    sending: "Отправляем...",
    success: "Заявка отправлена. Если форма открыта через Telegram, username клиента пришел автоматически.",
    error: "Не получилось отправить заявку. Проверьте настройки Telegram bot token и chat id.",
  },
  uz: {
    back: "Orqaga",
    site: "Saytga o'tish",
    eyebrow: "Project request",
    title: "Kimga qo'ng'iroq qilishimizni yozing.",
    intro: "Ism va telefon raqamingizni qoldiring. Biz bog'lanamiz, vazifani aniqlashtiramiz va eng yaxshi formatni taklif qilamiz: sayt, web-ilova, mobil ilova, backend, avtomatlashtirish yoki AI tool.",
    step1: "Tez qo'ng'iroq",
    step2: "Ish rejasi",
    step3: "Loyiha bahosi",
    formEyebrow: "Order form",
    formTitle: "Loyiha buyurtma qilish",
    formCopy: "Kontaktlar Telegramimizga boradi. Forma Telegram ichida ochilsa, username avtomatik aniqlanadi.",
    telegramDetected: "Telegram avtomatik aniqlandi",
    firstName: "Ism",
    firstNamePlaceholder: "Masalan, Farrux",
    lastName: "Familiya",
    lastNamePlaceholder: "Familiyani kiriting",
    phone: "Telefon raqam",
    type: "Nima kerak",
    comment: "Izoh",
    commentPlaceholder: "Agar g'oya bo'lsa, vazifani qisqacha yozing",
    send: "Ariza yuborish",
    sending: "Yuborilmoqda...",
    success: "Ariza yuborildi. Forma Telegram orqali ochilgan bo'lsa, mijoz username avtomatik qo'shildi.",
    error: "Arizani yuborib bo'lmadi. Telegram bot token va chat id sozlamalarini tekshiring.",
  },
};

export default function OrderPage() {
  const { lang, setLang } = useLanguage();
  const t = orderCopy[lang];
  const [sent, setSent] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState("");
  const [telegramUser, setTelegramUser] = useState<TelegramUser | null>(null);

  const projectTypes: Record<Lang, string[]> = {
    en: ["Website", "Web app", "Mobile app", "Full-stack product", "Backend / API", "Automation", "AI tool"],
    ru: ["Сайт", "Web-приложение", "Мобильное приложение", "Full-stack продукт", "Backend / API", "Автоматизация", "AI-инструмент"],
    uz: ["Sayt", "Web-ilova", "Mobil ilova", "Full-stack mahsulot", "Backend / API", "Avtomatlashtirish", "AI tool"],
  };

  useEffect(() => {
    const handlePageShow = () => {
      if (window.sessionStorage.getItem("zinvo-order-redirected") === "true") {
        window.sessionStorage.removeItem("zinvo-order-redirected");
        window.location.replace("/");
      }
    };

    window.addEventListener("pageshow", handlePageShow);

    const user = window.Telegram?.WebApp?.initDataUnsafe?.user;
    window.Telegram?.WebApp?.ready?.();

    const timer = window.setTimeout(() => {
      setTelegramUser(user || null);
    }, 0);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("pageshow", handlePageShow);
    };
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSending(true);
    setSent(false);
    setError("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      firstName: String(formData.get("firstName") || ""),
      lastName: String(formData.get("lastName") || ""),
      phone: String(formData.get("phone") || ""),
      projectType: String(formData.get("projectType") || ""),
      comment: String(formData.get("comment") || ""),
      telegramUsername: telegramUser?.username || "",
      telegramId: telegramUser?.id ? String(telegramUser.id) : "",
      telegramFirstName: telegramUser?.first_name || "",
      telegramLastName: telegramUser?.last_name || "",
    };

    try {
      const response = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      setSent(true);
      form.reset();
      window.setTimeout(() => {
        window.sessionStorage.setItem("zinvo-order-redirected", "true");
        window.location.replace(telegramBotLink);
      }, 650);
    } catch {
      setError(t.error);
    } finally {
      setIsSending(false);
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050B1E] px-5 py-8 text-white sm:px-8 lg:px-10">
      <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(34,211,238,0.26),transparent_30%),radial-gradient(circle_at_82%_18%,rgba(99,102,241,0.30),transparent_30%),radial-gradient(circle_at_50%_92%,rgba(168,85,247,0.16),transparent_34%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(125,211,252,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(125,211,252,0.055)_1px,transparent_1px)] bg-[size:58px_58px] [mask-image:radial-gradient(circle_at_center,black,transparent_78%)]" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-64px)] max-w-7xl flex-col">
        <header className="flex items-center justify-between gap-4">
          <Link
            href="/"
            className="inline-flex h-11 items-center gap-2 rounded-full border border-white/10 bg-white/[0.045] px-4 text-sm text-slate-300 backdrop-blur-xl transition hover:border-cyan-300/35 hover:text-white"
          >
            <ArrowLeft className="size-4" />
            {t.back}
          </Link>

          <div className="flex items-center gap-3">
            <a
              href={externalSiteLink}
              className="hidden h-11 items-center rounded-full border border-cyan-300/20 bg-cyan-300/8 px-4 text-sm font-medium text-cyan-100 backdrop-blur-xl transition hover:border-cyan-300/45 hover:bg-cyan-300/12 sm:inline-flex"
            >
              {t.site}
            </a>
            <LanguageSwitcher lang={lang} setLang={setLang} className="hidden sm:inline-flex" />
            <div className="flex items-end text-2xl font-black uppercase leading-[0.76] tracking-tight">
              ZINVO
              <span className="ml-1 inline-block size-2 rounded-full bg-[#4F67FF] shadow-[0_0_18px_rgba(79,103,255,0.8)]" />
            </div>
          </div>
        </header>
        <div className="mt-4 flex justify-end sm:hidden">
          <LanguageSwitcher lang={lang} setLang={setLang} />
        </div>

        <section className="grid flex-1 items-center gap-10 py-16 lg:grid-cols-[0.92fr_1.08fr]">
          <motion.div
            initial="hidden"
            animate="visible"
            transition={{ staggerChildren: 0.08 }}
            className="max-w-2xl"
          >
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="mb-5 text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300"
            >
              {t.eyebrow}
            </motion.p>
            <motion.h1
              variants={fadeUp}
              transition={{ duration: 0.78, ease: [0.22, 1, 0.36, 1] }}
              className="text-5xl font-semibold leading-tight tracking-normal sm:text-6xl lg:text-7xl"
            >
              {t.title}
            </motion.h1>
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.78, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 max-w-xl text-lg leading-8 text-slate-400"
            >
              {t.intro}
            </motion.p>

            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.78, ease: [0.22, 1, 0.36, 1] }}
              className="mt-10 grid gap-3 sm:grid-cols-3"
            >
              {[t.step1, t.step2, t.step3].map((item, index) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-white/[0.045] p-4 backdrop-blur-xl"
                >
                  <p className="text-sm font-semibold text-cyan-300">0{index + 1}</p>
                  <p className="mt-3 text-sm leading-5 text-slate-300">{item}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 38, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.82, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="absolute -inset-4 rounded-[34px] bg-cyan-300/12 blur-3xl" />
            <form
              onSubmit={handleSubmit}
              className="relative overflow-hidden rounded-[32px] border border-white/12 bg-white/[0.065] p-5 shadow-2xl shadow-cyan-950/30 backdrop-blur-2xl sm:p-7"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_10%,rgba(34,211,238,0.12),transparent_34%),radial-gradient(circle_at_92%_82%,rgba(139,92,246,0.14),transparent_36%)]" />
              <div className="relative">
                <div className="mb-7 flex items-start justify-between gap-6">
                  <div>
                    <p className="text-sm font-medium text-cyan-300">{t.formEyebrow}</p>
                    <h2 className="mt-2 text-3xl font-semibold tracking-normal">{t.formTitle}</h2>
                    <p className="mt-2 max-w-sm text-sm leading-6 text-slate-400">
                      {t.formCopy}
                    </p>
                  </div>
                  <div className="flex size-12 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-300/10 text-cyan-200">
                    <ShieldCheck className="size-6" />
                  </div>
                </div>

                <div className="grid gap-5">
                  {telegramUser?.username && (
                    <div className="flex items-center justify-between gap-4 rounded-2xl border border-cyan-300/18 bg-cyan-300/8 p-4 text-sm text-cyan-100">
                      <span>{t.telegramDetected}</span>
                      <span className="font-semibold">@{telegramUser.username}</span>
                    </div>
                  )}

                  <div className="grid gap-5 sm:grid-cols-2">
                    <label className="block">
                      <span className="mb-2 block text-sm font-medium text-slate-300">{t.firstName}</span>
                      <div className="relative">
                        <UserRound className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-cyan-200/70" />
                        <input
                          required
                          name="firstName"
                          autoComplete="given-name"
                          placeholder={t.firstNamePlaceholder}
                          className="h-14 w-full rounded-2xl border border-white/10 bg-[#07132f]/72 pl-12 pr-4 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-300/55 focus:ring-4 focus:ring-cyan-300/10"
                        />
                      </div>
                    </label>

                    <label className="block">
                      <span className="mb-2 block text-sm font-medium text-slate-300">{t.lastName}</span>
                      <input
                        required
                        name="lastName"
                        autoComplete="family-name"
                        placeholder={t.lastNamePlaceholder}
                        className="h-14 w-full rounded-2xl border border-white/10 bg-[#07132f]/72 px-4 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-300/55 focus:ring-4 focus:ring-cyan-300/10"
                      />
                    </label>
                  </div>

                  <label className="block">
                    <span className="mb-2 block text-sm font-medium text-slate-300">{t.phone}</span>
                    <div className="relative">
                      <Phone className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-cyan-200/70" />
                      <input
                        required
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        placeholder="+998 90 123 45 67"
                        className="h-14 w-full rounded-2xl border border-white/10 bg-[#07132f]/72 pl-12 pr-4 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-300/55 focus:ring-4 focus:ring-cyan-300/10"
                      />
                    </div>
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-sm font-medium text-slate-300">{t.type}</span>
                    <div className="relative">
                      <BriefcaseBusiness className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-cyan-200/70" />
                      <select
                        name="projectType"
                        className="h-14 w-full appearance-none rounded-2xl border border-white/10 bg-[#07132f]/72 pl-12 pr-4 text-white outline-none transition focus:border-cyan-300/55 focus:ring-4 focus:ring-cyan-300/10"
                        defaultValue={projectTypes[lang][0]}
                      >
                        {projectTypes[lang].map((projectType) => (
                          <option key={projectType}>{projectType}</option>
                        ))}
                      </select>
                    </div>
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-sm font-medium text-slate-300">{t.comment}</span>
                    <div className="relative">
                      <MessageSquareText className="pointer-events-none absolute left-4 top-4 size-5 text-cyan-200/70" />
                      <textarea
                        name="comment"
                        rows={4}
                        placeholder={t.commentPlaceholder}
                        className="w-full resize-none rounded-2xl border border-white/10 bg-[#07132f]/72 py-4 pl-12 pr-4 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-300/55 focus:ring-4 focus:ring-cyan-300/10"
                      />
                    </div>
                  </label>

                </div>

                <button
                  type="submit"
                  disabled={isSending}
                  className="group mt-8 inline-flex h-14 w-full items-center justify-center gap-3 rounded-full bg-cyan-300 px-6 text-sm font-semibold text-[#051124] shadow-[0_0_44px_rgba(34,211,238,0.34)] transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSending ? t.sending : t.send}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </button>

                {sent && (
                  <motion.div
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-5 flex items-center gap-3 rounded-2xl border border-emerald-300/20 bg-emerald-300/10 p-4 text-sm text-emerald-100"
                  >
                    <CheckCircle2 className="size-5" />
                    {t.success}
                  </motion.div>
                )}

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-5 rounded-2xl border border-red-300/20 bg-red-300/10 p-4 text-sm text-red-100"
                  >
                    {error}
                  </motion.div>
                )}
              </div>
            </form>
          </motion.div>
        </section>
      </div>
    </main>
  );
}
