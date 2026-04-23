import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Tools",
    description: "Your minimal toolbox. Designed with care."
};

export default function MenuLayout({ children, }: { children: React.ReactNode; }) {
    return (
        <>
            {children}
        </>
    );
}