import { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight, Coffee, Star } from "lucide-react";
import { LanguageContext } from "../context/LanguageContext";

export default function HeroSection() {
  const { lang } = useContext(LanguageContext);
  const [content, setContent] = useState(null);

  useEffect(() => {
    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => setContent(data.heroSection[lang]));
  }, [lang]);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.body.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  if (!content) return null;

  return (
    <section className="relative overflow-hidden bg-[#fff8ef] pt-24">
      <div className="absolute inset-x-0 top-0 h-28 bg-white" />
      <div className="absolute -end-20 top-32 h-72 w-72 rounded-full bg-orange-200/40 blur-3xl" />
      <div className="absolute start-0 bottom-0 h-72 w-72 rounded-full bg-[#7a4d2f]/10 blur-3xl" />

      <div className="relative mx-auto grid min-h-[620px] w-full max-w-7xl items-center gap-10 px-4 py-10 sm:px-6 md:grid-cols-[1fr_0.9fr] lg:px-8">
        <motion.div
          initial={{ opacity: 0, x: lang === "ar" ? 50 : -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={lang === "ar" ? "text-right" : "text-left"}
        >
          <span className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-bold text-[#8a4d25] shadow-sm">
            <Coffee size={17} />
            {lang === "en" ? "Freshly roasted coffee" : "قهوة محمصة طازجة"}
          </span>

          <h1 className="mt-6 max-w-3xl text-5xl font-black leading-tight text-[#2f2118] sm:text-6xl lg:text-7xl">
            {content.title}{" "}
            <span className="text-orange-500">{content.span}</span>
          </h1>

          <p className="mt-5 max-w-xl text-lg leading-8 text-[#6f5a4e]">
            {content.description}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 rounded-lg bg-[#2f2118] px-6 py-3 font-bold text-white shadow-lg transition hover:bg-orange-500"
            >
              {content.moreMenu}
              <ArrowUpRight size={18} />
            </Link>

            <span className="inline-flex items-center gap-2 rounded-lg border border-[#ead8ca] bg-white px-5 py-3 text-sm font-bold text-[#2f2118]">
              <Star size={16} className="fill-orange-400 text-orange-400" />
              {content.cat.rating} {lang === "en" ? "customer rating" : "تقييم العملاء"}
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="relative mx-auto flex w-full max-w-md justify-center md:max-w-none"
        >
          <div className="relative flex aspect-square w-full max-w-[470px] items-center justify-center rounded-lg bg-[#3a2418] p-8 shadow-2xl">
            <img
              src={content.backgroundImage}
              alt=""
              className="absolute inset-0 h-full w-full object-cover opacity-15"
            />
            <div className="absolute inset-5 rounded-lg border border-white/10" />
            <img
              src={content.cat.image}
              alt={content.cat.name}
              className="relative z-10 h-[78%] w-[78%] object-contain drop-shadow-2xl"
            />

            <div className="absolute start-4 top-5 z-20 rounded-lg bg-white px-4 py-3 shadow-lg">
              <p className="text-xs font-semibold text-gray-500">{lang === "en" ? "Best seller" : "الأكثر طلبا"}</p>
              <p className="font-black text-[#2f2118]">{content.cat.name}</p>
            </div>

            <div className="absolute bottom-5 end-4 z-20 rounded-lg bg-orange-500 px-4 py-3 text-white shadow-lg">
              <p className="text-xs font-semibold text-orange-100">{lang === "en" ? "Sold" : "مبيعات"}</p>
              <p className="font-black">{content.cat.sales}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
