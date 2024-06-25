import { ButtonBase } from "@comp/atoms/button-base"
import ImageBase from "@comp/atoms/image-base"
import Input from "@comp/atoms/input"
import Typography from "@comp/atoms/typography"
import { IMAGE_SRC } from "@constants/image"
import { cn } from "@lib/utils/cn"
import { useTranslations } from "next-intl"
import React from "react"

export default function ViewLogin() {
  const t = useTranslations()
  return (
    <div className="flex h-full flex-col justify-between">
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
            {t("login.title")}
          </Typography>

          <div className="mt-6">
            <Typography size={14} as="label" className="font-semibold">
              {t("login.labels.email")}
            </Typography>
            <Input
              size={48}
              variant={"outline"}
              color={"default"}
              className="mt-1 rounded-xl"
              placeholder="xxx@gmail.com"
            />
          </div>
          <div className="mt-6">
            <Typography size={14} as="label" className="font-semibold">
              {t("login.labels.password")}
            </Typography>
            <Input
              size={48}
              variant={"outline"}
              color={"default"}
              type="password"
              className="mt-1 rounded-xl"
              placeholder={t("login.placeholders.password")}
            />
          </div>
          <div className="mt-8">
            <ButtonBase size={48} className="w-full rounded-xl">
              {t("login.buttons.login")}
            </ButtonBase>
          </div>
          <div className="mt-8">
            <Typography size={14} className="text-primary">
              {t("login.buttons.reset_password")}
            </Typography>
          </div>
        </div>
      </div>

      <div className="mt-[8.64vh] pb-[7vh]">
        <div
          className={cn(
            "flex items-center gap-1 text-foreground/50",
            "[&>p:first-child]:before:hidden [&>p]:before:content-[''] [&>p]:before:w-1 [&>p]:before:inline-block [&>p]:before:h-1 [&>p]:before:bg-foreground/30 [&>p]:before:rounded-full",
          )}
        >
          <Typography size={14} className="flex items-center gap-1">
            Copyright 2024
          </Typography>
          <Typography size={14} className="flex items-center gap-1">
            Policy privacy
          </Typography>
          <Typography size={14} className="flex items-center gap-1">
            Terms of conditions
          </Typography>
        </div>
      </div>
    </div>
  )
}
