export enum AuthType {
  username = "username",
}

export interface IUser {
  id: number
  avatar?: string
  fullName?: string
}

export type LoginParams = {
  type: AuthType.username
  username: string
  password: string
}
