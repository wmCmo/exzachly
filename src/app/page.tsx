import { QrCode, Timer} from "@phosphor-icons/react/dist/ssr";

export default function Home() {

  const tools = [
    {
      name: "QR Code",
      path: "/tools/qr",
      desc: "Generate your QR Code for free",
      file: <QrCode fill="#383838" weight="thin" className="dark:fill-neutral-500" size='5em'/>
    },
    {
      name: "Pomodoro",
      path: "/tools/tomato",
      desc: "Your minimal Pomodoro Timer",
      file: <Timer fill="#383838" weight="thin" className="dark:fill-neutral-500" size='5em'/>
    },
  ]
  const mappedTools = tools.map((tool) => {
    return (
      <a href={tool.path} key={tool.name} className="text-neutral-600 dark:text-neutral-300">
        <div className="mt-8 p-5 flex items-center justify-between bg-white dark:bg-neutral-800 rounded-lg">
          <div className="col">
            <h4 className="text-xl font-bold">{tool.name}</h4>
            <p className="dark:text-neutral-300">{tool.desc}</p>
          </div>
          <div className="col">
            {tool.file}
          </div>
        </div>
      </a>
    )
  })

  return (
    <>
      <main className="mx-20 my-16">
        <h1 className="text-9xl font-black">It&apos;s me, <span className="text-lime-500">Zach.</span></h1>
        <div className="my-16 p-6 bg-neutral-900 rounded-xl">
          <h2 className="text-3xl font-semibold">Tools you might like</h2>
          <div className="sm:grid grid-cols-2 gap-8">
            {mappedTools}
          </div>
        </div>
      </main>
    </>
  )
}
