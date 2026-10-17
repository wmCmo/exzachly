import { isLocale } from "@/types/Locales";
import type { Metadata } from "next";
import { Shippori_Mincho_B1, Zen_Kaku_Gothic_New } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import CopyCommand from "./CopyCommand";
import Glyphs from "./Glyphs";
import GrowHero from "./GrowHero";
import { content } from "./content";

const serif = Shippori_Mincho_B1({ weight: ["500", "700", "800"], subsets: ["latin"], variable: "--kg-serif", preload: false });
const sans = Zen_Kaku_Gothic_New({ weight: ["400", "500", "700"], subsets: ["latin"], variable: "--kg-sans", preload: false });

const BASE = "/minecraft/kyoto-gate";
const ZIP = `${BASE}/kyoto_gate.zip`;

// [width, height] of every image in public/minecraft/kyoto-gate
const SIZES: Record<string, [number, number]> = {
    cluster: [1600, 1269], bridge: [1600, 1063], kura: [1400, 1071], kare: [1088, 699], moss: [1088, 665],
    street: [1600, 1287], overview: [1600, 851], trade: [1280, 1044], craft: [800, 760], lattice: [1280, 720],
    shop: [1280, 720], senbon: [1280, 775], inside: [1600, 900], tea: [1600, 900], pond: [1600, 900],
    stream: [1600, 900], alley: [1600, 900], pagoda: [1600, 900], dusk: [1600, 900], "yasaka-map": [512, 768],
};

function Pic({ name, alt, className, sizes = "(min-width: 1024px) 50vw, 100vw", pixel = false }:
    { name: string; alt: string; className?: string; sizes?: string; pixel?: boolean; }) {
    const [w, h] = SIZES[name];
    return <Image src={`${BASE}/${name}.webp`} alt={alt} width={w} height={h} sizes={sizes}
        className={className} style={pixel ? { imageRendering: "pixelated" } : undefined} />;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; }>; }): Promise<Metadata> {
    const { locale } = await params;
    const t = content[isLocale(locale) ? locale : "en"];
    return {
        title: t.meta.title,
        description: t.meta.description,
        openGraph: { title: t.meta.title, description: t.meta.description, images: [{ url: `${BASE}/overview.webp`, width: 1600, height: 851 }] },
    };
}

export default async function KyotoGate({ params }: { params: Promise<{ locale: string; }>; }) {
    const { locale: raw } = await params;
    const locale = isLocale(raw) ? raw : "en";
    const t = content[locale];

    const kicker = "kg-sans text-xs sm:text-sm tracking-[0.3em] uppercase font-bold";
    const h2 = "kg-serif text-3xl sm:text-5xl font-bold leading-tight";

    return (
        <div className={`${serif.variable} ${sans.variable} kg-sans -mx-5 sm:-mx-14 -mt-10 bg-[#141A2A] text-[#C3CAD8] overflow-x-clip`}>
            <style>{`
                .kg-serif { font-family: var(--kg-serif), "Shippori Mincho B1", Georgia, serif; }
                .kg-sans { font-family: var(--kg-sans), "Zen Kaku Gothic New", system-ui, sans-serif; }
                @keyframes kg-fade { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
                .kg-fade { animation: kg-fade 600ms ease-out both; }
                @media (prefers-reduced-motion: reduce) { .kg-fade { animation: none; } }
            `}</style>

            <GrowHero {...t.hero} />

            {/* intro */}
            <section className="px-6 sm:px-14 py-20 sm:py-28 max-w-6xl mx-auto grid gap-10 lg:grid-cols-[3fr_2fr] items-end">
                <div>
                    <p className="kg-serif text-3xl sm:text-5xl font-bold leading-snug text-[#F4EFE6]">{t.intro.lead}</p>
                    <p className="mt-6 text-lg leading-relaxed max-w-2xl">{t.intro.body}</p>
                </div>
                <div className="flex flex-col items-start gap-3">
                    <a href={ZIP} download className="kg-sans inline-flex items-center gap-3 rounded-xl bg-[#E8A23A] hover:bg-[#F0B458] transition-colors px-7 py-4 text-lg font-bold text-[#141A2A]">
                        {t.intro.download} <span aria-hidden>↓</span>
                    </a>
                    <p className="text-sm text-[#8D96AA]">{t.intro.meta}</p>
                </div>
            </section>

            {/* origin */}
            <section id="origin" className="scroll-mt-[72px] bg-[#F1EBE0] text-[#4A4F5C]">
                <div className="px-6 sm:px-14 py-20 sm:py-28 max-w-6xl mx-auto grid gap-12 lg:grid-cols-[2fr_3fr] items-center">
                    <figure className="max-w-sm mx-auto lg:mx-0">
                        <Pic name="yasaka-map" alt={t.origin.caption} pixel sizes="(min-width: 1024px) 384px, 80vw" className="w-full h-auto rounded-sm shadow-xl" />
                        <figcaption className="mt-3 text-sm text-[#6A6F7A]">{t.origin.caption}</figcaption>
                    </figure>
                    <div>
                        <p className={`${kicker} text-[#C8412C]`}>{t.origin.kicker}</p>
                        <h2 className={`${h2} text-[#1A1F2C] mt-3`}>{t.origin.title}</h2>
                        {t.origin.body.map((p) => <p key={p} className="mt-5 text-lg leading-relaxed">{p}</p>)}
                        <blockquote className="kg-serif mt-8 text-2xl sm:text-3xl font-bold text-[#C8412C]">“{t.origin.quote}”</blockquote>
                    </div>
                </div>
            </section>

            {/* how it grows */}
            <section id="grow" className="scroll-mt-[72px] px-6 sm:px-14 py-20 sm:py-28 max-w-6xl mx-auto">
                <p className={`${kicker} text-[#E8A23A]`}>{t.grow.kicker}</p>
                <div className="mt-10 flex flex-col gap-20">
                    {t.grow.steps.map((s, i) => (
                        <div key={s.title} className={`grid gap-8 lg:grid-cols-2 items-center ${i % 2 ? "lg:[&>*:first-child]:order-2" : ""}`}>
                            <div>
                                <p className="kg-serif text-5xl font-extrabold text-[#E8A23A]">{i + 1}</p>
                                <h3 className="kg-serif text-3xl sm:text-4xl font-bold text-[#F4EFE6] mt-2">{s.title}</h3>
                                <p className="mt-4 text-lg leading-relaxed">{s.body}</p>
                            </div>
                            <Pic name={s.image} alt={s.alt} className="w-full h-auto" />
                        </div>
                    ))}
                </div>
            </section>

            {/* what grows */}
            <section id="town" className="scroll-mt-[72px] bg-[#1E2638]">
                <div className="px-6 sm:px-14 py-20 sm:py-28 max-w-6xl mx-auto">
                    <p className={`${kicker} text-[#E8A23A]`}>{t.town.kicker}</p>
                    <h2 className={`${h2} text-[#F4EFE6] mt-3 max-w-4xl`}>{t.town.title}</h2>
                    <p className="mt-5 text-lg leading-relaxed max-w-3xl">{t.town.body}</p>
                    {t.town.groups.map((g) => (
                        <div key={g.name} className="mt-14">
                            <h3 className="kg-serif text-2xl font-bold text-[#F4EFE6]">{g.name}</h3>
                            <div className={`mt-5 grid gap-4 grid-cols-1 sm:grid-cols-2 ${g.items.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}>
                                {g.items.map((it) => (
                                    <figure key={it.label} className="rounded-xl overflow-hidden bg-[#141A2A]">
                                        <div className="aspect-[4/3] relative">
                                            <Image src={`${BASE}/${it.image}.webp`} alt={it.alt} fill sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                                                className={"render" in it && it.render ? "object-contain p-3" : "object-cover"} />
                                        </div>
                                        <figcaption className="px-4 py-3 font-bold text-[#F4EFE6]">{it.label}</figcaption>
                                    </figure>
                                ))}
                            </div>
                        </div>
                    ))}
                    <div className="mt-16 grid gap-6 lg:grid-cols-2">
                        {[t.town.inside, t.town.pagoda].map((b, i) => (
                            <figure key={b.title} className="rounded-xl overflow-hidden bg-[#141A2A]">
                                <Pic name={i ? "pagoda" : "inside"} alt={b.alt} className="w-full h-auto" />
                                <figcaption className="p-6">
                                    <h3 className="kg-serif text-2xl font-bold text-[#F4EFE6]">{b.title}</h3>
                                    <p className="mt-2 leading-relaxed">{b.body}</p>
                                </figcaption>
                            </figure>
                        ))}
                    </div>
                    <p className="mt-10 text-lg leading-relaxed max-w-3xl">{t.town.seasons}</p>
                </div>
            </section>

            {/* weird shops */}
            <section id="shops" className="scroll-mt-[72px] px-6 sm:px-14 py-20 sm:py-28 max-w-6xl mx-auto grid gap-12 lg:grid-cols-2 items-center">
                <div>
                    <p className={`${kicker} text-[#E8A23A]`}>{t.shops.kicker}</p>
                    <h2 className={`${h2} text-[#F4EFE6] mt-3`}>{t.shops.title}</h2>
                    <p className="mt-5 text-lg leading-relaxed">{t.shops.body}</p>
                    <div className="mt-8"><Glyphs lines={t.shops.lines} hint={t.shops.hint} /></div>
                </div>
                <Pic name="trade" alt={t.shops.alt} pixel className="w-full h-auto rounded-xl" />
            </section>

            {/* reads the ground */}
            <section id="ground" className="scroll-mt-[72px] bg-[#F1EBE0] text-[#4A4F5C]">
                <div className="px-6 sm:px-14 py-20 sm:py-28 max-w-6xl mx-auto">
                    <p className={`${kicker} text-[#C8412C]`}>{t.ground.kicker}</p>
                    <h2 className={`${h2} text-[#1A1F2C] mt-3 max-w-3xl`}>{t.ground.title}</h2>
                    <div className="mt-10 grid gap-10 lg:grid-cols-2 items-center">
                        <table className="w-full text-left text-[#1A1F2C]">
                            <thead>
                                <tr className="border-b-2 border-[#1A1F2C]">
                                    {t.ground.head.map((h) => <th key={h} className="py-3 pr-4 font-bold">{h}</th>)}
                                </tr>
                            </thead>
                            <tbody>
                                {t.ground.rows.map(([a, b]) => (
                                    <tr key={a} className="border-b border-[#D8CFBF]">
                                        <td className="py-3 pr-4">{a}</td>
                                        <td className="py-3">{b}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <Pic name="bridge" alt={t.ground.alt} className="w-full h-auto" />
                    </div>
                </div>
            </section>

            {/* survival */}
            <section id="survival" className="scroll-mt-[72px] px-6 sm:px-14 py-20 sm:py-28 max-w-6xl mx-auto grid gap-12 lg:grid-cols-2">
                <div>
                    <p className={`${kicker} text-[#E8A23A]`}>{t.survival.kicker}</p>
                    <h2 className={`${h2} text-[#F4EFE6] mt-3`}>{t.survival.title}</h2>
                    <p className="mt-5 text-lg leading-relaxed">{t.survival.body}</p>
                    <Pic name="craft" alt={t.survival.alt} pixel sizes="(min-width: 1024px) 420px, 90vw" className="mt-8 w-full max-w-md h-auto rounded-xl" />
                </div>
                <div className="lg:pt-24">
                    <h3 className="kg-serif text-3xl font-bold text-[#F4EFE6]">{t.survival.offering.title}</h3>
                    <p className="mt-4 text-lg leading-relaxed">{t.survival.offering.body}</p>
                    <ul className="mt-6 flex flex-col gap-3">
                        {t.survival.offering.rows.map(([a, b], i) => (
                            <li key={a} className={`flex items-center justify-between rounded-xl bg-[#1E2638] px-6 py-4 border-l-4 ${i === 2 ? "border-[#C8412C]" : "border-[#E8A23A]"}`}>
                                <span>{a}</span>
                                <span className="kg-serif text-2xl font-extrabold text-[#F4EFE6]">{b}</span>
                            </li>
                        ))}
                    </ul>
                    <p className="mt-5 text-[#8D96AA]">{t.survival.offering.endless}</p>
                </div>
            </section>

            {/* install */}
            <section id="download" className="scroll-mt-[72px] bg-[#1E2638]">
                <div className="px-6 sm:px-14 py-20 sm:py-28 max-w-4xl mx-auto">
                    <p className={`${kicker} text-[#E8A23A]`}>{t.install.kicker}</p>
                    <h2 className={`${h2} text-[#F4EFE6] mt-3`}>{t.install.title}</h2>
                    <ol className="mt-10 flex flex-col gap-4">
                        {t.install.steps.map((s, i) => (
                            <li key={s} className="flex flex-wrap items-center gap-x-4 gap-y-2 rounded-xl bg-[#141A2A] px-6 py-5">
                                <span className="kg-serif text-3xl font-extrabold text-[#E8A23A] w-8">{i + 1}</span>
                                <span className="text-lg text-[#F4EFE6]">{s}</span>
                                {i === 2 && <CopyCommand command="/reload" copy={t.install.copy} copied={t.install.copied} />}
                                {i === 3 && <CopyCommand command="/function kyoto:gate" copy={t.install.copy} copied={t.install.copied} />}
                            </li>
                        ))}
                    </ol>
                    <p className="mt-6 flex flex-wrap items-center gap-3">
                        <span>{t.install.settings}</span>
                        <CopyCommand command="/function kyoto:settings" copy={t.install.copy} copied={t.install.copied} />
                    </p>
                    <a href={ZIP} download className="kg-sans mt-10 inline-flex items-center gap-3 rounded-xl bg-[#E8A23A] hover:bg-[#F0B458] transition-colors px-7 py-4 text-lg font-bold text-[#141A2A]">
                        {t.install.download} <span aria-hidden>↓</span>
                    </a>
                </div>
            </section>

            {/* closing */}
            <section id="end" className="scroll-mt-[72px] relative h-[70vh] min-h-[420px] flex items-end">
                <Image src={`${BASE}/dusk.webp`} alt={t.closing.alt} fill sizes="100vw" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141A2A] via-[#141A2A]/50 to-transparent" />
                <div className="relative px-6 sm:px-14 pb-14 w-full max-w-6xl mx-auto flex flex-wrap items-end justify-between gap-6">
                    <h2 className="kg-serif text-4xl sm:text-6xl font-extrabold text-[#F4EFE6] max-w-3xl leading-tight">{t.closing.title}</h2>
                    <Link href={`/${locale}/tools/minecraft`} className="text-[#E8A23A] hover:underline">← {t.closing.back}</Link>
                </div>
            </section>
        </div>
    );
}
