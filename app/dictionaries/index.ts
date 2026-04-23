import localeArr from "@/types/Locales";

const dictionaries = {
    en: () => import("@/app/dictionaries/en").then((module) => module.default),
    ja: () => import("@/app/dictionaries/ja").then((module) => module.default),
};

export const getDictionary = async (locale: typeof localeArr[number]) => await dictionaries[locale]();
