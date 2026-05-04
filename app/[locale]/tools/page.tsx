import { getDictionary } from '@/app/dictionaries';
import localeArr from '@/types/Locales';
import Tools from './Tools';

export default async function page({ params }: { params: Promise<{ locale: string; }>; }) {
    const { locale } = await params;
    const dict = await getDictionary(locale as typeof localeArr[number]);
    return (
        <Tools dict={dict['tools']} locale={locale as typeof localeArr[number]} />
    );
}
