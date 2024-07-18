import ENV_CONFIGS from "envs"

export const revalidate = 24 * 60 * 60

export async function GET() {
  const content = `User-agent: *
Allow: /
Sitemap: ${ENV_CONFIGS.DOMAIN}/sitemap.xml
    `
  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=UTF-8",
    },
  })
}
