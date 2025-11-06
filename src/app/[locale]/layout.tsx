import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { locales } from "@/middleware";
import { getDictionary } from "../dictionaries";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const title = "Exzachly | Zach's Personal Website";
const description = "Hand-crafted productivity tools and more.";
const imageURL = "https://w9bzpeofpetbsuv8.public.blob.vercel-storage.com/exzachly.png";

export const viewport: Viewport = {
  themeColor: "#5FA845"
};

export const metadata: Metadata = {
  title: { default: title, template: `%s | ${title}` },
  description: description,
  keywords: "qr code generator, character counter, notion, personal website, pomodoro, online tools, empty character",
  openGraph: {
    title: title,
    description: description,
    images: [
      {
        url: imageURL,
        width: 1200,
        height: 360,
        alt: "Exzachly's site thumbnail"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: title,
    description: description,
    images: [
      imageURL
    ]
  }
};

export default async function RootLayout({
  children, params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string; }>;
}>) {
  const { locale } = await params;
  const dict = await getDictionary(locale as locales);
  return (
    <html lang={locale} className="min-h-screen">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com"></link>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"></link>
        <link href="https://fonts.googleapis.com/css2?family=Zen+Maru+Gothic:wght@300;400;500;700;900&display=swap" rel="stylesheet"></link>
      </head>
      <body className={`${inter.variable} flex flex-col min-h-screen`}>
        <Nav dict={dict.nav} locale={locale as locales} />
        <main id="main" className="mx-5 sm:mx-14 flex-1">
          {children}
        </main>
        <div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
