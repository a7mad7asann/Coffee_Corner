import { useContext, useEffect, useState } from "react";
import { LanguageContext } from "../context/LanguageContext";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import logo from "/logo.svg";

export default function Navbar() {
  const { lang, setLang } = useContext(LanguageContext);
  const { cart } = useCart();
  const [content, setContent] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // تحميل بيانات الـ Navbar
  useEffect(() => {
    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => setContent(data.navbar[lang]))
      .catch((error) => console.error("Error loading navbar data:", error));
  }, [lang]);

  // متابعة التمرير
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // تحديث عدد المنتجات في العربة
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  if (!content) return null;

  return (
    <nav dir={lang === "ar" ? "rtl" : "ltr"}
      className={`fixed w-full top-0 z-50 bg-white/95 backdrop-blur transition-all duration-300 ${
        isScrolled ? "shadow-md" : ""
      }`}
    >
      <div className="mx-auto flex w-full max-w-7xl justify-between items-center h-20 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex-shrink-0">
          <img src={logo} alt="Logo" className="w-28 md:w-32 h-auto" />
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex gap-8 text-base font-medium text-black">
          <li>
            <Link to="/" className="transition duration-300 hover:text-orange-500">
              {content.home}
            </Link>
          </li>
          <li>
            <Link to="/about" className="transition duration-300 hover:text-orange-500">
              {content.about}
            </Link>
          </li>
          <li>
            <Link to="/products" className="transition duration-300 hover:text-orange-500">
              {content.products}
            </Link>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsMenuOpen(true)} 
          className="md:hidden text-2xl text-black p-2"
        >
          <FaBars />
        </button>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          {/* Cart Icon */}
          <Link to="/cart" className="relative p-2 transition duration-300 hover:text-orange-500">
            <FaShoppingCart size={22} className="text-black" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Language Toggle Button */}
          <button
            onClick={() => setLang(lang === "ar" ? "en" : "ar")}
            className="rounded-lg border-2 border-black px-3 py-1.5 text-sm font-bold text-black transition-all duration-300 hover:bg-black hover:text-white"
          >
            {lang === "ar" ? "EN" : "عربي"}
          </button>
        </div>
      </div>

      {/* Mobile Sidebar Menu */}
      <div
        className={`fixed top-0 ${lang === "ar" ? "left-0" : "right-0"} h-screen w-72 bg-white shadow-2xl transition-transform duration-300 z-40 ${
          isMenuOpen ? "translate-x-0" : (lang === "ar" ? "-translate-x-full" : "translate-x-full")
        }`}
      >
        <button
          onClick={() => setIsMenuOpen(false)}
          className="absolute top-6 right-6 text-2xl text-black p-2 hover:text-orange-500 transition"
        >
          <FaTimes />
        </button>

        <ul className="flex flex-col items-center gap-8 mt-24 text-lg font-medium text-black">
          <li>
            <Link 
              to="/" 
              onClick={() => setIsMenuOpen(false)} 
              className="transition duration-300 hover:text-orange-500"
            >
              {content.home}
            </Link>
          </li>
          <li>
            <Link 
              to="/about" 
              onClick={() => setIsMenuOpen(false)} 
              className="transition duration-300 hover:text-orange-500"
            >
              {content.about}
            </Link>
          </li>
          <li>
            <Link 
              to="/products" 
              onClick={() => setIsMenuOpen(false)} 
              className="transition duration-300 hover:text-orange-500"
            >
              {content.products}
            </Link>
          </li>
        </ul>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </nav>
  );
}