import React from "react"

interface Props {
  children: React.ReactNode
}
export default function LayoutAuth({ children }: Props) {
  return <div>{children}</div>
}
