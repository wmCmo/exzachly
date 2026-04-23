import React from 'react';
import Tools from './Tools';
import { locales } from '@/middleware';
import { getDictionary } from '@/app/dictionaries';

export default async function page({ params }: { params: Promise<{ locale: locales; }>; }) {
    const { locale } = await params;
    const dict = await getDictionary(locale as locales);
    return (
        <Tools dict={dict['tools']} locale={locale} />
    );
}
