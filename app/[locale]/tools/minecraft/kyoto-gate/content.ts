import type { Locale } from "@/types/Locales";

const en = {
    meta: {
        title: "Kyoto Gate",
        description: "A Minecraft data pack. Plant one torii, and a Kyoto town grows out of it, across whatever terrain is there.",
    },
    hero: {
        kicker: "A Minecraft data pack",
        title: "Kyoto Gate",
        stages: [
            "Plant one torii.",
            "Streets grow first, like vines.",
            "Houses follow the streets.",
            "Then it keeps going.",
        ],
        distance: "blocks from the gate",
        scroll: "Scroll to grow",
    },
    intro: {
        lead: "Plant one torii, and a Kyoto town grows out of it, across whatever terrain is there.",
        body: "Streets, houses, gardens, shrines and a five-storey pagoda. No building by hand: everything in the picture above grew by itself from a single gate.",
        download: "Download",
        meta: "Java Edition 26.3 · 268 KB",
    },
    origin: {
        kicker: "Where it came from",
        title: "I went to Kyoto with my mom",
        body: [
            "We walked up the old lanes to the Yasaka pagoda, the way everyone does. However bad you are at photography, every lane there looks like a still from a film.",
            "Nothing explains itself: windows on no particular floor, staircases to who knows where, shops selling things you can't name. All of it belongs.",
            "Then the other idea: things that spread from one source. The Upside Down's gate, sculk, the world of The Last of Us. What if Kyoto spread like that?",
        ],
        quote: "It's a mess that is beautiful.",
        caption: "My photo of 八坂の塔, in Minecraft map colours.",
    },
    grow: {
        kicker: "How it grows",
        steps: [
            {
                title: "Streets grow first",
                body: "Like vines from the gate. Each street carries energy that fades as it goes: wide stone streets near the gate, single stones further out, stepping stones at the edge. Every height change gets a stair, so slopes stay walkable.",
                image: "street", alt: "Isometric render of a hillside street of houses stepping down the slope",
            },
            {
                title: "Houses follow",
                body: "Each house faces the street and claims a core, its walls and floor, that nothing else may share. Its eaves, porch and pots may overlap the neighbours, which is why the roofs interlock like a real street.",
                image: "cluster", alt: "Isometric render of a neighbourhood: tile and copper roofs, stone lanes, a garden and torii",
            },
            {
                title: "Then it keeps going",
                body: "Streets branch and cross. One that ran far takes root as a new gate with its own torii, and spreads from there. When growth slows, side streets sprout from where the town has already been.",
                image: "overview", alt: "Isometric render of a whole grown town spreading to a lake and a river",
            },
        ],
    },
    town: {
        kicker: "What grows",
        title: "3,600 different houses, before a single lantern is placed",
        body: "3 widths, 2 depths, 1 or 2 storeys, 3 roofs and 4 window layouts, times 25 fronts, interiors and walls that fit together. Then every house rolls its own pots, cushions and lanterns.",
        groups: [
            {
                name: "Street fronts",
                items: [
                    { image: "lattice", label: "Lattice", alt: "A koshi lattice front with its door" },
                    { image: "shop", label: "Shop", alt: "A shop with blue noren and its keeper" },
                    { image: "kura", label: "Storehouse", alt: "Render of a storehouse with a black-and-white namako band", render: true },
                    { image: "tea", label: "Tea house", alt: "A tea house with a glass shoji wall and an engawa" },
                ],
            },
            {
                name: "Gardens, where a house won't fit",
                items: [
                    { image: "kare", label: "Dry garden", alt: "Render of a dry garden of gravel, rocks and a stone lantern", render: true },
                    { image: "moss", label: "Moss garden", alt: "Render of a moss garden with stepping stones", render: true },
                    { image: "pond", label: "Pond and waterfall", alt: "A pond with a lily pad fed by a small waterfall" },
                ],
            },
            {
                name: "Some gates grow districts",
                items: [
                    { image: "stream", label: "Stream", alt: "A stone channel of water beside the street" },
                    { image: "senbon", label: "Senbon torii", alt: "Inside a tunnel of red torii" },
                    { image: "alley", label: "Shop alley", alt: "A narrow lane of shops with noren and lanterns" },
                ],
            },
        ],
        inside: {
            title: "Every house is furnished",
            body: "Tatami rooms with a low table and cushions, an irori hearth, earthen-floored kitchens, storehouses full of barrels, futons upstairs.",
            alt: "Through a glass wall: a room with a low table and cushions",
        },
        pagoda: {
            title: "The pagoda is the heart",
            body: "Once ten houses stand around the first gate, a five-storey pagoda rises, about 36 blocks tall. The pagoda that started the trip grows out of the town.",
            alt: "The five-storey pagoda at sunset above the town",
        },
        seasons: "Trees follow the biome: sakura in spring biomes, red, orange and yellow poplars in the Dappled Forest, spruce in the snow, pine everywhere else.",
    },
    shops: {
        kicker: "Purpose unknown",
        title: "Weird shops",
        body: "Shopkeepers sell things nobody can identify. Every name is written in the enchanting-table alphabet, and the prices make no sense. Some of the lore is about the gate.",
        hint: "Hover to decode",
        lines: ["purpose unknown", "do not open", "wmcmo"],
        alt: "A shopkeeper's trade screen with glyph-named items",
    },
    ground: {
        kicker: "It reads the ground",
        title: "Kyoto is built into its hills. So is this.",
        rows: [
            ["Flat", "Paves it, wide near the gate"],
            ["One block up or down", "A stone stair"],
            ["A steep rise", "Cuts a staircase into the hill"],
            ["A steep drop", "Stairs on a stone footing"],
            ["Water", "A bridge on timber piers"],
            ["A tree in the way", "Fells it"],
            ["A house over a drop", "Timber stilts, like Kiyomizu-dera"],
        ],
        head: ["The ground", "What the street does"],
        alt: "Isometric render of timber bridges crossing a lake beside a lane of torii",
    },
    survival: {
        kicker: "Survival",
        title: "Craft a Torii Seed",
        body: "Polished blackstone across the top, red concrete for the pillars, a lantern in the centre and a cherry sapling below it. Hold right-click with the seed, and a gate opens where you're looking.",
        alt: "The Torii Seed recipe in the crafting grid",
        offering: {
            title: "Keep it growing with gold",
            body: "The town grows freely until its pagoda rises. Then it rests, until you leave an offering in the box under the bell inside the pagoda.",
            rows: [["1 gold ingot", "1 blessing"], ["1 gold block", "10 blessings"], ["Each new house", "costs 1"]],
            endless: "Rather build freely? Set the rules to endless in the settings.",
        },
    },
    install: {
        kicker: "Java Edition 26.3",
        title: "Install it",
        steps: [
            "Download kyoto_gate.zip.",
            "Put the zip in your world's datapacks folder: saves / your world / datapacks.",
            "In the game, run",
            "Craft a Torii Seed, or plant a gate with",
        ],
        settings: "Speed, night mode, survival or endless, and town size:",
        download: "Download kyoto_gate.zip",
        copy: "Copy",
        copied: "Copied",
    },
    closing: {
        title: "Plant one. Come back to Kyoto.",
        back: "More from Minecraft",
        alt: "A red torii at dusk, a cherry petal drifting past the lanterns",
    },
    hub: {
        title: "Minecraft",
        body: "Data packs from my worlds.",
        card: "Plant one torii, and a Kyoto town grows out of it.",
        tag: "Data pack · Java 26.3",
    },
};

type Content = typeof en;

const ja: Content = {
    meta: {
        title: "Kyoto Gate",
        description: "Minecraftのデータパック。鳥居をひとつ置くと、どんな地形にも京都の町が育っていく。",
    },
    hero: {
        kicker: "Minecraft データパック",
        title: "Kyoto Gate",
        stages: [
            "鳥居をひとつ。",
            "まず、道が蔦のように伸びる。",
            "家が道に沿って建つ。",
            "そして、どこまでも続く。",
        ],
        distance: "ブロック（鳥居から）",
        scroll: "スクロールで育つ",
    },
    intro: {
        lead: "鳥居をひとつ置くと、そこから京都の町が育っていく。どんな地形の上にも。",
        body: "道、町家、庭、祠、そして五重塔。手で建てたものはひとつもありません。上の町はすべて、ひとつの鳥居から自然に育ちました。",
        download: "ダウンロード",
        meta: "Java Edition 26.3 · 268 KB",
    },
    origin: {
        kicker: "はじまり",
        title: "母と京都へ行った",
        body: [
            "みんなと同じように、古い坂道を八坂の塔まで歩きました。写真が下手でも、どの路地も映画のワンシーンのように撮れてしまう場所です。",
            "何ひとつ説明されていない。どの階でもない窓、どこへ続くか分からない階段、名前の分からない物を売る店。それでも全部がそこに馴染んでいる。",
            "もうひとつのアイデアは、ひとつの源から広がっていくもの。裏側の世界のゲート、スカルク、The Last of Us の世界。京都がそんなふうに広がったら？",
        ],
        quote: "美しい、ごちゃごちゃ。",
        caption: "八坂の塔。自分の写真を、Minecraftの地図の色で。",
    },
    grow: {
        kicker: "育ち方",
        steps: [
            {
                title: "まず、道が伸びる",
                body: "鳥居から蔦のように。道は進むほど力が弱まります。鳥居の近くは広い石畳、少し離れると一列の石、町の端では飛び石に。高低差には必ず階段がつくので、坂も歩けます。",
                image: "street", alt: "斜面に沿って家が並ぶ坂道のアイソメトリック画像",
            },
            {
                title: "家が道に沿って建つ",
                body: "家は道に面し、壁と床の「芯」は他と重なりません。軒や縁側、鉢植えは隣と重なってもいい。だから屋根が本物の町並みのように重なり合います。",
                image: "cluster", alt: "瓦と銅の屋根、石畳、庭と鳥居がある一画のアイソメトリック画像",
            },
            {
                title: "そして、どこまでも続く",
                body: "道は枝分かれし、交差します。遠くまで伸びた道は新しい鳥居として根を張り、そこからまた広がる。成長が落ち着くと、通ってきた道から脇道が芽を出します。",
                image: "overview", alt: "湖と川まで広がった町全体のアイソメトリック画像",
            },
        ],
    },
    town: {
        kicker: "町に育つもの",
        title: "提灯ひとつ置く前から、3,600通りの家",
        body: "幅3種、奥行き2種、1階建てか2階建て、屋根3種、窓の配置4種。そこに、組み合わさる表構え・内装・壁の25通り。さらに家ごとに鉢植えや座布団、提灯が加わります。",
        groups: [
            {
                name: "表構え",
                items: [
                    { image: "lattice", label: "格子", alt: "戸口のある格子の表構え" },
                    { image: "shop", label: "店", alt: "青いのれんと店主のいる店" },
                    { image: "kura", label: "蔵", alt: "なまこ壁の蔵のアイソメトリック画像", render: true },
                    { image: "tea", label: "茶屋", alt: "ガラスの障子と縁側のある茶屋" },
                ],
            },
            {
                name: "家が建たない場所には、庭",
                items: [
                    { image: "kare", label: "枯山水", alt: "砂利と岩と石灯籠の枯山水のアイソメトリック画像", render: true },
                    { image: "moss", label: "苔庭", alt: "飛び石のある苔庭のアイソメトリック画像", render: true },
                    { image: "pond", label: "池と滝", alt: "小さな滝が流れ込む、睡蓮の葉のある池" },
                ],
            },
            {
                name: "特別な鳥居から育つ地区",
                items: [
                    { image: "stream", label: "疏水", alt: "道沿いを流れる石組みの水路" },
                    { image: "senbon", label: "千本鳥居", alt: "赤い鳥居が続くトンネルの中" },
                    { image: "alley", label: "商店の路地", alt: "のれんと提灯が並ぶ細い商店の路地" },
                ],
            },
        ],
        inside: {
            title: "どの家にも暮らしがある",
            body: "座卓と座布団の畳の間、囲炉裏、土間の台所、樽の詰まった蔵、2階には布団と箪笥。",
            alt: "ガラス越しに見える、座卓と座布団の部屋",
        },
        pagoda: {
            title: "町の中心は五重塔",
            body: "最初の鳥居のまわりに家が10軒建つと、高さ約36ブロックの五重塔が立ちます。旅のはじまりの塔が、町から生えてくる。",
            alt: "夕暮れの町にそびえる五重塔",
        },
        seasons: "木はバイオームに合わせて。春のバイオームには桜、Dappled Forest には赤・橙・黄のポプラ、雪原にはトウヒ、それ以外は松。",
    },
    shops: {
        kicker: "用途不明",
        title: "不思議な店",
        body: "店主が売るのは、誰にも分からない物ばかり。名前はすべてエンチャントテーブルの文字で、値段もでたらめ。中には鳥居についての言い伝えも。",
        hint: "カーソルを合わせると読める",
        lines: ["purpose unknown", "do not open", "wmcmo"],
        alt: "謎の文字で書かれた品物が並ぶ取引画面",
    },
    ground: {
        kicker: "地形を読む",
        title: "京都は山に沿って建っている。この町も。",
        rows: [
            ["平地", "石畳を敷く。鳥居の近くは広く"],
            ["1ブロックの段差", "石の階段"],
            ["急な登り", "斜面に階段を切り込む"],
            ["急な下り", "石の基礎の上に階段"],
            ["水", "木の橋脚の橋"],
            ["道をふさぐ木", "伐る"],
            ["崖にかかる家", "清水寺のような木の懸造り"],
        ],
        head: ["地形", "道のふるまい"],
        alt: "鳥居の参道の横、湖を渡る木の橋のアイソメトリック画像",
    },
    survival: {
        kicker: "サバイバル",
        title: "鳥居の種をつくる",
        body: "上段に磨かれたブラックストーン、柱に赤のコンクリート、中央にランタン、その下に桜の苗木。種を持って右クリックを長押しすると、見ている場所に鳥居が開きます。",
        alt: "作業台に並べた鳥居の種のレシピ",
        offering: {
            title: "金で育て続ける",
            body: "五重塔が立つまで、町は自由に育ちます。その後は休み、塔の中、鐘の下の箱にお供えをすると再び動き出します。",
            rows: [["金インゴット1個", "ご加護1"], ["金ブロック1個", "ご加護10"], ["新しい家1軒", "ご加護1"]],
            endless: "自由に建てたいなら、設定でルールを endless に。",
        },
    },
    install: {
        kicker: "Java Edition 26.3",
        title: "導入方法",
        steps: [
            "kyoto_gate.zip をダウンロード。",
            "ワールドの datapacks フォルダに zip を入れる（saves / ワールド名 / datapacks）。",
            "ゲーム内で実行：",
            "鳥居の種をつくるか、次のコマンドで鳥居を置く：",
        ],
        settings: "速度・夜モード・サバイバル/エンドレス・町の大きさ：",
        download: "kyoto_gate.zip をダウンロード",
        copy: "コピー",
        copied: "コピーしました",
    },
    closing: {
        title: "鳥居をひとつ。また京都へ。",
        back: "Minecraft 一覧へ",
        alt: "夕暮れの赤い鳥居と、提灯のそばを舞う桜の花びら",
    },
    hub: {
        title: "Minecraft",
        body: "自分のワールドから生まれたデータパック。",
        card: "鳥居をひとつ置くと、京都の町が育っていく。",
        tag: "データパック · Java 26.3",
    },
};

export const content: Record<Locale, Content> = { en, ja };
export type KyotoContent = Content;
