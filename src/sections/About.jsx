import { useContext, useEffect } from "react";
import { LanguageContext } from "../context/LanguageContext";
import AOS from "aos";
import "aos/dist/aos.css";
import data from "../../public/data.json";
import { motion } from "framer-motion";

export default function About() {
  const { lang } = useContext(LanguageContext);
  const content = data.about[lang];

  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  return (
    <section className="bg-[#fef6ef] relative overflow-hidden py-3 px-6 md:px-24">
      {/* خلفية كؤوس القهوة */}
      <div className="absolute inset-0 opacity-10 z-0 bg-[url('/images/about_pattern.png')] bg-repeat" />

      <div className="relative z-10 flex justify-evenly items-center gap-8">
        {/* الصورة */}
        <motion.div
          className="flex justify-center md:justify-start bg-white rounded-xl p-2 "
          data-aos="fade-right"
          whileHover={{ scale: 1.02 }}
        >
          <img
            src={content.image}
            alt="about us"
            className="rounded-xl shadow-xl w-[300px] md:w-[350px] object-cover"
          />
        </motion.div>

        {/* النص */}
        <div data-aos="fade-left">
            <h3 className="text-3xl font-bold mb-1 w-fit relative after:content-[''] after:block after:w-1/4 after:h-1 after:bg-orange-400 after:rounded-sm after:mt-2 after:absolute  rtl:after:left-0 after:right-0 after:bottom0">
              {content.title}
            </h3>



          <h2 className="text-2xl font-semibold mt-20 mb-4 text-gray-800 whitespace-pre-line">
            {content.subtitle}
          </h2>

          <p className="text-gray-600 leading-relaxed mb-6">
            {content.description}
          </p>

          <button className="bg-[#1f1f1f] text-white text-sm px-4 py-2 rounded-full hover:bg-[#333] transition">
            {content.button}
          </button>
        </div>
      </div>
    </section>
  );
}
