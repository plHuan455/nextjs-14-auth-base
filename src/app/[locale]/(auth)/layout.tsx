import ImageBase from "@comp/atoms/image-base"
import { IMAGE_SRC } from "@constants/image"
import React from "react"

interface Props {
  children: React.ReactNode
}
export default function LayoutAuth({ children }: Props) {
  return (
    <div className="flex items-center justify-center px-8 min-h-screen bg-primary">
      <div className="w-full max-w-[1360px] mx-auto bg-content-1 my-8 rounded-xl">
        <div className="flex">
          <div className="grow min-w-0 flex items-center justify-center">
            <div className="relative w-[83%] aspect-[775/477]">
              <ImageBase src={IMAGE_SRC.loginThumbnail} />
            </div>
          </div>
          <div className="shrink-0 w-full max-w-[460px] border-l border-default-50">
            <div className="px-[10%] pt-[52px]">{children}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
