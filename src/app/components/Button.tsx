import React from 'react';

export default function Button({ child, from, onclick }: { child: string, from: string; onclick: React.Dispatch<React.SetStateAction<string>>; }) {
    const code = child.substring(0, 2).toLowerCase();
    return (
        <span onClick={() => onclick(code)} className={`${from === code ? "bg-lime-700" : "bg-neutral-300 dark:bg-neutral-900"} py-2 px-3 rounded-lg cursor-pointer`}>{child}</span>
    );
}
