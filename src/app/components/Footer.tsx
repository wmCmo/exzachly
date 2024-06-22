'use client'

import Link from "next/link"
import { DiscordLogo, GithubLogo, RedditLogo, CheckCircle } from "@phosphor-icons/react/dist/ssr"
import { useState } from "react"

export default function Footer() {
    const [showDiscord, setShowDiscord] = useState(true);

    const handleDiscord = () => {
        navigator.clipboard.writeText('wmcmo');
        setShowDiscord(false)
        setTimeout(() => {
            setShowDiscord(true)
        }, 1000);
    }

    return (
        <div className="flex justify-center items-center gap-4 p-6 mt-6 border-t-2 border-neutral-100 dark:border-neutral-800">
            <div id="discord" onClick={handleDiscord} className="relative hover:cursor-copy">
                <CheckCircle size={30} color="#a3e365" weight="duotone" id="discord-check" className={`absolute ${showDiscord ? 'opacity-0' : 'opacity-100'} transition duration-200`} />
                <DiscordLogo size={30} color="#737373" weight="duotone" id="discord-logo" className={`cursor-copy ${showDiscord ? 'opacity-100' : 'opacity-0'} transition duration-200`} />
            </div>
            <Link href='https://github.com/wmCmo' target="_blank">
                <GithubLogo size={30} color="#737373" weight="duotone" />
            </Link>
            <Link href='https://www.reddit.com/user/Living_Book/' target="_blank">
                <RedditLogo size={30} color="#737373" weight="duotone" />
            </Link>
        </div>
    )
}
