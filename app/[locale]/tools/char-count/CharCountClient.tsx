'use client';

import TextArea from "@/app/components/TextArea";
import type { DictionaryType } from "@/app/dictionaries/en";
import useHydrated from "@/hooks/useHydrated";
import localeArr from "@/types/Locales";
import Link from "next/link";
import { ReactNode, useState } from "react";

export interface TextAreaProps {
    file: string;
    text: string;
}

type CharCountProps = { dict: DictionaryType['charCount']; locale: typeof localeArr[number]; };

function readHistory(): TextAreaProps[] | null {
    try {
        const stored = localStorage.getItem('history');
        return stored ? JSON.parse(stored) : null;
    } catch {
        return null;
    }
}

function Button({ main, handleClick, children }: { main: boolean; handleClick: () => void; children: ReactNode; }) {
    return <button onClick={handleClick} className={`${main ? 'bg-lime-600 hover:bg-lime-500' : 'bg-neutral-800 hover:bg-neutral-700 dark:bg-neutral-800 dark:hover:bg-neutral-700'} transition-colors duration-100 py-1 text-white px-4 rounded-md font-bold`}>{children}</button>;
}

// The server can't see localStorage, so the editor first renders empty and then remounts
// once hydrated, picking up the saved history in its initial state.
export default function CharCountClient(props: CharCountProps) {
    const hydrated = useHydrated();
    return <CharCountEditor key={hydrated ? 'stored' : 'empty'} hydrated={hydrated} {...props} />;
}

function CharCountEditor({ dict, locale, hydrated }: CharCountProps & { hydrated: boolean; }) {
    const emptyTextArea = { file: dict.untitled, text: '' };
    const [text, setText] = useState<TextAreaProps[]>(() => (hydrated && readHistory()) || [emptyTextArea]);

    const handleAdd = () => {
        setText(prev => {
            const newArr = [...prev];
            newArr.push(emptyTextArea);
            return newArr;
        });
    };

    const handleSave = () => {
        localStorage.setItem('history', JSON.stringify(text));
    };

    const handleReset = () => {
        setText([emptyTextArea]);
        handleSave();
    };

    return (
        <div className="text-neutral-800 dark:text-white">
            <div className="flex">
                <Link href={`/${locale}/tools/char-count/timer`} className="bg-neutral-100 hover:bg-white dark:bg-neutral-900 dark:hover:bg-neutral-800 px-4 py-2 rounded-md font-bold ml-auto">⏱️{dict.timer}👉<span className='font-mono text-neutral-500 bg-neutral-300 dark:text-neutral-400 dark:bg-neutral-800 px-1 rounded-sm ml-2'>{dict.speechTimer.new}</span></Link>
            </div>
            <h1 className="text-vw leading-none sm:text-7xl font-bold mt-8">{dict.header}</h1>
            <h4 className="text-xl my-4">{dict.desc}</h4>
            <div className="sm:flex items-center mt-4 mb-8 gap-4">
                <Button main={true} handleClick={handleAdd}>{dict.new}</Button>
                <div className="flex items-center gap-2 mt-4 sm:mt-0">
                    <Button main={false} handleClick={handleSave}>{dict.save}</Button>
                    <Button main={false} handleClick={handleReset}>{dict.reset}</Button>
                </div>
            </div>
            <div className="-mt-4 sm:flex gap-4 flex-wrap">
                {text.map((value, index) => <TextArea key={index} unique={index} value={value} setText={setText} text={text} dict={dict} locale={locale} />)}
            </div>
        </div>
    );
}
