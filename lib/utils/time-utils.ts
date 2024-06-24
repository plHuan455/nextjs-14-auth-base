import dayjs, { Dayjs } from "dayjs"

export function dayjsToSecBigint(day: Dayjs) {
  return BigInt(Math.floor(day.toDate().getTime() / 1000))
}

export function secBigintToDayjs(seconds: bigint) {
  return dayjs(Number(seconds) * 1000)
}
