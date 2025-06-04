import * as fs from 'fs'
import fetchIcons from './fetchIcons'
import readConfig from './readConfig'
import { createFolderIfNotExists, hyphenToCamelCase } from './utils'
import { variants } from './constants'

const {
  outputDir = './src/assets/icons/hugeicons',
  defaultColor = 'currentColor',
  defaultStrokeWidth = 1.5,
  defaultVariant = 'stroke-rounded',
  defaultSize = 24,
} = readConfig()

export default async function generateReactIcon(iconName: string) {
  const pascalCaseIconName = hyphenToCamelCase(iconName)
  const iconsData = await fetchIcons(iconName)

  const icons = iconsData.map((icon, index) => {
    const variant = variants[index]
    return {
      variant: hyphenToCamelCase(variant),
      icon: icon
        .replace(/width="24"/g, 'width={size}')
        .replace(/height="24"/g, 'height={size}')
        .replace(/"#141B34"/g, '{color}')
        .replace(/stroke-width="1.5"/g, 'stroke-width={strokeWidth}')
        .replace(/<svg /g, '<svg className={className} ')
        .replace(/clip-rule/g, 'clipRule')
        .replace(/fill-rule/g, 'fillRule')
        .replace(/stroke-width/g, 'strokeWidth')
        .replace(/stroke-linecap/g, 'strokeLinecap')
        .replace(/stroke-linejoin/g, 'strokeLinejoin')
        .replace(/stroke-miterlimit/g, 'strokeMiterlimit'),
    }
  })

  const ComponentPath = `${outputDir}/${pascalCaseIconName}Icon.tsx`
  console.log('📁 ' + ComponentPath)

  const defaultParameters = `{ size = defaultSize, color = defaultColor, strokeWidth = defaultStrokeWidth, className }: IconProps`

  const output = `
import React from 'react'
import { Variant, IconProps, defaultStrokeWidth, defaultVariant, defaultColor, defaultSize } from './constants'

const iconMap: Record<Variant, React.FC<IconProps>> = {\n${variants.map((v, i) => `\t'${v}': ${icons[i].variant},`).join('\n')}\n}

export default function ${pascalCaseIconName}Icon({ variant, ...rest }: IconProps) {
  const Component = iconMap[variant || defaultVariant]
  return <Component {...rest} />
}

${icons
  .map(({ variant, icon }) => {
    return `
function ${variant}(${defaultParameters}) {
  return (${icon})
}`
  })
  .join('\n')}
`

  createFolderIfNotExists(outputDir)
  fs.writeFileSync(ComponentPath, output)

  const constantsPath = `${outputDir}/constants.ts`
  const constantsContent = `
export const variants = [\n  ${variants.map((v) => `'${v}' as const`).join(',\n  ')}\n]

export type Variant = (typeof variants)[number]

export type IconProps = {
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

  fs.writeFileSync(constantsPath, constantsContent)

  console.log('✅ Done 😎')
}
