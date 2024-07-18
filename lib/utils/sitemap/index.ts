import dayjs from "dayjs"

import { addDomain } from "../url"
import { ISitemap, ISitemapUrl } from "./types"

export function formatISO8601(date: Date | number) {
  return dayjs(date).isValid() ? dayjs(date).toISOString() : ""
}

const getSitemapItem = (data: ISitemap) => {
  return `<sitemap>
    <loc>${addDomain(data.loc)}</loc>
    ${data.lastMod ? `<lastmod>${formatISO8601(data.lastMod)}</lastmod>` : ""}
    </sitemap>`
}

export const getSitemapUrl = (data: ISitemapUrl) => {
  return `<url>
  <loc>${data.loc}</loc>
  <lastmod>${formatISO8601(data.lastMod)}</lastmod>
  <priority>${data.priority}</priority>
  <changefreq>${data.changefreq ?? "daily"}</changefreq>
  </url>`
}

export const getSitemapUrlXML = (data: ISitemapUrl[]) => {
  return `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${data.map(getSitemapUrl).join("\n")}
  </urlset>`
}

export const getSitemapIndexXML = (data: ISitemap[]) => {
  return `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${data.map(getSitemapItem).join("\n")}
    </sitemapindex>
  `
}
