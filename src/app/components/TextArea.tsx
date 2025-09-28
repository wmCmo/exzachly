'use client';
import { Dispatch, SetStateAction, useState } from 'react';
import { XCircle } from '@phosphor-icons/react/dist/ssr';
import { TextAreaProps } from '../tools/char-count/page';

export default function TextArea({ unique, value, text, setText }: { unique: number; value: TextAreaProps; text: TextAreaProps[]; setText: Dispatch<SetStateAction<TextAreaProps[]>>; }) {

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


    return (
        <div className='sm:max-w-full sm:mt-0 mt-4'>
            <div className='dark:bg-neutral-800 rounded-xl bg-neutral-500'>
                <div className="flex justify-center px-2 py-1 items-center relative">
                    <input type="text" name='file' value={value.file} className='dark:bg-neutral-800 dark:text-neutral-400 text-white bg-neutral-500 text-center font-bold rounded-full' onChange={handleChange} />
                    {(text.length > 1) && <XCircle fill='white' weight='fill' onClick={handleDelete} width={'1.2em'} height={'1.2em'} className='cursor-pointer absolute right-2 dark:fill-[#f56c7f]' alt='Delete' />}
                </div>
                <textarea onChange={handleChange} name="text" id="text" value={value.text} className="block max-w-full resize dark:bg-neutral-100 dark:text-neutral-800 rounded-b-md p-4 min-w-full sm:min-w-96 min-h-32"></textarea>
            </div>
            <h3 className='mt-2'><b>Total:</b> {value.text.length} characters</h3>
        </div>
    );
};
