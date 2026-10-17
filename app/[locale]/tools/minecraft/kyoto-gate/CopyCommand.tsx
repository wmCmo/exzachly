"use client";

import { useState } from "react";

export default function CopyCommand({ command, copy, copied }: { command: string; copy: string; copied: string; }) {
    const [done, setDone] = useState(false);
    const onCopy = async () => {
        try {
            await navigator.clipboard.writeText(command);
            setDone(true);
            setTimeout(() => setDone(false), 1600);
        } catch {
            setDone(false);
        }
    };
    return (
        <span className="inline-flex items-center gap-2 rounded-md bg-[#141A2A] pl-3 pr-1 py-1 font-mono text-sm sm:text-base text-[#F4EFE6]">
            <code>{command}</code>
            <button type="button" onClick={onCopy}
                className="kg-sans rounded px-2 py-1 text-xs font-bold text-[#141A2A] bg-[#E8A23A] hover:bg-[#F0B458] transition-colors">
                {done ? copied : copy}
            </button>
        </span>
    );
}
