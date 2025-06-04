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


export const defaultConfig = {
  outputDir: './src/assets/icons/hugeicons',
  defaultColor: 'currentColor',
  defaultStrokeWidth: 1.5,
  defaultVariant: 'stroke-rounded',
  defaultSize: 24,
}