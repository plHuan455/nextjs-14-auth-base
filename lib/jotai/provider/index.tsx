import { COOKIE_STORAGE } from "@constants/storage"
import { getCookie } from "cookies-next"
import { Provider } from "jotai"
import { cookies } from "next/headers"

import HydrateWrapper from "./hydrate-wrapper"

interface Props {
  children: React.ReactNode
}
export default function JotaiProvider({ children }: Props) {
  const token = getCookie(COOKIE_STORAGE.access_token, { cookies })
  return (
    <Provider>
      <HydrateWrapper token={token}>{children}</HydrateWrapper>
    </Provider>
  )
}
