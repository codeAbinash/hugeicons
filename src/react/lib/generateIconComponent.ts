import { Variant, variants } from '../../lib/constants'
import { defaultParameters } from './constants'

type Props = {
  icons: {
    variant: Variant
    icon: string
  }[]
  pascalCaseIconName: string
}

export function generateIconComponent({ icons, pascalCaseIconName }: Props) {
  return `
import React from 'react'
import { Variant, HugeIconProps, defaultStrokeWidth, defaultVariant, defaultColor, defaultSize } from './constants'

const iconMap: Record<Variant, React.FC<HugeIconProps>> = {\n${variants.map((v, i) => `\t'${v}': ${icons[i].variant},`).join('\n')}\n}

export default function ${pascalCaseIconName}Icon({ variant, ...rest }: HugeIconProps) {
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
}
