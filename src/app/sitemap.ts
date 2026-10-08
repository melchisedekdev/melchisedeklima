import type { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap {
  return [{
    url: "https://melchisedeksl.vercel.app/",
    lastModified: "2026-10-08",
    changeFrequency: "monthly",
    priority: 1,
    images: [
      "https://melchisedeksl.vercel.app/images/melchisedek-hero.png",
      "https://melchisedeksl.vercel.app/images/ai-summit-brasil-2026.png",
      "https://melchisedeksl.vercel.app/images/campus-weekend-confereai.png",
    ],
  }];
}
