import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "./components/Nav";

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
    <html lang="en" className="h-auto">
      <body className={`${inter.className} sm:mx-14`}>
        <Nav/>
        {children}
        </body>
    </html>
  );
}
