"use client";

import { useState } from "react";

// The common Unicode stand-ins for Minecraft's enchanting-table (Standard Galactic) alphabet.
const SGA: Record<string, string> = {
    a: "ᔑ", b: "ʖ", c: "ᓵ", d: "↸", e: "ᒷ", f: "⎓", g: "⊣", h: "⍑", i: "╎", j: "⋮", k: "ꖌ", l: "ꖎ", m: "ᒲ",
    n: "リ", o: "𝙹", p: "!¡", q: "ᑑ", r: "∷", s: "ᓭ", t: "ℸ", u: "⚍", v: "⍊", w: "∴", x: "̇/", y: "||", z: "⨅",
};

function Line({ text }: { text: string; }) {
    const [shown, setShown] = useState(false);
    return (
        <li>
            <button type="button" onMouseEnter={() => setShown(true)} onMouseLeave={() => setShown(false)}
                onFocus={() => setShown(true)} onBlur={() => setShown(false)} onClick={() => setShown((s) => !s)}
                aria-label={text}
                className="w-full text-left rounded-lg bg-[#1E2638] px-5 py-3 hover:bg-[#262F45] transition-colors">
                <span aria-hidden className="flex flex-wrap text-xl sm:text-2xl text-[#B8F62A]">
                    {[...text].map((ch, i) => (
                        <span key={i} className="inline-block transition-all duration-300 min-w-[0.5ch]"
                            style={{ transitionDelay: `${i * 25}ms` }}>
                            {ch === " " ? " " : shown ? ch : (SGA[ch] ?? ch)}
                        </span>
                    ))}
                </span>
            </button>
        </li>
    );
}

export default function Glyphs({ lines, hint }: { lines: string[]; hint: string; }) {
    return (
        <div>
            <ul className="flex flex-col gap-3">
                {lines.map((l) => <Line key={l} text={l} />)}
            </ul>
            <p className="kg-sans text-xs tracking-[0.25em] uppercase text-[#8D96AA] mt-3">{hint}</p>
        </div>
    );
}
