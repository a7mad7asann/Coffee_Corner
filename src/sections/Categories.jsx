import { useContext } from "react";
import { CakeSlice, Coffee, CupSoda, Flame, Snowflake } from "lucide-react";
import { LanguageContext } from "../context/LanguageContext";

const categories = [
  {
    icon: Coffee,
    en: "Espresso",
    ar: "إسبريسو",
    noteEn: "Bold shots",
    noteAr: "جرعات مركزة",
  },
  {
    icon: CupSoda,
    en: "Latte",
    ar: "لاتيه",
    noteEn: "Creamy blends",
    noteAr: "خلطات كريمية",
  },
  {
    icon: Flame,
    en: "Hot Coffee",
    ar: "قهوة ساخنة",
    noteEn: "Fresh brewed",
    noteAr: "تحضير طازج",
  },
  {
    icon: Snowflake,
    en: "Cold Coffee",
    ar: "قهوة باردة",
    noteEn: "Iced favorites",
    noteAr: "اختيارات مثلجة",
  },
  {
    icon: CakeSlice,
    en: "Desserts",
    ar: "حلويات",
    noteEn: "Sweet pairings",
    noteAr: "رفيق القهوة",
  },
];

export default function Categories() {
  const { lang } = useContext(LanguageContext);

  return (
    <section className="bg-[#fff8ef] py-10" dir={lang === "ar" ? "rtl" : "ltr"}>
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-orange-500">
              {lang === "en" ? "Categories" : "التصنيفات"}
            </p>
            <h2 className="mt-2 text-2xl font-bold text-[#2f2118] md:text-3xl">
              {lang === "en" ? "Choose your mood" : "اختار مزاجك"}
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.en}
                className="group flex min-h-32 flex-col items-start justify-between rounded-lg border border-[#eadfd6] bg-white p-4 text-start shadow-sm transition hover:-translate-y-1 hover:border-orange-300 hover:shadow-md"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#fff3e9] text-orange-500 transition group-hover:bg-orange-500 group-hover:text-white">
                  <Icon size={22} />
                </span>
                <span>
                  <span className="block text-base font-bold text-[#2f2118]">
                    {lang === "en" ? category.en : category.ar}
                  </span>
                  <span className="mt-1 block text-sm text-gray-500">
                    {lang === "en" ? category.noteEn : category.noteAr}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
