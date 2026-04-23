'use client';
import React, { useLayoutEffect, useRef, useState } from 'react';
import { CaretCircleRight, Globe } from '@phosphor-icons/react/dist/ssr';
import { NotionItemType } from '../[locale]/community/page';
import Link from 'next/link';

export default function CommunityToggle({ name, posts }: { name: string; posts: NotionItemType[]; }) {
    const [openMenu, setOpenMenu] = useState(false);
    const [height, setHeight] = useState(0);
    const innerRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        if (innerRef.current) {
            setHeight(innerRef.current.scrollHeight);
        }
    }, [openMenu, posts]);

    const tags: { [key: string]: string[]; } = {};

    for (let i = 0; i < posts.length; i++) {
        const tagName = posts[i].properties['Sub-reddit'].select.name;
        const tagColor = posts[i].properties['Sub-reddit'].select.color;
        const bgDark = `bg-${tagColor}-800/80`;
        const bgLight = `bg-${tagColor}-800/30`;
        const txtLight = `text-${tagColor}-900`;
        if (Object.keys(tags).includes(tagName)) continue;
        tags[tagName] = [txtLight, bgLight, bgDark];
    }

    return (
        <div className='bg-neutral-100 dark:bg-neutral-800 p-4 rounded-md transition-all' style={{ height: openMenu ? `${height + 240}px` : '64px' }}>
            <div className="flex items-center mb-4 cursor-pointer select-none" onClick={() => setOpenMenu(prev => !prev)}>
                <CaretCircleRight fill='#383838' weight='fill' className={`transition-transform fill-neutral-700 dark:fill-neutral-500 ${openMenu ? 'rotate-90' : ''}`} size={'2em'} />
                <h1 className='ml-2 text-xl font-bold'>{name.toUpperCase()}</h1>
                <div className='bg-neutral-200 dark:bg-neutral-900 text-neutral-500 dark:text-neutral-400 font-mono rounded-sm ml-4 px-2'>
                    {posts.length}
                </div>
                <div className='h-4 w-4 bg-orange-600 ml-auto rounded-full'></div>
            </div>
            {openMenu && posts && Object.entries(tags).map(item => {
                return (
                    <div key={item[0]}>
                        <div className='mt-6'>
                            <span key={item[0]} className={`${item[1][0]} ${item[1][1]} dark:text-white dark:${item[1][2]} p-1.5 rounded-md font-mono font-bold`}>{item[0]}</span>
                        </div>
                        <div ref={innerRef} className='sm:grid sm:grid-cols-2 gap-4 mt-4'>
                            {posts.filter(sub => sub.properties['Sub-reddit'].select.name === item[0]).map(item => {
                                return (
                                    <Link href={item.public_url} key={item.id} target='_blank'>
                                        <div className='bg-neutral-100 hover:bg-neutral-300 dark:bg-neutral-800 dark:hover:bg-neutral-900 cursor-pointer p-2 rounded-md mb-4 sm:mb-0 flex items-center gap-2'>
                                            <Globe fill='#383838' className='dark:fill-neutral-500 flex-shrink-0' weight='regular' size={'1.5em'} />
                                            <h2 className='whitespace-nowrap overflow-hidden overflow-ellipsis'>{item.properties.Name.title[0].plain_text}</h2>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                );
            })}
        </div>
    );
}
