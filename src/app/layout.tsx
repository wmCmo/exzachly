import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "./components/Nav";
import Footer from "./components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Exzachly",
  description: "Zach's personal website",
  keywords: "qr code generator, character counter, notion, personal website, pomodoro, online tools, empty character"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="min-h-screen">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <Nav />
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
