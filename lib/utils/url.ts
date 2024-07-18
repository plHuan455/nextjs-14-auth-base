import ENV_CONFIGS from "envs"

export function addDomain(pathname: string) {
  if (!pathname || pathname.startsWith("http")) {
    return pathname
  }
  const prefixPath = pathname === "/" ? "" : pathname
  return `${ENV_CONFIGS.DOMAIN}${prefixPath}`
}
