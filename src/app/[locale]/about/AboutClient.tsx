'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { DictionaryType } from '@/app/dictionaries/en';

export default function AboutClent({ dict }: { dict: DictionaryType['about']; }) {
    const url = 'https://exzachly.vercel.app/contact.vcf';
    const [vcf, setVCF] = useState(true);

    return (
        <div className='flex flex-col items-center gap-8 mx-5 text-neutral-800 dark:text-neutral-200'>
            <h1 className='text-center text-vw leading-none sm:text-7xl font-bold '>{dict.my}{vcf ? dict.vcf : 'LinkedIn'}</h1>
            <div className="dark:bg-white bg-neutral-100 flex justify-center items-center rounded-xl relative">
                <Image src={vcf ? '/contact-qr.svg' : '/linkedin-qr.svg'} height={300} width={300} alt='My VCF file download file as a qrcode' />
                <div className='absolute w-12 h-12 rounded-xl bg-[#171717] text-3xl flex items-center justify-center'>
                    <Image src={`/${vcf ? 'green' : 'blue'}-book.svg`} width={32} height={32} alt='Microsoft fluent ui green book emoji' />
                </div>
            </div>
            <a href={url} className='bg-neutral-50 hover:bg-white dark:bg-neutral-950 px-6 py-4 rounded-xl hover:-translate-y-1 transition-all duration-200 ease-in-out dark:hover:bg-neutral-900 font-bold'>{dict.download}</a>
            <div onClick={() => setVCF(prev => !prev)} className={`select-none cursor-pointer h-8 w-16 ${vcf ? 'dark:bg-neutral-800 bg-neutral-500' : 'bg-white'} shadow-md rounded-full flex items-center p-1 transition-colors ease-in-out duration-300`}>
                <div className={`h-6 w-6 ${vcf ? 'dark:bg-neutral-700 bg-neutral-400' : 'bg-blue-500 shadow-blue-500/50 shadow-sm'} rounded-full transition-transform ${vcf ? 'translate-x-8' : ''} ease-in-out duration-300`}></div>
            </div>
        </div>
    );
}
