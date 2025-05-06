import { useContext } from "react";
import { LanguageContext } from "../context/LanguageContext";
import bannerBg from "../../public/images/bannerr.png"; // ضع الصورة هنا بنفس الخلفية

export default function Banner() {
  const { lang } = useContext(LanguageContext);

  return (
    <div
      className="relative h-[350px] rounded-3xl overflow-hidden shadow-lg my-8 mx-8 flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${bannerBg})` }}
      data-aos="fade-up"
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      <div className="relative z-10 text-center text-white px-6">
        <p className="text-lg italic mb-2 text-orange-200">
          {lang === "en" ? "Today's Special" : "عرض اليوم"}
        </p>
        <h2 className="text-4xl md:text-6xl font-bold mb-4">
          {lang === "en" ? "Coffee Time" : "وقت القهوة"}
        </h2>
        <button className="bg-orange-500 hover:bg-orange-600 transition-all text-white px-6 py-2 rounded-full font-semibold">
          {lang === "en" ? "Order Now" : "اطلب الآن"}
        </button>
      </div>

      <div className="absolute top-6 right-6 bg-yellow-400 text-orange-900 font-bold px-4 py-2 rounded-full border-4 border-orange-500 shadow-md">
        {lang === "en" ? "50% Discount" : "خصم 50%"}
      </div>
    </div>
  );
}
