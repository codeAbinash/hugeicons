#!/usr/bin/env bun

import generateReactIcon from './src/react/index'
import readConfig from './src/lib/readConfig'
let options = process.argv.slice(2)

const { targetPlatform = 'react' } = readConfig()

const iconName = options[0]
if (!iconName) {
  console.error('Please provide an icon name')
  process.exit(1)
}

switch (targetPlatform) {
  case 'react':
    generateReactIcon(iconName)
    break
  default:
    console.error('Target platform `' + targetPlatform + '` is not supported')
    console.log('Now only `react` is supported')
    process.exit(1)
}
