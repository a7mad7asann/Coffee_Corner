import { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
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

  if (!content) return <p>Loading...</p>;

  return (
    <section className="relative h-[600px] bg-[#F8EDE3] flex items-center justify-center overflow-hidden">
      {/* Floating Coffee Beans */}
      <div className="absolute right-0 top-0 pointer-events-none">
        <img src={content.backgroundImage} alt="Coffee Beans" className="w-full h-full object-cover opacity-60" />
      </div>
      
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between relative z-10 px-6 md:px-16">
        {/* Text Content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.8, ease: "easeOut" }} 
          className={`md:w-1/2 text-center md:text-left ${lang === "ar" ? "md:text-right" : "md:text-left"}`}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#432818]">
            {content.title.split(" ")[0]} <span className="text-[#FF902B]">{content.title.split(" ")[1]}</span>
          </h1>
          <p className="text-gray-700 mt-4 text-lg">{content.description}</p>
          <div className="mt-6 flex gap-4">
            <button 
              className="bg-[#432818] px-6 py-3 rounded-lg text-white font-bold text-lg shadow-lg hover:bg-[#25140D] transition duration-300"
              onClick={() => window.location.href = '/order'}
            >
              {content.buttonText}
            </button>
            <button 
              className="text-[#FF902B] font-semibold text-lg"
              onClick={() => window.location.href = '/menu'}
            >
              {content.moreMenu}
            </button>
          </div>
        </motion.div>

        {/* Coffee cat Display */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }} 
          className="relative w-96 h-96 bg-[#3F2E20] rounded-full flex items-center justify-center shadow-xl"
        >
          <img src={content.cat.image} alt={content.cat.name} className="w-64 h-64 object-cover" />
          
          {/* cat Labels */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 1 }}
            className="absolute top-6 left-8 bg-white px-4 py-2 rounded-full shadow-lg text-sm font-semibold"
          >
            {content.cat.name}
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 1.2 }}
            className="absolute bottom-6 right-8 bg-white px-4 py-2 rounded-full shadow-lg text-sm font-semibold"
          >
            {content.cat.sales}
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ delay: 1.4 }}
            className="absolute top-16 right-8 bg-white px-4 py-2 rounded-full shadow-lg text-sm flex items-center gap-2"
          >
            <span>{content.cat.rating}</span>
            <span className="text-yellow-500">⭐</span>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 pointer-events-none">
        <img src={content.backgroundImage} alt="Coffee Beans" className="w-full h-full object-cover opacity-60" />
      </div>
    </section>
  );
}
