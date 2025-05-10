#!/usr/bin/env bun

import * as fs from 'fs'
import { URL, variants } from './constants'
import readConfig from './readConfig'
import { createFolderIfNotExists, hyphenToCamelCase } from './utils'
let options = process.argv.slice(2)

const {
  outputDir = './src/assets/icons/hugeicons',
  targetPlatform = 'react',
  defaultColor = 'currentColor',
  defaultStrokeWidth = 1.5,
  defaultVariant = 'stroke-rounded',
  defaultSize = 24,
} = readConfig()

if (targetPlatform !== 'react') {
  console.error('Target platform `' + targetPlatform + '` is not supported')
  console.log('Now only `react` is supported')
  process.exit(1)
}

const iconName = options[0]
if (!iconName) {
  console.error('Please provide an icon name')
  process.exit(1)
}

const pascalCaseIconName = hyphenToCamelCase(iconName)

const urls = variants.map((variant) => URL + '/' + iconName + '-' + variant + '.svg')
console.log('⚡ Fetching icons variants of: ' + iconName)

const data = await Promise.all(urls.map((url) => fetch(url)))
if (data.some((d) => !d.ok)) {
  console.error(`Icon ${iconName} not found`)
  process.exit(1)
}

const iconsData = await Promise.all(data.map((d) => d.text()))
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
      .replace(/stroke-miterlimit/g, 'strokeMiterlimit')
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
