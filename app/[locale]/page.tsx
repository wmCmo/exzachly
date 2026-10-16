import Tools from "./tools/Tools";
import { getDictionary } from "../dictionaries";
import localeArr from "@/types/Locales";
import Cube from "../components/Cube";

export default async function Home({ params }: { params: Promise<{ locale: string; }>; }) {

  const { locale } = await params;
  const typedLocale = locale as typeof localeArr[number];
  const dict = await getDictionary(typedLocale);

  return (
    <div className="">
      <section className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,480px)] items-center gap-x-10 mt-16 lg:mt-24 mb-10">
        <h1 className="text-neutral-800 dark:text-neutral-200 text-vw leading-none sm:text-8xl font-black">{dict.home.greeting}<span className="text-lime-500">{dict.home.name}</span></h1>
        <Cube dict={dict.home.cube} />
      </section>
      <Tools dict={dict.tools} locale={typedLocale} />
    </div>
  );
}
