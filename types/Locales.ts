const localeArr = ["en", "ja"] as const;

export default localeArr;
export type Locale = typeof localeArr[number];