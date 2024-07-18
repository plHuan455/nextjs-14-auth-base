import { ConnectError, Interceptor } from "@connectrpc/connect"

import { isProduction } from "lib/utils/nextjs"

class Logger {
  private logDebug = (...params) => {
    if (!isProduction()) {
      // eslint-disable-next-line no-console
      console.debug(...params)
    }
  }
  public logger: Interceptor = (next) => async (req) => {
    this.logDebug(
      `%c[REQUEST] -> [${req.service.typeName} > ${req.method.name}]:`,
      "background-color: #deeb34; color: #000; font-size: 14px",
      req,
    )
    try {
      const res = await next(req)
      this.logDebug(
        `%c[RESPONSE] -> [${req.service.typeName} > ${req.method.name}]:`,
        "background-color: #23d947; color: #000; font-size: 14px",
        res,
      )
      return res
    } catch (err) {
      const connectErr = ConnectError.from(err)
      this.logDebug(
        `%c[ERROR] -> [${req.service.typeName}] > ${req.method.name}]: `,
        "background-color: #c0392b; color: #000; font-size: 14px",
        err,
      )
      return Promise.reject(connectErr)
    }
  }
}

export const logger = new Logger().logger

export function convertBigIntToNumber(data: unknown) {
  if (typeof data === "bigint") {
    return Number(data)
  }

  if (Array.isArray(data)) {
    return data.map((item) => convertBigIntToNumber(item))
  }

  if (typeof data === "object" && data !== null) {
    return Object.keys(data).reduce((acc, curKey) => {
      return {
        ...acc,
        [curKey]: convertBigIntToNumber(data[curKey]),
      }
    }, {})
  }

  return data
}
