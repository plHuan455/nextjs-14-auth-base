export enum AuthType {
  username = "username",
}

export type MetadataDataType = {
  fullName?: string
  avatar?: string
  telegram?: string
}

export interface IUserDetail {
  id: number
  subName: string
  avatar?: string
  fullName?: string
  metadata?: string
}

export type MeResponse = {
  user: IUserDetail
}

// LOGIN
export type LoginParams = {
  type: AuthType.username
  username: string
  password: string
}

export type LoginResponse = {
  token: string
  user: IUserDetail
}
