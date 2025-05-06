import { useState, useEffect, useContext } from "react";
import { LanguageContext } from "../context/LanguageContext";
import { useCart } from "../context/CartContext";
import AOS from "aos";
import "aos/dist/aos.css";
import ProductCard from "../component/ProductCard";

export default function Products() {
  const { lang } = useContext(LanguageContext);
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/products.json")
      .then((res) => res.json())
      .then((data) => {
        const productsData = (data[lang]?.products || []).slice(0, 4);
        setProducts(productsData);
      })
      .catch((error) => console.error("Error loading products:", error));

    AOS.init({ duration: 800, delay: 100 });
  }, [lang]);

  return (
    <section className="px-4 md:px-6 lg:px-12 py-6">
      <div className="container mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-6" data-aos="fade-right">
          {lang === "en" ? "Popular" : "الأكثر"}{" "}
          <span className="text-orange-500">{lang === "en" ? "Now" : "رواجًا"}</span>
        </h2>

        <div className="bg-yellow-800 rounded-3xl px-4 md:px-7 py-6" data-aos="fade-left">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <div key={product.id} data-aos="zoom-in" data-aos-delay={index * 100}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
