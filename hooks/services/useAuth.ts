import { COOKIE_STORAGE } from "@constants/storage"
import { authAtom } from "@lib/jotai/atoms/auth"
import { deleteCookie } from "cookies-next"
import { useAtom } from "jotai"
import { useQueryClient } from "react-query"

export default function useAuth() {
  const [_, setAuth] = useAtom(authAtom)
  const queryClient = useQueryClient()
  return {
    onLogout() {
      deleteCookie(COOKIE_STORAGE.access_token)
      setAuth({
        isLoading: false,
        isLogged: false,
        token: undefined,
        user: undefined,
      })
      queryClient.removeQueries()
    },
  }
}
