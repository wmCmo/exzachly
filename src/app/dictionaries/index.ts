import en from "./en";
import ja from "./ja";

export const dictionaries = {
    en,
    ja
};

export async function getDictionary(locale: "en" | "ja") {
    return dictionaries[locale];
}