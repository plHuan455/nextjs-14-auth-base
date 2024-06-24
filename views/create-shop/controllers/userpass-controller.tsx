"use client"

import { ButtonBase } from "@comp/atoms/button-base"
import Input from "@comp/atoms/input"
import { QUERY_KEY } from "@constants/query-key"
import { getConfirmPasswordSchema } from "@constants/yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { useTranslations } from "next-intl"
import { Controller, FormProvider, useForm } from "react-hook-form"
import { useMutation } from "react-query"
import * as yup from "yup"

import { getErrorMessage } from "lib/hook-form"
import { createShopService } from "services/api/shop"
import { CREATE_SHOP_TYPE, ICreateShopTypes, ILoginShopTypes } from "services/api/shop/types"

const scheme = yup.object({
  shopName: yup.string().required("General.Errors.field_required"),
  username: yup.string().required("General.Errors.field_required"),
  password: yup.string().required("General.Errors.field_required"),
  confirmPassword: getConfirmPasswordSchema().yup,
})
export default function UserPassController() {
  const { mutate: createShopMutate, isLoading } = useMutation({
    mutationKey: [QUERY_KEY.SHOP.create],
    mutationFn: createShopService,
  })
  const t = useTranslations()
  const method = useForm<ILoginShopTypes>({
    defaultValues: {
      type: CREATE_SHOP_TYPE.username,
      username: "",
      password: "",
    },
    resolver: yupResolver(scheme),
  })

  const handleSubmit = (values: ICreateShopTypes) => {
    createShopMutate(values)
  }
  return (
    <FormProvider {...method}>
      <form className="flex flex-col gap-3" onSubmit={method.handleSubmit(handleSubmit)}>
        <Controller
          name="shopName"
          render={({ field, formState }) => (
            <Input
              {...field}
              placeholder={t("ShopCreate.field_shop_name")}
              size={44}
              className="rounded-xl"
              color={"default_900"}
              error={getErrorMessage({ params: formState.errors?.username?.message, translateFc: t })}
            />
          )}
        />
        <Controller
          name="username"
          render={({ field, formState }) => (
            <Input
              {...field}
              placeholder={t("ShopCreate.field_username")}
              size={44}
              className="rounded-xl"
              color={"default_900"}
              error={getErrorMessage({ params: formState.errors?.username?.message, translateFc: t })}
            />
          )}
        />
        <Controller
          name="password"
          render={({ field, formState }) => (
            <Input
              {...field}
              placeholder={t("ShopCreate.field_password")}
              size={44}
              className="rounded-xl"
              type="password"
              color={"default_900"}
              error={getErrorMessage({ params: formState.errors?.password?.message, translateFc: t })}
            />
          )}
        />

        <Controller
          name="confirmPassword"
          render={({ field, formState }) => (
            <Input
              {...field}
              placeholder={t("ShopCreate.field_confirm_password")}
              size={44}
              className="rounded-xl"
              type="password"
              color={"default_900"}
              error={getErrorMessage({ params: formState.errors?.confirmPassword?.message, translateFc: t })}
            />
          )}
        />
        <ButtonBase size={40} className="mt-3 font-medium" isLoading={isLoading}>
          {t("ShopCreate.create_button")}
        </ButtonBase>
      </form>
    </FormProvider>
  )
}
