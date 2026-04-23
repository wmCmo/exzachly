import React from 'react';
import CharCountClient from './CharCountClient';
import { locales } from '@/middleware';
import { getDictionary } from '@/app/dictionaries';

export default async function page({ params }: { params: Promise<{ locale: locales; }>; }) {
    const { locale } = await params;
    const dict = await getDictionary(locale);
    return (
        <CharCountClient dict={dict.charCount} locale={locale} />
    );
}
