import { atom } from "jotai"

interface IAuthState {
  user?: { id: number; name?: string }
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
