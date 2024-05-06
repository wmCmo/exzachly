import { QrCode, Timer } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

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
    ]
    const mappedTools = tools.map((tool) => {
        return (
            <Link href={tool.path} key={tool.name} className="text-neutral-600 dark:text-neutral-300" target={tool.name === 'Pomodoro' ? '_blank' : ''}>
                <div className="mt-8 p-5 flex items-center justify-between bg-white dark:bg-neutral-800 rounded-lg">
                    <div className="col">
                        <h4 className="text-xl font-bold">{tool.name}</h4>
                        <p className="dark:text-neutral-300">{tool.desc}</p>
                    </div>
                    <div className="col">
                        {tool.file}
                    </div>
                </div>
            </Link>
        )
    })
    return (
        <>
            <div className="my-10 p-6 bg-neutral-100 dark:bg-neutral-900 rounded-xl">
                <h2 className="text-neutral-800 dark:text-neutral-200 text-3xl">Tools you might like</h2>
                <div className="sm:grid grid-cols-2 gap-8 lg:grid-cols-3">
                    {mappedTools}
                </div>
            </div>
        </>
    )
}