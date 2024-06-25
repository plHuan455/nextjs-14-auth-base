import JotaiProvider from "@lib/jotai/provider"
import ThemeProviderBase from "@lib/theme/provider"

import QueryClientWrapper from "components/templates/query-client-wrapper"
import I18Provider from "lib/i18/provider"

import "../../../styles/index.scss"

interface RootLayoutProps {
  children: React.ReactNode
  locale: never
}
export default function RootLayout({ children, locale }: RootLayoutProps) {
  return (
    <html lang={locale} className={`font-sans`} suppressHydrationWarning>
      <body>
        <ThemeProviderBase>
          <I18Provider locale={locale}>
            <QueryClientWrapper>
              <JotaiProvider>{children}</JotaiProvider>
            </QueryClientWrapper>
          </I18Provider>
        </ThemeProviderBase>
      </body>
    </html>
  )
}
