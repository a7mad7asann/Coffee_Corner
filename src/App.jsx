import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { LanguageProvider } from "./context/LanguageContext";
import { useAppData } from "./context/AppDataContext";
import CoffeeLoader from "./component/CoffeeLoader.jsx";
import Nav from "./component/Navbarr";
import Footer from "./component/Footer";
import { Toaster } from "react-hot-toast";

// Lazy load pages and sections
const Home = lazy(() => import("./pages/Home.jsx"));
const Cart = lazy(() => import("./pages/Cart.jsx"));
const Products = lazy(() => import("./pages/Products.jsx"));
const About = lazy(() => import("./sections/About"));
const Mques = lazy(() => import("./sections/CTA"));
const Form = lazy(() => import("./sections/Form"));
const Prtner = lazy(() => import("./sections/PopularProduct.jsx"));

const PageLoader = () => (
  <div className="flex h-screen items-center justify-center">
    <div className="h-2 w-16 animate-pulse bg-orange-500 rounded" />
  </div>
);

function App() {
  const { loading } = useAppData();

  return (
    <LanguageProvider>
      <Router>
        <CoffeeLoader loading={loading} />
        {!loading && <Nav />}

        <Toaster position="top-center" />

        {!loading && (
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/about" element={<About />} />
              <Route path="/cta" element={<Mques />} />
              <Route path="/products" element={<Products />} />
              <Route path="/form" element={<Form />} />
              <Route path="/partners" element={<Prtner />} />
            </Routes>
          </Suspense>
        )}

        {!loading && <Footer />}
      </Router>
    </LanguageProvider>
  );
}

export default App;
