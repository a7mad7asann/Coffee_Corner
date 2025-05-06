import { useEffect, useState, useContext } from "react";
import { LanguageContext } from "../context/LanguageContext";
import ProductCard from "../component/ProductCard"; // عدّل المسار حسب مشروعك

export default function Products() {
  const { lang } = useContext(LanguageContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/products.json")
      .then((res) => res.json())
      .then((data) => setProducts(data[lang]?.products || []))
      .catch((err) => console.error("Error loading products:", err));

    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  return (
    <div className="p-6 min-h-screen bg-[#F6E8D9]"  dir={lang === "ar" ? "rtl" : "ltr"}>
      <h2 className="text-2xl font-bold mb-6">
        {lang === "en" ? "Our Coffee Products" : "منتجات القهوة"}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
