import Image from "next/image"

export default function Home() {

  const tools = [
    {
      name: "QR Code",
      path: "/qr",
      desc: "Generate your QR Code for free"
    },
    // {
    //   name: "QR Code",
    //   path: "/qr",
    //   desc: "Generate your QR Code for free"
    // },
    // {
    //   name: "QR Code",
    //   path: "/qr",
    //   desc: "Generate your QR Code for free"
    // },
    // {
    //   name: "QR Code",
    //   path: "/qr",
    //   desc: "Generate your QR Code for free"
    // }
  ]
  const mappedTools = tools.map((tool) => {
    return (
      <a href={tool.path} key={tool.name}>
        <div className="mt-8 p-5 flex items-center justify-around bg-neutral-800 rounded-lg">
          <div className="col w-2/3">
            <h4 className="text-xl font-bold">{tool.name}</h4>
            <p>{tool.desc}</p>
          </div>
          <div className="col">
            <Image src='/icons/qr-code.svg' alt={tool.name} width={84} height={84} />
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
