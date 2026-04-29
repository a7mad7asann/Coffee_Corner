import { useContext } from "react";
import { Link } from "react-router-dom";
import { LanguageContext } from "../context/LanguageContext";
import bannerBg from "../../public/images/bannerr.png";

export default function Banner() {
  const { lang } = useContext(LanguageContext);

  return (
    <section className="bg-[#fff8ef] py-10" dir={lang === "ar" ? "rtl" : "ltr"}>
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className="relative min-h-[340px] overflow-hidden rounded-lg bg-cover bg-center shadow-md"
          style={{ backgroundImage: `url(${bannerBg})` }}
          data-aos="fade-up"
        >
          <div className="absolute inset-0 bg-[#1b120d]/65" />
          <div className="relative z-10 flex min-h-[340px] flex-col items-start justify-center px-6 py-10 text-white md:px-12">
            <span className="mb-4 rounded-lg bg-white/15 px-4 py-2 text-sm font-bold text-orange-100 backdrop-blur">
              {lang === "en" ? "50% Discount" : "خصم 50%"}
            </span>
            <p className="mb-2 text-base font-semibold text-orange-200">
              {lang === "en" ? "Today's Special" : "عرض اليوم"}
            </p>
            <h2 className="max-w-xl text-4xl font-extrabold leading-tight md:text-6xl">
              {lang === "en" ? "Coffee Time, Made Better" : "وقت القهوة بطعم أفضل"}
            </h2>
            <Link
              to="/products"
              className="mt-6 inline-flex rounded-lg bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600"
            >
              {lang === "en" ? "Order Now" : "اطلب الآن"}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
