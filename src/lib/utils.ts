import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getDateStr(timestamp: string) {
  return new Date(timestamp).toDateString()
}

export function getTimeStr(timestamp: number) {
  return new Date(timestamp).toUTCString()
}
