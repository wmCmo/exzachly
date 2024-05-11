'use client'
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Nav() {
    const pages = ['home', 'tools', 'notion', 'community', 'portfolio'];

    const pathname = usePathname();

    const mappedPages = pages.map(page_ => {
        return (
            <Link href={page_ === 'home' ? '' : page_} key={page_}>
                <li className={
                    `${(pathname.includes('/' + ((page_ === 'home') && (pathname=='/') ? '' : page_))) ? 'font-bold' : ''} transition-transform ease-in-out hover:underline underline-offset-8 duration-300 text-center`
                }>{page_.charAt(0).toUpperCase() + page_.slice(1)}</li>
            </Link>
        )
    })
    return (
        <nav className="flex items-center mb-10 bg-white dark:bg-neutral-900 p-10 rounded-b-md">
            <Image className="mr-5" src={`/logo.svg`} alt="logo" width={40} height={40} />
            <ul className="flex gap-5 ml-auto flex-wrap justify-center text-neutral-700 dark:text-neutral-200">
                {mappedPages}
            </ul>
        </nav>
    )
}
