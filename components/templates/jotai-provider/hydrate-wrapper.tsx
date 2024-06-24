"use client"

/**
 * THIS IS EXAMPLE OF USING HYDRATE ATOMS
 *
 * How to it working?
 * 1. Get data from server (in this case is token)
 * 2. From your data => create your initial state and pass to hook useHydrateAtoms
 * 3. your initialState pass on useHydrateAtoms with replace initial state of your atom
 * */
import { useHydrateAtoms } from "jotai/utils"

import { authAtom, getAuthInitialState } from "lib/jotai/atoms/auth"

interface Props {
  children: React.ReactNode
  token?: string
}
function HydrateWrapper({ children, token }: Props) {
  useHydrateAtoms([[authAtom, getAuthInitialState(token)] as const])
  return children
}

export default HydrateWrapper
