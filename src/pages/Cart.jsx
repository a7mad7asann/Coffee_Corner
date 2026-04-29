import { useCart } from "../context/CartContext";
import { useContext, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { LanguageContext } from "../context/LanguageContext";

export default function Cart() {
  const { cart, addFromCart, removeFromCart, clearCart } = useCart();
  const { lang } = useContext(LanguageContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/products.json")
      .then((res) => res.json())
      .then((data) => setProducts(data[lang]?.products || []))
      .catch((error) => console.error("Error loading products:", error));

    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  const cartItems = useMemo(
    () =>
      cart
        .map((cartItem) => {
          const product = products.find((p) => p.id === cartItem.id);
          if (!product) return null;
          const price = Number(product.price) || 0;
          return {
            ...cartItem,
            product,
            price,
            lineTotal: price * cartItem.quantity,
          };
        })
        .filter(Boolean),
    [cart, products]
  );

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cartItems.reduce((acc, item) => acc + item.lineTotal, 0);
  const delivery = subtotal > 0 ? 5 : 0;
  const totalPrice = subtotal + delivery;
  const currency = lang === "en" ? "$" : "ريال";

  const handleCheckout = () => {
    if (cartItems.length === 0) return;

    let message = lang === "en" ? "Order Details:\n" : "تفاصيل الطلب:\n";

    cartItems.forEach((item, index) => {
      message += `${index + 1}- ${item.product.name} (${item.selectedTag}) - ${item.quantity}x - ${item.lineTotal.toFixed(2)} ${currency}\n`;
    });

    message += lang === "en"
      ? `\nSubtotal: ${subtotal.toFixed(2)} ${currency}\nDelivery: ${delivery.toFixed(2)} ${currency}\nTotal: ${totalPrice.toFixed(2)} ${currency}`
      : `\nالمجموع: ${subtotal.toFixed(2)} ${currency}\nالتوصيل: ${delivery.toFixed(2)} ${currency}\nالإجمالي: ${totalPrice.toFixed(2)} ${currency}`;

    const phoneNumber = "201061380485";
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, "_blank");
  };

  return (
    <main className="min-h-screen bg-white pt-24" dir={lang === "ar" ? "rtl" : "ltr"}>
      <section className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-lg bg-[#2f2118] px-6 py-10 text-white md:px-10">
          <div className="absolute inset-y-0 end-0 hidden w-1/2 bg-[url('/images/banner.png')] bg-contain bg-right bg-no-repeat opacity-35 md:block" />
          <div className="relative max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-lg bg-white/15 px-3 py-1 text-sm font-bold text-orange-100">
              <ShoppingBag size={16} />
              {lang === "en" ? "Checkout" : "إتمام الطلب"}
            </span>
            <h1 className="mt-4 text-4xl font-extrabold md:text-5xl">
              {cartItems.length > 0
                ? lang === "en" ? "Your cart is ready" : "سلتك جاهزة"
                : lang === "en" ? "Your cart is empty" : "السلة فارغة"}
            </h1>
            <p className="mt-4 max-w-xl text-white/75">
              {lang === "en"
                ? "Review products, quantities, and payment details before sending your order."
                : "راجع المنتجات والكميات وتفاصيل الدفع قبل إرسال الطلب."}
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-7xl gap-6 px-4 pb-14 sm:px-6 lg:grid-cols-[1fr_380px] lg:px-8">
        <div className="space-y-4">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <article
                key={`${item.id}-${item.selectedTag}`}
                className="grid gap-4 rounded-lg border border-[#eadfd6] bg-white p-4 shadow-sm md:grid-cols-[140px_1fr_auto]"
              >
                <div className="flex h-36 items-center justify-center rounded-lg bg-[#fff7ef]">
                  <img src={item.product.image} alt={item.product.name} className="h-28 w-full object-contain" />
                </div>

                <div className="flex flex-col justify-center">
                  <p className="text-sm font-semibold text-orange-500">{item.selectedTag}</p>
                  <h2 className="mt-1 text-xl font-bold text-[#2f2118]">{item.product.name}</h2>
                  <p className="mt-2 text-sm text-gray-500">
                    {lang === "en" ? "Unit price" : "سعر الوحدة"}: {item.price.toFixed(2)} {currency}
                  </p>

                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    <button
                      onClick={() => removeFromCart(item.id, item.selectedTag)}
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#eadfd6] text-[#2f2118] transition hover:border-orange-400 hover:text-orange-500"
                      aria-label={lang === "en" ? "Decrease quantity" : "تقليل الكمية"}
                    >
                      <Minus size={16} />
                    </button>
                    <span className="flex h-9 min-w-12 items-center justify-center rounded-lg bg-[#fff7ef] px-3 font-bold text-[#2f2118]">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => addFromCart(item.id, item.selectedTag)}
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#eadfd6] text-[#2f2118] transition hover:border-orange-400 hover:text-orange-500"
                      aria-label={lang === "en" ? "Increase quantity" : "زيادة الكمية"}
                    >
                      <Plus size={16} />
                    </button>
                    <button
                      onClick={() => removeFromCart(item.id, item.selectedTag, true)}
                      className="ms-2 flex h-9 w-9 items-center justify-center rounded-lg border border-red-100 text-red-500 transition hover:bg-red-50"
                      aria-label={lang === "en" ? "Remove product" : "حذف المنتج"}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-[#eadfd6] pt-4 md:block md:border-0 md:pt-0 md:text-end">
                  <p className="text-sm font-semibold text-gray-500">{lang === "en" ? "Total" : "الإجمالي"}</p>
                  <p className="mt-1 text-2xl font-extrabold text-[#2f2118]">
                    {item.lineTotal.toFixed(2)} {currency}
                  </p>
                </div>
              </article>
            ))
          ) : (
            <div className="rounded-lg border border-dashed border-[#eadfd6] bg-[#fff7ef] p-8 text-center">
              <p className="text-lg font-semibold text-[#2f2118]">
                {lang === "en" ? "No items in the cart." : "لا توجد منتجات في السلة."}
              </p>
              <Link
                to="/products"
                className="mt-5 inline-flex rounded-lg bg-orange-500 px-5 py-3 font-semibold text-white transition hover:bg-orange-600"
              >
                {lang === "en" ? "Browse Products" : "تصفح المنتجات"}
              </Link>
            </div>
          )}
        </div>

        <aside className="h-fit rounded-lg border border-[#eadfd6] bg-white p-5 shadow-sm lg:sticky lg:top-28">
          <h2 className="text-xl font-extrabold text-[#2f2118]">
            {lang === "en" ? "Payment Details" : "تفاصيل الدفع"}
          </h2>

          <div className="mt-5 space-y-3 text-sm">
            <div className="flex justify-between gap-4">
              <span className="text-gray-500">{lang === "en" ? "Products" : "المنتجات"}</span>
              <span className="font-semibold">{totalItems}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-gray-500">{lang === "en" ? "Subtotal" : "المجموع"}</span>
              <span className="font-semibold">{subtotal.toFixed(2)} {currency}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-gray-500">{lang === "en" ? "Delivery" : "التوصيل"}</span>
              <span className="font-semibold">{delivery.toFixed(2)} {currency}</span>
            </div>
          </div>

          <div className="my-5 border-t border-[#eadfd6]" />

          <div className="flex justify-between gap-4 text-lg font-extrabold text-[#2f2118]">
            <span>{lang === "en" ? "Total Price" : "السعر النهائي"}</span>
            <span>{totalPrice.toFixed(2)} {currency}</span>
          </div>

          <button
            onClick={handleCheckout}
            disabled={cartItems.length === 0}
            className="mt-5 w-full rounded-lg bg-[#2f2118] px-5 py-3 font-semibold text-white transition hover:bg-orange-500 disabled:cursor-not-allowed disabled:bg-gray-300"
          >
            {lang === "en" ? "Complete via WhatsApp" : "إكمال عبر واتساب"}
          </button>

          {cartItems.length > 0 && (
            <button
              onClick={clearCart}
              className="mt-3 w-full rounded-lg border border-[#eadfd6] px-5 py-3 font-semibold text-[#2f2118] transition hover:border-red-200 hover:bg-red-50 hover:text-red-500"
            >
              {lang === "en" ? "Clear Cart" : "تفريغ السلة"}
            </button>
          )}
        </aside>
      </section>
    </main>
  );
}
