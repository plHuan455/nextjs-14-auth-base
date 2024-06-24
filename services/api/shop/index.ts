import { fakeApiCall } from "services/helpers"

import { CREATE_SHOP_TYPE, ICreateShopTypes, ILoginShopTypes, IShop } from "./types"

interface ILoginShopResponse {
  shop: IShop
  token: string
}
export async function getMyShopServices(): Promise<ILoginShopResponse> {
  return fakeApiCall({
    delay: 1000,
    response: {
      shop: { name: "Adidas", createdAt: Date.now() / 1000, email: "joymail.com" },
      token: "access-token-123",
    },
  })
}

export async function createShopService(params: ICreateShopTypes) {
  switch (params.type) {
    case CREATE_SHOP_TYPE.username: {
      return fakeApiCall({ delay: 1000, response: { success: "username" } })
    }
    case CREATE_SHOP_TYPE.google: {
      return fakeApiCall({ delay: 1000, response: { success: "create-google" } })
    }
    default: {
      throw Error("Invalid type")
    }
  }
}

export async function loginShopService(params: ILoginShopTypes) {
  switch (params.type) {
    case CREATE_SHOP_TYPE.username: {
      return fakeApiCall({
        delay: 1000,
        response: {
          shop: { name: "Adidas", createdAt: Date.now() / 1000, email: "joymail.com" },
          token: "access-token-123",
        },
      })
    }
    case CREATE_SHOP_TYPE.google: {
      return fakeApiCall({
        delay: 1000,
        response: {
          shop: { name: "Dior", createdAt: Date.now() / 1000, email: "diorcompany.com", token: "access-token-123" },
          token: "access-token-456",
        },
      })
    }
    default: {
      throw Error("Invalid type")
    }
  }
}
