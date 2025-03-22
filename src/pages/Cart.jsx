import { useCart } from "../context/CartContext";
import { useContext, useEffect, useState } from "react";
import { LanguageContext } from "../context/LanguageContext";

export default function Cart() {
  const { cart, removeFromCart } = useCart();
  const { lang } = useContext(LanguageContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/products.json")
      .then((res) => res.json())
      .then((data) => setProducts(data[lang]?.products || []))
      .catch((error) => console.error("Error loading products:", error));

    // ✅ تحديث اتجاه الصفحة عند تغيير اللغة
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang, cart]);

  return (
    <div className="p-6" dir={lang === "ar" ? "rtl" : "ltr"}> {/* ✅ ضبط الاتجاه */}
      <h2 className="text-2xl font-bold mb-4">
        🛒 {cart.length > 0 ? (lang === "en" ? "Your Cart" : "سلة المشتريات") : (lang === "en" ? "Cart is Empty" : "السلة فارغة")}
      </h2>

      {cart.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {cart.map((cartItem, index) => {
            const product = products.find((p) => p.id === cartItem.id);
            if (!product) return null;

            return (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-4 border border-gray-200">
                <img src={product.image} alt={product.name} className="rounded-lg w-full h-36 object-cover" />
                <h3 className="mt-3 text-lg font-semibold">{product.name}</h3>
                <p className="text-gray-600">{cartItem.selectedTag}</p>
                <span className="text-xl font-bold text-gray-900">{product.price}</span>

                <div className="flex justify-between items-center mt-3">
                  <span className="text-sm text-gray-600">{lang === "en" ? "Quantity" : "الكمية"}: {cartItem.quantity}</span>
                  <button
                    onClick={() => removeFromCart(cartItem.id, cartItem.selectedTag)}
                    className="bg-red-500 text-white px-3 py-1 rounded-md"
                  >
                    {lang === "en" ? "Remove One" : "إزالة واحدة"}
                  </button>
                  <button
                    onClick={() => removeFromCart(cartItem.id, cartItem.selectedTag, true)}
                    className="bg-red-700 text-white px-3 py-1 rounded-md"
                  >
                    {lang === "en" ? "Remove All" : "إزالة الكل"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-gray-600">{lang === "en" ? "No items in the cart." : "لا توجد منتجات في السلة."}</p>
      )}
    </div>
  );
}
