import { useState, useEffect, useContext } from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { LanguageContext } from "../context/LanguageContext";

export default function Footer() {
  const { lang } = useContext(LanguageContext);
  const [footer, setFooter] = useState(null);
  const [links, setLinks] = useState([]);

  useEffect(() => {
    fetch(`${window.location.origin}/data.json`)
      .then((res) => res.json())
      .then((data) => {
        setFooter(data.footer[lang]);
        setLinks(data.links?.[lang] || []);
      })
      .catch((err) => console.error("Error loading JSON:", err));
  }, [lang]);

  if (!footer) return <p className="text-center text-gray-500">جار التحميل...</p>;

  return (
    <footer
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
      className="bg-[#f7f3ef] text-gray-800 pt-12 pb-8 px-6"
    >
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* الشركة */}
        <div className="p-6 flex flex-col items-start" data-aos="fade-up">
          <h2 className="text-2xl font-bold text-orange-500">{footer.company}</h2>
          <p className="mt-2 text-gray-600">{footer.slogan}</p>
        </div>

        {/* معلومات التواصل */}
        <div className="p-6 flex flex-col items-start" data-aos="fade-up">
          <h3 className="text-xl font-semibold text-orange-500 mb-2">
            {lang === "en" ? "Contact Us" : "تواصل معنا"}
          </h3>
          <div className="text-gray-600 space-y-2 text-sm">
            <p>📞 {footer.contact.phone.join(" | ")}</p>
            <p>✉ {footer.contact.email}</p>
            <p>📍 {footer.contact.address}</p>
          </div>
        </div>

        {/* روابط مهمة */}
        <div className=" p-6 flex flex-col items-center text-center" data-aos="fade-up">
          <h3 className="text-xl font-semibold text-orange-500 mb-3">
            {lang === "en" ? "Useful Links" : "روابط مهمة"}
          </h3>
          {links.length > 0 ? (
            <ul className="space-y-2 text-gray-700 text-sm">
              {links.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.url}
                    className="font-normal hover:font-semibold duration-500 hover:text-orange-500 transition-all ease-in-out"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400 text-sm">
              {lang === 'en' ? 'No links available' : 'لا توجد روابط متاحة'}
            </p>
          )}
        </div>
      </div>

      {/* سوشيال ميديا وحقوق النشر */}
      <div className=" text-center border-t-2 pt-2" data-aos="fade-up">
        <p className="text-gray-700 mb-3">{footer.follow}</p>
        <div className="flex justify-center gap-4 text-xl text-gray-500 mb-4">
          <a href={footer.social.facebook} className="hover:text-blue-500 transition">
            <FaFacebookF />
          </a>
          <a href={footer.social.twitter} className="hover:text-sky-400 transition">
            <FaTwitter />
          </a>
          <a href={footer.social.instagram} className="hover:text-pink-500 transition">
            <FaInstagram />
          </a>
          <a href={footer.social.linkedin} className="hover:text-blue-700 transition">
            <FaLinkedinIn />
          </a>
        </div>
        <p className="text-gray-400 text-sm">{footer.copyright}</p>
      </div>
    </footer>
  );
}
