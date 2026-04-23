const en = {
    univeral: {
        new: 'NEW'
    },
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
        total: "Count",
        selected: "Selected",
        diff: "Diff",
        word: "Word",
        char: "Char",
        timer: "Speaking Pace Timer",
        speechTimer: {
            passage: "Self-improvement is a lifelong journey of refining who you are and who you aspire to become. It begins with self-awareness—recognizing strengths, weaknesses, and patterns that shape your daily life. Growth comes from consistent effort: setting clear goals, building habits, and embracing challenges as opportunities to learn. Discipline fuels progress, but so does compassion—acknowledging setbacks without self-criticism. Reading, reflecting, and seeking feedback expand perspective, while mindfulness keeps you grounded in the present. True improvement isn’t about perfection; it’s about becoming a little better each day, aligning actions with values, and steadily moving toward the best version of yourself.",
            limit: 100,
            unit: "words",
            new: "NEW",
            back: "Text Counter",
            title: "Let's see your speaking pace!",
            prepare: "Click start to time your speech!",
            timed: "Keep going!",
            record: ["Your last record", "words per minute"],
            start: "Start!",
            stop: "Stop",
            reset: "Reset",
            instruct: "Read this"
        }
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