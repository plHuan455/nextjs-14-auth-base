import { IMAGE_SRC } from "@constants/image"

import { myIdClientService } from "services/grpc"

import { compileMetadata, formatUserSubName, parseUserMetaData } from "./helpers"
import { LoginParams, LoginResponse, MeResponse, MetadataDataType } from "./types"

export function updateMetadataService(prevMetadata: string, metadata: MetadataDataType) {
  return myIdClientService.updateMetadata({ metadata: compileMetadata({ prevMetadata, metadata }) })
}

export async function getMeService(token?: string): Promise<MeResponse> {
  const res = await myIdClientService.me({}, token ? { headers: [["Authorization", "Bearer " + token]] } : undefined)
  const metadata = parseUserMetaData(res.user.metadata)
  return {
    user: {
      id: Number(res.user.userId),
      metadata: res.user.metadata,
      fullName: metadata.fullName,
      subName: formatUserSubName(res.user.safeId),
      avatar: metadata.avatar || IMAGE_SRC.avatarDefault,
    },
  }
}

export async function loginService(params: LoginParams): Promise<LoginResponse> {
  const res = await myIdClientService.signInV2({
    credential: {
      case: "myId",
      value: {
        password: params.password,
        username: params.username,
      },
    },
  })
  if (res.result.case !== "tokenInfo") {
    throw "not token"
  }
  const token = res.result.value.accessToken
  // setCookie(STORAGE_TOKEN_NAME, token)
  const meRes = await getMeService(token)
  return {
    token,
    user: meRes.user,
  }
}
