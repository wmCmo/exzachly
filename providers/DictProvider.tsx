'use client';

import en, { DictionaryType } from "@/app/dictionaries/en";
import ja from "@/app/dictionaries/ja";
import localeArr from "@/types/Locales";
import { createContext, useMemo } from "react";

const dictionaries: Record<typeof localeArr[number], DictionaryType> = { en, ja };

export const DictContext = createContext<{ dict: DictionaryType; locale: typeof localeArr[number]; } | undefined>(undefined);

export default function DictProvider({ locale, children }: { locale: typeof localeArr[number]; children: React.ReactNode; }) {
    const dict = useMemo(() => dictionaries[locale], [locale]);
    return (
        <DictContext.Provider value={{ dict, locale }}>
            {children}
        </DictContext.Provider>
    );
}
