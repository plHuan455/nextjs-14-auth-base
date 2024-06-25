import { NextIntlClientProvider, useMessages } from "next-intl"
import React from "react"

interface Props {
  children: React.ReactNode
  locale: string
}
export default function I18Provider({ locale, children }: Props) {
  const messages = useMessages()
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  )
}
