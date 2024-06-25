"use client"

import { QUERY_KEY } from "@constants/query-key"
import { COOKIE_STORAGE } from "@constants/storage"
import { deleteCookie } from "cookies-next"
import { useAtom } from "jotai"
import { useQuery } from "react-query"

import { authAtom } from "lib/jotai/atoms/auth"
import { getMeService } from "services/api/auth"

interface Props {
  children: React.ReactNode
}

export default function ProfileWrapper({ children }: Props) {
  const [auth, setAuth] = useAtom(authAtom)
  useQuery({
    queryKey: [QUERY_KEY.AUTH.login, auth?.token, auth?.isLoading],
    queryFn: () => {
      // GET ME
      return getMeService()
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
      deleteCookie(COOKIE_STORAGE.access_token)
      setAuth({
        isLoading: false,
        isLogged: false,
        user: undefined,
        token: undefined,
      })
    },
    cacheTime: 5000,
    retry: 0,
    enabled: Boolean(auth?.token && auth?.isLoading),
  })
  return <>{children}</>
}
