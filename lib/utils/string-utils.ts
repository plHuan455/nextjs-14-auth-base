export const normalizeString = (name: string) => {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/đ|Đ/g, "d")
    .replace(/[\u0300-\u036f]/g, "")
}

export const getDomainName = (domain: string) => {
  const slitDot = domain.split(".")
  return slitDot.length <= 2 ? slitDot[0].replace(/https*:\/\//g, "") : slitDot[1]
}
