import { type ClassValue, clsx } from "clsx"
import { twJoin, twMerge } from "tailwind-merge"
import { type ClassNameValue } from "tailwind-merge/dist/lib/tw-join"

export type CNInputs = ClassValue[]

export function cn(...inputs: CNInputs) {
  return twMerge(clsx(inputs)) || undefined
}

export type CNJoinInputs = ClassNameValue[]

export function cnJoin(...input: CNJoinInputs) {
  return twJoin(...input)
}
