import React from 'react';
import CommunityToggle from '@/app/components/CommunityToggle';
import { getDictionary } from '@/app/dictionaries';
import { locales } from '@/middleware';

const DB_ID = '75378b2ea59a4bd389163517f5cc37c5';
const END_POINT = `https://api.notion.com/v1/databases/${DB_ID}/query`;
const options = { method: 'POST', headers: { 'Notion-Version': '2022-06-28', Authorization: `Bearer ${process.env.NOTION_SECRET}`, 'Content-Type': 'application/json' } };

export interface NotionItemType {
    id: string,
    properties: {
        Tags: { select: { name: string; }; };
        Name: { title: [{ plain_text: string; }]; };
        'Sub-reddit': {
            select: {
                name: string;
                color: string;
            };
        };
    };
    public_url: string;
}

export default async function page({ params }: { params: Promise<{ locale: string; }>; }) {
    const { locale } = await params;
    const dict = await getDictionary(locale as locales);

    const response = await fetch(END_POINT, options);
    const data = await response.json();

    const redditPosts = (data.results || []).filter((item: NotionItemType) => {
        return (
            item.properties.Tags.select.name == 'Reddit'
        );
    });



    return (
        <div className='text-neutral-800 dark:text-neutral-200'>
            <h1 className='text-vw leading-none sm:text-7xl font-bold my-8 text-center sm:text-left'>{dict.community.header}</h1>
            <h4 className="text-xl my-4 font-bold">{dict.community.desc}</h4>
            <CommunityToggle name='reddit' posts={redditPosts} />
        </div>
    );
}
