import { useContext, useEffect, useMemo, useState } from "react";
import { ShoppingCart, Star } from "lucide-react";
import toast from "react-hot-toast";
import { LanguageContext } from "../context/LanguageContext";
import { useCart } from "../context/CartContext";
import { useAppData } from "../context/AppDataContext";

export default function SpecialMenu() {
  const { lang } = useContext(LanguageContext);
  const { addToCart } = useCart();
  const { productsData } = useAppData();
  const products = useMemo(
    () => (productsData?.[lang]?.products || []).slice(0, 6),
    [productsData, lang],
  );
  const [selectedOptions, setSelectedOptions] = useState({});

  useEffect(() => {
    setSelectedOptions(
      products.reduce((acc, product) => {
        acc[product.id] = product.tags?.[0] || "";
        return acc;
      }, {}),
    );
  }, [products]);

  return (
    <section className="bg-[#fff8ef] py-16" dir={lang === "ar" ? "rtl" : "ltr"}>
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-orange-500">
              {lang === "en" ? "Special Menu" : "قائمة خاصة"}
            </p>
            <h2
              className="mt-2 text-3xl font-black text-[#2f2118] md:text-4xl"
              data-aos="fade-right"
            >
              {lang === "en" ? "Picked for you" : "مختارة لك"}
            </h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-[#6f5a4e]">
            {lang === "en"
              ? "A compact selection of customer favorites with quick choices for hot and cold drinks."
              : "اختيارات مفضلة وسريعة من المنتجات الأكثر طلبا مع تحديد النوع بسهولة."}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product, index) => (
            <article
              key={product.id}
              className="grid grid-cols-[118px_1fr] gap-4 rounded-lg border border-[#ead8ca] bg-white p-3 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              data-aos="zoom-in"
              data-aos-delay={index * 80}
            >
              <div className="relative flex h-full min-h-[150px] items-center justify-center rounded-lg bg-[#fff1e5]">
                <img
                  src={product.image}
                  alt={product.name}
                  width="118"
                  height="118"
                  loading="lazy"
                  decoding="async"
                  className="h-28 w-full object-contain"
                />
                <span className="absolute start-2 top-2 flex items-center gap-1 rounded-lg bg-white px-2 py-1 text-xs font-bold text-[#2f2118] shadow">
                  <Star size={12} className="fill-orange-400 text-orange-400" />
                  {product.rating}
                </span>
              </div>

              <div className="flex min-w-0 flex-col">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-black leading-tight text-[#2f2118]">
                    {product.name}
                  </h3>
                  <span className="whitespace-nowrap font-black text-orange-500">
                    {product.price} {lang === "en" ? "$" : "ريال"}
                  </span>
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  {product.tags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() =>
                        setSelectedOptions((prev) => ({
                          ...prev,
                          [product.id]: tag,
                        }))
                      }
                      className={`rounded-lg border px-3 py-1 text-xs font-bold transition ${
                        selectedOptions[product.id] === tag
                          ? "border-orange-500 bg-orange-500 text-white"
                          : "border-[#ead8ca] bg-white text-[#6f5a4e] hover:border-orange-300"
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => {
                    addToCart({
                      ...product,
                      selectedTag: selectedOptions[product.id],
                    });
                    toast.success(
                      lang === "en"
                        ? "Added to cart successfully"
                        : "تمت الإضافة للسلة",
                    );
                  }}
                  className="mt-auto inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#2f2118] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-orange-500"
                >
                  <ShoppingCart size={16} />
                  {lang === "en" ? "Add" : "أضف"}
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
