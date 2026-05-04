import { getDictionary } from '@/app/dictionaries';
import localeArr from '@/types/Locales';
import AboutClent from './AboutClient';

export default async function page({ params }: { params: Promise<{ locale: string; }>; }) {
    const { locale } = await params;
    const dict = await getDictionary(locale as typeof localeArr[number]);
    return (
        <AboutClent dict={dict.about} />
    );
}
