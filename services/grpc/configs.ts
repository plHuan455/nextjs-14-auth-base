import { createGrpcWebTransport as createGrpcServerTransport } from "@bufbuild/connect-node"
import { createGrpcWebTransport as createGrpcBrowserTransport } from "@bufbuild/connect-web"
import { MethodInfoUnary, PartialMessage, PlainMessage, ServiceType, toPlainMessage } from "@bufbuild/protobuf"
import { CallOptions, ConnectError, Interceptor } from "@connectrpc/connect"
import CONFIGS from "configs"
import { getCookie } from "cookies-next"

import { isServer } from "lib/utils/nextjs-utils"
import storage from "services/storage"
import { STORAGE_TOKEN_NAME } from "services/storage/constants"

import { convertBigIntToNumber, logger } from "./helpers"

const setToken: Interceptor = (next) => async (req) => {
  const cookieHeader = isServer() ? await import("next/headers").then((module) => module.cookies) : undefined
  const token = isServer() ? getCookie(STORAGE_TOKEN_NAME, { cookies: cookieHeader }) : getCookie(STORAGE_TOKEN_NAME)
  req.header.set("x-language", "vi")
  if (token) {
    req.header.set("Authorization", "Bearer " + token)
  }
  return await next(req)
}

export interface ErrorHandler {
  (err: ConnectError): void
}

export const createTransport = () => {
  const baseUrl = CONFIGS.GRPC_SERVER
  return isServer()
    ? createGrpcServerTransport({ baseUrl, httpVersion: "1.1", interceptors: [setToken] })
    : createGrpcBrowserTransport({ baseUrl, interceptors: [setToken, logger] })
}

export const createHeader = (): Headers => {
  const headers = new Headers()

  if (!isServer()) {
    const token = storage.getToken()
    if (token) {
      headers.set("Authorization", `Bearer ${token}`)
      headers.set("x-language", "vi")
    }
  }

  return headers
}

type AnyClientMethod = (...args: any[]) => any // eslint-disable-line @typescript-eslint/no-explicit-any

export type AnyClient = Record<string, AnyClientMethod>

export type CreateClientService<T extends ServiceType> = {
  [P in keyof T["methods"]]: T["methods"][P] extends MethodInfoUnary<infer I, infer O>
    ? (request: PartialMessage<I>, options?: CallOptions) => Promise<PlainMessage<O>>
    : never
}

export const createClientService = <Service extends ServiceType>(service: Service) => {
  const transport = createTransport()
  const client: AnyClient = {}
  for (const [localName, methodInfo] of Object.entries(service.methods)) {
    const method = async function (input, options) {
      const response = await transport.unary(
        service,
        methodInfo,
        options?.signal,
        options?.timeoutMs,
        options?.headers,
        input,
      )
      options?.onHeader?.(response.header)
      options?.onTrailer?.(response.trailer)

      return convertBigIntToNumber(toPlainMessage(response.message))
    }
    if (method != null) {
      client[localName] = method
    }
  }

  return client as CreateClientService<Service>
}
