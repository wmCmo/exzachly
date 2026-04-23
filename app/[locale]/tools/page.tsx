import { getDictionary } from '@/app/dictionaries';
import localeArr from '@/types/Locales';
import Tools from './Tools';

export default async function page({ params }: { params: Promise<{ locale: typeof localeArr[number]; }>; }) {
    const { locale } = await params;
    const dict = await getDictionary(locale);
    return (
        <Tools dict={dict['tools']} locale={locale} />
    );
}
