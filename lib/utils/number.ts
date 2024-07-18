export const randomInt = (min = 0, max = 1) => {
  const lower = Math.ceil(Math.min(min, max))
  const upper = Math.floor(Math.max(min, max))
  return Math.floor(lower + Math.random() * (upper - lower + 1))
}

export const abbreviateNumber = (num: number = 0, options?: { roundTo?: number }) => {
  const { roundTo = 2 } = options || {}

  const additionStr = [
    {
      numLen: 0,
      add: "",
    },
    {
      numLen: 4,
      add: "K",
    },
    {
      numLen: 7,
      add: "M",
    },
    {
      numLen: 10,
      add: "B",
    },
  ]
  const numLen = String(num).length
  const additionData = additionStr.reverse().find((value) => value.numLen <= numLen)

  if (!additionData.add) return String(num)

  return `${(num / Math.pow(10, additionData.numLen - 1)).toFixed(roundTo).replace(/\.0+$/g, "")}${additionData.add}`
}
