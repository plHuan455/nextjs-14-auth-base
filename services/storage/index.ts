import { isServer } from "lib/utils/nextjs-utils"

import { STORAGE_TOKEN_NAME } from "./constants"

class Storage {
  setToken(token: string) {
    if (!isServer()) {
      localStorage.setItem(STORAGE_TOKEN_NAME, token)
    }
  }
  getToken() {
    return isServer() ? undefined : localStorage.getItem(STORAGE_TOKEN_NAME)
  }
  clearAll() {
    localStorage.clear()
  }
}

const storage = new Storage()
export default storage
