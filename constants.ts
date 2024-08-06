export const variants = [
   'stroke-standard' as const,
   'solid-standard' as const,
   'stroke-rounded' as const,
   'duotone-rounded' as const,
   'twotone-rounded' as const,
   'solid-rounded' as const,
   'bulk-rounded' as const,
   'stroke-sharp' as const,
   'solid-sharp' as const,
]

export type Variant = (typeof variants)[number]
