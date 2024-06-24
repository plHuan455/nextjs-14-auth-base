import * as yup from "yup"

export const getConfirmPasswordSchema = (passwordName: string = "password", message?: string) => ({
  yup: yup.string().oneOf([yup.ref(passwordName), null], message || "General.Errors.confirm_password_not_match"),
})
