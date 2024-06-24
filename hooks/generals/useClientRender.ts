import { useEffect, useState } from "react"

export default function useClientRender() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return {
    isClientRender: mounted,
  }
}
