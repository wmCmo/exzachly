'use client';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { PlusCircle, XCircle, StopCircle } from '@phosphor-icons/react/dist/ssr';
import { TextAreaProps } from '../[locale]/tools/char-count/CharCountClient';
import type { DictionaryType } from '../dictionaries/en';
import { locales } from '@/middleware';
import { RecordMap } from '../[locale]/tools/char-count/timer/TimerClient';
import { defaultRecord } from '@/utils/defaultRecord';

export default function TextArea({ unique, value, text, setText, dict, locale }: { unique: number; value: TextAreaProps; text: TextAreaProps[]; setText: Dispatch<SetStateAction<TextAreaProps[]>>; dict: DictionaryType['charCount']; locale: locales; }) {
    const [isChar, setIsChar] = useState(true);
    const [selectedText, setSelectedText] = useState(0);
    const [countChar, setCountChar] = useState(false);
    const [speech, setSpeech] = useState(false);
    const [record, setRecord] = useState(defaultRecord);

    useEffect(() => {
        if (window === undefined) return;
        else {
            try {
                const raw = localStorage.getItem('record');
                if (raw) {
                    const parsed = JSON.parse(raw) as Partial<RecordMap>;
                    setRecord(prev => ({ ...prev, ...parsed }));
                }
            } catch (e) {
                console.error('Could not load data from localStorage', e);
            }
        }
    }, []);

    const handleChange = (e: { target: { value: string; name: string; }; }) => {
        const value = e.target.value;
        const name = e.target.name;
        setText(prev => {
            const newArr = [...prev];
            newArr[unique] = { ...newArr[unique], [name]: value };
            return newArr;
        });
    };

    const handleSelection = (e: React.SyntheticEvent<HTMLTextAreaElement>) => {
        const start = e.currentTarget.selectionStart;
        const end = e.currentTarget.selectionEnd;
        setSelectedText(end - start);
    };

    const handleDelete = () => {
        if (text.length > 0) {
            setText(prev => {
                const newArr = [...prev];
                newArr.splice(unique, 1);
                return newArr;
            });
        }
    };

    const countWords = () => {
        const target = value.text;
        if (!target) return 0;
        const words = target.match(/ ./g);
        if (words === null) {
            return 1;
        } else {
            return words.length + 1;
        }
    };

    let diff = value.text.length - selectedText;
    if (diff === value.text.length) diff = 0;

    return (
        <div className='sm:max-w-full sm:mt-0 mt-4'>
            <div className='dark:bg-neutral-800 rounded-xl bg-neutral-800'>
                <div className="flex justify-center px-2 py-1 items-center relative">
                    <input type="text" name='file' value={value.file} className='dark:bg-neutral-800 dark:text-neutral-400 text-white bg-neutral-800 text-center font-bold rounded-full' onChange={handleChange} />
                    <div className='right-2 absolute flex'>
                        <StopCircle fill='white' weight='fill' width={'1.2em'} height={'1.2em'} alt='Toggle Speech' className={`dark:fill-[#4ac96e] cursor-pointer transition-transform ${speech ? 'rotate-45' : 'rotate-0'}`} onClick={() => { setSpeech(prev => !prev); setCountChar(false); }} />
                        <PlusCircle fill='white' weight='fill' width={'1.2em'} height={'1.2em'} alt='Selected Count' className={`dark:fill-[#e5c07b] cursor-pointer transition-transform ${countChar ? 'rotate-180' : 'rotate-0'}`} onClick={() => { setCountChar(prev => !prev); setSpeech(false); }} />
                        {(text.length > 1) && <XCircle fill='white' weight='fill' onClick={handleDelete} width={'1.2em'} height={'1.2em'} className='cursor-pointer dark:fill-[#f56c7f]' alt='Delete' />}
                    </div>
                </div>
                <textarea onChange={handleChange} onMouseUp={handleSelection} onSelect={handleSelection} name="text" id="text" value={value.text} className="block max-w-full resize dark:bg-neutral-100 dark:text-neutral-800 rounded-b-md p-4 min-w-full min-h-32"></textarea>
            </div>
            <div className="flex justify-between items-center pt-2 gap-2">
                <p className='mt-2'><b>{dict.total}:</b> {isChar ? value.text.length : countWords()} </p>
                {countChar &&
                    <div className="flex flex-wrap gap-2">
                        <p className='mt-2'><b>{dict.selected}:</b> {selectedText}</p>
                        <p className='mt-2'><b>{dict.diff}:</b> {diff}</p>
                    </div>
                }
                {
                    speech &&
                    <div className="flex flex-wrap gap-2">
                        <p className='mt-2'>⏱️{record ? Math.trunc((isChar ? record.ja : record.en) * (isChar ? value.text.length : countWords()) / 300) : 0} sec</p>
                    </div>
                }
                <div onClick={() => setIsChar(prev => !prev)} className={`relative ${locale === 'en' ? 'px-4' : 'px-6'} gap-12 flex bg-neutral-800 dark:bg-neutral-900 rounded-md items-center cursor-pointer ml-auto`}>
                    <p onClick={() => setIsChar(true)} className={`py-2 z-10 ${isChar ? 'text-white' : 'font-bold'} transition-all`}>{dict.word}</p>
                    <p onClick={() => setIsChar(false)} className={`py-2 z-10 ${isChar ? 'font-bold' : 'text-white'} transition-all`}>{dict.char}</p>
                    <div onClick={() => setIsChar(prev => !prev)} className={`top-0 left-0 absolute transition-transform duration-200 w-20 ${isChar ? 'translate-x-full' : 'translate-x-0'} rounded-md h-10 bg-neutral-100 dark:bg-neutral-800`}></div>
                </div>
            </div>
        </div>
    );
};
