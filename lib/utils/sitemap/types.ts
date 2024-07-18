export interface ISitemap {
  loc: string
  lastMod?: Date | number
}

export interface ISitemapUrl {
  loc: string
  lastMod: Date | number
  priority: number
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never"
}
