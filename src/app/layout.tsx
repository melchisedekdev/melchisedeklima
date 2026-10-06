import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LoadingSplash } from "./components/loading-splash";
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
export const metadata: Metadata = {
  metadataBase: new URL("https://melchisedeksl.vercel.app"), title: { default: "Melchisedek Lima | Engenharia de IA", template: "%s | Melchisedek Lima" }, description: "Portfólio de Melchisedek Lima — Engenharia de IA, software, cibersegurança e produtos digitais que criam impacto.", keywords: ["engenheiro de IA", "inteligência artificial", "engenharia de software", "cibersegurança", "automação", "Teresina"], authors: [{ name: "Melchisedek Lima", url: "https://www.linkedin.com/in/melchisedeksl/" }], creator: "Melchisedek Lima", alternates: { canonical: "/" }, openGraph: { type: "website", locale: "pt_BR", url: "/", siteName: "Melchisedek Lima", title: "Melchisedek Lima | Engenharia de IA", description: "Inteligência artificial, software e segurança transformados em produtos e narrativas de impacto." }, twitter: { card: "summary_large_image", title: "Melchisedek Lima | Engenharia de IA", description: "IA, software, segurança e produtos digitais." }, robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
};
export default function RootLayout({ children }: LayoutProps<"/">) { return <html lang="pt-BR" className={`${geistSans.variable} ${geistMono.variable}`}><body><LoadingSplash />{children}</body></html>; }
