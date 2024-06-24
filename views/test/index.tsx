"use client"

import { ButtonBase } from "@comp/atoms/button-base"
import { useAtom } from "jotai"

import { authAtom } from "lib/jotai/atoms/auth"

export default function ViewTest() {
  const [auth, setAuth] = useAtom(authAtom)
  return (
    <div>
      <ButtonBase
        size={40}
        onClick={() => {
          setAuth({ token: "new token", isLoading: false, isLogged: true })
        }}
      >
        click me
      </ButtonBase>
      <div>{`auth: ${JSON.stringify(auth)}`}</div>
    </div>
  )
}
