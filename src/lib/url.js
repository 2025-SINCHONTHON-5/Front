// src/lib/url.js
export function toAbsolute(src) {
  if (!src) return null
  if (/^https?:\/\//i.test(src)) return src
  const base = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '')
  const path = src.startsWith('/') ? src : `/${src}`
  return `${base}${path}`
}
