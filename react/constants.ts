export const variants = [
  'stroke-rounded' as const,
  'stroke-standard' as const,
  'solid-standard' as const,
  'duotone-rounded' as const,
  'twotone-rounded' as const,
  'solid-rounded' as const,
  'bulk-rounded' as const,
  'stroke-sharp' as const,
  'solid-sharp' as const,
]

export type Variant = (typeof variants)[number]

export const URL = 'https://cdn.hugeicons.com/icons'
