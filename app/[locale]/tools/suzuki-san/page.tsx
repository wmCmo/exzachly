'use client';

import MoraType from "@/types/Suzuki";
import { useRef, useState } from "react";

export default function Page() {
    const [sentence, setSentence] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [guide, setGuide] = useState<MoraType[]>([]);

    const inputBoxRef = useRef<HTMLTextAreaElement>(null);

    async function handleSubmit() {
        try {
            setIsLoading(true);
            const res = await fetch('/api/suzuki', {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ sentence }),
            });
            const { moras } = await res.json();
            setGuide(moras);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    function handleInput(value: string) {
        setSentence(value);

        const textArea = inputBoxRef.current;
        if (!textArea) return;

        textArea.style.height = '20px';
        textArea.style.height = `${textArea.scrollHeight + 4}px`;
    }

    return (
        <div className="max-w-xl flex flex-col">
            <h1 className="text-vw text-6xl font-bold ">Prosody Tutor Suzuki-san</h1>
            <a href="https://www.gavo.t.u-tokyo.ac.jp/ojad/eng/phrasing/index" rel="noopener noreferrer" target="_blank" className="text-sub hover:underline underline-offset-2 cursor-pointer text-neutral-500 mt-2">Original Website</a>
            <div className="mt-8">
                {guide.map((mora, index) => (
                    <span key={index} className={`${mora.accent && 'text-lime-400 font-bold'} ${mora.unvoiced && 'text-neutral-500 font-bold'}`}>
                        {mora.value}
                    </span>
                ))}
            </div>
            {
                guide.length > 0 &&
                <div className="flex gap-4 mt-4 ml-auto">
                    <div className="flex items-center gap-2">
                        <div className="h-2 w-2 bg-lime-500 rounded-full" />
                        <span>High Pitch</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="h-2 w-2 bg-neutral-500 rounded-full" />
                        <span>Unvoiced</span>
                    </div>
                </div>
            }
            <textarea ref={inputBoxRef} name="sentence" id="sentence" placeholder="Your Japanese sentence" className="min-w-lg bg-neutral-50 border-neutral-300 dark:bg-neutral-800 border dark:border-neutral-700 rounded-lg mt-4 outline-none p-2 min-h-20" onChange={e => handleInput(e.target.value)}></textarea>
            <button type="button" onClick={handleSubmit} className="px-4 py-1 rounded-lg bg-neutral-200 dark:bg-neutral-800 mt-4 cursor-pointer hover:translate-y-0.5 active:translate-y-1 ml-auto font-bold">{isLoading ? "loading..." : "Submit"}</button>
        </div>
    );
}
