"use client"

import { QUERY_KEY } from "@constants/query-key"
import { deleteCookie } from "cookies-next"
import { useAtom } from "jotai"
import { useQuery } from "react-query"

import { authAtom } from "lib/jotai/atoms/auth"
import { STORAGE_TOKEN_NAME } from "services/storage/constants"

interface Props {
  children: React.ReactNode
}

export default function ProfileWrapper({ children }: Props) {
  const [auth, setAuth] = useAtom(authAtom)
  useQuery({
    queryKey: [QUERY_KEY.SHOP.login, auth?.token, auth?.isLoading],
    queryFn: () => {
      // GET ME
      return {
        user: {
          name: "Test",
          id: 1,
        },
      }
    },
    onSuccess(data) {
      setAuth((preState) => ({
        ...preState,
        user: data.user,
        isLoading: false,
        isLogged: true,
      }))
    },
    onError() {
      deleteCookie(STORAGE_TOKEN_NAME)
      setAuth({
        isLoading: false,
        isLogged: false,
        user: undefined,
        token: undefined,
      })
    },
    cacheTime: 0,
    retry: 0,
    enabled: Boolean(auth?.token && auth?.isLoading),
  })
  return <div>{children}</div>
}
