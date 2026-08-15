import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
    metadataBase: new URL("https://builtfurther.com"),
    title: { default: "Built Further | Custom Software Development", template: "%s | Built Further" },
    description: "Custom software, SaaS platforms and digital products engineered for long-term growth.",
    keywords: ["custom software development", "SaaS development", "web applications", "business systems", "software product development"],
    openGraph: {
        type: "website",
        siteName: "Built Further",
        title: "Built Further | Custom Software Development",
        description: "Custom software, SaaS platforms and digital products engineered for long-term growth.",
    },
    twitter: { card: "summary_large_image", title: "Built Further | Custom Software Development", description: "Custom software, SaaS platforms and digital products engineered for long-term growth." },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
    return (
        <html lang="en" className="h-full antialiased">
            <body className="min-h-full flex flex-col">
                <Navbar />
                <main>{children}</main>
                <Footer />
            </body>
        </html>
    );
}
