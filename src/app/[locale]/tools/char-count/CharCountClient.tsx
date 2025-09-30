'use client';

import React, { ReactNode, useEffect, useState } from "react";
import TextArea from "@/app/components/TextArea";
import { DictionaryType } from "@/app/dictionaries/en";
import { locales } from "@/middleware";

export interface TextAreaProps {
    file: string;
    text: string;
}

export default function CharCountClient({ dict, locale }: { dict: DictionaryType['charCount']; locale: locales; }) {
    const emptyTextArea = { file: dict.untitled, text: '' };
    const [text, setText] = useState<TextAreaProps[]>([emptyTextArea]);

    useEffect(() => {
        const stored = localStorage.getItem('history');
        if (stored) setText(JSON.parse(stored));
    }, []);

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

    const Button = ({ main, handleClick, children }: { main: boolean; handleClick: () => void; children: ReactNode; }) => {
        return <button onClick={handleClick} className={`${main ? 'bg-lime-600 hover:bg-lime-500' : 'bg-neutral-500 hover:bg-neutral-400 dark:bg-neutral-800 dark:hover:bg-neutral-700'} transition-colors duration-100 py-1 text-white px-4 rounded-md font-bold`}>{children}</button>;
    };

    return (
        <>
            <h1 className="text-vw leading-none sm:text-7xl font-bold">{dict.header}</h1>
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
        </>
    );
}
