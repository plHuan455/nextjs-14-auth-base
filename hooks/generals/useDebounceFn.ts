import { useRef, useState } from "react"

interface Props {
  delay?: number
  isAllowFirstCb?: boolean
}
const useDebounceFn = (props?: Props) => {
  const { delay = 200, isAllowFirstCb = true } = props || {}
  const timeOutFC = useRef<NodeJS.Timeout>()
  const [isDebouncing, setIsDebouncing] = useState(false)

  const debounceFn = (cb: () => void) => {
    if (timeOutFC.current) {
      clearTimeout(timeOutFC.current)
      timeOutFC.current = setTimeout(() => {
        cb()
        setIsDebouncing(false)
        timeOutFC.current = undefined
      }, delay)
    } else {
      isAllowFirstCb && cb()
      timeOutFC.current = setTimeout(() => {
        !isAllowFirstCb && cb()
        setIsDebouncing(false)
        timeOutFC.current = undefined
      }, delay)
    }
  }

  return { isDebouncing, debounceFn }
}

export default useDebounceFn
