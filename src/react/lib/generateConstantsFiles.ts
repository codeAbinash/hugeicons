import { defaultConfig, variants } from '../../lib/constants'
import readConfig from '../../lib/readConfig'

const {
  outputDir = defaultConfig.outputDir,
  defaultColor = defaultConfig.defaultColor,
  defaultStrokeWidth = defaultConfig.defaultStrokeWidth,
  defaultVariant = defaultConfig.defaultVariant,
  defaultSize = defaultConfig.defaultSize,
} = readConfig()

export function generateConstantsFiles() {
  const constantsPath = `${outputDir}/constants.ts`
  const constantsContent = `
export const variants = [\n  ${variants.map((v) => `'${v}' as const`).join(',\n  ')}\n]

export type Variant = (typeof variants)[number]

export type HugeIconProps = {
  variant?: Variant
  size?: number
  color?: string
  strokeWidth?: number
  className?: string
}

export const defaultStrokeWidth = ${defaultStrokeWidth}
export const defaultColor = '${defaultColor}'
export const defaultVariant = '${defaultVariant}'
export const defaultSize = ${defaultSize}
`
  return { constantsPath, constantsContent }
}
