import { useCallback, useLayoutEffect, useState } from "react"

import { isServer } from "lib/utils/nextjs"

interface UseDeviceQueriesProps {
  min?: number
  max?: number
  defaultValue?: boolean
}

export default function useDeviceQueries({ min, max, defaultValue = false }: UseDeviceQueriesProps) {
  const createMediaQueryStr = useCallback(({ min, max }: { min?: number; max?: number }) => {
    return `${min !== undefined ? `(min-width: ${min}px)` : ""}${
      min !== undefined && max !== undefined ? " and " : ""
    }${max !== undefined ? `(max-width: ${max}px)` : ""}`
  }, [])
  const [isActive, setIsActive] = useState<boolean>(
    defaultValue === undefined && !isServer()
      ? window.matchMedia(createMediaQueryStr({ min, max })).matches
      : defaultValue,
  )

  useLayoutEffect(() => {
    setIsActive(() => {
      let result: boolean = true
      result = min === undefined ? result : window.innerWidth >= min
      result = max === undefined ? result : window.innerWidth < max
      return result
    })

    const mediaQueryStr = createMediaQueryStr({ min, max })

    const queryChanged = (e: MediaQueryListEvent) => {
      setIsActive(e.matches)
    }

    const mediaQuery = window.matchMedia(mediaQueryStr)

    mediaQuery.addEventListener("change", queryChanged)

    return () => {
      mediaQuery.removeEventListener("change", queryChanged)
    }
  }, [min, max, createMediaQueryStr])

  return isActive
}
