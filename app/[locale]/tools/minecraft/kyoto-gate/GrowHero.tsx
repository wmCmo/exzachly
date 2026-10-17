"use client";

import { useEffect, useRef, useState } from "react";

const FRAMES = 30;
const MAX_RADIUS = 67;          // blocks from the gate to the furthest built block in the render
const frameSrc = (i: number) => `/minecraft/kyoto-gate/grow/${String(i).padStart(2, "0")}.webp`;
const radiusAt = (i: number) => Math.round(MAX_RADIUS * Math.pow(i / (FRAMES - 1), 1.15));

type Props = { kicker: string; title: string; stages: string[]; distance: string; scroll: string; };

// The town growing out from its first gate, scrubbed by scroll: 30 isometric renders of the
// same 96×96 block area, each showing the built blocks within a larger radius of the gate.
export default function GrowHero({ kicker, title, stages, distance, scroll }: Props) {
    const section = useRef<HTMLElement>(null);
    const canvas = useRef<HTMLCanvasElement>(null);
    const images = useRef<HTMLImageElement[]>([]);
    const [frame, setFrame] = useState(0);

    useEffect(() => {
        const draw = (i: number) => {
            const img = images.current[i];
            const c = canvas.current;
            if (!c || !img?.complete || !img.naturalWidth) return;
            if (c.width !== img.naturalWidth) {
                c.width = img.naturalWidth;
                c.height = img.naturalHeight;
            }
            const ctx = c.getContext("2d");
            ctx?.clearRect(0, 0, c.width, c.height);
            ctx?.drawImage(img, 0, 0);
        };
        images.current = Array.from({ length: FRAMES }, (_, i) => {
            const img = new Image();
            img.src = frameSrc(i);
            img.onload = () => { if (i === 0) draw(0); };
            return img;
        });
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        let raf = 0;
        let current = -1;
        const update = () => {
            raf = 0;
            const el = section.current;
            if (!el) return;
            const rect = el.getBoundingClientRect();
            const span = el.offsetHeight - window.innerHeight;
            const p = reduce ? 1 : Math.min(1, Math.max(0, -rect.top / Math.max(1, span)));
            const i = Math.round(p * (FRAMES - 1));
            if (i !== current) {
                current = i;
                draw(i);
                setFrame(i);
            }
        };
        const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
        update();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);
        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
            if (raf) cancelAnimationFrame(raf);
        };
    }, []);

    const stage = Math.min(stages.length - 1, Math.floor((frame / FRAMES) * stages.length));

    return (
        <section ref={section} className="relative h-[360vh]">
            {/* the site nav is sticky and 72px tall, so the stage sits just under it */}
            <div className="sticky top-[72px] h-[calc(100svh-72px)] overflow-hidden flex flex-col">
                <div className="px-6 sm:px-14 pt-10 sm:pt-14 flex flex-wrap items-end justify-between gap-4">
                    <div>
                        <p className="kg-sans text-xs sm:text-sm tracking-[0.3em] uppercase font-bold text-[#E8A23A]">{kicker}</p>
                        <h1 className="kg-serif text-5xl sm:text-7xl font-extrabold text-[#F4EFE6] leading-none mt-3">{title}</h1>
                    </div>
                    <p className="kg-sans text-[#C3CAD8] text-sm sm:text-base tabular-nums">
                        <span className="kg-serif text-3xl sm:text-4xl font-bold text-[#E8A23A] mr-2">{radiusAt(frame)}</span>{distance}
                    </p>
                </div>
                <div className="relative flex-1 min-h-0 flex items-center justify-center px-2 sm:px-10">
                    <canvas ref={canvas} role="img" aria-label="Isometric render of a Kyoto town growing outward from a torii on a hillside"
                        className="max-w-full max-h-full w-auto h-auto" style={{ imageRendering: "auto" }} />
                </div>
                <div className="px-6 sm:px-14 pb-10 sm:pb-14 flex items-end justify-between gap-6">
                    <p key={stage} className="kg-serif kg-fade text-2xl sm:text-4xl font-bold text-[#F4EFE6]">{stages[stage]}</p>
                    <p className={`kg-sans text-xs tracking-[0.25em] uppercase text-[#8D96AA] transition-opacity duration-500 ${frame > 2 ? "opacity-0" : "opacity-100"}`}>{scroll} ↓</p>
                </div>
            </div>
        </section>
    );
}
