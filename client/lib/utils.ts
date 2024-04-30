import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatData(field: string | null | undefined, minLength: number = 0): string {
  if (!field || field.length < minLength) {
    return `missing ${field === null || field === undefined ? 'data' : 'details'}`;
  }
  return field;
}