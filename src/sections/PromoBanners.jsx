import { useContext } from "react";
import { Link } from "react-router-dom";
import { LanguageContext } from "../context/LanguageContext";
import imgbanner from "../../public/images/banner.webp";

export default function PromoBanner() {
  const { lang } = useContext(LanguageContext);

  return (
    <section className="bg-white py-10" dir={lang === "ar" ? "rtl" : "ltr"}>
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className="flex min-h-[320px] flex-col items-center justify-between gap-8 rounded-lg border border-[#eadfd6] bg-[#fff7ef] p-6 shadow-sm md:flex-row md:p-10"
          data-aos="fade-up"
        >
          <div className="flex max-w-xl flex-col items-start gap-4">
            <span className="rounded-lg bg-orange-500 px-3 py-1 text-sm font-bold text-white">
              {lang === "en" ? "First order" : "أول طلب"}
            </span>
            <h2 className="text-3xl font-extrabold leading-tight text-[#2f2118] md:text-4xl">
              {lang === "en"
                ? "Get 20% Off Your First Order!"
                : "احصل على خصم 20% على أول طلب"}
            </h2>
            <p className="text-base leading-7 text-gray-600">
              {lang === "en"
                ? "Enjoy your first coffee order with a special discount for a limited time."
                : "استمتع بخصم خاص على أول طلب قهوة لفترة محدودة."}
            </p>
            <Link
              to="/products"
              className="rounded-lg bg-[#2f2118] px-6 py-3 font-semibold text-white transition hover:bg-orange-500"
            >
              {lang === "en" ? "Order Now" : "اطلب الآن"}
            </Link>
          </div>

          <div className="flex w-full justify-center md:w-2/5">
            <img
              src={imgbanner}
              alt="Promo Banner"
              width="560"
              height="256"
              loading="lazy"
              decoding="async"
              className="max-h-64 w-full object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
