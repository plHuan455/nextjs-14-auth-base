import { getSitemapIndexXML } from "@lib/utils/sitemap"
import { addDomain } from "@lib/utils/url"

export const revalidate = 60 * 60

export async function GET() {
  const xml = getSitemapIndexXML([{ loc: addDomain("/sitemap-index.xml"), lastMod: Date.now() }])

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  })
}
