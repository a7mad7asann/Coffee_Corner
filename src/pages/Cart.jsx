import { useCart } from "../context/CartContext";
import { useContext, useEffect, useState } from "react";
import { LanguageContext } from "../context/LanguageContext";
import { useNavigate } from "react-router-dom"; // ✅ استبدال useRouter() بـ useNavigate()

export default function Cart() {
  const { cart, addFromCart, removeFromCart, clearCart } = useCart();
  const { lang } = useContext(LanguageContext);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate(); // ✅ استبدال useRouter() بـ useNavigate()

  useEffect(() => {
    fetch("/products.json")
      .then((res) => res.json())
      .then((data) => setProducts(data[lang]?.products || []))
      .catch((error) => console.error("Error loading products:", error));

    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang, cart]);

  // ✅ حساب إجمالي السعر
  const totalPrice = cart.reduce((acc, cartItem) => {
    const product = products.find((p) => p.id === cartItem.id);
    return product ? acc + product.price * cartItem.quantity : acc;
  }, 0);

  // ✅ دالة إرسال الطلب عبر واتساب
  const handleCheckout = () => {
    if (cart.length === 0) return; // تجنب إرسال طلب فارغ

    let message = lang === "en" ? "🛒 Order Details:\n" : "🛒 تفاصيل الطلب:\n";
    
    cart.forEach((item, index) => {
      const product = products.find((p) => p.id === item.id);
      if (!product) return;
      
      message += `${index + 1}- ${product.name} (${item.selectedTag}) - ${item.quantity}x\n`;
    });

    message += lang === "en" ? `\nTotal Price: $${totalPrice.toFixed(2)}` : `\nإجمالي السعر: ${totalPrice.toFixed(2)} ريال`;
    message += lang === "en" ? `\nTotal items: ${cart.length}` : `\nإجمالي المنتجات: ${cart.length}`;

    // ✅ رقم الهاتف الذي سيتم إرسال الطلب إليه (غيّره برقمك)
    const phoneNumber = "201061380485"; // أدخل رقم واتساب بدون "+"
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    // فتح واتساب
    window.open(whatsappURL, "_blank");
  };

  return (
    <div className="p-6" dir={lang === "ar" ? "rtl" : "ltr"}>
      <h2 className="text-2xl font-bold mb-4">
        🛒 {cart.length > 0 ? (lang === "en" ? "Your Cart" : "سلة المشتريات") : (lang === "en" ? "Cart is Empty" : "السلة فارغة")}
      </h2>

      {cart.length > 0 ? (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {cart.map((cartItem, index) => {
              const product = products.find((p) => p.id === cartItem.id);
              if (!product) return null;

              return (
                <div key={index} className="bg-white rounded-2xl shadow-lg p-4 border border-gray-200">
                  <img src={product.image} alt={product.name} className="rounded-lg w-full h-40 object-cover" />
                  <h3 className="mt-3 text-lg font-semibold">{product.name}</h3>

                  <div className="flex justify-between items-center mt-2"> 
                    <p className="font-medium text-orange-500">{cartItem.selectedTag}</p>
                    <span className="text-l font-medium text-gray-500">{product.price}  { (lang === "en" ? " $ " : " ريال ") } </span>
                  </div>

                  <div className="flex justify-evenly items-center mt-3">
                    <span className="text-sm text-gray-600">
                      {lang === "en" ? "Quantity" : "الكمية"}: {cartItem.quantity}
                    </span>

                    <button
                      onClick={() => addFromCart(cartItem.id, cartItem.selectedTag, false)}
                      className="bg-yellow-900 text-white px-2 py-1 rounded-md"
                    >
                      {lang === "en" ? "Add One" : "إضافة واحدة"}
                    </button>

                    <button
                      onClick={() => removeFromCart(cartItem.id, cartItem.selectedTag)}
                      className="bg-yellow-500 text-white px-2 py-1 rounded-md"
                    >
                      {lang === "en" ? "Remove One" : "إزالة واحدة"}
                    </button>

                    <button
                      onClick={() => removeFromCart(cartItem.id, cartItem.selectedTag, true)}
                      className="bg-red-500 text-white px-2 py-1 rounded-md"
                    >
                      {lang === "en" ? "Remove All" : "إزالة الكل"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ✅ عرض إجمالي السعر */}
          <div className="mt-6 text-lg font-semibold">
            {lang === "en" ? `Total Price: $${totalPrice.toFixed(2)}` : `إجمالي السعر: ${totalPrice.toFixed(2)} ريال`}
          </div>
          <div className="flex justify-start gap-2 items-center ">
          {/* ✅ زر العودة للصفحة الرئيسية */}
            <button
              onClick={() => navigate("/")}
              className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
            >
              {lang === "en" ? "Back to Home" : "العودة للصفحة الرئيسية"}
            </button>

            {/* ✅ زر إكمال الدفع عبر واتساب */}
            <button
              onClick={handleCheckout}
              className="bg-green-500 text-white px-4 py-2 rounded-md mt-4 "
            >
              {lang === "en" ? "Complete Purchase via WhatsApp" : "إكمال الشراء عبر واتساب"}
            </button>
          </div>
        </div>
      ) : (
        <p className="text-gray-600">{lang === "en" ? "No items in the cart." : "لا توجد منتجات في السلة."}</p>
      )}
    </div>
  );
}
