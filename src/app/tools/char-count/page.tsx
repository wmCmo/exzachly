'use client';

import { useState } from "react";
import TextArea from "@/app/components/TextArea";

export default function CharCount() {
    const [text, setText] = useState<string[]>(['']);

    const handleAdd = () => {
        setText(prev => {
            const newArr = [...prev];
            newArr.push('');
            return newArr;
        });
    };

    return (
        <>
            <h1 className="text-vw leading-none sm:text-7xl font-bold">Flexible Text Counter</h1>
            <h4 className="text-xl my-4">Layout-free text counter. Designed for you.</h4>
            <button onClick={handleAdd} className="bg-lime-600 py-1 text-white px-4 rounded-md font-bold mt-4 mb-8">New Text Box</button>
            <div className="-mt-4 sm:flex gap-4 flex-wrap">
                {text.map((_, index) => <TextArea key={index} unique={index} text={text} setText={setText} />)}
            </div>
        </>
    );
}
