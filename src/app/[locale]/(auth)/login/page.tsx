import ImageBase from "@comp/atoms/image-base"
import Typography from "@comp/atoms/typography"
import { IMAGE_SRC } from "@constants/image"
import React from "react"

export default function PageLogin() {
  return (
    <div>
      <div className="w-14 aspect-square relative">
        <ImageBase src={IMAGE_SRC.logo} alt="logo" />
      </div>
      <div className="mt-5">
        <Typography size={24} className="font-semibold">
          Management: Simplify, Track, Succeed.
        </Typography>
      </div>

      <div className="mt-5">
        <Typography size={24} className="font-semibold">
          Sign in
        </Typography>
      </div>
    </div>
  )
}
