import { useState, useEffect, useContext } from "react";
import { FaShoppingCart, FaStar } from "react-icons/fa";
import { LanguageContext } from "../context/LanguageContext";
import { useCart } from "../context/CartContext";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Products() {
  const { lang } = useContext(LanguageContext);
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});

  useEffect(() => {
    fetch("/products.json")
      .then((res) => res.json())
      .then((data) => {
        const productsData = data[lang]?.products || [];
        setProducts(productsData);

        setSelectedOptions(
          productsData.reduce((acc, product) => {
            acc[product.id] = product.tags[0]; 
            return acc;
          }, {})
        );
      })
      .catch((error) => console.error("Error loading products:", error));

    // ✅ تهيئة مكتبة AOS عند تحميل الصفحة
    AOS.init({ duration: 800, delay: 100 });
  }, [lang]);

  return (
    <section className="p-6">
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold mb-4" data-aos="fade-right">
          {lang === "en" ? "Popular" : "الأكثر"}{" "}
          <span className="text-orange-500">{lang === "en" ? "Now" : "رواجًا"}</span>
        </h2>

  
        <div className="bg-yellow-800 h-full rounded-3xl px-7 py-4" data-aos="fade-left">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((product, index) => (
              <div
                key={product.id}
                className="bg-[#F8EDE3] rounded-2xl shadow-lg p-4 relative border border-gray-200"
                data-aos="zoom-in"
                data-aos-delay={index * 100} // ✅ تأخير ظهور العناصر تدريجيًا
              >
                <img src={product.image} alt={product.name} className="rounded-lg w-full object-cover" />
                <div className="absolute top-2 right-2 flex items-center bg-white text-black px-2 py-1 rounded-full text-xs">
                  <FaStar className="text-yellow-400 mr-1" /> {product.rating}
                </div>

          

                <div className="flex justify-between items-center mt-2">
                  <h3 className="mt-3 text-lg font-semibold">{product.name}</h3>

                  <span className="text-xl font-bold text-gray-900">{product.price}  { (lang === "en" ? " $ " : " ريال ") }</span>
                </div>

                <div className="flex justify-between items-center mt-2">
                  <div className="flex gap-2">
                    {product.tags.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => setSelectedOptions((prev) => ({ ...prev, [product.id]: tag }))}
                        className={`px-2 py-1 text-xs rounded-full ${
                          selectedOptions[product.id] === tag ? "bg-orange-500 text-white" : "bg-gray-200 text-gray-700"
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                  
                  <button
                    onClick={() => addToCart({ ...product, selectedTag: selectedOptions[product.id] })}
                    className="bg-orange-500 text-white p-2 rounded-full hover:bg-orange-600 transition-all"
                  >
                    <FaShoppingCart />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
