import { Variant, variants } from '../../lib/constants'
import { convertAttributesToCamelCase } from '../../lib/convertAttributesToCamelCase'
import { hyphenToCamelCase } from '../../lib/utils'

export function toReactIcon(iconsData: string[]) {
  return iconsData.map((icon, index) => {
    const variant = variants[index]

    const processedIcon = icon
      .replace(/(\s)([a-z][\w-]*-[a-z][\w-]*)(=)/g, convertAttributesToCamelCase)
      .replace(/width="24"/g, 'width={size}')
      .replace(/height="24"/g, 'height={size}')
      .replace(/"#141B34"/g, '{color}')
      .replace(/strokeWidth="1.5"/g, 'strokeWidth={strokeWidth}')
      .replace(/<svg /g, '<svg className={className} ')

    return {
      variant: hyphenToCamelCase(variant) as Variant,
      icon: processedIcon,
    }
  })
}
