import { useContext, useState } from "react";
import { LanguageContext } from "../context/LanguageContext";
import { useCart } from "../context/CartContext";
import { ShoppingCart } from "lucide-react";
import toast, { Toaster } from "react-hot-toast"; // ⬅️ إضافة Toaster هنا

export default function ProductCard({ product }) {
  const { lang } = useContext(LanguageContext);
  const { addFromCart } = useCart();
  const [selectedTag, setSelectedTag] = useState("");

  const handleAdd = () => {
    if (!selectedTag) {
      toast.error(lang === "en" ? "Please select a type" : "اختر النوع أولاً");
      return;
    }

    addFromCart(product.id, selectedTag);
    toast.success(
      lang === "en"
        ? "Added to cart successfully 🛒"
        : "تمت الإضافة إلى السلة بنجاح 🛒"
    );
  };

  return (
    <div
      dir={lang === "ar" ? "rtl" : "ltr"}
      className="bg-[#f7f3ef] rounded-2xl w-[285px] shadow-md p-3 relative border border-[#c8b6a6]"
    >
      {/* ✅ مؤقتًا نضيف التوستر هنا للتأكد
      <Toaster position="top-right" /> */}

      {/* تقييم */}
      <div className="absolute top-2 right-2 bg-white text-sm px-2 py-1 rounded-full flex items-center gap-1 shadow">
        <span>4.8</span>
        <span className="text-yellow-400">⭐</span>
      </div>

      {/* الصورة */}
      <img
        src={product.image}
        alt={product.name}
        className="rounded-xl w-full h-40 object-cover mb-4"
      />

      {/* الاسم والسعر */}
      <div className="flex justify-between items-center font-bold text-[16px] text-gray-800 mb-2">
        <span>{product.name}</span>
        <span>{product.price} {lang === "en" ? "$" : "ريال"}</span>
      </div>

      {/* التاجات */}
      <div className="flex flex-wrap gap-2 mb-3">
        {product.tags.map((tag, index) => (
          <button
            key={index}
            onClick={() => setSelectedTag(tag)}
            className={`px-3 py-1 rounded-full text-sm font-medium border ${
              selectedTag === tag
                ? "bg-orange-500 text-white"
                : "bg-[#e9e9e9] text-gray-700"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* زر الإضافة */}
      <button
        onClick={handleAdd}
        className="bg-orange-500 hover:bg-orange-600 transition text-white px-4 py-2 rounded-xl w-full flex items-center justify-center gap-2 font-medium"
      >
        <ShoppingCart size={18} />
        {/* {lang === "en" ? "Add to Cart" : "أضف إلى السلة"} */}
      </button>
    </div>
  );
}
