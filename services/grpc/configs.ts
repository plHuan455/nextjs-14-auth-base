import { createGrpcWebTransport as createGrpcServerTransport } from "@bufbuild/connect-node"
import { createGrpcWebTransport as createGrpcBrowserTransport } from "@bufbuild/connect-web"
import { MethodInfoUnary, PartialMessage, PlainMessage, ServiceType, toPlainMessage } from "@bufbuild/protobuf"
import { CallOptions, ConnectError, Interceptor } from "@connectrpc/connect"
import { COOKIE_STORAGE } from "@constants/storage"
import { getCookie } from "cookies-next"
import ENV_CONFIGS from "envs"

import { isLocal, isServer } from "lib/utils/nextjs"

import { logger } from "./helpers"

const setToken: Interceptor = (next) => async (req) => {
  if (req.header.get("Authorization")) {
    return next(req)
  }
  try {
    const cookieHeader = await (isServer() ? import("next/headers").then((module) => module.cookies) : undefined)
    const token = isServer()
      ? getCookie(COOKIE_STORAGE.access_token, { cookies: cookieHeader })
      : getCookie(COOKIE_STORAGE.access_token)

    req.header.set("x-language", "vi")

    if (token) {
      req.header.set("Authorization", "Bearer " + token)
    }
    return next(req)
  } catch (error) {
    return next(req)
  }
}

export interface ErrorHandler {
  (err: ConnectError): void
}

export const createTransport = () => {
  const baseUrl = isServer() && !isLocal() && !process.env.NEXT_PHASE ? "http://sora:8888" : ENV_CONFIGS.GRPC_SERVER
  return isServer()
    ? createGrpcServerTransport({
        baseUrl,
        httpVersion: "1.1",
        interceptors: !Boolean(process.env.NEXT_PHASE) ? [setToken] : undefined,
      })
    : createGrpcBrowserTransport({ baseUrl, interceptors: [setToken, logger] })
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

      return toPlainMessage(response.message)
    }
    if (method != null) {
      client[localName] = method
    }
  }

  return client as CreateClientService<Service>
}
