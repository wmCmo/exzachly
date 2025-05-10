import { QrCode, Timer, Selection, Textbox, BookBookmark, Keyboard } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import path from "path";

export default function Tools() {
    const tools = [
        {
            name: "QR Code",
            path: "/tools/qr",
            desc: "Generate your QR Code for free",
            file: <QrCode fill="#383838" weight="thin" className="dark:fill-neutral-500" size='5em' />
        },
        {
            name: "Pomodoro",
            path: "https://wmcmo.github.io/tomato/",
            desc: "Your minimal Pomodoro Timer",
            file: <Timer fill="#383838" weight="thin" className="dark:fill-neutral-500" size='5em' />
        },
        {
            name: "Empty Character",
            path: "/tools/empchar",
            desc: "Copy the Empty Character",
            file: <Selection fill="#383838" weight="thin" className="dark:fill-neutral-500" size='5em' />
        },
        {
            name: "Character Counter",
            path: "/tools/char-count",
            desc: "Count Characters as You Write",
            file: <Textbox fill="#383838" weight="thin" className="dark:fill-neutral-500" size='5em' />
        },
        {
            name: "Jisho Slide",
            path: "https://wmcmo.github.io/jisho-slide/",
            desc: "言葉の流れに浸る",
            file: <BookBookmark fill="#383838" weight="thin" className="dark:fill-neutral-500" size='5em' />
        },
        {
            name: "TH-EN Keys",
            path: "/tools/th-en",
            desc: "Forgot to change language?",
            file: <Keyboard fill="#383838" weight="thin" className="dark:fill-neutral-500" size='5em' />
        }
    ];

    const mappedTools = tools.map((tool) => {
        return (
            <Link href={tool.path} key={tool.name} className="text-neutral-600 dark:text-neutral-300" target={tool.name === 'Pomodoro' ? '_blank' : ''}>
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
                <h2 className="text-neutral-800 dark:text-neutral-200 text-3xl">Tools you might like</h2>
                <div className="sm:grid grid-cols-2 gap-8 lg:grid-cols-3 py-4">
                    {mappedTools}
                </div>
            </div>
        </div>
    );
}
