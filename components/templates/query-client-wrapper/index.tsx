"use client"

import { useState } from "react"
import { QueryClient, QueryClientProvider } from "react-query"

export default function QueryClientWrapper({ children }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            refetchInterval: false,
            staleTime: 90000,
            retry: 2,
          },
        },
      }),
  )
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
