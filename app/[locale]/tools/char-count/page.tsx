import { getDictionary } from '@/app/dictionaries';
import localeArr from '@/types/Locales';
import CharCountClient from './CharCountClient';

export default async function page({ params }: { params: Promise<{ locale: typeof localeArr[number]; }>; }) {
    const { locale } = await params;
    const dict = await getDictionary(locale);
    return (
        <CharCountClient dict={dict.charCount} locale={locale} />
    );
}
