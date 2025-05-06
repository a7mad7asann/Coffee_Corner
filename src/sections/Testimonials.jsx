import { useContext, useEffect } from "react";
import { LanguageContext } from "../context/LanguageContext";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import data from "../../public/data.json";

export default function Testimonials() {
  const { lang } = useContext(LanguageContext);
  const content = data.testimonialsSection[lang];

  useEffect(() => {
    document.documentElement.lang = lang;
    document.body.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  return (
    <section className="bg-[#F6E8D9] py-20 px-4 text-[#3a2e2a] relative overflow-hidden">
    <div className="absolute inset-0 opacity-10 z-1 bg-[url('/images/about_pattern.png')] bg-repeat" />
    <div className="container max-w-7xl mx-auto">
        <motion.h3
        className="text-3xl md:text-4xl font-bold text-center mb-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        >
        {content.title}
        </motion.h3>

        <motion.p
        className="text-lg md:text-xl text-center mb-10 text-[#7b5e53]"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        viewport={{ once: true }}
        >
        {content.subtitle}
        </motion.p>

        <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        >
        <Swiper
            modules={[Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            pagination={{ clickable: true }}
            breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            }}
        >
            {content.testimonials.map((testimonial, idx) => (
            <SwiperSlide key={idx}>
                <div className="bg-white rounded-xl shadow-md px-2 py-4 text-center flex flex-col items-center h-full">
                <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full mb-4 border-2 border-[#e9d6c3] object-cover"
                />

                <h4 className="font-semibold text-base text-[#5c3b30]">{testimonial.name}</h4>
                <p className="text-xs text-[#9c7e6e] mb-2">{testimonial.role}</p>

                <div className="flex justify-center text-[#f4c28b] mb-3 text-sm">
                    {Array(5).fill(0).map((_, i) => (
                    <span key={i}>★</span>
                    ))}
                </div>

                <p className="text-sm text-[#5c443a] leading-relaxed line-clamp-4">
                    {testimonial.text}
                </p>
                </div>
            </SwiperSlide>
            ))}
        </Swiper>

        <style jsx global>{`
            .swiper-pagination-bullet {
            background: #d3b6a4;
            opacity: 0.5;
            }
            .swiper-pagination {
            transform: translate3d(0, 15px, 0);
            }
            .swiper-pagination-bullet-active {
            background: #5c3b30;
            opacity: 1;
            width: 10px;
            height: 10px;
            }
            .swiper-wrapper{
            padding: 20px 0;
            }
        `}</style>
        </motion.div>
    </div>
    </section>
  );
}
