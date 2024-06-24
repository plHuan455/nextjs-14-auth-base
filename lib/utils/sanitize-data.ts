// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const removeUndefined = (obj: any) => {
  if (obj === undefined || obj === null) {
    return null
  }

  if (typeof obj !== "object") {
    return obj
  }

  const newObject: Record<string, unknown> = {}

  Object.keys(obj).forEach((key) => {
    if (Array.isArray(obj[key])) {
      newObject[key] = obj[key].map((item: unknown) => removeUndefined(item))
      return
    }
    if (obj[key] === Object(obj[key])) newObject[key] = removeUndefined(obj[key])
    else if (obj[key] !== undefined) newObject[key] = obj[key]
  })

  return newObject
}
