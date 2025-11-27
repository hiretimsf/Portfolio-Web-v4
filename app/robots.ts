import type { MetadataRoute } from "next";
import { getBaseUrl } from "@/lib/helpers";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: "/private/",
      },
    ],
    sitemap: getBaseUrl("/sitemap.xml"),
  };
}
