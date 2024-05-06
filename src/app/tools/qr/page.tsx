'use client'

import { useQRCode } from "next-qrcode";
import { useState } from "react";

export default function Qr() {
    const [qrForm, setQrForm] = useState({
        link: 'https://exzachly.notion.site',
        fileName: 'image'
    })
    const { Image } = useQRCode();

    const handleChange = (e: { target: { value: string; name: string; }; }) => {
        const { name, value } = e.target;
        if (value !== "") {
            setQrForm((prevQrForm) => {
                return {
                    ...prevQrForm,
                    [name]: value
                }
            })
        } else {
            setQrForm(prevQrForm => {
                return {
                    ...prevQrForm,
                    [name]: name === "link" ? "https://" : "image"
                }
            })
        }

    }

    const downloadQR = () => {
        const qr = document.getElementById('qr-holder');
        const a = document.createElement('a');
        a.href = (qr?.childNodes[0] as HTMLImageElement).src;
        a.download = `${qrForm.fileName}.png`
        a.click()
    }

    return (
        <main className="mx-5 h-3/4">
            <h1 className="text-vw leading-none sm:text-7xl font-bold">Free QR Code Generator</h1>
            <h4 className="text-xl my-4">Tired of paying for QR Code? This one is for you.</h4>
            <div className="flex justify-center items-center h-4/6">
                <div className="flex flex-col gap-1 md:flex-row items-center">
                    <div className="rounded-lg flex justify-center dark:bg-neutral-200 p-4" id="qr-holder">

                        <Image
                            alt='QR Code display'
                            text={qrForm.link}
                            options={{
                                type: 'image/jpeg',
                                quality: 0.3,
                                errorCorrectionLevel: 'M',
                                margin: 3,
                                scale: 4,
                                width: 200,
                                color: {
                                    dark: "#171717",
                                    light: "#ffffff"
                                }
                            }}
                        />
                    </div >
                    <div>
                        <input type="text" onChange={handleChange} name="link" value={qrForm.link}
                            className="dark:bg-neutral-900 text-center p-4 rounded hover:rounded-lg md:h-min" />
                        <div className="dark:bg-neutral-900 text-center p-4 rounded hover:rounded-lg md:h-min">

                            <input type="text" onChange={handleChange} name="fileName" value={qrForm.fileName} className="bg-transparent text-right"></input>
                            <span>.png</span>
                        </div>
                        <button type="submit" onClick={downloadQR}>Download</button>
                    </div>

                </div>
            </div>
        </main>
    )
}

