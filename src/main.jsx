import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import App from "./App.jsx";
import { CartProvider } from "./context/CartContext"; // ✅ استيراد مزود العربة
import { AppDataProvider } from "./context/AppDataContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CartProvider>
      <AppDataProvider>
        <App />
      </AppDataProvider>
    </CartProvider>
  </React.StrictMode>,
);
