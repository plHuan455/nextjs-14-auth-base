import ENV_CONFIGS from "envs"

export function isBrowser() {
  return typeof window === "object"
}

export function isServer() {
  return typeof window === "undefined"
}

export const isProduction = () => {
  return process.env.APP_ENV === "production"
}

export const isLocal = () => {
  return ENV_CONFIGS.APP_ENV === "development"
}
