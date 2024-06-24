import Typography from "@comp/atoms/typography"
import { useTranslations } from "next-intl"

import UserPassController from "./controllers/userpass-controller"

export default function ViewCreateShop() {
  const t = useTranslations("ShopCreate")
  return (
    <div>
      <div className="container">
        <div className="flex justify-center items-center h-screen supports-[height:100dvh]:h-[100dvh]">
          <div className="w-full max-w-[400px] rounded-lg bg-default py-4 border border-foreground/5">
            <Typography size={24} className="font-semibold text-center">
              {t("title")}
            </Typography>
            <div className="mt-6 px-4 pb-4">
              <UserPassController />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
