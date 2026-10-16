const localeArr = ["en", "ja"] as const;

export type Locale = typeof localeArr[number];

export const isLocale = (value: string): value is Locale => (localeArr as readonly string[]).includes(value);

export default localeArr;
