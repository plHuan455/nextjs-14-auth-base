import JotaiProvider from "@lib/jotai/provider"
import ThemeProviderBase from "@lib/theme/provider"
import ENV_CONFIGS from "envs"
import Script from "next/script"

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
      <head>
        {/* DISABLE SEARCH INDEX ON GG_TAG = "" */}
        {Boolean(ENV_CONFIGS.GG_TAG) && <meta name="robots" content="noindex, nofollow" />}
        {/* GOOGLE TAG */}
        {Boolean(ENV_CONFIGS.GG_TAG) && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${ENV_CONFIGS.GG_TAG}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){window.dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', '${ENV_CONFIGS.GG_TAG}');
              `}
            </Script>
          </>
        )}
      </head>
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
