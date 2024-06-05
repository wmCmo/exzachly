'use client'
export default function EmptyChar() {
    const empChar = "‎";
    return (
        <div className="flex flex-col items-center justify-center h-screen px-8">
            <h1 className="text-vw leading-none sm:text-5xl font-bold text-neutral-800 dark:text-white">Copy your invisible character</h1>
            <button onClick={() => navigator.clipboard.writeText(empChar)} className="bg-neutral-200 p-4 dark:bg-neutral-900 rounded mt-8 outline outline-1 hover:outline-offset-1">Copy U+200E</button>
        </div>
    )
}
