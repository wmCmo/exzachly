import { getDictionary } from '@/app/dictionaries';
import localeArr from '@/types/Locales';
import TimerClient from './TimerClient';

export default async function page({ params }: { params: Promise<{ locale: string; }>; }) {
    const { locale } = await params;
    const dict = await getDictionary(locale as typeof localeArr[number]);
    return (
        <TimerClient dict={dict} locale={locale as typeof localeArr[number]} />
    );
}
