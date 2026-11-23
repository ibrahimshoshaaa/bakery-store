"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  ArrowLeft,
  CalendarDays,
  Check,
  Clock,
  Heart,
  Leaf,
  Mail,
  MapPin,
  Menu,
  Minus,
  Phone,
  Play,
  Plus,
  Search,
  ShoppingBag,
  Smile,
  Sparkles,
  Star,
  Trash2,
  Truck,
  X,
} from "lucide-react";

const cx = (...c: (string | false | null | undefined)[]) =>
  c.filter(Boolean).join(" ");

/* ---------------------------------- data --------------------------------- */

const NAV = [
  { label: "الرئيسية", href: "#home", active: true },
  { label: "من نحن", href: "#about", active: false },
  { label: "القائمة", href: "#menu", active: false },
  { label: "المعرض", href: "#gallery", active: false },
  { label: "المدونة", href: "#blog", active: false },
  { label: "تواصل معنا", href: "#contact", active: false },
];

const PRODUCTS = [
  { id: "croissant", name: "كرواسون بالزبدة", price: 45, image: "/images/prod-croissant.jpg" },
  { id: "cupcake", name: "كب كيك الشوكولاتة", price: 40, image: "/images/prod-cupcake.jpg" },
  { id: "tart", name: "تارت الفواكه", price: 65, image: "/images/prod-tart.jpg" },
  { id: "redvelvet", name: "كيكة الريد فيلفيت", price: 75, image: "/images/prod-redvelvet.jpg" },
];

const formatEGP = (n: number) => `${n} ج.م`;

const TRUST = [
  { icon: Leaf, title: "مكونات طازجة", sub: "100% طبيعية" },
  { icon: Heart, title: "مخبوزة يدوياً", sub: "بكل حب وشغف" },
  { icon: Truck, title: "توصيل سريع", sub: "وموثوق لباب بيتك" },
  { icon: Smile, title: "رضا العملاء", sub: "أولويتنا دائماً" },
];

const TESTIMONIALS = [
  {
    quote: "لذيذ للغاية! الكيك كان طازجاً وجميلاً جداً. أنصح به بشدة!",
    name: "سارة منصور",
    city: "القاهرة",
    avatar: "/images/avatar-1.jpg",
  },
  {
    quote: "أفضل مخبز في المدينة! مذاق رائع وخدمة عملاء ممتازة وتوصيل في الموعد.",
    name: "كريم عبدالله",
    city: "الجيزة",
    avatar: "/images/avatar-2.jpg",
  },
  {
    quote: "تجربة رائعة ومخبوزات هشة وطازجة. كل شيء كان مثالياً!",
    name: "نور الشريف",
    city: "الإسكندرية",
    avatar: "/images/avatar-3.jpg",
  },
];

const GALLERY = [
  "/images/gallery-1.jpg",
  "/images/gallery-2.jpg",
  "/images/gallery-3.jpg",
  "/images/gallery-4.jpg",
  "/images/gallery-5.jpg",
  "/images/gallery-6.jpg",
];

const WHY_POINTS = [
  "مكونات فاخرة وعالية الجودة",
  "مخبوز طازج يومياً",
  "أسعار مناسبة للجميع",
  "توصيل سريع وموثوق",
];

const POSTS = [
  {
    title: "5 نصائح لخبز منزلي مثالي",
    date: "25 أكتوبر 2026",
    image: "/images/blog-1.jpg",
    excerpt: "أسرار بسيطة تخلي خبزك في البيت يطلع هش وطري زي مخبزنا بالظبط.",
    body: [
      "السر الأول هو الدقة: استخدم ميزان مطبخ بدل الأكواب، لأن فرق جرامات بسيط في الدقيق أو الخميرة ممكن يغيّر قوام العجينة تماماً.",
      "السر الثاني هو حرارة الفرن: سخّن الفرن قبل الخبز بعشر دقائق على الأقل، وحط صينية فيها ماء ساخن تحت الرف عشان البخار يخلي القشرة مقرمشة من بره وطرية من جوه.",
      "السر الثالث هو الصبر: سيب العجينة تخمر في مكان دافئ لحد ما يتضاعف حجمها، ومتستعجلش — التخمير البطيء هو اللي بيعمل النكهة الغنية.",
      "السر الرابع هو المكونات: استخدم زبدة ودقيق عالي الجودة، لأن جودة المكونات بتبان في الطعم النهائي مهما كانت الوصفة بسيطة.",
      "والسر الخامس: جرّب ودوّن ملاحظاتك في كل مرة، ومع الوقت هتعرف بالظبط اللي يناسب فرنك ومكوناتك.",
    ],
  },
  {
    title: "كيفية تزيين الكيك بشكل جميل",
    date: "20 أكتوبر 2026",
    image: "/images/blog-2.jpg",
    excerpt: "خطوات بسيطة وأدوات قليلة تحوّل أي كيك عادي لتحفة تستاهل التصوير.",
    body: [
      "التزيين الحلو بيبدأ من كيكة باردة تماماً: لو الكيك لسه دافئ، الكريمة هتسيح ومش هتثبت. سيب الكيك يبرد ساعة على الأقل قبل ما تبدأ.",
      "استخدم طبقة خفيفة من الكريمة أولاً وسيبها في التلاجة 20 دقيقة، وبعدها حط الطبقة النهائية — الطبقة الأولى بتحبس الفتات وبتخلي الشكل نضيف.",
      "أدوات بسيطة تكفي: سكينة عريضة أو سباتولا، وكيس حلواني بفوهة نجمة. جرّب الورود والحدود المموجة على ورق زبدة قبل ما تزيّن الكيك نفسه.",
      "الفواكه الطازجة وورق النعناع بتضيف لمسة فاخرة من غير مجهود — فراولة، توت، ونعناع كفاية يحوّلوا أي كيك لتحفة.",
    ],
  },
  {
    title: "وصفة كوكيز سهلة في المنزل",
    date: "15 أكتوبر 2026",
    image: "/images/blog-3.jpg",
    excerpt: "كوكيز طري من جوه ومقرمش من بره في 30 دقيقة بس — بمكونات موجودة في كل بيت.",
    body: [
      "المكونات: كوب زبدة طرية، كوب سكر بني، نصف كوب سكر أبيض، بيضتان، ملعقة فانيليا، كوبان ونصف دقيق، ملعقة صغيرة بيكنج صودا، ورقائق شوكولاتة.",
      "اخلط الزبدة مع السكر لحد ما يبقى القوام كريمي، ضيف البيض والفانيليا، وبعدها الدقيق والبيكنج صودا، وأخيراً رقائق الشوكولاتة.",
      "شكّل كرات صغيرة وحطها على صينية مبطنة بورق زبدة مع مسافات بينها، واخبزها على 180 درجة من 10 إلى 12 دقيقة لحد ما الأطراف تتماسك والوسط يفضل طري.",
      "سيب الكوكيز يبرد 5 دقائق على الصينية قبل ما تنقله — هيكمل تماسكه وهو بيبرد، وهيطلع طري من جوه ومقرمش من بره.",
    ],
  },
];

/* ------------------------------ small pieces ----------------------------- */

function CupcakeIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M32 15c-1.5-4.5-6-4.5-6.5-1-4.5.5-7 4-6 8-4 1-5 5-2 8h29c3-3 2-7-2-8 1-4-1.5-7.5-6-8-.5-3.5-5-3.5-6.5 1z" />
      <path d="M16 33h32l-3.5 23a3 3 0 0 1-3 2.5h-19a3 3 0 0 1-3-2.5L16 33z" />
      <path d="M25 33l1.5 22M32 33v22M39 33l-1.5 22" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M13.5 21.5v-7.2h2.4l.4-2.9h-2.8V9.5c0-.8.3-1.4 1.5-1.4h1.4V5.5c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2.2H8v2.9h2.5v7.2h3z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden="true">
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function PinterestIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 2.5a9.5 9.5 0 0 0-3.5 18.3c-.1-.8-.2-1.9 0-2.7l1.1-4.6s-.3-.6-.3-1.4c0-1.3.8-2.3 1.7-2.3.8 0 1.2.6 1.2 1.3 0 .8-.5 2-.8 3.2-.2 1 .5 1.8 1.5 1.8 1.8 0 3.1-1.9 3.1-4.6 0-2.4-1.7-4.1-4.2-4.1a4.4 4.4 0 0 0-4.5 4.4c0 .9.3 1.8.8 2.3.1.1.1.2.1.3l-.3 1c0 .2-.2.2-.4.1-1.2-.5-1.9-2.3-1.9-3.7 0-3 2.2-5.8 6.4-5.8 3.3 0 5.9 2.4 5.9 5.6 0 3.3-2.1 6-5 6-1 0-1.9-.5-2.2-1.1l-.6 2.3c-.2.8-.8 1.9-1.2 2.5A9.5 9.5 0 1 0 12 2.5z" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M6.4 8.9H3.5V21h2.9V8.9zM5 3.6a1.7 1.7 0 1 0 0 3.4 1.7 1.7 0 0 0 0-3.4zM21 13.5c0-3.1-1.6-4.6-3.8-4.6-1.5 0-2.4.8-2.9 1.4V8.9h-2.8V21h2.8v-6.3c0-1.5.7-2.5 1.9-2.5 1.2 0 1.8.8 1.8 2.5V21H21v-7.5z" />
    </svg>
  );
}

const SOCIALS = [
  { label: "فيسبوك", Icon: FacebookIcon },
  { label: "انستجرام", Icon: InstagramIcon },
  { label: "بينترست", Icon: PinterestIcon },
  { label: "لينكدإن", Icon: LinkedinIcon },
];

function Eyebrow({ children, light = false, className }: { children: React.ReactNode; light?: boolean; className?: string }) {
  return (
    <p className={cx("flex items-center justify-center gap-3 text-sm font-bold", light ? "text-white/80" : "text-muted", className)}>
      <span className={cx("h-px w-10", light ? "bg-white/40" : "bg-caramel/60")} />
      {children}
      <span className={cx("h-px w-10", light ? "bg-white/40" : "bg-caramel/60")} />
    </p>
  );
}

function Stars() {
  return (
    <span className="flex gap-0.5 text-caramel" aria-label="5 من 5 نجوم">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="h-4 w-4" fill="currentColor" strokeWidth={0} />
      ))}
    </span>
  );
}

/* --------------------------------- page ---------------------------------- */

export default function Home() {
  const [cart, setCart] = useState<Record<string, number>>({});
  const [cartOpen, setCartOpen] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [addedId, setAddedId] = useState<string | null>(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [email, setEmail] = useState("");
  const [toast, setToast] = useState<string | null>(null);
  const [checkoutStep, setCheckoutStep] = useState(false);
  const [custName, setCustName] = useState("");
  const [custPhone, setCustPhone] = useState("");
  const [custAddress, setCustAddress] = useState("");
  const [custNotes, setCustNotes] = useState("");
  const [formError, setFormError] = useState("");
  const [placedOrder, setPlacedOrder] = useState<{ code: string; name: string; total: number } | null>(null);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [activePost, setActivePost] = useState<number | null>(null);
  const [policy, setPolicy] = useState<"privacy" | "terms" | null>(null);
  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactMsg, setContactMsg] = useState("");
  const [fly, setFly] = useState<{ src: string; x: number; y: number; tx: number; ty: number; size: number; key: number } | null>(null);
  const [cartBump, setCartBump] = useState(0);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 4000);
    return () => clearTimeout(t);
  }, [toast]);

  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);
  const cartTotal = PRODUCTS.reduce((sum, p) => sum + (cart[p.id] ?? 0) * p.price, 0);
  const cartItems = PRODUCTS.filter((p) => (cart[p.id] ?? 0) > 0);

  const visibleProducts = PRODUCTS.filter((p) => p.name.includes(query.trim()));

  const addToCart = (id: string, e?: React.MouseEvent) => {
    setCart((c) => ({ ...c, [id]: (c[id] ?? 0) + 1 }));
    setAddedId(id);
    setTimeout(() => setAddedId((cur) => (cur === id ? null : cur)), 1200);
    // Fly-to-cart animation: clone the product photo and arc it to the cart icon.
    const card = e?.currentTarget.closest("article");
    const img = card?.querySelector("img");
    const cartBtn = document.querySelector('[aria-label="سلة التسوق"]');
    const product = PRODUCTS.find((p) => p.id === id);
    if (img && cartBtn && product) {
      const r = img.getBoundingClientRect();
      const c = cartBtn.getBoundingClientRect();
      const size = Math.min(r.width, 96);
      setFly({
        src: product.image,
        x: r.left + r.width / 2 - size / 2,
        y: r.top + r.height / 2 - size / 2,
        tx: c.left + c.width / 2 - 10,
        ty: c.top + c.height / 2 - 10,
        size,
        key: Date.now(),
      });
    }
    setCartBump((b) => b + 1);
  };
  const setQty = (id: string, qty: number) => {
    setCart((c) => {
      const next = { ...c };
      if (qty <= 0) delete next[id];
      else next[id] = qty;
      return next;
    });
  };

  const subscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setToast("من فضلك أدخل بريداً إلكترونياً صحيحاً");
      return;
    }
    setEmail("");
    setToast("تم الاشتراك بنجاح! أهلاً بك في عائلة بيسكويك");
  };

  const submitOrder = () => {
    if (custName.trim().length < 2) {
      setFormError("من فضلك اكتب اسمك");
      return;
    }
    const phone = custPhone.replace(/[\s-]/g, "");
    if (!/^01[0-9]{9}$/.test(phone)) {
      setFormError("من فضلك اكتب رقم موبايل مصري صحيح (11 رقم يبدأ بـ 01)");
      return;
    }
    if (custAddress.trim().length < 5) {
      setFormError("من فضلك اكتب عنوان التوصيل");
      return;
    }
    setFormError("");
    const code = "B-" + Math.random().toString(36).slice(2, 8).toUpperCase();
    setPlacedOrder({ code, name: custName.trim(), total: cartTotal });
    setCart({});
    setCheckoutStep(false);
    setCustName("");
    setCustPhone("");
    setCustAddress("");
    setCustNotes("");
    setOrderPlaced(true);
  };

  const submitContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (contactName.trim().length < 2) {
      setToast("من فضلك اكتب اسمك");
      return;
    }
    const phone = contactPhone.replace(/[\s-]/g, "");
    if (!/^01[0-9]{9}$/.test(phone)) {
      setToast("من فضلك اكتب رقم موبايل مصري صحيح");
      return;
    }
    if (contactMsg.trim().length < 5) {
      setToast("من فضلك اكتب رسالتك");
      return;
    }
    setContactName("");
    setContactPhone("");
    setContactMsg("");
    setToast("تم استلام رسالتك بنجاح! هنرد عليك في أقرب وقت");
  };

  return (
    <div className="min-h-screen bg-surface font-sans text-ink">
      {/* ============ SECTION 1: Top bar ============ */}
      <div className="bg-espresso py-1.5 text-[11px] text-white/90">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <Phone className="h-3.5 w-3.5 text-caramel" />
              <span dir="ltr">+20 100 123 4567</span>
            </span>
            <span className="hidden items-center gap-1.5 md:flex">
              <Mail className="h-3.5 w-3.5 text-caramel" />
              <span dir="ltr">hello@biscquick.com</span>
            </span>
            <span className="hidden items-center gap-1.5 md:flex">
              <MapPin className="h-3.5 w-3.5 text-caramel" />
              المعادي، القاهرة، مصر
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            {SOCIALS.map(({ label, Icon }) => (
              <button
                key={label}
                type="button"
                aria-label={label}
                onClick={() => setToast(`صفحة بيسكويك على ${label} قريباً — تابعنا هنا`)}
                className="flex h-6 w-6 items-center justify-center rounded-full border border-white/25 text-white/90 transition hover:border-caramel hover:text-caramel"
              >
                <Icon className="h-3 w-3" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ============ SECTION 1: Sticky navbar ============ */}
      <header className="sticky top-0 z-40 border-b border-border-warm bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2.5 sm:px-6 md:py-4">
          <a href="#home" className="flex items-center">
            <Image
              src="/images/logo.png"
              alt="بيسكويك"
              width={1073}
              height={382}
              priority
              className="h-10 w-auto md:h-11"
            />
          </a>

          <nav className="hidden items-center gap-3 text-sm md:flex lg:gap-7 lg:text-base">
            {NAV.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={cx(
                  "whitespace-nowrap pb-1 font-semibold transition hover:text-caramel",
                  l.active ? "border-b-2 border-caramel font-bold text-caramel" : "text-ink/80"
                )}
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="بحث"
              onClick={() => setSearchOpen((v) => !v)}
              className="flex h-10 w-10 items-center justify-center rounded-full text-ink transition hover:bg-cream hover:text-caramel"
            >
              <Search className="h-5 w-5" />
            </button>
            <button
              key={cartBump}
              type="button"
              aria-label="سلة التسوق"
              onClick={() => {
                setOrderPlaced(false);
                setCheckoutStep(false);
                setCartOpen(true);
              }}
              className={cx(
                "relative flex h-10 w-10 items-center justify-center rounded-full text-ink transition hover:bg-cream hover:text-caramel",
                cartBump > 0 && "animate-cart-bump"
              )}
            >
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -left-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-caramel px-1 text-[11px] font-extrabold text-white">
                  {cartCount}
                </span>
              )}
            </button>
            <a
              href="#menu"
              className="hidden items-center gap-2 whitespace-nowrap rounded-full bg-caramel px-4 py-2.5 text-sm font-bold text-white transition hover:bg-caramel-hover sm:flex lg:px-5"
            >
              اطلب الآن
              <ArrowLeft className="h-4 w-4" />
            </a>
            <button
              type="button"
              aria-label="القائمة"
              onClick={() => setMenuOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-full text-ink transition hover:bg-cream md:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>

        {searchOpen && (
          <div className="border-t border-border-warm bg-white px-4 py-3">
            <div className="mx-auto flex max-w-7xl items-center gap-2">
              <Search className="h-5 w-5 shrink-0 text-muted" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="ابحث عن كرواسون، كيك، تارت..."
                className="w-full bg-transparent text-sm font-semibold outline-none placeholder:text-muted"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="shrink-0 text-xs font-bold text-caramel"
                >
                  مسح
                </button>
              )}
            </div>
          </div>
        )}
      </header>

      {/* ============ SECTION 2: Hero ============ */}
      <section id="home" className="relative overflow-hidden bg-gradient-to-l from-[#33170A] via-[#2B1409] to-[#1E0D05] text-white">
        <div className="mx-auto grid max-w-7xl md:grid-cols-12">
          <div className="px-5 pb-8 pt-10 sm:px-8 md:col-span-7 md:pb-36 md:pt-14 md:ps-10">
            <Eyebrow light className="md:justify-start">خبز طازج، ولذيذ دائماً</Eyebrow>
            <h1 className="mt-5 text-center text-4xl font-extrabold leading-[1.15] md:text-start md:text-6xl lg:text-[4.4rem]">
              لحظات حلوة
              <br />
              <span className="text-caramel">تبدأ من هنا</span>
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-center leading-relaxed text-white/75 md:mx-0 md:text-start md:text-lg">
              اكتشف المزيج المثالي من المذاق والطزاجة مع مخبوزاتنا المحضرة يدوياً يومياً.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3 md:justify-start">
              <a
                href="#menu"
                className="flex items-center gap-2 rounded-full bg-caramel px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-caramel/30 transition hover:bg-caramel-hover sm:px-7 sm:py-3 sm:text-base"
              >
                اطلب الآن
                <ArrowLeft className="h-5 w-5" />
              </a>
              <button
                type="button"
                onClick={() => setVideoOpen(true)}
                className="flex items-center gap-2.5 rounded-full border border-white/40 px-4 py-2.5 text-sm font-bold text-white transition hover:border-white hover:bg-white/10 sm:gap-3 sm:px-6 sm:py-3 sm:text-base"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-cocoa sm:h-7 sm:w-7">
                  <Play className="h-3.5 w-3.5 fill-current" />
                </span>
                شاهد الفيديو
              </button>
            </div>
          </div>

          <div className="relative min-h-[340px] md:col-span-5 md:min-h-[540px] xl:ml-[calc((80rem-100vw)/2)]">
            <div className="absolute inset-x-0 bottom-16 top-0 md:bottom-14">
              <Image
                src="/images/hero-cake.jpg"
                alt="كيكة شوكولاتة بالغاناش مع الفراولة والتوت"
                fill
                priority
                className="object-cover object-center"
                sizes="(max-width: 767px) 100vw, 42vw"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-[linear-gradient(to_left,#2B1409_0%,rgb(43_20_9/0.55)_22%,transparent_55%)]"
              />
              <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-[#2B1409] to-transparent"
              />
              <div
                aria-hidden="true"
                className="bg-gradient-to-b from-[#2B1409] via-[#2B1409]/50 to-transparent h-24 absolute top-0 inset-x-0 pointer-events-none md:hidden"
              />
            </div>
          </div>
        </div>

        {/* Bottom curve + caramel ribbon */}
        <svg
          className="absolute bottom-0 left-0 h-[70px] w-full md:h-[110px]"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M0,40 C300,40 480,108 720,104 C960,100 1200,52 1440,44 L1440,120 L0,120 Z"
            fill="#FFFFFF"
          />
          <path
            d="M0,40 C300,40 480,108 720,104 C960,100 1200,52 1440,44"
            fill="none"
            stroke="#E57A1F"
            strokeWidth="5"
          />
        </svg>
      </section>

      {/* ============ SECTION 3: Trust strip ============ */}
      <section className="bg-surface">
        <div className="mx-auto max-w-5xl px-4">
          <div className="mt-6 rounded-2xl bg-[#FDF5EC] px-4 py-6 shadow-[0_8px_30px_rgb(0_0_0/0.06)]">
            <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-0 md:divide-x md:divide-x-reverse md:divide-[#E8D8C8]">
              {TRUST.map(({ icon: Icon, title, sub }) => (
                <div key={title} className="flex flex-col items-center gap-1.5 px-2 text-center">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-caramel text-white shadow-md shadow-caramel/30">
                    <Icon className="h-6 w-6" />
                  </span>
                  <span className="font-extrabold">{title}</span>
                  <span className="text-sm text-muted">{sub}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ SECTION 4: Popular items ============ */}
      <section id="menu" className="scroll-mt-24 py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Eyebrow>منتجاتنا الأكثر شعبية</Eyebrow>
          <h2 className="mt-3 text-center text-3xl font-extrabold leading-snug md:text-4xl">
            مخبوزات لذيذة <span className="text-caramel">لكل حالة مزاجية</span>
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center leading-relaxed text-muted">
            من الكلاسيكيات المفضلة إلى الابتكارات الفريدة، مخبزنا لديه ما يرضي الجميع.
          </p>

          {query.trim() && visibleProducts.length === 0 && (
            <p className="mt-10 text-center font-bold text-muted">
              لا توجد نتائج مطابقة لـ «{query.trim()}» — جرّب كلمة أخرى.
            </p>
          )}

          <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
            {visibleProducts.map((p) => (
              <article
                key={p.id}
                className="rounded-2xl border border-border-warm bg-white p-2.5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg sm:p-4"
              >
                <div className="aspect-square overflow-hidden rounded-xl">
                  <Image
                    src={p.image}
                    alt={p.name}
                    width={600}
                    height={600}
                    className="h-full w-full object-cover transition duration-500 hover:scale-105"
                  />
                </div>
                <h3 className="mt-3 text-center text-sm font-bold sm:mt-4 sm:text-lg">{p.name}</h3>
                <p className="mt-1 text-center text-base font-extrabold text-caramel sm:text-lg">
                  {formatEGP(p.price)}
                </p>
                <button
                  type="button"
                  onClick={(e) => addToCart(p.id, e)}
                  className={cx(
                    "mt-3 flex w-full items-center justify-center gap-1.5 rounded-full px-2 py-2 text-xs font-bold text-white transition sm:gap-2 sm:px-4 sm:py-2.5 sm:text-sm",
                    addedId === p.id ? "bg-espresso" : "bg-caramel hover:bg-caramel-hover"
                  )}
                >
                  {addedId === p.id ? (
                    <>
                      <Check className="h-4 w-4" />
                      تمت الإضافة
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="h-4 w-4" />
                      أضف إلى السلة
                    </>
                  )}
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============ SECTION 5: About ============ */}
      <section id="about" className="scroll-mt-24 px-4 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-3xl bg-cream p-6 md:p-10">
            <div className="grid items-center gap-10 lg:grid-cols-2">
              <div>
                <p className="text-sm font-extrabold text-caramel">
                  عن بيسكويك
                </p>
                <h2 className="relative mt-3 text-3xl font-extrabold leading-snug md:text-4xl">
                  <svg
                    viewBox="0 0 24 24"
                    className="absolute -top-2 left-0 h-7 w-7 text-caramel"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    aria-hidden="true"
                  >
                    <path d="M12 3v5M12 16v5M3 12h5M16 12h5M6 6l3 3M15 15l3 3M18 6l-3 3M9 15l-3 3" />
                  </svg>
                  مخبوز بشغف،
                  <br />
                  مقدم بعناية
                </h2>
                <p className="mt-4 leading-loose text-muted">
                  في بيسكويك، نؤمن بأن كل لقمة يجب أن تجلب
                  السعادة. يختار خبازونا أجود المكونات الطبيعية لإعداد أشهى المخبوزات
                  والحلويات لمناسباتكم الخاصة.
                </p>
                <a
                  href="#gallery"
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-cocoa px-6 py-3 font-bold text-white transition hover:bg-espresso"
                >
                  اعرف المزيد
                  <ArrowLeft className="h-5 w-5" />
                </a>
              </div>
              <div className="relative">
                <div
                  aria-hidden="true"
                  className="absolute -left-5 -top-6 h-44 w-44 rounded-full border-[14px] border-caramel/30"
                />
                <div className="relative overflow-hidden rounded-2xl shadow-md">
                  <Image
                    src="/images/about-baker.jpg"
                    alt="خباز ينخل السكر البودرة على المخبوزات"
                    width={1200}
                    height={800}
                    className="aspect-[3/2] w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ SECTION 6: Testimonials ============ */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Eyebrow>ماذا يقول عملاؤنا</Eyebrow>
          <h2 className="mt-3 text-center text-3xl font-extrabold leading-snug md:text-4xl">
            موثوق به من قِبل آلاف <span className="text-caramel">العملاء السعداء</span>
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <figure
                key={t.name}
                className={cx(
                  "rounded-2xl border bg-white p-6 transition",
                  activeTestimonial === i
                    ? "border-caramel shadow-lg shadow-caramel/10 ring-2 ring-caramel/30"
                    : "border-border-warm"
                )}
              >
                <span className="text-5xl font-black leading-none text-caramel">“</span>
                <blockquote className="mt-1 font-semibold leading-relaxed">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-5 flex items-center gap-3">
                  <Image
                    src={t.avatar}
                    alt={t.name}
                    width={96}
                    height={96}
                    className="h-12 w-12 shrink-0 rounded-full object-cover"
                  />
                  <div className="min-w-0">
                    <div className="font-bold">{t.name}</div>
                    <div className="text-sm text-muted">{t.city}</div>
                    <div className="mt-1">
                      <Stars />
                    </div>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>

          <div className="mt-8 flex justify-center gap-2">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`رأي ${i + 1}`}
                onClick={() => setActiveTestimonial(i)}
                className={cx(
                  "h-2.5 rounded-full transition-all",
                  activeTestimonial === i ? "w-7 bg-caramel" : "w-2.5 bg-border-warm hover:bg-caramel/50"
                )}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ============ SECTION 7: Gallery ============ */}
      <section id="gallery" className="scroll-mt-24 pb-16 md:pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Eyebrow>معرض مخبزنا</Eyebrow>
          <h2 className="mt-3 text-center text-3xl font-extrabold leading-snug md:text-4xl">
            مذاق من <span className="text-caramel">إبداعاتنا</span>
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center leading-relaxed text-muted">
            استكشف أشهى مخبوزاتنا المحضرة بحب وعناية.
          </p>

          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3">
            {GALLERY.map((src, i) => (
              <button
                key={src}
                type="button"
                aria-label={`تكبير صورة ${i + 1} من المعرض`}
                onClick={() => setLightbox(i)}
                className="group aspect-[4/3] overflow-hidden rounded-2xl"
              >
                <Image
                  src={src}
                  alt={`من معرض المخبز ${i + 1}`}
                  width={800}
                  height={600}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </button>
            ))}
          </div>

          <div className="mt-8 text-center">
            <button
              type="button"
              onClick={() => setLightbox(0)}
              className="inline-flex items-center gap-2 rounded-full bg-cocoa px-7 py-3 font-bold text-white transition hover:bg-espresso"
            >
              عرض المعرض بالكامل
              <ArrowLeft className="h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      {/* ============ SECTION 8: Why choose us ============ */}
      <section className="px-4 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-3xl bg-[#361B0E] p-8 text-white md:p-12">
            <div className="grid items-center gap-10 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <h2 className="text-3xl font-extrabold leading-snug md:text-4xl">
                  لماذا تختار بيسكويك؟
                </h2>
                <p className="mt-4 leading-relaxed text-white/70">
                  نقدم لك المزيج المثالي من الجودة والمذاق الأصيل والسعادة في كل طلب.
                </p>
                <a
                  href="#menu"
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-caramel px-7 py-3 font-bold text-white transition hover:bg-caramel-hover"
                >
                  اطلب الآن
                  <ArrowLeft className="h-5 w-5" />
                </a>
              </div>
              <div className="flex flex-col gap-5 lg:col-span-4">
                {WHY_POINTS.map((point) => (
                  <div key={point} className="flex items-center gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-caramel text-white">
                      <Check className="h-5 w-5" strokeWidth={3} />
                    </span>
                    <span className="font-bold">{point}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col items-center lg:col-span-3">
                <Heart className="animate-float-soft mb-1 h-8 w-8 text-white" fill="none" />
                <CupcakeIcon className="h-44 w-44 text-white/90 md:h-52 md:w-52" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ SECTION 9: Blog ============ */}
      <section id="blog" className="scroll-mt-24 py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Eyebrow>أحدث مقالات مدونتنا</Eyebrow>
          <h2 className="mt-3 text-center text-3xl font-extrabold leading-snug md:text-4xl">
            نصائح، وصفات <span className="text-caramel">وأكثر</span>
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center leading-relaxed text-muted">
            استلهم من أحدث مقالاتنا ونصائح الخَبز المنزلي.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {POSTS.map((post, i) => (
              <article
                key={post.title}
                className="overflow-hidden rounded-2xl border border-border-warm bg-white transition hover:-translate-y-1 hover:shadow-lg"
              >
                <button
                  type="button"
                  onClick={() => setActivePost(i)}
                  className="block w-full text-start"
                  aria-label={`اقرأ: ${post.title}`}
                >
                  <div className="aspect-[16/10] overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      width={800}
                      height={500}
                      className="h-full w-full object-cover transition duration-500 hover:scale-105"
                    />
                  </div>
                </button>
                <div className="p-5">
                  <h3 className="text-lg font-extrabold leading-snug">{post.title}</h3>
                  <p className="mt-2 leading-relaxed text-muted">{post.excerpt}</p>
                  <p className="mt-2 flex items-center gap-2 text-sm text-muted">
                    <CalendarDays className="h-4 w-4 text-caramel" />
                    {post.date}
                  </p>
                  <button
                    type="button"
                    onClick={() => setActivePost(i)}
                    className="mt-4 inline-flex items-center gap-1.5 font-bold text-caramel transition hover:text-caramel-hover"
                  >
                    اقرأ المزيد
                    <ArrowLeft className="h-4 w-4" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============ SECTION 10: Newsletter ============ */}
      <section className="px-4 pb-16 sm:px-6 md:pb-20">
        <div className="mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-3xl bg-caramel p-8 text-white md:p-10">
            <div className="grid items-center gap-8 lg:grid-cols-2">
              <div>
                <div className="flex items-center gap-3">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/20">
                    <Mail className="h-6 w-6" />
                  </span>
                  <h2 className="text-2xl font-extrabold leading-snug md:text-3xl">
                    اشترك في نشرتنا الإخبارية
                  </h2>
                </div>
                <p className="mt-3 leading-relaxed text-white/90">
                  احصل على أحدث الوصفات والعروض الحصرية والمزيد!
                </p>
                <form onSubmit={subscribe} className="mt-6 flex flex-col gap-2 sm:flex-row">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="أدخل بريدك الإلكتروني"
                    className="w-full flex-1 rounded-full bg-white px-5 py-3 text-sm font-semibold text-ink outline-none placeholder:text-muted"
                  />
                  <button
                    type="submit"
                    className="flex shrink-0 items-center justify-center gap-2 rounded-full bg-espresso px-6 py-3 text-sm font-bold text-white transition hover:bg-cocoa"
                  >
                    اشترك الآن
                    <ArrowLeft className="h-4 w-4" />
                  </button>
                </form>
              </div>
              <div className="relative mx-auto w-56 md:w-72">
                <Sparkles className="absolute -top-1 right-2 h-6 w-6 text-white" />
                <Sparkles className="absolute bottom-4 left-0 h-5 w-5 text-white/80" />
                <Sparkles className="absolute right-6 top-16 h-4 w-4 text-white/70" />
                <Image
                  src="/images/newsletter-cupcake.png"
                  alt="كب كيك بالفانيليا"
                  width={600}
                  height={600}
                  className="blend-soft w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ SECTION 11: Contact ============ */}
      <section id="contact" className="scroll-mt-24 px-4 pb-16 sm:px-6 md:pb-20">
        <div className="mx-auto max-w-7xl">
          <Eyebrow>تواصل معنا</Eyebrow>
          <h2 className="mt-3 text-center text-3xl font-extrabold leading-snug md:text-4xl">
            إحنا في خدمتك <span className="text-caramel">دائماً</span>
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center leading-relaxed text-muted">
            عندك طلب خاص، اقتراح، أو سؤال؟ ابعتلنا رسالة وهنرد عليك في أقرب وقت.
          </p>

          <div className="mt-10 grid gap-6 lg:grid-cols-5">
            <div className="flex flex-col gap-4 lg:col-span-2">
              <a
                href="tel:+201001234567"
                className="flex items-center gap-4 rounded-2xl border border-border-warm bg-white p-5 transition hover:border-caramel hover:shadow-md"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-caramel/10 text-caramel">
                  <Phone className="h-6 w-6" />
                </span>
                <span>
                  <span className="block text-sm font-bold text-muted">اتصل بنا</span>
                  <span dir="ltr" className="block font-extrabold">+20 100 123 4567</span>
                </span>
              </a>
              <a
                href="mailto:hello@biscquick.com"
                className="flex items-center gap-4 rounded-2xl border border-border-warm bg-white p-5 transition hover:border-caramel hover:shadow-md"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-caramel/10 text-caramel">
                  <Mail className="h-6 w-6" />
                </span>
                <span>
                  <span className="block text-sm font-bold text-muted">البريد الإلكتروني</span>
                  <span dir="ltr" className="block font-extrabold">hello@biscquick.com</span>
                </span>
              </a>
              <div className="flex items-center gap-4 rounded-2xl border border-border-warm bg-white p-5">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-caramel/10 text-caramel">
                  <MapPin className="h-6 w-6" />
                </span>
                <span>
                  <span className="block text-sm font-bold text-muted">العنوان</span>
                  <span className="block font-extrabold">المعادي، القاهرة، مصر</span>
                </span>
              </div>
              <div className="flex items-center gap-4 rounded-2xl border border-border-warm bg-white p-5">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-caramel/10 text-caramel">
                  <Clock className="h-6 w-6" />
                </span>
                <span>
                  <span className="block text-sm font-bold text-muted">مواعيد العمل</span>
                  <span className="block font-extrabold">يومياً من 9 صباحاً حتى 11 مساءً</span>
                </span>
              </div>
            </div>

            <form
              onSubmit={submitContact}
              className="rounded-2xl border border-border-warm bg-white p-6 shadow-sm lg:col-span-3"
            >
              <h3 className="text-xl font-extrabold">ابعت لنا رسالة</h3>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <input
                  type="text"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  placeholder="الاسم"
                  className="rounded-full border border-border-warm bg-cream px-5 py-3 text-sm font-semibold outline-none placeholder:text-muted focus:border-caramel"
                />
                <input
                  type="tel"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  placeholder="رقم الموبايل (01xxxxxxxxx)"
                  dir="rtl"
                  className="rounded-full border border-border-warm bg-cream px-5 py-3 text-sm font-semibold outline-none placeholder:text-muted focus:border-caramel"
                />
              </div>
              <textarea
                value={contactMsg}
                onChange={(e) => setContactMsg(e.target.value)}
                placeholder="اكتب رسالتك هنا..."
                rows={4}
                className="mt-4 w-full resize-none rounded-2xl border border-border-warm bg-cream px-5 py-3 text-sm font-semibold outline-none placeholder:text-muted focus:border-caramel"
              />
              <button
                type="submit"
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-caramel px-6 py-3 font-bold text-white transition hover:bg-caramel-hover sm:w-auto"
              >
                إرسال الرسالة
                <ArrowLeft className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ============ SECTION 12: Footer ============ */}
      <footer className="scroll-mt-24 border-b-4 border-caramel bg-espresso pb-6 pt-14 text-white/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <a href="#home" className="flex items-center gap-2.5">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-caramel/15 text-caramel">
                  <CupcakeIcon className="h-7 w-7" />
                </span>
                <span className="leading-none">
                  <span className="block font-logo text-[1.75rem] font-bold text-white">بيسكويك</span>
                </span>
              </a>
              <p className="mt-4 leading-relaxed">حلاوة في كل لقمة، وسعادة في كل لحظة.</p>
              <div className="mt-5 flex items-center gap-2">
                {SOCIALS.map(({ label, Icon }) => (
                  <button
                    key={label}
                    type="button"
                    aria-label={label}
                    onClick={() => setToast(`صفحة بيسكويك على ${label} قريباً — تابعنا هنا`)}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/25 text-white/90 transition hover:border-caramel hover:text-caramel"
                  >
                    <Icon className="h-4 w-4" />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-extrabold text-white">روابط سريعة</h3>
              <ul className="mt-4 space-y-2.5">
                {[
                  { label: "الرئيسية", href: "#home" },
                  { label: "من نحن", href: "#about" },
                  { label: "القائمة", href: "#menu" },
                  { label: "المدونة", href: "#blog" },
                  { label: "تواصل معنا", href: "#contact" },
                ].map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="transition hover:text-caramel">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-extrabold text-white">خدماتنا</h3>
              <ul className="mt-4 space-y-2.5">
                {["كيك حسب الطلب", "ضيافة حفلات", "حلويات فاخرة", "علب هدايا", "توصيل سريع"].map((s) => (
                  <li key={s}>
                    <a href="#contact" className="transition hover:text-caramel">
                      {s}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-extrabold text-white">تواصل معنا</h3>
              <ul className="mt-4 space-y-3">
                <li className="flex items-center gap-2.5">
                  <Phone className="h-4 w-4 shrink-0 text-caramel" />
                  <span dir="ltr">+20 100 123 4567</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Mail className="h-4 w-4 shrink-0 text-caramel" />
                  <span dir="ltr">hello@biscquick.com</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <MapPin className="h-4 w-4 shrink-0 text-caramel" />
                  المعادي، القاهرة، مصر
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-sm sm:flex-row">
            <p>© 2026 بيسكويك. جميع الحقوق محفوظة.</p>
            <p>
              <button type="button" onClick={() => setPolicy("privacy")} className="transition hover:text-caramel">
                سياسة الخصوصية
              </button>
              <span className="mx-2 text-white/30">|</span>
              <button type="button" onClick={() => setPolicy("terms")} className="transition hover:text-caramel">
                شروط الخدمة
              </button>
            </p>
          </div>
        </div>
      </footer>

      {/* ============ Mobile menu drawer ============ */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMenuOpen(false)} />
          <div className="absolute inset-y-0 right-0 w-72 max-w-[85vw] bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-caramel/10 text-caramel">
                  <CupcakeIcon className="h-6 w-6" />
                </span>
                <span className="font-logo text-xl font-bold">بيسكويك</span>
              </span>
              <button
                type="button"
                aria-label="إغلاق القائمة"
                onClick={() => setMenuOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-cream"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="mt-6 flex flex-col">
              {NAV.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="border-b border-border-warm py-3.5 font-bold transition hover:text-caramel"
                >
                  {l.label}
                </a>
              ))}
            </nav>
            <a
              href="#menu"
              onClick={() => setMenuOpen(false)}
              className="mt-6 flex items-center justify-center gap-2 rounded-full bg-caramel px-5 py-3 font-bold text-white"
            >
              اطلب الآن
              <ArrowLeft className="h-5 w-5" />
            </a>
          </div>
        </div>
      )}

      {/* ============ Cart drawer ============ */}
      {cartOpen && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/50" onClick={() => setCartOpen(false)} />
          <aside className="absolute inset-y-0 left-0 flex w-full max-w-sm flex-col bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-border-warm px-5 py-4">
              <h2 className="flex items-center gap-2 text-lg font-extrabold">
                <ShoppingBag className="h-5 w-5 text-caramel" />
                سلة التسوق
                {cartCount > 0 && <span className="text-sm text-muted">({cartCount})</span>}
              </h2>
              <button
                type="button"
                aria-label="إغلاق السلة"
                onClick={() => setCartOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-cream"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {orderPlaced ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-caramel/10 text-caramel">
                  <Check className="h-8 w-8" strokeWidth={3} />
                </span>
                <p className="text-xl font-extrabold">تم استلام طلبك بنجاح!</p>
                {placedOrder && (
                  <>
                    <p className="rounded-full bg-cream px-4 py-2 font-extrabold text-caramel" dir="ltr">
                      {placedOrder.code}
                    </p>
                    <p className="leading-relaxed text-muted">
                      شكراً يا {placedOrder.name}! طلبك بقيمة {formatEGP(placedOrder.total)} تم
                      تسجيله، والدفع عند الاستلام. سنتواصل معك قريباً لتأكيد الطلب والتوصيل.
                    </p>
                  </>
                )}
                <button
                  type="button"
                  onClick={() => {
                    setOrderPlaced(false);
                    setCartOpen(false);
                  }}
                  className="mt-2 rounded-full bg-caramel px-6 py-3 font-bold text-white transition hover:bg-caramel-hover"
                >
                  متابعة التصفح
                </button>
              </div>
            ) : cartItems.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
                <ShoppingBag className="h-12 w-12 text-border-warm" />
                <p className="text-lg font-extrabold">سلتك فارغة</p>
                <p className="text-muted">أضف بعض المخبوزات اللذيذة وابدأ طلبك.</p>
                <button
                  type="button"
                  onClick={() => setCartOpen(false)}
                  className="mt-2 rounded-full bg-caramel px-6 py-3 font-bold text-white transition hover:bg-caramel-hover"
                >
                  تصفح القائمة
                </button>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-5 py-4">
                  {checkoutStep ? (
                    <div className="flex flex-col gap-3">
                      <h3 className="text-lg font-extrabold">بيانات التوصيل</h3>
                      <input
                        type="text"
                        value={custName}
                        onChange={(e) => setCustName(e.target.value)}
                        placeholder="الاسم بالكامل"
                        className="rounded-full border border-border-warm bg-cream px-5 py-3 text-sm font-semibold outline-none placeholder:text-muted focus:border-caramel"
                      />
                      <input
                        type="tel"
                        value={custPhone}
                        onChange={(e) => setCustPhone(e.target.value)}
                        placeholder="رقم الموبايل (01xxxxxxxxx)"
                        className="rounded-full border border-border-warm bg-cream px-5 py-3 text-sm font-semibold outline-none placeholder:text-muted focus:border-caramel"
                      />
                      <input
                        type="text"
                        value={custAddress}
                        onChange={(e) => setCustAddress(e.target.value)}
                        placeholder="عنوان التوصيل (الشارع، العمارة، الشقة)"
                        className="rounded-full border border-border-warm bg-cream px-5 py-3 text-sm font-semibold outline-none placeholder:text-muted focus:border-caramel"
                      />
                      <textarea
                        value={custNotes}
                        onChange={(e) => setCustNotes(e.target.value)}
                        placeholder="ملاحظات (اختياري)"
                        rows={2}
                        className="w-full resize-none rounded-2xl border border-border-warm bg-cream px-5 py-3 text-sm font-semibold outline-none placeholder:text-muted focus:border-caramel"
                      />
                      {formError && (
                        <p className="text-sm font-bold text-red-600">{formError}</p>
                      )}
                      <p className="text-xs text-muted">
                        الدفع عند الاستلام — التوصيل مجاني للطلبات فوق 300 ج.م.
                      </p>
                    </div>
                  ) : (
                  <ul className="flex flex-col gap-4">
                    {cartItems.map((p) => (
                      <li key={p.id} className="flex gap-3 rounded-2xl border border-border-warm p-3">
                        <Image
                          src={p.image}
                          alt={p.name}
                          width={120}
                          height={120}
                          className="h-16 w-16 shrink-0 rounded-xl object-cover"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="truncate font-bold">{p.name}</p>
                          <p className="mt-0.5 text-sm font-extrabold text-caramel">
                            {formatEGP(p.price)}
                          </p>
                          <div className="mt-2 flex items-center gap-2">
                            <button
                              type="button"
                              aria-label="زيادة الكمية"
                              onClick={() => setQty(p.id, (cart[p.id] ?? 0) + 1)}
                              className="flex h-7 w-7 items-center justify-center rounded-full border border-border-warm transition hover:border-caramel hover:text-caramel"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                            <span className="w-6 text-center font-extrabold">{cart[p.id]}</span>
                            <button
                              type="button"
                              aria-label="تقليل الكمية"
                              onClick={() => setQty(p.id, (cart[p.id] ?? 0) - 1)}
                              className="flex h-7 w-7 items-center justify-center rounded-full border border-border-warm transition hover:border-caramel hover:text-caramel"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="ms-auto text-sm font-extrabold">
                              {formatEGP((cart[p.id] ?? 0) * p.price)}
                            </span>
                            <button
                              type="button"
                              aria-label="حذف من السلة"
                              onClick={() => setQty(p.id, 0)}
                              className="flex h-7 w-7 items-center justify-center rounded-full text-muted transition hover:bg-red-50 hover:text-red-600"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                  )}
                </div>
                <div className="border-t border-border-warm px-5 py-4">
                  <div className="flex items-center justify-between font-extrabold">
                    <span>المجموع</span>
                    <span>{formatEGP(cartTotal)}</span>
                  </div>
                  {!checkoutStep && (
                    <p className="mt-1 text-xs text-muted">الدفع عند الاستلام — التوصيل مجاني للطلبات فوق 300 ج.م.</p>
                  )}
                  {checkoutStep ? (
                    <div className="mt-4 flex gap-2">
                      <button
                        type="button"
                        onClick={() => setCheckoutStep(false)}
                        className="rounded-full border border-border-warm px-5 py-3 font-bold transition hover:border-caramel hover:text-caramel"
                      >
                        رجوع
                      </button>
                      <button
                        type="button"
                        onClick={submitOrder}
                        className="flex flex-1 items-center justify-center gap-2 rounded-full bg-caramel px-6 py-3 font-bold text-white transition hover:bg-caramel-hover"
                      >
                        تأكيد الطلب
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setCheckoutStep(true)}
                      className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-caramel px-6 py-3 font-bold text-white transition hover:bg-caramel-hover"
                    >
                      إتمام الطلب
                      <ArrowLeft className="h-5 w-5" />
                    </button>
                  )}
                </div>
              </>
            )}
          </aside>
        </div>
      )}

      {/* ============ Video modal ============ */}
      {videoOpen && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80 p-4"
          onClick={() => setVideoOpen(false)}
        >
          <div
            className="relative w-full max-w-2xl overflow-hidden rounded-3xl bg-espresso shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              aria-label="إغلاق الفيديو"
              onClick={() => setVideoOpen(false)}
              className="absolute left-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-black/80"
            >
              <X className="h-5 w-5" />
            </button>
            {videoFailed ? (
              <Image
                src="/images/hero-cake.jpg"
                alt="كيكة شوكولاتة بالغاناش"
                width={1120}
                height={1120}
                className="aspect-square w-full object-cover"
              />
            ) : (
              <video
                src="/videos/bakery-hero.mp4"
                poster="/images/hero-cake.jpg"
                controls
                autoPlay
                loop
                muted
                playsInline
                onError={() => setVideoFailed(true)}
                className="aspect-square w-full bg-black object-cover"
              />
            )}
            <div className="flex items-center justify-between gap-3 px-5 py-4 text-white">
              <p className="font-bold">جولة سريعة داخل مخبزنا — كيك الشوكولاتة بالغاناش</p>
              <p className="shrink-0 text-xs text-white/50">الفيديو: Pexels</p>
            </div>
          </div>
        </div>
      )}

      {/* ============ Gallery lightbox ============ */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/85 p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            type="button"
            aria-label="إغلاق المعرض"
            onClick={() => setLightbox(null)}
            className="absolute left-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-black/80"
          >
            <X className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="الصورة التالية"
            onClick={(e) => {
              e.stopPropagation();
              setLightbox((lightbox + 1) % GALLERY.length);
            }}
            className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-black/80"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="الصورة السابقة"
            onClick={(e) => {
              e.stopPropagation();
              setLightbox((lightbox + GALLERY.length - 1) % GALLERY.length);
            }}
            className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-black/80"
          >
            <ArrowLeft className="h-5 w-5 rotate-180" />
          </button>
          <div className="max-h-[85vh] max-w-3xl" onClick={(e) => e.stopPropagation()}>
            <Image
              src={GALLERY[lightbox]}
              alt={`من معرض المخبز ${lightbox + 1}`}
              width={1200}
              height={900}
              className="max-h-[80vh] w-auto rounded-2xl object-contain"
            />
            <p className="mt-3 text-center font-bold text-white">
              {lightbox + 1} / {GALLERY.length}
            </p>
          </div>
        </div>
      )}

      {/* ============ Article modal ============ */}
      {activePost !== null && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 p-4"
          onClick={() => setActivePost(null)}
        >
          <div
            className="relative max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              aria-label="إغلاق المقال"
              onClick={() => setActivePost(null)}
              className="absolute left-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-black/80"
            >
              <X className="h-5 w-5" />
            </button>
            <Image
              src={POSTS[activePost].image}
              alt={POSTS[activePost].title}
              width={800}
              height={500}
              className="aspect-[16/9] w-full object-cover"
            />
            <div className="p-6 md:p-8">
              <h3 className="text-2xl font-extrabold leading-snug">{POSTS[activePost].title}</h3>
              <p className="mt-2 flex items-center gap-2 text-sm text-muted">
                <CalendarDays className="h-4 w-4 text-caramel" />
                {POSTS[activePost].date}
              </p>
              {POSTS[activePost].body.map((para, i) => (
                <p key={i} className="mt-4 leading-loose text-muted">
                  {para}
                </p>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ============ Policy modal ============ */}
      {policy && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 p-4"
          onClick={() => setPolicy(null)}
        >
          <div
            className="relative max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl md:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              aria-label="إغلاق"
              onClick={() => setPolicy(null)}
              className="absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-full hover:bg-cream"
            >
              <X className="h-5 w-5" />
            </button>
            <h3 className="text-2xl font-extrabold">
              {policy === "privacy" ? "سياسة الخصوصية" : "شروط الخدمة"}
            </h3>
            {policy === "privacy" ? (
              <div className="mt-4 space-y-3 leading-loose text-muted">
                <p>
                  بياناتك (الاسم ورقم الموبايل والعنوان) تُستخدم فقط لتجهيز طلبك
                  وتوصيله، ولا نشاركها مع أي طرف ثالث.
                </p>
                <p>
                  لا نخزن أي بيانات دفع، لأن الدفع عند الاستلام نقداً.
                </p>
                <p>
                  يمكنك طلب حذف بياناتك في أي وقت بالتواصل معنا على
                  hello@biscquick.com.
                </p>
              </div>
            ) : (
              <div className="mt-4 space-y-3 leading-loose text-muted">
                <p>الأسعار المعروضة بالجنيه المصري، والدفع عند الاستلام.</p>
                <p>التوصيل مجاني للطلبات فوق 300 ج.م.</p>
                <p>
                  يمكنك إلغاء أو تعديل طلبك بالاتصال بنا قبل بدء التجهيز.
                </p>
                <p>
                  الصور المعروضة للتوضيح وقد تختلف قليلاً عن المنتج النهائي.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ============ Flying product image (add-to-cart animation) ============ */}
      {fly && (
        <img
          key={fly.key}
          ref={(el) => {
            if (!el) return;
            const dx = fly.tx - fly.x;
            const dy = fly.ty - fly.y;
            const anim = el.animate(
              [
                { transform: "translate(0, 0) scale(1)", opacity: 1, offset: 0 },
                {
                  transform: `translate(${dx * 0.5}px, ${dy * 0.5 - 80}px) scale(0.5)`,
                  opacity: 0.9,
                  offset: 0.55,
                },
                { transform: `translate(${dx}px, ${dy}px) scale(0.15)`, opacity: 0.2, offset: 1 },
              ],
              { duration: 750, easing: "cubic-bezier(0.22, 0.61, 0.36, 1)" }
            );
            anim.onfinish = () => setFly(null);
          }}
          src={fly.src}
          alt=""
          aria-hidden="true"
          className="pointer-events-none fixed z-[90] rounded-full object-cover shadow-xl"
          style={{ left: fly.x, top: fly.y, width: fly.size, height: fly.size }}
        />
      )}

      {/* ============ Toast ============ */}
      {toast && (
        <div className="fixed bottom-5 left-1/2 z-[80] -translate-x-1/2 rounded-full bg-espresso px-6 py-3 text-sm font-bold text-white shadow-xl">
          {toast}
        </div>
      )}
    </div>
  );
}
