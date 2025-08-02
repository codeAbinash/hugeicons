import * as fs from 'fs'
import { defaultConfig } from '../../lib/constants'
import readConfig from '../../lib/readConfig'

const {
  outputDir = defaultConfig.outputDir,
  defaultColor = defaultConfig.defaultColor,
  defaultStrokeWidth = defaultConfig.defaultStrokeWidth,
  defaultSize = defaultConfig.defaultSize,
} = readConfig()

export function generateConstantsFile() {
  const constantsPath = `${outputDir}/constants.ts`

  const constantsContent = `import { StyleProp, ViewStyle } from 'react-native'

export type HugeIconProps = {
  size?: number
  color?: string
  strokeWidth?: number
  className?: string
  style?: StyleProp<ViewStyle>
}

export const defaultStrokeWidth = ${defaultStrokeWidth}
export const defaultColor = '${defaultColor}'
export const defaultSize = ${defaultSize}
`

  fs.writeFileSync(constantsPath, constantsContent)
}
