/* eslint-disable */
const { withBundleAnalyzer } = require("./scripts/next/handle-analyzer")
const withNextIntl = require("next-intl/plugin")()

/** @type {import('next').NextConfig} */
const nextConfig = withNextIntl({
  eslint: {
    dirs: ["."],
  },
  env: {
    APP_ENV: process.env.APP_ENV,
  },
  images: {
    deviceSizes: [400, 640, 1920],
    imageSizes: [64, 240],
    remotePatterns: [
      { hostname: process.env.NEXT_PUBLIC_MEDIA_BASE.replace(/^http?s:\/\//, "") },
      { hostname: process.env.NEXT_PUBLIC_DOMAIN.replace(/^http?s:\/\//, "") },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/status",
        destination: "/api/status",
      },
    ]
  },
  output: "standalone",
  experimental: {
    webpackBuildWorker: true,
  },
})

module.exports = withBundleAnalyzer(nextConfig)
