"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import {
  type MotionValue,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import Lenis from "lenis";
import {
  ArrowRight,
  Boxes,
  Bot,
  BrainCircuit,
  Braces,
  CalendarClock,
  CloudCog,
  Code2,
  Database,
  Film,
  GitFork,
  Layers3,
  LineChart,
  MessageSquareCode,
  Network,
  PenLine,
  Send,
  ServerCog,
  ShieldCheck,
  Smartphone,
  Sparkles,
  TerminalSquare,
  Users2,
  Workflow,
  Zap,
} from "lucide-react";
import { LanguageSwitcher, type Lang, type Localized, text, useLanguage } from "./i18n";

const copy: Record<Lang, Record<string, string>> = {
  en: {
    badge: "Premium full-stack IT agency",
    subtitle: "Full Stack IT Agency",
    heroCopy: "We build websites, web apps, mobile apps, backend systems, and full-stack products for businesses that need more than a template.",
    order: "Order",
    consoleUrl: "zinvo.agency/delivery",
    delivery: "Delivery confidence",
    servicesEyebrow: "Services",
    servicesTitle: "Web, app, backend, DevOps: one full-stack team for the whole product.",
    servicesCopy: "Zinvo builds websites, dashboards, platforms, mobile app interfaces, APIs, admin panels, integrations, automations, and launch infrastructure.",
    processEyebrow: "Process",
    processTitle: "A calm delivery rhythm, not random development.",
    processCopy: "Every project moves through a simple path. Less confusion, fewer surprises, better product decisions.",
    platformEyebrow: "Our platform",
    platformTitle: "One of our products is an AI platform that helps businesses stay visible online.",
    platformCopy: "The owner describes the business once. Zinvo turns that context into content ideas, practical advice, blog posts, video scripts, and scheduled Instagram material.",
    autopilot: "Autopilot loop",
    autopilotCopy: "One business brief becomes a repeatable content engine.",
    stackEyebrow: "Stack",
    stackTitle: "Modern stack, selected for speed and maintainability.",
    stackCopy: "We use tools that are proven in production, easy to extend, and strong enough for real products.",
    casesEyebrow: "Case studies",
    casesTitle: "The work is meant to feel polished on the surface and organized underneath.",
    casesCopy: "These examples show the kind of systems we build: useful, sharp, fast, and ready for real users.",
    collaborationEyebrow: "Collaboration",
    collaborationTitle: "You talk to one team, and the whole product moves together.",
    collaborationCopy: "No messy handoffs between separate vendors. Strategy, design, engineering, deployment, and support stay connected.",
    footer: "Full Stack IT Agency",
    consoleFrontend: "Frontend",
    consoleBackend: "Backend",
    consoleDevops: "DevOps",
    consoleData: "Data",
    pipelineStrategy: "Strategy",
    pipelineDesign: "Design",
    pipelineBuild: "Build",
    pipelineLaunch: "Launch",
  },
  ru: {
    badge: "Премиальное full-stack IT агентство",
    subtitle: "Full Stack IT агентство",
    heroCopy: "Мы создаем сайты, web-приложения, мобильные приложения, backend-системы и full-stack продукты для бизнеса, которому нужен не шаблон.",
    order: "Заказать",
    consoleUrl: "zinvo.agency/delivery",
    delivery: "Уверенность запуска",
    servicesEyebrow: "Услуги",
    servicesTitle: "Web, app, backend, DevOps: одна full-stack команда для всего продукта.",
    servicesCopy: "Zinvo делает сайты, dashboards, платформы, интерфейсы мобильных приложений, API, админ-панели, интеграции, автоматизацию и инфраструктуру запуска.",
    processEyebrow: "Процесс",
    processTitle: "Спокойный ритм разработки вместо хаотичной работы.",
    processCopy: "Каждый проект идет по понятному пути: меньше путаницы, меньше сюрпризов, сильнее продуктовые решения.",
    platformEyebrow: "Наша платформа",
    platformTitle: "Один из наших продуктов — AI-платформа, которая помогает бизнесу быть заметным онлайн.",
    platformCopy: "Владелец один раз описывает бизнес. Zinvo превращает это в идеи контента, полезные советы, посты для блога, сценарии видео и материалы для Instagram.",
    autopilot: "Автопилот контента",
    autopilotCopy: "Одно описание бизнеса превращается в повторяемую систему контента.",
    stackEyebrow: "Стек",
    stackTitle: "Современный стек, выбранный для скорости и поддержки.",
    stackCopy: "Мы используем инструменты, которые проверены в production, легко расширяются и подходят для реальных продуктов.",
    casesEyebrow: "Кейсы",
    casesTitle: "Снаружи работа выглядит отполированной, внутри — организованной.",
    casesCopy: "Эти примеры показывают тип систем, которые мы создаем: полезные, быстрые, аккуратные и готовые к реальным пользователям.",
    collaborationEyebrow: "Работа с нами",
    collaborationTitle: "Вы общаетесь с одной командой, и весь продукт движется вместе.",
    collaborationCopy: "Без хаотичных передач между разными подрядчиками. Стратегия, дизайн, разработка, запуск и поддержка остаются связанными.",
    footer: "Full Stack IT агентство",
    consoleFrontend: "Frontend",
    consoleBackend: "Backend",
    consoleDevops: "DevOps",
    consoleData: "Данные",
    pipelineStrategy: "Стратегия",
    pipelineDesign: "Дизайн",
    pipelineBuild: "Разработка",
    pipelineLaunch: "Запуск",
  },
  uz: {
    badge: "Premium full-stack IT agentlik",
    subtitle: "Full Stack IT agentlik",
    heroCopy: "Biz biznes uchun saytlar, web-ilovalar, mobil ilovalar, backend tizimlar va full-stack mahsulotlar yaratamiz.",
    order: "Buyurtma berish",
    consoleUrl: "zinvo.agency/delivery",
    delivery: "Ishga tushirish ishonchi",
    servicesEyebrow: "Xizmatlar",
    servicesTitle: "Web, app, backend, DevOps: butun mahsulot uchun bitta full-stack jamoa.",
    servicesCopy: "Zinvo saytlar, dashboardlar, platformalar, mobil ilova interfeyslari, API, admin panellar, integratsiyalar, avtomatlashtirish va launch infratuzilmasini yaratadi.",
    processEyebrow: "Jarayon",
    processTitle: "Tartibsiz ishlab chiqish emas, aniq va sokin delivery ritmi.",
    processCopy: "Har bir loyiha tushunarli yo'l bilan boradi: kamroq chalkashlik, kamroq kutilmagan holat, kuchliroq product qarorlar.",
    platformEyebrow: "Bizning platforma",
    platformTitle: "Mahsulotlarimizdan biri biznesni online ko'rinarli qiladigan AI platformadir.",
    platformCopy: "Biznes egasi kompaniyani bir marta tushuntiradi. Zinvo bundan kontent g'oyalari, foydali maslahatlar, blog postlar, video ssenariylar va Instagram materiallar yaratadi.",
    autopilot: "Kontent autopiloti",
    autopilotCopy: "Bitta biznes brief takrorlanadigan kontent tizimiga aylanadi.",
    stackEyebrow: "Stack",
    stackTitle: "Tezlik va qo'llab-quvvatlash uchun tanlangan zamonaviy stack.",
    stackCopy: "Biz productionda sinalgan, kengaytirish oson va haqiqiy mahsulotlar uchun kuchli vositalardan foydalanamiz.",
    casesEyebrow: "Keyslar",
    casesTitle: "Tashqaridan polished, ichkaridan tartibli mahsulotlar.",
    casesCopy: "Bu misollar biz quradigan tizimlarni ko'rsatadi: foydali, tez, aniq va real foydalanuvchilarga tayyor.",
    collaborationEyebrow: "Hamkorlik",
    collaborationTitle: "Siz bitta jamoa bilan gaplashasiz, mahsulot esa bir butun bo'lib rivojlanadi.",
    collaborationCopy: "Alohida vendorlar orasida chalkash handoff yo'q. Strategiya, dizayn, engineering, deployment va support bir joyda.",
    footer: "Full Stack IT agentlik",
    consoleFrontend: "Frontend",
    consoleBackend: "Backend",
    consoleDevops: "DevOps",
    consoleData: "Data",
    pipelineStrategy: "Strategiya",
    pipelineDesign: "Dizayn",
    pipelineBuild: "Build",
    pipelineLaunch: "Launch",
  },
};

const ecosystemCards = [
  {
    icon: Code2,
    title: { en: "Websites & web apps", ru: "Сайты и web-приложения", uz: "Saytlar va web-ilovalar" },
    copy: {
      en: "Landing pages, corporate sites, dashboards, SaaS panels, client portals, and product flows with a premium interface.",
      ru: "Landing pages, корпоративные сайты, dashboards, SaaS-панели, клиентские порталы и product flows с премиальным интерфейсом.",
      uz: "Landing page, korporativ saytlar, dashboardlar, SaaS panellar, mijoz portallari va premium product flowlar.",
    },
    accent: "from-cyan-300 to-blue-500",
  },
  {
    icon: Smartphone,
    title: { en: "Mobile app interfaces", ru: "Мобильные приложения", uz: "Mobil ilovalar" },
    copy: {
      en: "Modern app screens, onboarding, account areas, booking flows, catalogues, and connected mobile-first experiences.",
      ru: "Современные экраны приложений, onboarding, личные кабинеты, booking flows, каталоги и mobile-first интерфейсы.",
      uz: "Zamonaviy app ekranlari, onboarding, kabinetlar, booking flowlar, kataloglar va mobile-first interfeyslar.",
    },
    accent: "from-sky-300 to-fuchsia-500",
  },
  {
    icon: ServerCog,
    title: { en: "Backend systems", ru: "Backend-системы", uz: "Backend tizimlar" },
    copy: {
      en: "APIs, admin panels, databases, payments, integrations, and reliable business logic behind the product.",
      ru: "API, админ-панели, базы данных, платежи, интеграции и надежная бизнес-логика внутри продукта.",
      uz: "API, admin panellar, ma'lumotlar bazasi, to'lovlar, integratsiyalar va ishonchli biznes logika.",
    },
    accent: "from-blue-300 to-violet-500",
  },
  {
    icon: CloudCog,
    title: { en: "DevOps & launch", ru: "DevOps и запуск", uz: "DevOps va launch" },
    copy: {
      en: "Deployment, CI/CD, Docker, monitoring, performance, and the setup needed to keep projects stable.",
      ru: "Deployment, CI/CD, Docker, monitoring, performance и настройка, которая держит проект стабильным.",
      uz: "Deployment, CI/CD, Docker, monitoring, performance va loyihani barqaror ushlab turadigan sozlamalar.",
    },
    accent: "from-fuchsia-300 to-cyan-400",
  },
];

const techStack = [
  { name: "React", icon: Braces },
  { name: "Next.js", icon: Layers3 },
  { name: "TypeScript", icon: TerminalSquare },
  { name: "Node.js", icon: Network },
  { name: "Python", icon: Sparkles },
  { name: "PostgreSQL", icon: Database },
  { name: "Docker", icon: Boxes },
];

const projects = [
  {
    title: { en: "Client Operations Portal", ru: "Портал управления клиентами", uz: "Mijozlar boshqaruv portali" },
    tags: ["Dashboard", "CRM", "Automation"],
    gradient: "from-cyan-400/35 via-blue-500/20 to-transparent",
    image: "/images/client-operations-portal.jpg",
    imageAlt: {
      en: "Analytics dashboard on a laptop screen",
      ru: "Аналитический dashboard на экране ноутбука",
      uz: "Noutbuk ekranidagi analitika dashboardi",
    },
  },
  {
    title: { en: "AI Booking Workflow", ru: "AI-система бронирования", uz: "AI booking workflow" },
    tags: ["Integrations", "Backend", "AI"],
    gradient: "from-violet-400/35 via-cyan-500/20 to-transparent",
    image: "/images/ai-booking-workflow.jpg",
    imageAlt: {
      en: "Modern laptop workspace for automated digital workflows",
      ru: "Рабочее место с ноутбуком для автоматизированных digital-процессов",
      uz: "Avtomatlashtirilgan digital jarayonlar uchun zamonaviy laptop workspace",
    },
  },
  {
    title: { en: "E-commerce Control Center", ru: "E-commerce control center", uz: "E-commerce boshqaruv markazi" },
    tags: ["Payments", "Catalog", "Analytics"],
    gradient: "from-blue-400/35 via-fuchsia-500/20 to-transparent",
    image: "/images/ecommerce-control-center.jpg",
    imageAlt: {
      en: "Online store work on a laptop",
      ru: "Работа с онлайн-магазином на ноутбуке",
      uz: "Noutbukda online do'kon bilan ishlash",
    },
  },
];

const platformImage = {
  src: "/images/platform-social-management.jpg",
  alt: {
    en: "Laptop with social media management open",
    ru: "Ноутбук с открытой системой управления социальными сетями",
    uz: "Social media boshqaruvi ochilgan noutbuk",
  },
};

const community = [
  {
    icon: GitFork,
    title: { en: "Clear scope first", ru: "Сначала четкий scope", uz: "Avval aniq scope" },
    copy: {
      en: "We start by turning the idea into pages, features, data flows, and a realistic delivery plan.",
      ru: "Сначала превращаем идею в страницы, функции, data flows и реалистичный план разработки.",
      uz: "Avval g'oyani sahifalar, funksiyalar, data flow va real delivery rejasiga aylantiramiz.",
    },
  },
  {
    icon: Users2,
    title: { en: "One technical team", ru: "Одна техническая команда", uz: "Bitta texnik jamoa" },
    copy: {
      en: "Frontend, backend, and infrastructure decisions happen together, so the product does not feel stitched.",
      ru: "Frontend, backend и инфраструктура решаются вместе, поэтому продукт не выглядит собранным из кусков.",
      uz: "Frontend, backend va infratuzilma qarorlari birga olinadi, mahsulot yig'ma ko'rinmaydi.",
    },
  },
  {
    icon: MessageSquareCode,
    title: { en: "Support after launch", ru: "Поддержка после запуска", uz: "Launchdan keyingi support" },
    copy: {
      en: "We improve speed, fix weak points, add features, and keep the product ready for the next version.",
      ru: "Ускоряем, исправляем слабые места, добавляем функции и готовим продукт к следующей версии.",
      uz: "Tezlikni yaxshilaymiz, zaif joylarni tuzatamiz, funksiyalar qo'shamiz va keyingi versiyaga tayyorlaymiz.",
    },
  },
];

const platformFlow = [
  {
    label: "01",
    title: { en: "Describe", ru: "Описать", uz: "Tushuntirish" },
    copy: {
      en: "The owner explains the business, audience, offers, tone, and what kind of customers they want.",
      ru: "Владелец описывает бизнес, аудиторию, предложения, стиль общения и нужных клиентов.",
      uz: "Biznes egasi biznes, auditoriya, offerlar, tone va kerakli mijozlarni tushuntiradi.",
    },
    image: "/images/platform-describe-brief.jpg",
    imageAlt: {
      en: "Social media marketing plan in a notebook",
      ru: "План social media marketing в блокноте",
      uz: "Daftardagi social media marketing rejasi",
    },
  },
  {
    label: "02",
    title: { en: "Generate", ru: "Сгенерировать", uz: "Generatsiya" },
    copy: {
      en: "The platform produces blog topics, advice posts, captions, video scripts, and content angles.",
      ru: "Платформа создает темы блога, полезные посты, captions, сценарии видео и контент-углы.",
      uz: "Platforma blog mavzulari, maslahat postlari, captionlar, video ssenariylar va kontent burchaklarini yaratadi.",
    },
    image: "/images/platform-generate-content.jpg",
    imageAlt: {
      en: "Laptop screen with content creation software",
      ru: "Экран ноутбука с программой для создания контента",
      uz: "Kontent yaratish dasturi ochilgan noutbuk ekrani",
    },
  },
  {
    label: "03",
    title: { en: "Publish", ru: "Опубликовать", uz: "Publish" },
    copy: {
      en: "Content can be scheduled for Instagram or a blog, so the business stays active without daily writing.",
      ru: "Контент можно поставить в расписание для Instagram или блога, чтобы бизнес был активен без ежедневного написания.",
      uz: "Kontent Instagram yoki blog uchun rejalashtiriladi, biznes har kuni yozmasdan ham aktiv turadi.",
    },
    image: "/images/platform-publish-calendar.jpg",
    imageAlt: {
      en: "Content calendar interface on a laptop",
      ru: "Интерфейс календаря контента на ноутбуке",
      uz: "Noutbukdagi kontent kalendari interfeysi",
    },
  },
];

const platformFeatures = [
  { name: { en: "Business brief", ru: "Описание бизнеса", uz: "Biznes brief" }, icon: MessageSquareCode },
  { name: { en: "AI strategy", ru: "AI-стратегия", uz: "AI strategiya" }, icon: BrainCircuit },
  { name: { en: "Blog posts", ru: "Посты для блога", uz: "Blog postlar" }, icon: PenLine },
  { name: { en: "Video scripts", ru: "Сценарии видео", uz: "Video ssenariylar" }, icon: Film },
  { name: { en: "Auto publishing", ru: "Автопубликация", uz: "Auto publishing" }, icon: Send },
  { name: { en: "Content calendar", ru: "Контент-календарь", uz: "Kontent kalendar" }, icon: CalendarClock },
  { name: { en: "Growth insights", ru: "Growth insights", uz: "Growth insights" }, icon: LineChart },
  { name: { en: "AI operator", ru: "AI-оператор", uz: "AI operator" }, icon: Bot },
];

const proofMetrics = [
  { value: "3", label: { en: "disciplines in one team", ru: "направления в одной команде", uz: "yo'nalish bitta jamoada" } },
  { value: "24/7", label: { en: "automation-ready systems", ru: "системы, готовые к автоматизации", uz: "avtomatlashtirishga tayyor tizimlar" } },
  { value: "0", label: { en: "template thinking", ru: "шаблонного мышления", uz: "template fikrlash" } },
  { value: "100%", label: { en: "product-focused delivery", ru: "фокус на продукте", uz: "product-focused delivery" } },
];

const agencyProcess = [
  {
    step: "01",
    title: { en: "Map", ru: "Карта", uz: "Xarita" },
    copy: {
      en: "We define the product structure, user paths, data model, integrations, and launch priorities before design or code gets heavy.",
      ru: "Определяем структуру продукта, пути пользователей, data model, интеграции и приоритеты запуска до тяжелого дизайна и кода.",
      uz: "Dizayn va koddan oldin product structure, user path, data model, integratsiyalar va launch prioritetlarini aniqlaymiz.",
    },
  },
  {
    step: "02",
    title: { en: "Design", ru: "Дизайн", uz: "Dizayn" },
    copy: {
      en: "We shape a sharp interface system with the right hierarchy, motion, responsive behavior, and business-focused calls to action.",
      ru: "Создаем сильную систему интерфейса: иерархия, motion, адаптивность и бизнес-ориентированные CTA.",
      uz: "To'g'ri ierarxiya, motion, responsive behavior va biznes CTA bilan aniq interfeys tizimini yaratamiz.",
    },
  },
  {
    step: "03",
    title: { en: "Build", ru: "Разработка", uz: "Build" },
    copy: {
      en: "Frontend, backend, and DevOps move together: typed code, clean APIs, deployment, testing, and performance work.",
      ru: "Frontend, backend и DevOps идут вместе: typed code, чистые API, deployment, testing и performance.",
      uz: "Frontend, backend va DevOps birga yuradi: typed code, clean API, deployment, testing va performance.",
    },
  },
  {
    step: "04",
    title: { en: "Improve", ru: "Улучшение", uz: "Yaxshilash" },
    copy: {
      en: "After launch we track weak points, improve speed, automate repetitive work, and prepare the next version.",
      ru: "После запуска отслеживаем слабые места, улучшаем скорость, автоматизируем повторяющиеся задачи и готовим следующую версию.",
      uz: "Launchdan keyin zaif joylarni kuzatamiz, tezlikni oshiramiz, takroriy ishlarni avtomatlashtiramiz va keyingi versiyani tayyorlaymiz.",
    },
  },
];

function useSmoothScroll() {
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;
    if (window.matchMedia("(max-width: 900px)").matches) return;

    const lenis = new Lenis({
      duration: 0.92,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: false,
    });

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };

    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, [prefersReducedMotion]);
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function Home() {
  useSmoothScroll();
  const { lang, setLang } = useLanguage();
  const t = copy[lang];

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: pageProgress } = useScroll();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const pageScaleX = useSpring(pageProgress, {
    stiffness: 110,
    damping: 24,
    mass: 0.35,
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 22,
    mass: 0.35,
  });

  const heroY = useTransform(smoothProgress, [0, 1], [0, 160]);
  const heroScale = useTransform(smoothProgress, [0, 1], [1, 0.92]);
  const heroOpacity = useTransform(smoothProgress, [0, 0.76], [1, 0]);
  const heroTextX = useTransform(smoothProgress, [0, 1], [0, -46]);
  const heroTextRotate = useTransform(smoothProgress, [0, 1], [0, -4]);
  const heroDotScale = useTransform(smoothProgress, [0, 0.42, 1], [1, 1.45, 0.62]);
  const gridY = useTransform(smoothProgress, [0, 1], [0, -120]);
  const auroraShift = useTransform(pageProgress, [0, 1], ["0%", "38%"]);

  return (
    <main className="min-h-screen overflow-hidden bg-[#050B1E] text-slate-50 selection:bg-cyan-300/30">
      <div className="fixed right-5 top-4 z-50 sm:right-8 sm:top-5">
        <LanguageSwitcher lang={lang} setLang={setLang} />
      </div>
      <motion.div
        className="fixed left-0 right-0 top-0 z-50 h-px origin-left bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 shadow-[0_0_24px_rgba(34,211,238,0.9)]"
        style={{ scaleX: pageScaleX }}
      />
      <motion.div
        className="pointer-events-none fixed inset-0 z-0"
        style={{ y: gridY }}
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_8%,rgba(37,99,235,0.34),transparent_30%),radial-gradient(circle_at_76%_18%,rgba(168,85,247,0.24),transparent_26%),radial-gradient(circle_at_50%_88%,rgba(6,182,212,0.20),transparent_34%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(125,211,252,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(125,211,252,0.055)_1px,transparent_1px)] bg-[size:58px_58px] [mask-image:radial-gradient(circle_at_center,black,transparent_76%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(34,211,238,0.09),transparent_42%,rgba(124,58,237,0.10),transparent)] opacity-80" />
        <motion.div
          className="absolute -inset-x-20 top-1/4 hidden h-72 rotate-[-8deg] bg-gradient-to-r from-transparent via-cyan-300/10 to-violet-400/10 blur-3xl md:block"
          style={{ x: auroraShift }}
        />
      </motion.div>

      <section
        ref={heroRef}
        className="relative z-10 flex min-h-[108vh] items-start px-5 pb-20 pt-24 sm:px-8 sm:pt-28 lg:min-h-[118vh] lg:px-10 lg:pt-24"
      >
        <motion.div
          className="mx-auto grid w-full max-w-7xl items-center gap-10 [perspective:1600px] lg:grid-cols-[0.95fr_1.05fr]"
          style={{ y: heroY, scale: heroScale, opacity: heroOpacity }}
        >
          <motion.div style={{ x: heroTextX, rotateY: heroTextRotate }}>
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              className="mb-8 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-white/[0.04] px-4 py-2 text-sm text-cyan-100 shadow-[0_0_40px_rgba(34,211,238,0.14)] backdrop-blur-xl"
            >
              <Zap className="size-4 text-cyan-300" />
              {t.badge}
            </motion.div>

            <motion.h1
              initial="hidden"
              animate="visible"
              transition={{ staggerChildren: 0.09, delayChildren: 0.1 }}
              className="flex max-w-5xl items-end text-7xl font-black uppercase leading-[0.76] tracking-tight text-white sm:text-8xl lg:text-[9.6rem]"
            >
              {"ZINVO".split("").map((letter, index) => (
                <motion.span
                  key={`${letter}-${index}`}
                  variants={fadeUp}
                  transition={{ duration: 0.76, ease: [0.22, 1, 0.36, 1] }}
                  className="zinvo-logo-sheen inline-block bg-gradient-to-r from-white via-cyan-100 to-white bg-clip-text text-transparent drop-shadow-[0_0_26px_rgba(125,211,252,0.16)]"
                >
                  {letter}
                </motion.span>
              ))}
              <motion.span
                initial={{ opacity: 0, scale: 0.25, y: 22 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.58, delay: 0.72, ease: [0.22, 1, 0.36, 1] }}
                style={{ scale: heroDotScale }}
                className="mb-[0.02em] ml-[0.08em] inline-block size-[0.2em] rounded-full bg-gradient-to-br from-[#5A7CFF] to-[#3F45E8] shadow-[0_0_24px_rgba(79,103,255,0.78)]"
                aria-hidden="true"
              />
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.58, ease: [0.22, 1, 0.36, 1] }}
              className="mt-7 max-w-2xl text-xl leading-8 text-slate-300 sm:text-2xl"
            >
              {t.subtitle}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.72, ease: [0.22, 1, 0.36, 1] }}
              className="mt-5 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg"
            >
              {t.heroCopy}
            </motion.p>

            <motion.a
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ scale: 1.035 }}
              whileTap={{ scale: 0.98 }}
              href="/order"
              className="group mt-10 inline-flex h-14 items-center gap-3 rounded-full bg-cyan-300 px-6 text-sm font-semibold text-[#051124] shadow-[0_0_44px_rgba(34,211,238,0.42)] transition hover:bg-white"
            >
              {t.order}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </motion.a>
          </motion.div>

          <HeroConsole progress={smoothProgress} />
        </motion.div>
      </section>

      <ProofSection />
      <AboutSection />
      <AgencyProcessSection />
      <PlatformSection />
      <TechStackSection />
      <ProjectsSection />
      <CommunitySection />
      <Footer />
    </main>
  );
}

function HeroConsole({ progress }: { progress: MotionValue<number> }) {
  const { lang } = useLanguage();
  const t = copy[lang];
  const rotateX = useTransform(progress, [0, 1], [12, -24]);
  const rotateY = useTransform(progress, [0, 1], [-14, 24]);
  const panelY = useTransform(progress, [0, 1], [0, -168]);
  const panelScale = useTransform(progress, [0, 1], [1, 0.78]);
  const backLayerY = useTransform(progress, [0, 1], [22, -112]);
  const backLayerRotate = useTransform(progress, [0, 1], [-18, 14]);
  const sideLayerY = useTransform(progress, [0, 1], [0, -220]);
  const sideLayerRotate = useTransform(progress, [0, 1], [16, -28]);
  const baseLayerY = useTransform(progress, [0, 1], [0, -128]);
  const baseLayerRotate = useTransform(progress, [0, 1], [-12, 22]);
  const codeLayerY = useTransform(progress, [0, 1], [0, -92]);
  const codeLayerRotate = useTransform(progress, [0, 1], [-7, 16]);
  const glowOpacity = useTransform(progress, [0, 0.65], [0.86, 0.22]);
  const pipeline = [t.pipelineStrategy, t.pipelineDesign, t.pipelineBuild, t.pipelineLaunch];

  return (
    <motion.div
      initial={{ opacity: 0, y: 42 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.95, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto w-full max-w-2xl [perspective:1800px]"
    >
      <motion.div
        className="absolute -inset-10 hidden rounded-[44px] bg-[radial-gradient(circle_at_45%_45%,rgba(34,211,238,0.36),transparent_50%),radial-gradient(circle_at_80%_20%,rgba(124,58,237,0.26),transparent_42%)] blur-3xl md:block"
        style={{ opacity: glowOpacity }}
      />
      <motion.div
        className="absolute inset-x-6 top-6 h-64 rounded-[34px] border border-cyan-300/14 bg-cyan-300/[0.07] backdrop-blur-xl [transform-style:preserve-3d]"
        style={{ y: backLayerY, rotateZ: backLayerRotate, rotateX: 62, transformPerspective: 1400 }}
      />
      <motion.div
        className="zinvo-float-a absolute -right-10 top-24 hidden h-44 w-52 rounded-[30px] border border-violet-300/16 bg-violet-400/10 p-5 shadow-[0_0_50px_rgba(124,58,237,0.16)] backdrop-blur-xl md:block"
        style={{ y: sideLayerY, rotateZ: sideLayerRotate }}
      >
        <div className="mb-4 h-2 w-16 rounded-full bg-violet-200/55" />
        <div className="space-y-2">
          <div className="h-2 rounded-full bg-white/16" />
          <div className="h-2 w-2/3 rounded-full bg-cyan-300/35" />
          <div className="h-2 w-4/5 rounded-full bg-white/12" />
        </div>
      </motion.div>
      <motion.div
        className="zinvo-float-b absolute -left-10 bottom-12 hidden h-36 w-56 rounded-[28px] border border-cyan-300/16 bg-blue-400/10 p-5 shadow-[0_0_50px_rgba(34,211,238,0.14)] backdrop-blur-xl md:block"
        style={{ y: baseLayerY, rotateZ: baseLayerRotate }}
      >
        <div className="flex items-end gap-2">
          {[52, 82, 64, 96, 72].map((height, index) => (
            <div
              key={height + index}
              className="w-full rounded-t-lg bg-gradient-to-t from-cyan-300/20 to-cyan-200/70"
              style={{ height }}
            />
          ))}
        </div>
      </motion.div>
      <motion.div
        className="absolute -left-4 top-8 hidden w-64 rounded-[28px] border border-white/10 bg-[#07132f]/72 p-4 shadow-[0_0_48px_rgba(15,23,42,0.55)] backdrop-blur-xl md:block"
        style={{ y: codeLayerY, rotateZ: codeLayerRotate }}
        aria-hidden="true"
      >
        <div className="mb-4 flex items-center gap-2">
          <span className="size-2 rounded-full bg-cyan-300" />
          <span className="h-2 w-20 rounded-full bg-white/18" />
        </div>
        <div className="space-y-2.5">
          <div className="h-2 rounded-full bg-violet-300/45" />
          <div className="h-2 w-4/5 rounded-full bg-cyan-300/35" />
          <div className="h-2 w-2/3 rounded-full bg-white/14" />
          <div className="h-2 w-5/6 rounded-full bg-blue-300/25" />
        </div>
      </motion.div>
      <motion.div
        className="relative overflow-hidden rounded-[32px] border border-white/12 bg-white/[0.06] shadow-2xl shadow-cyan-950/30 backdrop-blur-md [transform-style:preserve-3d] md:backdrop-blur-2xl"
        style={{ y: panelY, rotateX, rotateY, scale: panelScale, transformPerspective: 1400 }}
      >
        <div className="zinvo-scan pointer-events-none absolute -inset-y-20 left-0 z-20 hidden w-40 bg-gradient-to-r from-transparent via-cyan-200/18 to-transparent blur-sm md:block" />
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <div className="flex gap-2">
            <span className="size-3 rounded-full bg-cyan-300" />
            <span className="size-3 rounded-full bg-blue-400" />
            <span className="size-3 rounded-full bg-violet-400" />
          </div>
          <div className="text-xs font-medium text-slate-400">{t.consoleUrl}</div>
        </div>
        <div className="grid gap-4 p-5 sm:p-6">
          <div className="rounded-2xl border border-cyan-300/18 bg-[#07132f]/80 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">{t.delivery}</p>
                <p className="mt-2 text-3xl font-semibold text-white">99.98%</p>
              </div>
              <ShieldCheck className="size-10 text-cyan-300" />
            </div>
            <div className="mt-6 h-2 overflow-hidden rounded-full bg-white/10">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "88%" }}
                transition={{ duration: 1.1, delay: 1.15, ease: "easeOut" }}
                className="h-full rounded-full bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400"
              />
            </div>
          </div>
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#07132f]/72 p-4">
            <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-cyan-300/35 to-transparent" />
            <div className="relative grid grid-cols-4 gap-3">
              {pipeline.map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 16, scale: 0.92 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.58, delay: 1.22 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="rounded-2xl border border-white/10 bg-white/[0.055] p-3 text-center"
                >
                  <span className="mx-auto mb-2 block size-2 rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(34,211,238,0.9)]" />
                  <span className="text-[11px] font-medium text-slate-300">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[t.consoleFrontend, t.consoleBackend, t.consoleDevops, t.consoleData].map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.58, delay: 1.04 + index * 0.08 }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="rounded-2xl border border-white/10 bg-white/[0.045] p-4"
              >
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-sm text-slate-300">{item}</span>
                  <span className="size-2 rounded-full bg-cyan-300 shadow-[0_0_16px_rgba(34,211,238,0.9)]" />
                </div>
                <div className="space-y-2">
                  <div className="zinvo-pulse-line h-2 origin-left rounded-full bg-cyan-300/55" />
                  <div className="h-2 w-2/3 rounded-full bg-blue-400/35" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function AboutSection() {
  const { lang } = useLanguage();
  const t = copy[lang];

  return (
    <section id="services" className="relative z-10 px-5 py-24 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <SectionIntro
          eyebrow={t.servicesEyebrow}
          title={t.servicesTitle}
          copy={t.servicesCopy}
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {ecosystemCards.map((card, index) => (
            <RevealCard key={text(card.title, lang)} delay={index * 0.12}>
              <motion.div
                whileHover={{ y: -10, rotateX: 4, rotateY: index % 2 === 0 ? -4 : 4, scale: 1.015 }}
                transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                className="group relative h-full overflow-hidden rounded-3xl border border-white/10 bg-white/[0.055] p-7 backdrop-blur-xl transition duration-500 hover:border-cyan-300/45 hover:shadow-[0_0_70px_rgba(34,211,238,0.18)]"
              >
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.08),transparent_42%)] opacity-0 transition duration-500 group-hover:opacity-100" />
                <div className={`mb-8 inline-flex size-13 items-center justify-center rounded-2xl bg-gradient-to-br ${card.accent} text-[#061024] shadow-[0_0_36px_rgba(34,211,238,0.18)]`}>
                  <card.icon className="size-6" />
                </div>
                <h3 className="text-2xl font-semibold text-white">{text(card.title, lang)}</h3>
                <p className="mt-4 leading-7 text-slate-400">{text(card.copy, lang)}</p>
              </motion.div>
            </RevealCard>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProofSection() {
  const { lang } = useLanguage();

  return (
    <section className="relative z-10 px-5 pb-12 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 34 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="grid overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.04] backdrop-blur-md sm:grid-cols-2 md:backdrop-blur-2xl lg:grid-cols-4"
        >
          {proofMetrics.map((metric, index) => (
            <motion.div
              key={text(metric.label, lang)}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.58, delay: index * 0.08 }}
              className="border-white/10 p-6 sm:border-r last:border-r-0"
            >
              <p className="text-3xl font-semibold text-white">{metric.value}</p>
              <p className="mt-2 text-sm leading-6 text-slate-400">{text(metric.label, lang)}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function AgencyProcessSection() {
  const { lang } = useLanguage();
  const t = copy[lang];
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 24,
    mass: 0.35,
  });
  const lineScale = useTransform(progress, [0.12, 0.82], [0, 1]);

  return (
    <section ref={sectionRef} className="relative z-10 px-5 py-24 sm:px-8 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.74fr_1.26fr]">
        <div className="lg:sticky lg:top-24 lg:h-fit">
          <SectionIntro
            eyebrow={t.processEyebrow}
            title={t.processTitle}
            copy={t.processCopy}
          />
        </div>

        <div className="relative">
          <div className="absolute left-5 top-0 hidden h-full w-px bg-white/10 md:block">
            <motion.div
              className="h-full origin-top bg-gradient-to-b from-cyan-300 via-blue-400 to-violet-400"
              style={{ scaleY: lineScale }}
            />
          </div>

          <div className="grid gap-5 md:pl-16">
            {agencyProcess.map((item, index) => (
              <RevealCard key={text(item.title, lang)} delay={index * 0.09}>
                <motion.article
                  whileHover={{ x: 8 }}
                  transition={{ duration: 0.28 }}
                  className="relative rounded-[28px] border border-white/10 bg-white/[0.052] p-7 backdrop-blur-xl hover:border-cyan-300/40"
                >
                  <span className="absolute -left-[54px] top-8 hidden size-4 rounded-full border border-cyan-300/50 bg-[#050B1E] shadow-[0_0_24px_rgba(34,211,238,0.55)] md:block" />
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">
                    {item.step}
                  </p>
                  <h3 className="mt-4 text-3xl font-semibold text-white">{text(item.title, lang)}</h3>
                  <p className="mt-4 max-w-2xl text-base leading-7 text-slate-400">
                    {text(item.copy, lang)}
                  </p>
                </motion.article>
              </RevealCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function PlatformSection() {
  const { lang } = useLanguage();
  const t = copy[lang];

  return (
    <section className="relative z-10 px-5 pb-10 pt-24 sm:px-8 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.86fr_1.14fr]">
        <div className="lg:sticky lg:top-24 lg:h-fit">
          <SectionIntro
            eyebrow={t.platformEyebrow}
            title={t.platformTitle}
            copy={t.platformCopy}
          />
          <div className="mt-10 hidden h-1 overflow-hidden rounded-full bg-white/10 lg:block">
            <motion.div
              initial={{ scaleX: 0.12 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              className="h-full origin-left rounded-full bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400"
            />
          </div>
          <RevealCard delay={0.18}>
            <div className="relative mt-10 overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.052] p-3 shadow-[0_0_70px_rgba(34,211,238,0.10)] md:p-4">
              <div className="relative aspect-[1.18] overflow-hidden rounded-[24px]">
                <Image
                  src={platformImage.src}
                  alt={text(platformImage.alt, lang)}
                  fill
                  sizes="(min-width: 1024px) 36vw, 100vw"
                  className="object-cover opacity-88 saturate-[0.9]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050B1E] via-[#050B1E]/28 to-transparent" />
                <div className="absolute inset-0 bg-cyan-300/10 mix-blend-screen" />
              </div>
            </div>
          </RevealCard>
        </div>

        <div className="grid gap-6">
          {platformFlow.map((item, index) => (
            <RevealCard key={text(item.title, lang)} delay={index * 0.08}>
              <motion.article
                whileHover={{ y: -6, scale: 1.01 }}
                transition={{ duration: 0.28 }}
                className="group relative overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.055] p-7 shadow-[0_0_50px_rgba(34,211,238,0.06)] backdrop-blur-md hover:border-cyan-300/45 md:shadow-[0_0_70px_rgba(34,211,238,0.08)] md:backdrop-blur-2xl"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(34,211,238,0.16),transparent_34%),radial-gradient(circle_at_88%_72%,rgba(139,92,246,0.14),transparent_36%)] opacity-0 transition duration-500 group-hover:opacity-100" />
                <div className="relative grid gap-7 sm:grid-cols-[0.72fr_1.28fr] sm:items-center">
                  <div className="relative min-h-56 overflow-hidden rounded-3xl border border-cyan-300/15 bg-[#07132f]/78">
                    <Image
                      src={item.image}
                      alt={text(item.imageAlt, lang)}
                      fill
                      sizes="(min-width: 1024px) 26vw, 100vw"
                      className="object-cover opacity-82 saturate-[0.9] transition duration-700 group-hover:scale-105 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050B1E] via-[#050B1E]/28 to-transparent" />
                    <div className="absolute inset-0 bg-cyan-300/10 mix-blend-screen" />
                    <div className="absolute left-5 right-5 top-5 flex items-center justify-between">
                      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">
                        {item.label}
                      </p>
                      <span className="flex size-10 items-center justify-center rounded-2xl border border-white/12 bg-[#07132f]/58 text-cyan-200 shadow-2xl backdrop-blur-xl">
                        <Workflow className="size-5" />
                      </span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-4xl font-semibold leading-tight text-white">
                      {text(item.title, lang)}
                    </h3>
                    <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-300">
                      {text(item.copy, lang)}
                    </p>
                  </div>
                </div>
              </motion.article>
            </RevealCard>
          ))}

          <RevealCard delay={0.28}>
            <div
              className="overflow-hidden rounded-[30px] border border-cyan-300/16 bg-[#07132f]/72 p-7 backdrop-blur-md md:backdrop-blur-2xl"
            >
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-300">
                    {t.autopilot}
                  </p>
                  <p className="mt-3 max-w-2xl text-2xl font-semibold leading-snug text-white">
                    {t.autopilotCopy}
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-3 sm:w-72">
                  <div className="h-20 rounded-2xl bg-cyan-300/15" />
                  <div className="h-20 rounded-2xl bg-blue-400/15" />
                  <div className="h-20 rounded-2xl bg-violet-400/15" />
                </div>
              </div>
            </div>
          </RevealCard>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {platformFeatures.map((feature, index) => (
              <RevealCard key={text(feature.name, lang)} delay={0.04 * index}>
                <div className="flex min-h-28 flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.045] p-4 backdrop-blur-xl transition hover:border-cyan-300/40">
                  <feature.icon className="size-6 text-cyan-300" />
                  <p className="mt-4 text-sm font-semibold text-slate-200">
                    {text(feature.name, lang)}
                  </p>
                </div>
              </RevealCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TechStackSection() {
  const { lang } = useLanguage();
  const t = copy[lang];

  return (
    <section className="relative z-10 px-5 pb-24 pt-12 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
          <SectionIntro
            eyebrow={t.stackEyebrow}
            title={t.stackTitle}
            copy={t.stackCopy}
          />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {techStack.map((tech, index) => (
              <TiltTile key={tech.name} delay={index * 0.055} name={tech.name} Icon={tech.icon} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectsSection() {
  const { lang } = useLanguage();
  const t = copy[lang];

  return (
    <section className="relative z-10 px-5 py-24 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <SectionIntro
          eyebrow={t.casesEyebrow}
          title={t.casesTitle}
          copy={t.casesCopy}
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {projects.map((project, index) => (
            <RevealCard key={text(project.title, lang)} delay={index * 0.14}>
              <motion.article
                whileHover={{ y: -8, rotateX: 2, rotateY: index === 1 ? 0 : index === 0 ? -2 : 2 }}
                transition={{ duration: 0.28 }}
                className="group h-full overflow-hidden rounded-3xl border border-white/10 bg-white/[0.052] p-4 backdrop-blur-xl hover:border-cyan-300/45 hover:shadow-[0_0_70px_rgba(34,211,238,0.15)]"
              >
                <div className={`relative aspect-[1.34] overflow-hidden rounded-2xl bg-gradient-to-br ${project.gradient}`}>
                  <Image
                    src={project.image}
                    alt={text(project.imageAlt, lang)}
                    fill
                    sizes="(min-width: 1024px) 33vw, 100vw"
                    className="h-full w-full object-cover opacity-82 saturate-[0.92] transition duration-700 group-hover:scale-105 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050B1E] via-[#050B1E]/24 to-transparent" />
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} mix-blend-screen opacity-65`} />
                  <div className="absolute right-4 top-4 flex size-11 items-center justify-center rounded-2xl border border-white/12 bg-[#07132f]/58 text-cyan-200 shadow-2xl backdrop-blur-xl">
                    <Workflow className="size-5" />
                  </div>
                </div>
                <div className="p-3 pt-6">
                  <h3 className="text-2xl font-semibold text-white">{text(project.title, lang)}</h3>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="rounded-full border border-cyan-300/18 bg-cyan-300/8 px-3 py-1 text-xs text-cyan-100">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            </RevealCard>
          ))}
        </div>
      </div>
    </section>
  );
}

function CommunitySection() {
  const { lang } = useLanguage();
  const t = copy[lang];
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 70, damping: 24 });
  const activeIndex = useTransform(progress, [0.2, 0.5, 0.8], [0, 1, 2]);

  return (
    <section ref={sectionRef} className="relative z-10 px-5 py-24 sm:px-8 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="lg:sticky lg:top-24 lg:h-fit">
          <SectionIntro
            eyebrow={t.collaborationEyebrow}
            title={t.collaborationTitle}
            copy={t.collaborationCopy}
          />
        </div>
        <div className="grid gap-5">
          {community.map((item, index) => (
            <CommunityCard key={text(item.title, lang)} index={index} activeIndex={activeIndex} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const { lang } = useLanguage();
  const t = copy[lang];

  return (
    <footer className="relative z-10 px-5 pb-10 pt-16 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="h-px w-full overflow-hidden bg-white/10">
          <motion.div
            className="h-full w-1/2 bg-gradient-to-r from-transparent via-cyan-300 to-transparent"
            animate={{ x: ["-100%", "220%"] }}
            transition={{ duration: 4.8, repeat: Infinity, ease: "linear" }}
          />
        </div>
        <div className="flex flex-col justify-between gap-8 py-10 sm:flex-row sm:items-center">
          <div>
            <p className="text-2xl font-semibold text-white">Zinvo</p>
            <p className="mt-2 text-sm text-slate-500">{t.footer}</p>
          </div>
          <div className="flex gap-5 text-sm text-slate-400">
            <a className="transition hover:text-cyan-200" href="https://t.me/Zinvo_uz" target="_blank" rel="noreferrer">
              Telegram
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SectionIntro({
  eyebrow,
  title,
  copy,
}: {
  eyebrow: string;
  title: string;
  copy: string;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ staggerChildren: 0.08 }}
      className="max-w-3xl"
    >
      <motion.p variants={fadeUp} transition={{ duration: 0.65 }} className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-cyan-300">
        {eyebrow}
      </motion.p>
      <motion.h2 variants={fadeUp} transition={{ duration: 0.76, ease: [0.22, 1, 0.36, 1] }} className="text-4xl font-semibold leading-tight tracking-normal text-white sm:text-5xl lg:text-6xl">
        {title}
      </motion.h2>
      <motion.p variants={fadeUp} transition={{ duration: 0.76, ease: [0.22, 1, 0.36, 1] }} className="mt-6 text-lg leading-8 text-slate-400">
        {copy}
      </motion.p>
    </motion.div>
  );
}

function RevealCard({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 36, rotateX: 5, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.58, delay, ease: [0.22, 1, 0.36, 1] }}
      className="[perspective:1200px]"
    >
      {children}
    </motion.div>
  );
}

function TiltTile({
  name,
  Icon,
  delay,
}: {
  name: string;
  Icon: React.ElementType;
  delay: number;
}) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-90, 90], [7, -7]);
  const rotateY = useTransform(mouseX, [-90, 90], [-7, 7]);
  const glow = useMotionTemplate`radial-gradient(circle at ${mouseX}px ${mouseY}px, rgba(34,211,238,0.28), transparent 42%)`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay }}
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        mouseX.set(event.clientX - rect.left);
        mouseY.set(event.clientY - rect.top);
      }}
      onMouseLeave={() => {
        mouseX.set(0);
        mouseY.set(0);
      }}
      style={{ rotateX, rotateY, background: glow }}
      className="group relative flex aspect-square min-h-32 flex-col items-center justify-center rounded-3xl border border-white/10 bg-white/[0.052] p-5 text-center backdrop-blur-xl transition hover:border-cyan-300/45"
    >
      <Icon className="mb-4 size-8 text-cyan-300 transition duration-300 group-hover:scale-110 group-hover:text-white" />
      <p className="text-sm font-semibold text-slate-200">{name}</p>
    </motion.div>
  );
}

function CommunityCard({
  icon: Icon,
  title,
  copy,
  index,
  activeIndex,
}: {
  icon: React.ElementType;
  title: Localized;
  copy: Localized;
  index: number;
  activeIndex: MotionValue<number>;
}) {
  const { lang } = useLanguage();
  const opacity = useTransform(activeIndex, (value) => (Math.round(value) === index ? 1 : 0.68));
  const scale = useTransform(activeIndex, (value) => (Math.round(value) === index ? 1 : 0.985));

  return (
    <motion.article
      initial={{ opacity: 0, x: 34 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-90px" }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      style={{ opacity, scale }}
      className="rounded-3xl border border-white/10 bg-white/[0.052] p-7 backdrop-blur-xl transition hover:border-violet-300/50 hover:shadow-[0_0_60px_rgba(168,85,247,0.13)]"
    >
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
        <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-white/8 text-cyan-200">
          <Icon className="size-7" />
        </div>
        <div>
          <h3 className="text-2xl font-semibold text-white">{text(title, lang)}</h3>
          <p className="mt-3 leading-7 text-slate-400">{text(copy, lang)}</p>
        </div>
      </div>
    </motion.article>
  );
}
