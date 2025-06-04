import * as fs from 'fs'

type Config = {
  outputDir: string
  targetPlatform: 'react' | 'react-native'
  defaultStrokeWidth: number
  defaultColor: string
  defaultSize: number
  defaultVariant: string
}

export default function readConfig() {
  let config = {}

  if (!fs.existsSync('./hugeicons.config.json')) return {} as Config

  try {
    config = JSON.parse(fs.readFileSync('./hugeicons.config.json', 'utf8'))
  } catch (err) {
    console.log('Error reading config file: hugeicons.config.json')
    process.exit(1)
  }
  return config as Config
}
