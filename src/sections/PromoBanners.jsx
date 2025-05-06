import { useContext } from "react";
import { LanguageContext } from "../context/LanguageContext";
import imgbanner from "../../public/images/banner.png";

export default function PromoBanner() {
  const { lang } = useContext(LanguageContext);

  return (
    <section className="h-[450px] md:h-[350px] py-2 bg-orange-100 rounded-3xl px-6 my-8 mx-8 shadow-md flex flex-col md:flex-row items-center justify-between gap-6" data-aos="fade-up">
      <div className="flex flex-col items-center md:items-start justify-center gap-4 w-full md:w-1/2">
        <h3 className="text-2xl font-bold text-orange-700 mb-2">
          {lang === "en" ? "Get 20% Off Your First Order!" : "احصل على خصم 20% على أول طلب!"}
        </h3>
        <p className="text-gray-800">
          {lang === "en"
            ? "Enjoy your first coffee order with a special discount, only for a limited time."
            : "استمتع بخصم خاص على أول طلب قهوة لك، العرض لفترة محدودة فقط."}
        </p>
        <button className="bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 transition-all">
         {lang === "en" ? "Order Now" : "اطلب الآن"}
         </button>
      </div>
      
      <img src={imgbanner} alt="Promo Banner" className="w-[80%] sm:w-[30%] object-cover rounded-3xl" />
    </section>
  );
}
