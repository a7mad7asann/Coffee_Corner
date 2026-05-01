import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { LanguageContext } from "../context/LanguageContext";
import { useAppData } from "../context/AppDataContext";
import ProductCard from "../component/ProductCard";

export default function Products() {
  const { lang } = useContext(LanguageContext);
  const { productsData } = useAppData();
  const products = productsData?.[lang]?.products || [];

  useEffect(() => {
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  return (
    <main
      className="min-h-screen bg-white pt-24"
      dir={lang === "ar" ? "rtl" : "ltr"}
    >
      <section className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-lg bg-[#2f2118] px-6 py-10 text-white md:px-10">
          <div className="absolute inset-y-0 end-0 hidden w-1/2 bg-[url('/images/bannerr.webp')] bg-cover bg-center opacity-30 md:block" />
          <div className="relative max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-wide text-orange-300">
              {lang === "en" ? "Our Menu" : "قائمتنا"}
            </p>
            <h1 className="mt-3 text-4xl font-extrabold md:text-5xl">
              {lang === "en" ? "Fresh coffee products" : "منتجات قهوة طازجة"}
            </h1>
            <p className="mt-4 max-w-xl text-white/75">
              {lang === "en"
                ? "Pick your favorite drink, choose hot or cold, and add it to your cart."
                : "اختار مشروبك المفضل، حدد النوع، وضيفه للسلة بسهولة."}
            </p>
            <Link
              to="/cart"
              className="mt-6 inline-flex rounded-lg bg-orange-500 px-5 py-3 font-semibold text-white transition hover:bg-orange-600"
            >
              {lang === "en" ? "View Cart" : "عرض السلة"}
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-end justify-between gap-4">
          <h2 className="text-2xl font-bold text-[#2f2118] md:text-3xl">
            {lang === "en" ? "All Products" : "كل المنتجات"}
          </h2>
          <span className="rounded-lg border border-[#eadfd6] px-3 py-1 text-sm font-semibold text-gray-600">
            {products.length} {lang === "en" ? "items" : "منتجات"}
          </span>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
}
