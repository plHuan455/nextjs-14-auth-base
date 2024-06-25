import { myIdClientService } from "services/grpc"

import { LoginParams } from "./types"

export async function loginService(params: LoginParams) {
  const res = await myIdClientService.signInV2({
    credential: {
      case: "myId",
      value: {
        password: params.password,
        username: params.username,
      },
    },
  })
  return res
}
