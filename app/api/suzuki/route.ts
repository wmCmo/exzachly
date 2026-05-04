import { NextRequest, NextResponse } from "next/server";
import * as cheerio from 'cheerio';
import MoraType from "@/types/Suzuki";

export async function POST(request: NextRequest) {
    try {
        const { sentence } = await request.json();

        const params = {
            "_method": "POST",
            "data[Phrasing][text]": sentence,
            "data[Phrasing][curve]": "advanced",
            "data[Phrasing][accent]": "advanced",
            "data[Phrasing][accent_mark]": "all",
            "data[Phrasing][estimation]": "crf",
            "data[Phrasing][analyze]": "true",
            "data[Phrasing][phrase_component]": "invisible",
            "data[Phrasing][param]": "invisible",
            "data[Phrasing][subscript]": "visible",
            "data[Phrasing][jeita]": "invisible",
        };

        const formData = new URLSearchParams(params).toString();
        const data = await fetch('https://www.gavo.t.u-tokyo.ac.jp/ojad/phrasing/index', {
            body: formData,
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" }
        });

        if (!data.ok) {
            throw new Error(data.statusText);
        }
        const moras: MoraType[] = [];
        const html = await data.text();
        const $ = cheerio.load(html);
        const $phrasingText = $('.phrasing_text').children('span');
        $phrasingText.each(function () {
            moras.push({
                value: $(this).find("span.char").text(),
                accent: $(this).hasClass("accent_top"),
                unvoiced: $(this).hasClass("unvoiced")
            });
        });

        console.log(moras);
        return NextResponse.json({ moras });
    } catch (error) {
        return NextResponse.json(error);
    }
}