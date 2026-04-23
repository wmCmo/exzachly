'use client';
import useDict from "@/hooks/useDict";
import localeArr from "@/types/Locales";
import { ListIcon, TranslateIcon } from "@phosphor-icons/react/dist/ssr";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const montserrat = Montserrat({ subsets: ["latin"] });

export default function Nav() {
    const [navShow, setNavShow] = useState(false);
    const { dict, locale } = useDict();
    const pages = dict.nav.pages;

    const handleToggle = () => {
        setNavShow(prevNavShow => !prevNavShow);
    };

    const pathname = usePathname();
    const mappedPages = pages.map(page_ => {
        return (
            <Link target={page_[0] === 'notion' ? '_blank' : ''} href={page_[0] === 'notion' ? 'https://exzachly.notion.site' : page_[0] === 'home' ? `/${locale}` : `/${locale}/${page_[0]}`} key={page_[0]}>
                <li className={
                    `${(pathname.includes(`/` + ((page_[0] === 'home') && (pathname == `/${locale}`) ? '' : page_[0]))) ? 'font-bold' : ''} my-4 hover:underline underline-offset-8 text-center`
                }>{page_[1].charAt(0).toUpperCase() + page_[1].slice(1)}</li>
            </Link>
        );
    });

    const logo = <Image src='/logo.svg' alt="logo" width={40} height={40} className="ml-6 mr-4 my-4" />;
    const name = <h4 className={`${montserrat.className} text-lime-600 dark:text-lime-300 font-bold tracking-widest`}>EXZACHLY</h4>;

    // console.log(pathname)
    const getTarget = () => {
        const location = pathname.substring(3);
        const newLocale = locale === 'en' ? 'ja' : 'en';
        return `/${newLocale}/${location}`;
    };
    return (
        <div className="sticky top-0 bg-neutral-100 dark:bg-neutral-900 mb-10 z-20">
            <div className="select-none sm:hidden flex justify-between items-center">
                {<ListIcon size={40} weight="light" className="mx-6 my-4 hover:cursor-pointer" onClick={handleToggle} />}
                {name}
                <Link href={`/${locale}`}>
                    {logo}
                </Link>
            </div>
            <nav className={`bg-white dark:bg-neutral-800 p-2 ${navShow ? 'block absolute sm:static w-full' : 'hidden'} sm:flex justify-between items-center`}>
                <Link href={`/${locale}`} className="hidden sm:flex items-center">
                    {logo}
                    {name}
                </Link>
                <div className="sm:flex items-center overflow-auto">
                    <ul className="sm:flex gap-4 mx-6">
                        {mappedPages}
                    </ul>
                    <div className="flex sm:block justify-end">
                        <Link href={getTarget()}>
                            <div className="p-1 rounded-md mr-2 bg-neutral-500 dark:bg-neutral-900">
                                <TranslateIcon width={'1.5em'} height={'1.5em'} weight="regular" alt="Translate icon" fill="white" className="dark:fill-neutral-500" />
                            </div>
                        </Link>
                    </div>
                </div>
            </nav>
        </div>
    );
}
