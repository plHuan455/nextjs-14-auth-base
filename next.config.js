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
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
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
