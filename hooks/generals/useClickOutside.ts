import React, { MutableRefObject, useEffect } from "react"

const useClickOutside = <T extends HTMLElement | HTMLDivElement>(
  ref: React.RefObject<T>,
  callback: (event: MouseEvent) => void,
  options?: {
    enabled: boolean
  },
): void => {
  const { enabled = true } = options || {}

  const handleClick = (e: MouseEvent): void => {
    if (ref.current && !ref.current.contains((e.target as Node) || null)) {
      callback(e)
    }
  }

  useEffect(() => {
    if (!enabled) {
      return
    }

    document.addEventListener("click", handleClick)

    return (): void => {
      document.removeEventListener("click", handleClick)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref as MutableRefObject<T>, callback, enabled])
}

export default useClickOutside
