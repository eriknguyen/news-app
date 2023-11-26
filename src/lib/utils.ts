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

export function strToSlug(str: string) {
  // Remove special characters, convert to lowercase, and replace spaces with dashes
  const slug = str
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove non-word characters (excluding spaces and dashes)
    .replace(/\s+/g, '-') // Replace spaces with dashes
    .replace(/--+/g, '-') // Replace consecutive dashes with a single dash

  return slug
}
