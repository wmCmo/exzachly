import { getDictionary } from '@/app/dictionaries';
import localeArr from '@/types/Locales';
import TimerClient from './TimerClient';

export default async function page({ params }: { params: Promise<{ locale: typeof localeArr[number]; }>; }) {
    const { locale } = await params;
    const dict = await getDictionary(locale);
    return (
        <TimerClient dict={dict} locale={locale} />
    );
}
