export function isBrowser() {
  return typeof window === "object"
}

export function isServer() {
  return typeof window === "undefined"
}

export const isProduction = () => {
  return process.env.APP_ENV === "production"
}
