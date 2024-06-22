import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "./components/Nav";
import Footer from "./components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Exzachly",
  description: "Zach's personal website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-svh">
      <body className={`${inter.className} h-full`}>
        <Nav />
        <div id="main" className="mx-5 sm:mx-14">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
