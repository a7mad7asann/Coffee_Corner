import { useState, useEffect } from "react";
import BuildingLoader from "./component/BuildingLoader.jsx"; 
import {  BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext";
import Nav from "./component/Navbarr";
import Home from "./pages/Home.jsx";
import Cart from "./pages/Cart.jsx"
import About from "./sections/About";
import Mques from "./sections/CTA";
import Products from "./pages/Products.jsx";
import Form from "./sections/Form";
import Prtner from "./sections/PopularProduct.jsx";
import Footer from "./component/Footer";

function App() {
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 2000); // مدة الانتظار (2 ثانية)
  // }, []);

  return (
    // <LanguageProvider>
    //   <Router>
    //     <BuildingLoader loading={loading} />
    //     {!loading && (
    //       <>
    //         <Nav />
    //         <Hero />
    //         <Prtner />
    //         <About />
    //         <Mques />
    //         <Gallery />
    //         <Form />
    //         <Footer />
    //       </>
    //     )}
    //   </Router>
    // </LanguageProvider>
    
    <LanguageProvider>
      <Router>
        <Nav />
        
        <Routes>
          <Route path="/"         element={<Home    />} />
          <Route path="/cart"     element={<Cart    />} />
          <Route path="/about"    element={<About   />} />
          <Route path="/cta"      element={<Mques   />} />
          <Route path="/Products"  element={<Products />} />
          <Route path="/form"     element={<Form    />} />
          <Route path="/partners" element={<Prtner  />} />
        </Routes>

        {/* <Footer /> */}
      </Router>
    </LanguageProvider>
  );
}

export default App;
