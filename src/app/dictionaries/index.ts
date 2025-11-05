export type Locale = "en" | "ja";

// Dynamically import only the requested locale to keep bundles lean
export async function getDictionary(locale: Locale) {
    const dict = (await import(`./${locale}`)).default;
    return dict;
}