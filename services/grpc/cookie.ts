"use server"

import { getCookie } from "cookies-next"
import { cookies } from "next/headers"

import { STORAGE_TOKEN_NAME } from "services/storage/constants"

export async function getCc() {
  return getCookie(STORAGE_TOKEN_NAME, { cookies: cookies })
}
