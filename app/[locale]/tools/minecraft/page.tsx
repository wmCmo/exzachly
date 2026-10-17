import { isLocale } from "@/types/Locales";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { content } from "./kyoto-gate/content";

export const metadata: Metadata = {
    title: "Minecraft",
    description: "Data packs from my worlds.",
};

export default async function Minecraft({ params }: { params: Promise<{ locale: string; }>; }) {
    const { locale: raw } = await params;
    const locale = isLocale(raw) ? raw : "en";
    const t = content[locale];
    return (
        <div className="h-full">
            <div className="p-8 bg-neutral-100 dark:bg-neutral-900 rounded-lg">
                <h2 className="text-neutral-800 dark:text-neutral-200 text-3xl font-bold">{t.hub.title}</h2>
                <p className="text-neutral-600 dark:text-neutral-400 mt-1">{t.hub.body}</p>
                <div className="sm:grid grid-cols-2 gap-8 lg:grid-cols-3 py-4">
                    <Link href={`/${locale}/tools/minecraft/kyoto-gate`}
                        className="group mt-4 sm:mt-0 block rounded-lg overflow-hidden bg-[#141A2A] transition duration-200 hover:-translate-y-0.5 hover:shadow-lg">
                        <div className="relative aspect-[16/10]">
                            <Image src="/minecraft/kyoto-gate/overview.webp" alt="Isometric render of a Kyoto town grown from a torii"
                                fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                                className="object-contain p-3 transition-transform duration-500 group-hover:scale-105" />
                        </div>
                        <div className="p-5">
                            <p className="text-xs tracking-[0.25em] uppercase font-bold text-[#E8A23A]">{t.hub.tag}</p>
                            <h4 className="text-xl font-bold text-[#F4EFE6] mt-1">Kyoto Gate</h4>
                            <p className="text-[#C3CAD8]">{t.hub.card}</p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}
