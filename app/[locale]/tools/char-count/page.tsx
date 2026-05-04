import { getDictionary } from '@/app/dictionaries';
import localeArr from '@/types/Locales';
import CharCountClient from './CharCountClient';

export default async function page({ params }: { params: Promise<{ locale: string; }>; }) {
    const { locale } = await params;
    const dict = await getDictionary(locale as typeof localeArr[number]);
    return (
        <CharCountClient dict={dict.charCount} locale={locale as typeof localeArr[number]} />
    );
}
