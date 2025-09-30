const en = {
    home: {
        greeting: "It's me, ",
        name: "Zach."
    },
    nav: {
        pages: [['home', 'home'], ['tools', 'tools'], ['notion', 'notion'], ['community', 'community'], ['portfolio', 'portfolio'], ['about', 'about']],
    },
    tools: {
        header: "Tools you might like",
        qr: {
            name: "QR Code",
            desc: "Generate any QR Code for free"
        },
        tomato: {
            name: "Pomodoro",
            desc: "Your minimal Pomodoro timer"
        },
        empchar: {
            name: "Empty Character",
            desc: "Copy the Empty Character"
        },
        charCount: {
            name: "Text Counter",
            desc: "Count your text as your write"
        },
        jisho: {
            name: "Jisho Slide",
            desc: "Immerse yourself in Japanese"
        },
    },
    charCount: {
        header: "Flexible Text Counter",
        desc: "Layout-free text counter. Designed for you.",
        new: "New Text Box",
        save: "Save",
        reset: "Reset",
        untitled: "Untitled",
        total: "Total",
        selected: "Selected",
        diff: "Diff",
        word: "Word",
        char: "Char",
    },
    qr: {
        header: "Free QR Code Generator",
        desc: "Tired of tracking and redirecting? This one is for you.",
        background: "Background",
        foreground: "Foreground",
        download: "Download",
        filename: "image"
    },
    empchar: {
        header: "Copy your invisible character",
        copy: "Copy"
    },
    community: {
        header: "Community",
        desc: "See my contributions"
    },
    about: {
        my: "My ",
        vcf: "Digital Contact",
        download: "Download Contact File"
    }
};

export default en;

export type DictionaryType = typeof en;