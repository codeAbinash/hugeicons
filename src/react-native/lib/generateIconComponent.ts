import { Variant, variants } from '../../lib/constants'
import { defaultParameters } from './constants'

export function generateIconComponent(icons: { variant: Variant; icon: string }[], pascalCaseIconName: string) {
  return `
import React from 'react'
import Svg, { Circle, ClipPath, Defs, Ellipse, G, Line, LinearGradient, Mask, Path, Polygon, Polyline, RadialGradient, Rect, Stop } from 'react-native-svg'
import { Variant, IconProps, defaultStrokeWidth, defaultVariant, defaultColor, defaultSize } from './constants'

const iconMap: Record<Variant, React.FC<IconProps>> = {
${variants.map((v, i) => `\t'${v}': ${icons[i].variant},`).join('\n')}
}

export default function ${pascalCaseIconName}Icon({ variant, ...rest }: IconProps) {
  const Component = iconMap[variant || defaultVariant]
  return <Component {...rest} />
}

${icons
  .map(
    ({ variant, icon }) => `function ${variant}(${defaultParameters}) {
  return (${icon})
}`,
  )
  .join('\n\n')}
`
}
