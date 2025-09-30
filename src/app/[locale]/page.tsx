import Tools from "./tools/Tools";
import { getDictionary } from "../dictionaries";
import { locales } from "@/middleware";


export default async function Home({ params }: { params: Promise<{ locale: string; }>; }) {

  const { locale } = await params as {locale: locales};

  const dict = await getDictionary(locale as "en" | "ja");

  return (
    <div className="">
      <h1 className="text-neutral-800 dark:text-neutral-200 mt-32 mb-10 text-vw leading-none sm:text-8xl font-black">{dict.home.greeting}<span className="text-lime-500">{dict.home.name}</span></h1>
      <Tools dict={dict.tools} locale={locale}/>
    </div>
  );
}
