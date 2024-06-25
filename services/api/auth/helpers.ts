import { jsonParse } from "@lib/utils/common"
import uuidv4 from "uuid"

import { MetadataDataType } from "./types"

export const getUUIDV4 = () => {
  return uuidv4({ msecs: Date.now() })
}

export function compileMetadata(data: { prevMetadata: string; metadata: MetadataDataType }) {
  const preMetadataObject: MetadataDataType = jsonParse(data.prevMetadata) || {}
  return JSON.stringify({
    ...preMetadataObject,
    ...data.metadata,
  })
}

export function parseUserMetaData(metadata: string): MetadataDataType {
  return metadata ? jsonParse(metadata) || {} : {}
}

export function formatUserSubName(safeId: string) {
  return `@${safeId}`
}
