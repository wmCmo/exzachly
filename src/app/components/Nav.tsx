import Image from "next/image"

export default function Nav() {
    return (
        <nav className="flex items-center mb-10 bg-white dark:bg-neutral-900 p-10 rounded-b-md">
            <Image className="mr-5" src={`/logo.svg`} alt="logo" width={40} height={40} />
            <ul className="flex gap-5 ml-auto flex-wrap justify-center text-neutral-700 dark:text-neutral-200">
                <li className="transition-all ease-in-out hover:font-bold duration-300 text-center"><a href="/">Home</a></li>
                <li>Notion</li>
                <li>Community</li>
                <li>Portfolio</li>
            </ul>
        </nav>
    )
}
