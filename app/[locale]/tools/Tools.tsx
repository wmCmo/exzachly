import { getDictionary } from "@/app/dictionaries";
import type { DictionaryType } from "@/app/dictionaries/en";
import { locales } from "@/middleware";
import { QrCode, Timer, Selection, Textbox, BookBookmark, Keyboard } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

export default async function Tools({ dict, locale }: { dict: DictionaryType['tools']; locale: locales; }) {
    const tools = [
        {
            name: dict.qr.name,
            path: `/${locale}/tools/qr`,
            desc: dict.qr.desc,
            file: <QrCode fill="#383838" weight="thin" className="dark:fill-neutral-500" size='5em' />
        },
        {
            name: dict.tomato.name,
            path: "https://wmcmo.github.io/tomato/",
            desc: dict.tomato.desc,
            file: <Timer fill="#383838" weight="thin" className="dark:fill-neutral-500" size='5em' />
        },
        {
            name: dict.empchar.name,
            path: `/${locale}/tools/empchar`,
            desc: dict.empchar.desc,
            file: <Selection fill="#383838" weight="thin" className="dark:fill-neutral-500" size='5em' />
        },
        {
            name: dict.charCount.name,
            path: `/${locale}/tools/char-count`,
            desc: dict.charCount.desc,
            file: <Textbox fill="#383838" weight="thin" className="dark:fill-neutral-500" size='5em' />
        },
        {
            name: dict.jisho.name,
            path: "https://wmcmo.github.io/jisho-slide/",
            desc: dict.jisho.desc,
            file: <BookBookmark fill="#383838" weight="thin" className="dark:fill-neutral-500" size='5em' />
        },
        {
            name: "TH-EN Keys",
            path: `/${locale}/tools/th-en`,
            desc: "Forgot to change language?",
            file: <Keyboard fill="#383838" weight="thin" className="dark:fill-neutral-500" size='5em' />
        }
    ];

    const mappedTools = tools.map((tool) => {
        return (
            <Link target={(['Pomodoro', 'Jisho Slide', '辞書スライド', 'トマト'].includes(tool.name)) ? '_blank' : ''} href={tool.path} key={tool.name} className="text-neutral-600 dark:text-neutral-300">
                <div className=" mt-4 sm:mt-0 p-5 flex items-center justify-between bg-white hover:bg-neutral-50 dark:bg-neutral-800 dark:hover:bg-neutral-700 rounded-lg transition duration-200">
                    <div className="col">
                        <h4 className="text-xl font-bold">{tool.name}</h4>
                        <p className="dark:text-neutral-300">{tool.desc}</p>
                    </div>
                    <div className="col">
                        {tool.file}
                    </div>
                </div>
            </Link>
        );
    });
    return (
        <div className="h-full">
            <div className="p-8 bg-neutral-100 dark:bg-neutral-900 rounded-lg">
                <h2 className="text-neutral-800 dark:text-neutral-200 text-3xl font-bold">{dict.header}</h2>
                <div className="sm:grid grid-cols-2 gap-8 lg:grid-cols-3 py-4">
                    {mappedTools}
                </div>
            </div>
        </div>
    );
}
