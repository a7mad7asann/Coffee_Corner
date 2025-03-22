import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // ✅ تحميل السلة من localStorage عند بداية التطبيق
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart"));
    if (savedCart) {
      setCart(savedCart);
    }
  }, []);

  // ✅ حفظ السلة في localStorage عند كل تغيير
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart));
    } else {
      localStorage.removeItem("cart");
    }
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

  // ✅ زيادة العدد أو إضافة المنتج إذا لم يكن موجودًا
  function addFromCart(id, selectedTag, removeAll = false) {
    setCart((prevCart) => {
      let itemExists = false;

      const updatedCart = prevCart
        .map((item) => {
          if (item.id === id && item.selectedTag === selectedTag) {
            itemExists = true;
            return removeAll ? null : { ...item, quantity: item.quantity + 1 };
          }
          return item;
        })
        .filter(Boolean);

      if (!itemExists && !removeAll) {
        updatedCart.push({ id, selectedTag, quantity: 1 });
      }

      return updatedCart;
    });
  }

  // ✅ إزالة منتج واحد من نفس النوع أو كل الكمية
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
        .filter(Boolean)
    );
  }

  // ✅ مسح السلة بالكامل
  function clearCart() {
    setCart([]);
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, addFromCart }}>
      {children}
    </CartContext.Provider>
  );
}

// ✅ هوك لاستخدام السلة بسهولة في أي مكان بالمشروع
export function useCart() {
  return useContext(CartContext);
}
