'use client';
import Button from '@/app/components/Button';
import { CheckCircleIcon, CopySimpleIcon, ShareNetworkIcon } from '@phosphor-icons/react/dist/ssr';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

const thai = '_ๅ/-ภถุึคตจขชๆไำพะัีรนยบลฟหกดเ้่าสวงฃผปแอิืทมใฝ%+๑๒๓๔ู฿๕๖๗๘๙๐"ฎฑธํ๊ณฯญฐ,ฤฆฏโฌ็๋ษศซ.ฅ()ฉฮฺ์?ฒฬฦ';
const eng = '`1234567890-=qwertyuiop[]asdfghjkl;\'\\zxcvbnm,./~!@#$%^&*()_+QWERTYUIOP{}ASDFGHJKL:"|ZXCVBNM<>?';

// Swap each character for the one on the same key of the other keyboard layout.
function change(text: string, from: string): string {
    const [source, target] = from === 'th' ? [thai, eng] : [eng, thai];
    return Array.from(text, char => {
        const index = source.indexOf(char);
        return index === -1 ? char : target[index];
    }).join('');
}

export default function KeyChangeUI() {
    const searchParams = useSearchParams();

    const toString = (text: string) => {
        return Buffer.from(text, "hex").toString("utf-8");
    };

    const [from, setFrom] = useState(searchParams.get('from') || 'th');
    const [input, setInput] = useState(toString(searchParams.get('input') || 'e0b984e0b897e0b981e0b897e0b899') || 'ไทแทน');
    const [showCopy, setShowCopy] = useState(true);
    const [showLinkCopy, setShowLinkCopy] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText('wmcmo');
        setShowCopy(false);
        setTimeout(() => {
            setShowCopy(true);
        }, 1000);
    };

    const handleChange = (e: { target: { value: string; }; }) => {
        setInput(e.target.value);
    };

    const toHex = (text: string) => {
        return Buffer.from(text, "utf-8").toString("hex");
    };

    const handleLinkCopy = () => {
        navigator.clipboard.writeText(`https://exzachly.vercel.app/tools/th-en?from=${from}&input=${toHex(input)}`);
        setShowLinkCopy(true);
        setTimeout(() => {
            setShowLinkCopy(false);
        }, 2000);
    };

    return (
        <div className='relative'>
            <div className={`font-bold ${showLinkCopy ? 'opacity-100' : 'opacity-0'} transition duration-500 absolute top-0 right-0 dark:bg-neutral-100 dark:text-neutral-800/70 text-center px-4 py-2 rounded-lg`}>
                Link copied!
            </div>
            <h1 className="text-vw leading-none sm:text-7xl font-bold">TH-EN Key Change</h1>
            <h4 className="text-2xl my-4">Forgot to change the language? We&apos;re here to help 😉</h4>
            <h5 className='pt-6 text-lg'>Output</h5>
            <div className='bg-neutral-200 dark:bg-neutral-900 pl-8 py-4 rounded-lg text-4xl flex justify-between pr-4'>
                <span>{change(input, from)}</span>
                <div id="discord" onClick={handleCopy} className="relative z-10 hover:cursor-copy">
                    <CheckCircleIcon size="1em" color="#a3e365" weight="duotone" id="discord-check" className={`absolute ${showCopy ? 'opacity-0' : 'opacity-100'} transition duration-200`} />
                    <CopySimpleIcon fill="#383838" weight="thin" className={`cursor-copy ${showCopy ? 'opacity-100' : 'opacity-0'} transition duration-200`} size='1em' />
                </div>
            </div>
            <div className='flex items-center gap-1 cursor-pointer' onClick={handleLinkCopy}>
                <span className='dark:text-neutral-600'>Copy link</span>
                <ShareNetworkIcon className='dark:fill-neutral-600' />
            </div>

            <h5 className='pt-6 text-lg mb-2'>Change from</h5>
            <div className='flex gap-2'>
                <Button from={from} child={"THAI"} onclick={setFrom} />
                <Button from={from} child={"ENGLISH"} onclick={setFrom} />
            </div>
            <h5 className='pt-6 text-lg mb-2'>Input</h5>
            <textarea name="text" onChange={handleChange} value={input} className='dark: text-neutral-800 resize rounded-lg'></textarea>

        </div>
    );
}
