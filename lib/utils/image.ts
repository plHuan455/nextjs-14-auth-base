import ENV_CONFIGS from "envs"

export const IMAGE_ORIGIN = {
  cloud: "cloud",
  internal: "internal",
  external: "external",
} as const

export type ImageOriginTypes = (typeof IMAGE_ORIGIN)[keyof typeof IMAGE_ORIGIN]

export const detectImageOrigin = (src: string): ImageOriginTypes => {
  if (typeof src !== "string") return IMAGE_ORIGIN.external
  if (src.match(/^https*:\/\/.*/g)) return IMAGE_ORIGIN.external
  if (!src.startsWith("/")) return IMAGE_ORIGIN.cloud
  if (src.match(/^\/.+/g) || typeof src !== "string") return IMAGE_ORIGIN.internal
  return undefined
}

export const formatImageUrl = (src: string, options?: { origin?: ImageOriginTypes }) => {
  if (typeof src !== "string") return src
  switch (options?.origin ?? detectImageOrigin(src)) {
    case IMAGE_ORIGIN.external: {
      return src
    }
    case IMAGE_ORIGIN.internal: {
      return src
    }
    case IMAGE_ORIGIN.cloud: {
      return `${ENV_CONFIGS.MEDIA_BASE}/${src}`
    }
    default: {
      return src
    }
  }
}

// RESIZE IMAGE
export const myImageLoader = ({ src, width, quality }) => {
  return `${ENV_CONFIGS.DOMAIN}/cdn-cgi/image/w=${width},q=${quality || 90},format=webp/${src}`
}

// OLD
export const generateImageUrl = (src: string, origin: "auto" | "cloud" | "internal" | "external" = "auto") => {
  if (!src || origin === "external") return src

  switch (origin) {
    case "cloud":
      return `${ENV_CONFIGS.MEDIA_BASE}/${src}`
    case "internal":
      return `/images${src.replace(/^\/images/g, "")}`
    case "auto": {
      // src has https or http
      if (src.match(/^https*:\/\/.*/g)) return src

      // internal
      if (src.match(/^\/.+/g)) return `/images${src.replace(/^\/images/g, "")}`

      // from cloud
      if (src.match(/^candy\/image\/.+/)) return `${ENV_CONFIGS.MEDIA_BASE}/${src}`

      return src
    }
  }
}
