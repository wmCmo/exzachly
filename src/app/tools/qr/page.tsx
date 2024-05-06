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
        <main className="mx-5 h-3/4 text-neutral-800 dark:text-neutral-200">
            <h1 className="text-vw leading-none sm:text-7xl font-bold">Free QR Code Generator</h1>
            <h4 className="text-xl my-4">Tired of paying for QR Codes? This one is for you.</h4>
            <div className="flex flex-col gap-6 sm:flex-row items-center sm:mt-12 mt-0">
                <div className="col rounded-lg flex justify-center bg-white p-1" id="qr-holder">
                    <Image
                        text={qrForm.link}
                        options={{
                            type: 'image/jpeg',
                            quality: 0.3,
                            errorCorrectionLevel: 'M',
                            margin: 3,
                            scale: 4,
                            width: 190,
                            color: {
                                dark: "#171717",
                                light: "#ffffff"
                            }
                        }}
                    />
                </div >
                <div className="col flex flex-col gap-4 item-end">
                    <input type="text" onChange={handleChange} name="link" value={qrForm.link}
                        className="bg-white dark:bg-neutral-700 text-center p-4 rounded-lg hover:rounded-lg w-30"/>
                    <div className="bg-white dark:bg-neutral-700 text-center p-4 rounded-lg hover:rounded-lg flex w-30">
                        <input type="text" onChange={handleChange} name="fileName" value={qrForm.fileName} className="bg-transparent text-right"></input>
                        <span>.png</span>
                    </div>
                    <button type="submit" onClick={downloadQR} className="bg-neutral-400 dark:bg-neutral-900 p-3 rounded-lg font-bold">Download</button>
                </div>
            </div>
        </main>
    )
}
