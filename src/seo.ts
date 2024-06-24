import CONFIGS from "configs"
import { TEXT_CONSTANTS } from "constants/common"
import { IMAGE_SRC } from "constants/image"
import { LOCALE_CONSTANTS } from "constants/locale"
import { Metadata } from "next"
import { getTranslations } from "next-intl/server"

import { ValuesOf } from "types/index.d"

export interface MetadataProps {
  locale: ValuesOf<typeof LOCALE_CONSTANTS>
  type?: string
  title?: string
  description?: string
  keywords?: string
  thumbnail?: string
  url: string
  lang?: string
}

export const generatePageMetadata = async (props?: MetadataProps) => {
  const { locale, type = "website", title = "SEO_DEFAULT_TITLE", description, keywords, thumbnail, url } = props || {}
  const t = await getTranslations({ locale, namespace: "General.Metadata" })

  return {
    metadataBase: new URL(CONFIGS.DOMAIN as string),
    applicationName: TEXT_CONSTANTS.SITE_NAME,
    title: t("title"),
    description: description || t("description"),
    keywords: keywords || t("keywords"),
    alternates: {
      canonical: url,
    },
    appleWebApp: {
      capable: true,
      statusBarStyle: "default",
      title: title,
    },
    formatDetection: {
      telephone: false,
    },
    openGraph: {
      type: type,
      siteName: TEXT_CONSTANTS.SITE_NAME,
      locale: locale,
      title: title,
      description: description,
      url: url,
      images: [
        {
          url: thumbnail || IMAGE_SRC.thumbnail,
          width: 720,
          height: 480,
        },
      ],
    },
    twitter: {
      handle: "@handle",
      site: "@site",
      cardType: "summary_large_image",
    },
    additionalMetaTags: [
      {
        name: "keywords",
        content: keywords,
      },
    ],
  } as Metadata
}
