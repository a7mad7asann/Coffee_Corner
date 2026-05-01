import { useContext } from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { LanguageContext } from "../context/LanguageContext";
import { useAppData } from "../context/AppDataContext";

export default function Footer() {
  const { lang } = useContext(LanguageContext);
  const { data } = useAppData();
  const footer = data?.footer?.[lang] || null;
  const links = data?.links?.[lang] || [];

  if (!footer) return null;

  const socialLinks = [
    { icon: FaFacebookF, href: footer.social.facebook, label: "Facebook" },
    { icon: FaTwitter, href: footer.social.twitter, label: "Twitter" },
    { icon: FaInstagram, href: footer.social.instagram, label: "Instagram" },
    { icon: FaLinkedinIn, href: footer.social.linkedin, label: "LinkedIn" },
  ];

  return (
    <footer
      dir={lang === "ar" ? "rtl" : "ltr"}
      className="bg-[#fff8ef] pt-10 text-[#2f2118]"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-lg bg-[#2f2118] p-6 text-white shadow-xl md:p-8">
          <div className="absolute end-0 top-0 h-full w-1/2 bg-[url('/images/bg_img_hero.svg')] bg-cover bg-center opacity-10" />
          <div className="relative z-10 flex flex-col justify-between gap-6 md:flex-row md:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-orange-300">
                {lang === "en" ? "Ready for coffee?" : "جاهز للقهوة؟"}
              </p>
              <h2 className="mt-2 max-w-2xl text-3xl font-black leading-tight md:text-4xl">
                {lang === "en"
                  ? "Order your favorite cup now"
                  : "اطلب كوبك المفضل الآن"}
              </h2>
            </div>
            <Link
              to="/products"
              className="inline-flex w-fit items-center gap-2 rounded-lg bg-orange-500 px-6 py-3 font-bold text-white transition hover:bg-orange-600"
            >
              {lang === "en" ? "Browse Menu" : "تصفح القائمة"}
              <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>

        <div className="grid gap-6 py-10 md:grid-cols-[1.1fr_0.8fr_1fr]">
          <div className="rounded-lg border border-[#ead8ca] bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-black text-orange-500">
              {footer.company}
            </h2>
            <p className="mt-3 max-w-sm leading-7 text-[#6f5a4e]">
              {footer.slogan}
            </p>

            <div className="mt-6 flex gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#fff1e5] text-[#2f2118] transition hover:bg-orange-500 hover:text-white duration-300"
                  >
                    <Icon />
                  </a>
                );
              })}
            </div>
          </div>

          <div className="rounded-lg border border-[#ead8ca] bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-black">
              {lang === "en" ? "Useful Links" : "روابط مهمة"}
            </h3>
            <ul className="space-y-3 text-sm">
              {links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.url || "#"}
                    className="inline-flex items-center gap-2 text-[#6f5a4e] transition hover:text-orange-500"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-orange-400" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-lg border border-[#ead8ca] bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-black">
              {lang === "en" ? "Contact Us" : "تواصل معنا"}
            </h3>
            <div className="space-y-4 text-sm text-[#6f5a4e]">
              <p className="flex items-start gap-3">
                <Phone size={18} className="mt-0.5 shrink-0 text-orange-500" />
                <span>{footer.contact.phone.join(" | ")}</span>
              </p>
              <p className="flex items-start gap-3">
                <Mail size={18} className="mt-0.5 shrink-0 text-orange-500" />
                <span>{footer.contact.email}</span>
              </p>
              <p className="flex items-start gap-3">
                <MapPin size={18} className="mt-0.5 shrink-0 text-orange-500" />
                <span>{footer.contact.address}</span>
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-3 border-t border-[#ead8ca] py-5 text-sm text-[#6f5a4e] md:flex-row md:items-center">
          <p>{footer.copyright}</p>
          <p>{footer.follow}</p>
        </div>
      </div>
    </footer>
  );
}
