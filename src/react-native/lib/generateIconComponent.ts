import { type Variant } from '../../lib/constants'
import readConfig from '../../lib/readConfig'
import { hyphenToCamelCase } from '../../lib/utils'
import { defaultParameters } from './constants'

const { defaultVariant } = readConfig()
const camelVariant = hyphenToCamelCase(defaultVariant)

export function generateIconComponent(icons: { variant: Variant; icon: string }[], pascalCaseIconName: string) {
  return `
import React from 'react'
import Svg, { Circle, ClipPath, Defs, Ellipse, G, Line, LinearGradient, Mask, Path, Polygon, Polyline, RadialGradient, Rect, Stop } from 'react-native-svg'
import { HugeIconProps, defaultStrokeWidth, defaultColor, defaultSize } from './constants'

${icons
  .map(({ variant, icon }) => {
    const v = variant === camelVariant ? '' : hyphenToCamelCase(variant)
    return `export function ${pascalCaseIconName}${v}(${defaultParameters}) {
return (${icon})
}`
  })
  .join('\n\n')}
`
}
