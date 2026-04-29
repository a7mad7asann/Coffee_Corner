import { useContext, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { LanguageContext } from "../context/LanguageContext";
import data from "../../public/data.json";

export default function Testimonials() {
  const { lang } = useContext(LanguageContext);
  const content = data.testimonialsSection[lang];
  const allTestimonials = content.testimonials.slice(0, 4);
  const featured = allTestimonials[0];
  const sliderTestimonials = allTestimonials.slice(1);
  
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-scroll every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % sliderTestimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [sliderTestimonials.length]);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.body.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  return (
    <section 
      className="relative overflow-hidden bg-[#fff8ef] py-16 md:py-20" 
      dir={lang === "ar" ? "rtl" : "ltr"}
    >
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white to-transparent" />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <p className="text-sm font-bold uppercase tracking-widest text-orange-500">
            {lang === "en" ? "Testimonials" : "آراء العملاء"}
          </p>
          <h2 className="mt-3 text-4xl font-black leading-tight text-[#2f2118] md:text-5xl">
            {content.title}
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-[#6f5a4e]">
            {content.subtitle}
          </p>
        </motion.div>

        {/* Main Grid */}
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Featured Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="group relative overflow-hidden rounded-2xl bg-[#2f2118] p-8 text-white md:p-10"
          >
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            {/* Quote Icon */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="absolute end-6 top-6"
            >
              <Quote size={80} className="text-white/5" />
            </motion.div>

            {/* Content */}
            <div className="relative z-10 space-y-6">
              {/* Stars */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex gap-1"
              >
                {Array.from({ length: 5 }).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 + i * 0.05 }}
                  >
                    <Star size={18} className="fill-orange-300 text-orange-300" />
                  </motion.div>
                ))}
              </motion.div>

              {/* Text */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-xl font-bold leading-8 md:text-2xl"
              >
                "{featured.text}"
              </motion.p>

              {/* Author */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex items-center gap-4 pt-4"
              >
                <motion.img
                  src={featured.image}
                  alt={featured.name}
                  className="h-14 w-14 rounded-lg border border-white/20 object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />
                <div>
                  <h3 className="font-black text-base">{featured.name}</h3>
                  <p className="text-xs text-white/60">
                    {lang === "en" ? "Verified customer" : "عميل موثق"}
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column */}
          <div className="flex flex-col gap-4">
            {/* Slider */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-2xl bg-white"
            >
              <AnimatePresence mode="wait">
                {sliderTestimonials[currentIndex] && (
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-4 p-6"
                  >
                    {/* Author Info */}
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={sliderTestimonials[currentIndex].image}
                          alt={sliderTestimonials[currentIndex].name}
                          className="h-12 w-12 rounded-lg object-cover"
                        />
                        <div>
                          <h3 className="font-black text-[#2f2118]">
                            {sliderTestimonials[currentIndex].name}
                          </h3>
                          <div className="mt-1 flex gap-0.5">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star key={i} size={12} className="fill-orange-400 text-orange-400" />
                            ))}
                          </div>
                        </div>
                      </div>
                      <Quote size={20} className="text-orange-200 flex-shrink-0" />
                    </div>

                    {/* Text */}
                    <p className="min-h-20 text-sm leading-6 text-[#6f5a4e]">
                      "{sliderTestimonials[currentIndex].text}"
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Dots */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex justify-center gap-2"
            >
              {sliderTestimonials.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "h-2 w-8 bg-orange-500"
                      : "h-2 w-2 bg-orange-200 hover:bg-orange-300"
                  }`}
                  whileHover={{ scale: 1.3 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </motion.div>

            {/* Rating Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              viewport={{ once: true }}
              className="rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 p-6 text-white"
            >
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <p className="text-5xl font-black">4.8</p>
                <p className="mt-2 text-sm font-semibold text-orange-50">
                  {lang === "en" ? "Average rating" : "متوسط التقييم"}
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}