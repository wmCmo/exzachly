import React from 'react';


function TextA() {
    return (
        <div className='sm:max-w-full'>
            <div className='bg-green-400 pt-2 mt-4'>
                <textarea name="input" id="input" className='block max-w-full resize text-black min-h-32 min-w-full sm:min-w-60'></textarea>
            </div>
        </div>
    );
}

export default function page() {
    return (
        <div className='px-2 sm:flex gap-4 flex-wrap'>
            <TextA />
            <TextA />
            <TextA />
            <TextA />
            <TextA />
            <TextA />
        </div>
    );
}
