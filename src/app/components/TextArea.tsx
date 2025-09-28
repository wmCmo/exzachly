'use client';
import { Dispatch, SetStateAction, useState } from 'react';
import { XCircle } from '@phosphor-icons/react/dist/ssr';
import { TextAreaProps } from '../tools/char-count/page';

export default function TextArea({ unique, value, text, setText }: { unique: number; value: TextAreaProps; text: TextAreaProps[]; setText: Dispatch<SetStateAction<TextAreaProps[]>>; }) {
    const [isChar, setIsChar] = useState(true);

    const handleChange = (e: { target: { value: string; name: string; }; }) => {
        const value = e.target.value;
        const name = e.target.name;
        setText(prev => {
            const newArr = [...prev];
            newArr[unique] = { ...newArr[unique], [name]: value };
            return newArr;
        });
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

    return (
        <div className='sm:max-w-full sm:mt-0 mt-4'>
            <div className='dark:bg-neutral-800 rounded-xl bg-neutral-500'>
                <div className="flex justify-center px-2 py-1 items-center relative">
                    <input type="text" name='file' value={value.file} className='dark:bg-neutral-800 dark:text-neutral-400 text-white bg-neutral-500 text-center font-bold rounded-full' onChange={handleChange} />
                    {(text.length > 1) && <XCircle fill='white' weight='fill' onClick={handleDelete} width={'1.2em'} height={'1.2em'} className='cursor-pointer absolute right-2 dark:fill-[#f56c7f]' alt='Delete' />}
                </div>
                <textarea onChange={handleChange} name="text" id="text" value={value.text} className="block max-w-full resize dark:bg-neutral-100 dark:text-neutral-800 rounded-b-md p-4 min-w-full sm:min-w-96 min-h-32"></textarea>
            </div>
            <div className="flex justify-between items-center pt-2">
                <h3 className='mt-2'><b>Total:</b> {isChar ? value.text.length : countWords()} {isChar ? 'characters' : 'words'}</h3>
                <div className=''>
                    <div className='relative flex gap-4 bg-neutral-600 dark:bg-neutral-900 rounded-md items-center cursor-pointer'>
                        <p onClick={() => setIsChar(false)} className={`px-4 py-2 z-10 ${isChar ? 'text-white' : 'font-bold'} transition-all`}>Word</p>
                        <p onClick={() => setIsChar(true)} className={`px-4 py-2 z-10 ${isChar ? 'font-bold' : 'text-white'} transition-all`}>Char</p>
                        <div onClick={() => setIsChar(prev => !prev)} className={`top-0 left-0 absolute transition-transform duration-200 ${isChar ? 'translate-x-full w-20' : 'translate-x-0 w-20'} rounded-md h-10 bg-neutral-100 dark:bg-neutral-700`}></div>
                    </div>
                </div>
            </div>
        </div>
    );
};
