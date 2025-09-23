'use client'
import Image from "next/image";
import Link from "next/link";
import { List } from "@phosphor-icons/react/dist/ssr";
import { usePathname } from "next/navigation";
import { Montserrat } from "next/font/google";
import { useState } from "react";

const montserrat = Montserrat({ subsets: ["latin"] })

export default function Nav() {
    const [navShow, setNavShow] = useState(false);
    const pages = ['home', 'tools', 'notion', 'community', 'portfolio', 'about'];

    const handleToggle = () => {
        setNavShow(prevNavShow => !prevNavShow);
    }

    const pathname = usePathname();
    const mappedPages = pages.map(page_ => {
        return (
            <Link target={page_ === 'notion' ? '_blank' : ''} href={page_ === 'notion' ? 'https://exzachly.notion.site' : page_ === 'home' ? '/' : `../${page_}`} key={page_}>
                <li className={
                    `${(pathname.includes('/' + ((page_ === 'home') && (pathname == '/') ? '' : page_))) ? 'font-bold' : ''} my-4 hover:underline underline-offset-8 text-center`
                }>{page_.charAt(0).toUpperCase() + page_.slice(1)}</li>
            </Link>
        )
    })

    const logo = <Image src='/logo.svg' alt="logo" width={40} height={40} className="ml-6 mr-4 my-4" />;
    const name = <h4 className={`${montserrat.className} text-lime-600 dark:text-lime-300 font-bold tracking-widest`}>EXZACHLY</h4>

    return (
        <div className="sticky top-0 bg-neutral-100 dark:bg-neutral-900 mb-10 z-20">
            <div className="select-none sm:hidden flex justify-between items-center">
                {<List size={40} weight="light" className="mx-6 my-4 hover:cursor-pointer" onClick={handleToggle} />}
                {name}
                <Link href='../'>
                    {logo}
                </Link>
            </div>
            <nav className={`bg-white dark:bg-neutral-800 p-2 ${navShow ? 'block absolute sm:static w-full' : 'hidden'} sm:flex justify-between items-center`}>
                <Link href='../' className="hidden sm:flex items-center">
                    {logo}
                    {name}
                </Link>
                <ul className="sm:flex gap-4 mx-6">
                    {mappedPages}
                </ul>
            </nav>
        </div>
    )
}
