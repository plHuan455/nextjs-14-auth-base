export interface IShop {
  name: string
  email?: string
  avatar?: string
  createdAt: number // timestamps seconds
}

export enum CREATE_SHOP_TYPE {
  google = "google",
  username = "username",
}

// CREATE
export type ICreateShopTypes = {
  shopName: string
} & (ICreateShopGoogle | ICreateShopUsername)

export interface ICreateShopGoogle {
  type: CREATE_SHOP_TYPE.google
  token: string
}

export interface ICreateShopUsername {
  type: CREATE_SHOP_TYPE.username
  username: string
  password: string
}

// LOGIN SHOP
export type ILoginShopTypes = ICreateShopGoogle | ICreateShopUsername
