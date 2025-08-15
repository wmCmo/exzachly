import React from 'react';
import Image from 'next/image';

export default function page() {
    const url = 'https://exzachly.vercel.app/contact.vcf';

    return (
        <div className='flex flex-col items-center gap-8 mx-5'>
            <h1 className='text-vw leading-none sm:text-7xl font-bold'>My Digital Contact</h1>
            <div className="bg-white flex justify-center items-center rounded-xl relative">
                <Image src={'/contact-qr.svg'} height={300} width={300} alt='My VCF file download file as a qrcode' />
                <div className='absolute w-12 h-12 rounded-xl bg-[#171717] text-3xl flex items-center justify-center'>
                    <Image src={'/green-book.svg'} width={32} height={32} alt='Microsoft fluent ui green book emoji' />
                </div>
            </div>
            <a href={url} className='bg-neutral-950 px-6 py-4 rounded-xl hover:-translate-y-1 transition-all duration-200 ease-in-out hover:bg-neutral-900 font-bold'>Download Contact File</a>
        </div>
    );
}
