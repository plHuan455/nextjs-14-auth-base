import { atom } from "jotai"

import { IUserDetail } from "services/api/auth/types"

interface IAuthState {
  user?: IUserDetail
  token?: string
  isLogged: boolean
  isLoading: boolean
}

export const getAuthInitialState = (token?: string): IAuthState => ({
  token,
  isLogged: Boolean(token),
  isLoading: Boolean(token),
})
export const authAtom = atom<IAuthState>({
  user: undefined,
  token: undefined,
  isLogged: false,
  isLoading: false,
})
