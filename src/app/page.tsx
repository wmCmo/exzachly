export default function Home() {

  const tools = [
    {
      name: "QR Code",
      path: "/qr"
    },
    {
      name: "QR Code",
      path: "/qr"
    },
    {
      name: "QR Code",
      path: "/qr"
    },
    {
      name: "QR Code",
      path: "/qr"
    }
  ]
  const mappedTools = tools.map((tool) => {
    return (
      <>
        <div className="my-14 p-5 bg-gray-800 rounded-lg">
          <h4>{tool.name}</h4>
        </div>
      </>
    )
  })

  return (
    <>
      <main className="mx-20 my-16">
        <h1 className="text-9xl font-black">It&apos;s me, Zach.</h1>
        <div className="my-16 p-6 bg-gray-900 rounded-xl">
          <h2 className="text-4xl font-semibold">Tools</h2>
          <div className="grid-cols-2">
            {mappedTools}
          </div>
        </div>
      </main>

    </>
  )
}
