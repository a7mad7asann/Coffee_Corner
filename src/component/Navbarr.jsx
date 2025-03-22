import { useContext, useEffect, useState } from "react";
import { LanguageContext } from "../context/LanguageContext";
import { Link } from "react-router-dom";
import { FaSearch, FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const { lang, setLang } = useContext(LanguageContext);
  const [content, setContent] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // تحميل بيانات الـ Navbar
  useEffect(() => {
    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => setContent(data.navbar[lang]))
      .catch((error) => console.error("Error loading navbar data:", error));
  }, [lang]);

  // تحميل المنتجات
  useEffect(() => {
    fetch("/products.json")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => console.error("Error loading products:", error));
  }, []);

  // متابعة التمرير
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  // تحديث عدد المنتجات في العربة عند التغيير في LocalStorage
  useEffect(() => {
    const updateCartCount = () => {
      const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
      setCartCount(cartItems.length);
    };

    updateCartCount();

    window.addEventListener("storage", updateCartCount);
    return () => window.removeEventListener("storage", updateCartCount);
  }, []);

  if (!content) return <p>Loading...</p>;

  return (
    <nav
      className={`fixed w-full top-0 z-50 bg-[#F6E8D9] py-4 transition-all duration-300 ${
        isScrolled ? "shadow-md" : ""
      }`}
    >
      <div className="container mx-auto flex justify-between items-center px-4 md:px-6">
        {/* Logo */}
        <Link to="/">
          <img src={content.logo} alt="Logo" className="w-28 md:w-32 h-auto" />
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex gap-6 text-lg font-medium text-black">
          <li>
            <Link to="/" className="duration-300 hover:text-orange-500">
              {content.home}
            </Link>
          </li>

          <li>
            <Link to="/about" className="duration-300 hover:text-orange-500">
              {content.about}
            </Link>
          </li>
          <li>
            <Link to="/gallery" className="duration-300 hover:text-orange-500">
              {content.products}
            </Link>
          </li>
          <li>
            <Link to="/partners" className="duration-300 hover:text-orange-500">
              {content.delivery}
            </Link>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button onClick={() => setIsMenuOpen(true)} className="md:hidden text-2xl">
          <FaBars />
        </button>

        {/* Sidebar Menu for Mobile */}
        <div
          className={`fixed top-0 right-0 h-full w-64 bg-[#F6E8D9] shadow-lg transition-transform duration-300 ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <button
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-4 right-4 text-2xl"
          >
            <FaTimes />
          </button>
          <ul className="flex flex-col items-center mt-16 space-y-6 text-lg font-medium text-black">
            <li>
              <Link to="/about" onClick={() => setIsMenuOpen(false)} className="hover:text-orange-500">
                {content.about}
              </Link>
            </li>
            <li>
              <Link to="/gallery" onClick={() => setIsMenuOpen(false)} className="hover:text-orange-500">
                {content.products}
              </Link>
            </li>
            <li>
              <Link to="/partners" onClick={() => setIsMenuOpen(false)} className="hover:text-orange-500">
                {content.delivery}
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex items-center gap-3 relative">
          {/* Cart Icon */}
          <Link to="/cart" className="relative">
            <FaShoppingCart
              size={22}
              className="text-black duration-300 hover:text-orange-500"
            />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Language Toggle Button */}
          <button
            onClick={() => setLang(lang === "ar" ? "en" : "ar")}
            className="px-3 py-1 border border-black rounded-md text-black duration-300 hover:bg-black hover:text-white transition-all"
          >
            {lang === "ar" ? "EN" : "عربي"}
          </button>
        </div>
      </div>
    </nav>
  );
}
