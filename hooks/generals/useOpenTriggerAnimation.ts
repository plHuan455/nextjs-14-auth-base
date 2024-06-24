import { useEffect, useState } from "react"

interface Props {
  open: boolean
  delay?: number
}

const useOpenTriggerAnimation = ({ open, delay = 300 }: Props) => {
  const [openForAnimation, setOpenForAnimation] = useState<boolean>(open)
  const [realOpen, setRealOpen] = useState<boolean>(open)
  useEffect(() => {
    if (open) {
      setRealOpen(true)
      const timeOut2 = setTimeout(() => {
        setOpenForAnimation(true)
      }, 20)
      return () => {
        clearTimeout(timeOut2)
      }
    } else {
      setOpenForAnimation(false)
      const timeOut = setTimeout(() => {
        setRealOpen(false)
      }, delay)
      return () => clearTimeout(timeOut)
    }
  }, [open, delay])

  return {
    realOpen,
    openForAnimation,
  }
}

export default useOpenTriggerAnimation
