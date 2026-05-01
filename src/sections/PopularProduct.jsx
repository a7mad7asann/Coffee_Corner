import { useContext } from "react";
import ProductCard from "../component/ProductCard";
import { LanguageContext } from "../context/LanguageContext";
import { useAppData } from "../context/AppDataContext";

export default function PopularProduct() {
  const { lang } = useContext(LanguageContext);
  const { productsData } = useAppData();
  const products = (productsData?.[lang]?.products || []).slice(0, 4);

  return (
    <section className="bg-[#fff8ef] py-10" dir={lang === "ar" ? "rtl" : "ltr"}>
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2
          className="mb-6 text-2xl font-bold text-[#2f2118] md:text-3xl"
          data-aos="fade-right"
        >
          {lang === "en" ? "Popular" : "الأكثر"}{" "}
          <span className="text-orange-500">
            {lang === "en" ? "Now" : "رواجا"}
          </span>
        </h2>

        <div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 xl:gap-6"
          data-aos="fade-left"
        >
          {products.map((product, index) => (
            <div
              key={product.id}
              data-aos="zoom-in"
              data-aos-delay={index * 100}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
