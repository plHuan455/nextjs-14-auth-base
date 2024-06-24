// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getErrorMessage = (data: { params: any | any[]; translateFc: (...params: any) => string }) => {
  const { params, translateFc } = data
  if (!params?.at(0)) {
    return undefined
  }
  return typeof params === "object" ? translateFc(...params) : translateFc(params)
}
