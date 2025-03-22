import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // ✅ تحميل السلة من localStorage عند بداية التطبيق
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  // ✅ حفظ السلة في localStorage عند كل تغيير
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // ✅ إضافة منتج إلى السلة
  function addToCart(product) {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.id === product.id && item.selectedTag === product.selectedTag
      );

      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id && item.selectedTag === product.selectedTag
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { id: product.id, selectedTag: product.selectedTag, quantity: 1 }];
      }
    });
  }

  // ✅ إزالة منتج واحد من نفس النوع
  function removeFromCart(id, selectedTag, removeAll = false) {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.id === id && item.selectedTag === selectedTag) {
            return removeAll || item.quantity === 1
              ? null
              : { ...item, quantity: item.quantity - 1 };
          }
          return item;
        })
        .filter(Boolean) // إزالة القيم `null`
    );
  }

  // ✅ مسح السلة بالكامل
  function clearCart() {
    setCart([]);
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

// ✅ هوك لاستخدام السلة بسهولة في أي مكان بالمشروع
export function useCart() {
  return useContext(CartContext);
}
