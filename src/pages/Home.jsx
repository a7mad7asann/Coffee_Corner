import Hero from "../sections/Hero";
import PopProduct from "../sections/PopularProduct";
import About from "../sections/About";
import SpecialMenu from "../sections/SpecialMenu";
// import Mques from "../sections/CTA";
// import Gallery from "../sections/Gallery";
// import Form from "../sections/Form";
// import ToastTest from "../component/ToastTest";
import Testimonials from "../sections/Testimonials";
import PromoBanners from "../sections/PromoBanners";
import Banner from "../sections/Banner";
import Categories from "../sections/Categories";
export default function Home() {
  return (
    <main className="overflow-hidden bg-[#fff8ef]">
      <Hero />
      <Categories />
      <PopProduct />
      <Banner />
      <PopProduct />
      <PromoBanners />
      <About />
      <SpecialMenu />
      <Testimonials />
      {/* <Mques /> */}
      {/* <Gallery /> */}
      {/* <Form /> */}
    </main>
  );
}
