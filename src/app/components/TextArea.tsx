'use client';
import { Dispatch, SetStateAction, useState } from 'react';
import { XCircle } from '@phosphor-icons/react/dist/ssr';

export default function TextArea({ unique, text, setText }: { unique: number; text: string[]; setText: Dispatch<SetStateAction<string[]>>; }) {

    const [fileName, setFileName] = useState('Untitled');

    const handleChange = (e: { target: { value: string; }; }) => {
        const value = e.target.value;
        setText(prev => {
            const newArr = [...prev];
            newArr[unique] = value;
            return newArr;
        });
    };

    const handleDelete = () => {
        console.log(unique);
        if (text.length > 0) {
            setText(prev => {
                const newArr = [...prev];
                newArr.splice(unique, 1);
                console.log(newArr);
                return newArr;
            });
        }
    };


    return (
        <div className='sm:max-w-full sm:mt-0 mt-4'>
            <div className='dark:bg-neutral-800 rounded-xl bg-neutral-500'>
                <div className="flex justify-center px-2 py-1 items-center relative">
                    <input type="text" value={fileName} className='dark:bg-neutral-800 dark:text-neutral-400 text-white bg-neutral-500 text-center font-bold rounded-full' onChange={(e) => setFileName(e.target.value)} />
                    {(text.length > 1) && <XCircle fill='white' weight='fill' onClick={handleDelete} width={'1.2em'} height={'1.2em'} className='cursor-pointer absolute right-2 dark:fill-[#f56c7f]' alt='Delete' />}
                </div>
                <textarea onChange={handleChange} name="text" id="text" value={text[unique]} className="block max-w-full resize dark:bg-neutral-100 dark:text-neutral-800 rounded-b-md p-4 min-w-full sm:min-w-96 min-h-32"></textarea>
            </div>
            <h3 className='mt-2'><b>Total:</b> {text[unique].length} characters</h3>
        </div>
    );
};
