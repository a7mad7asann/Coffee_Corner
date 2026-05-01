/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import { ShoppingCart } from "lucide-react";
import toast from "react-hot-toast";
import { LanguageContext } from "../context/LanguageContext";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { lang } = useContext(LanguageContext);
  const { addFromCart } = useCart();
  const [selectedTag, setSelectedTag] = useState("");

  const handleAdd = () => {
    if (!selectedTag) {
      toast.error(lang === "en" ? "Please select a type" : "اختر النوع أولا");
      return;
    }

    addFromCart(product.id, selectedTag);
    toast.success(
      lang === "en" ? "Added to cart successfully" : "تمت الإضافة للسلة",
    );
  };

  return (
    <div
      dir={lang === "ar" ? "rtl" : "ltr"}
      className="group relative flex h-full min-h-[390px] flex-col overflow-hidden rounded-lg border border-[#eadfd6] bg-white p-3 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="absolute right-5 top-5 z-10 flex items-center gap-1 rounded-lg bg-white/95 px-2 py-1 text-sm font-semibold shadow">
        <span>{product.rating || "4.8"}</span>
        <span className="text-yellow-400" aria-hidden="true">★</span>
      </div>

      <div className="mb-4 flex h-48 items-center justify-center rounded-lg bg-[#fff7ef]">
        <img
          src={product.image}
          alt={product.name}
          width="160"
          height="160"
          loading="lazy"
          decoding="async"
          className="h-40 w-full object-contain transition duration-300 group-hover:scale-105"
        />
      </div>

      <div className="mb-3 flex items-start justify-between gap-3 text-gray-900">
        <div>
          <p className="text-sm font-medium text-orange-500">
            {lang === "en" ? "Coffee" : "قهوة"}
          </p>
          <h3 className="mt-1 text-lg font-bold leading-tight">
            {product.name}
          </h3>
        </div>
        <span className="whitespace-nowrap text-lg font-extrabold text-[#2f2118]">
          {product.price} {lang === "en" ? "$" : "ريال"}
        </span>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {product.tags.map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={`rounded-lg border px-3 py-1 text-sm font-semibold transition ${
              selectedTag === tag
                ? "border-orange-500 bg-orange-500 text-white"
                : "border-[#eadfd6] bg-white text-gray-700 hover:border-orange-300"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      <button
        onClick={handleAdd}
        className="mt-auto flex w-full items-center justify-center gap-2 rounded-lg bg-[#2f2118] px-4 py-3 font-semibold text-white transition hover:bg-orange-500"
      >
        <ShoppingCart size={18} />
        {lang === "en" ? "Add to Cart" : "أضف للسلة"}
      </button>
    </div>
  );
}
