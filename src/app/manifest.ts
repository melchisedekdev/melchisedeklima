import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Melchisedek Lima — Portfólio",
    short_name: "Melchisedek Lima",
    description: "Portfólio de Melchisedek Lima: engenharia de IA, software e cibersegurança.",
    start_url: "/",
    display: "standalone",
    background_color: "#09070d",
    theme_color: "#09070d",
    lang: "pt-BR",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png", purpose: "any" },
    ],
  };
}
