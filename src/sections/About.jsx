import { useContext, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { LanguageContext } from "../context/LanguageContext";
import data from "../../public/data.json";

export default function About() {
  const { lang } = useContext(LanguageContext);
  const content = data.about[lang];

  useEffect(() => {
    document.documentElement.lang = lang;
    document.body.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  return (
    <section className="relative overflow-hidden bg-[#fff8ef] py-16 mt-20" dir={lang === "ar" ? "rtl" : "ltr"}>
      <div className="absolute inset-0 bg-[url('/images/about_pattern.png')] bg-repeat opacity-[0.06]" />

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <motion.div
          className="relative"
          initial={{ opacity: 0, x: lang === "ar" ? 50 : -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="absolute -start-4 -top-4 h-full w-full rounded-lg bg-orange-500/15" />
          <div className="relative overflow-hidden rounded-lg bg-white p-3 shadow-xl">
            <img
              src={content.image}
              alt={content.title}
              className="h-[420px] w-full rounded-lg object-cover"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="text-sm font-bold uppercase tracking-wide text-orange-500">
            {content.title}
          </p>
          <h2 className="mt-3 max-w-2xl whitespace-pre-line text-3xl font-black leading-tight text-[#2f2118] md:text-5xl">
            {content.subtitle}
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-8 text-[#6f5a4e]">
            {content.description}
          </p>

          <button
            onClick={() => window.location.href = "/products"}
            className="mt-7 inline-flex items-center gap-2 rounded-lg bg-[#2f2118] px-6 py-3 font-bold text-white transition hover:bg-orange-500"
          >
            {content.button}
            <ArrowUpRight size={18} />
          </button>
        </motion.div>
      </div>

      <motion.div
        className="relative mx-auto mt-10 grid w-full max-w-7xl grid-cols-1 gap-4 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        viewport={{ once: true }}
      >
        {content.values.map((value) => (
          <div key={value.title} className="rounded-lg border border-[#ead8ca] bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
            <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[#fff1e5]">
              <img src={value.icon} alt={value.title} className="h-7 w-7" />
            </span>
            <h4 className="font-black text-[#2f2118]">{value.title}</h4>
            <p className="mt-2 text-sm leading-6 text-[#6f5a4e]">{value.description}</p>
          </div>
        ))}
      </motion.div>
    </section>
  );
}