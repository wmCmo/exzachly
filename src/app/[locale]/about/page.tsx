import React from 'react';
import AboutClent from './AboutClient';
import { locales } from '@/middleware';
import { getDictionary } from '@/app/dictionaries';

export default async function page({ params }: { params: Promise<{ locale: locales; }>; }) {
    const { locale } = await params;
    const dict = await getDictionary(locale);
    return (
        <AboutClent dict={dict.about} />
    );
}
