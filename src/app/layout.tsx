import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LoadingSplash } from "./components/loading-splash";
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
export const metadata: Metadata = {
  metadataBase: new URL("https://melchisedeksl.vercel.app"),
  title: {
    default: "Melchisedek Lima | Engenharia de IA, Software e Segurança",
    template: "%s | Melchisedek Lima",
  },
  description: "Conheça a trajetória de Melchisedek Lima, coordenador de Engenharia de IA em Teresina. Experiência em inteligência artificial aplicada, software, cibersegurança, produtos digitais e liderança técnica.",
  applicationName: "Melchisedek Lima — Portfólio",
  keywords: [
    "Melchisedek Lima",
    "Engenharia de IA",
    "inteligência artificial aplicada",
    "engenharia de software",
    "cibersegurança",
    "AI Security",
    "produtos digitais",
    "Teresina",
    "Piauí",
  ],
  authors: [{ name: "Melchisedek Lima", url: "https://www.linkedin.com/in/melchisedeksl/" }],
  creator: "Melchisedek Lima",
  publisher: "Melchisedek Lima",
  category: "technology",
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    locale: "pt_BR",
    url: "/",
    siteName: "Melchisedek Lima",
    firstName: "Melchisedek",
    lastName: "Lima",
    title: "Melchisedek Lima | Engenharia de IA, Software e Segurança",
    description: "Trajetória, ideias e atuação profissional em Engenharia de IA, software, cibersegurança e produtos digitais — a partir de Teresina, Piauí.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Melchisedek Lima — Engenharia de IA, software e segurança" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Melchisedek Lima | Engenharia de IA, Software e Segurança",
    description: "Engenharia de IA, software, cibersegurança e produtos digitais. Conheça a trajetória profissional de Melchisedek Lima.",
    images: [{ url: "/opengraph-image", alt: "Melchisedek Lima — Engenharia de IA, software e segurança" }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
};
export default function RootLayout({ children }: LayoutProps<"/">) { return <html lang="pt-BR" className={`${geistSans.variable} ${geistMono.variable}`}><body><LoadingSplash />{children}</body></html>; }
