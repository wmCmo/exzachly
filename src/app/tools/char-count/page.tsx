'use client'

import { useState } from "react"

export default function CharCount() {
    const [text, setText] = useState('')

    const handleChange = (e: { target: { value: string } }) => {
        const value = e.target.value;
        setText(value);
    }

    return (
        <div>
            <textarea onChange={handleChange} name="text" id="text" className="dark:bg-neutral-100 dark:text-black resize rounded-md p-4"></textarea>
            <h3>You now have {text.length} characters</h3>
        </div>
    )
}