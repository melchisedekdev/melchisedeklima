import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LoadingSplash } from "./components/loading-splash";
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
export const metadata: Metadata = {
  metadataBase: new URL("https://melchisedeksl.vercel.app"),
  title: {
    default: "Melchisedek Lima | Engenheiro de IA, Software e Cibersegurança",
    template: "%s | Melchisedek Lima",
  },
  description: "Melchisedek Lima é coordenador e engenheiro de IA em Teresina, com atuação em inteligência artificial aplicada, software, cibersegurança, produtos digitais e liderança técnica.",
  applicationName: "Melchisedek Lima — Portfólio",
  keywords: [
    "Melchisedek Lima",
    "Melchisedek",
    "Melky",
    "engenheiro de IA",
    "coordenador de engenharia de IA",
    "Engenharia de IA",
    "inteligência artificial aplicada",
    "engenharia de software",
    "cibersegurança",
    "AI Security",
    "produtos digitais",
    "Teresina",
    "Piauí",
    "engenheiro de software Teresina",
    "inteligência artificial Teresina",
  ],
  authors: [{ name: "Melchisedek Lima", url: "https://www.linkedin.com/in/melchisedeksl/" }],
  creator: "Melchisedek Lima",
  publisher: "Melchisedek Lima",
  category: "technology",
  referrer: "origin-when-cross-origin",
  formatDetection: { email: false, address: false, telephone: false },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: "Melchisedek Lima",
    title: "Melchisedek Lima | Engenheiro de IA, Software e Cibersegurança",
    description: "IA aplicada, engenharia de software, cibersegurança e produtos digitais — de Teresina para o mundo.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Melchisedek Lima — Engenharia de IA, software e segurança" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Melchisedek Lima | Engenheiro de IA, Software e Cibersegurança",
    description: "IA aplicada, engenharia de software, cibersegurança e produtos digitais.",
    images: [{ url: "/opengraph-image", alt: "Melchisedek Lima — Engenharia de IA, software e segurança" }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#09070d",
};
export default function RootLayout({ children }: LayoutProps<"/">) { return <html lang="pt-BR" className={`${geistSans.variable} ${geistMono.variable}`}><body><LoadingSplash />{children}</body></html>; }
