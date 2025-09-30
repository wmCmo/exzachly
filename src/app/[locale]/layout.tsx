import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { locales } from "@/middleware";
import { getDictionary } from "../dictionaries";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Exzachly",
  description: "Zach's personal website",
  keywords: "qr code generator, character counter, notion, personal website, pomodoro, online tools, empty character"
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
      <body className={`${inter.className} flex flex-col min-h-screen`}>
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
