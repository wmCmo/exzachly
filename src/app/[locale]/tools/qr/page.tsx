import { getDictionary } from '@/app/dictionaries';
import { locales } from '@/middleware';
import React from 'react';
import QrClient from './QrClient';

export default async function page({ params }: { params: Promise<{ locale: locales; }>; }) {
    const { locale } = await params;
    const dict = await getDictionary(locale);

    return (
        <QrClient dict={dict.qr}/>
    );
}
