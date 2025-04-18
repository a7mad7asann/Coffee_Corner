import Hero from "../sections/Hero";
import PopProduct from "../sections/PopularProduct";
import About from "../sections/About";
import SpecialMenu from "../sections/SpecialMenu";
import Mques from "../sections/CTA";
import Gallery from "../sections/Gallery";
import Form from "../sections/Form";
import ToastTest from "../component/ToastTest";

export default function Home() {
  return (
    <>
      <div className="overflow-hidden ">

        <Hero />
        <PopProduct />
        <About />
        <SpecialMenu />
        {/* <Mques /> */}
        {/* <Gallery /> */}
        {/* <Form /> */}
      </div>
       
    </>
  );
}
