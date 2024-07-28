#!/usr/bin/env bun

import * as fs from 'fs'
import { variants } from './constants'

const URL = 'https://cdn.hugeicons.com/icons'

const defaults = {
   iconName: '',
   strokeWidth: 1.7,
   color: 'currentColor',
   variant: 'stroke-rounded',
   outputDir: './src/assets/icons',
}

let options = process.argv.slice(2)
// console.log('options:', options)

let color = defaults.color
let strokeWidth = defaults.strokeWidth
let variant = defaults.variant
let outputDir = defaults.outputDir

for (let i = 1; i < options.length; i++) {
   const val = options[i]
   if (val.startsWith('#')) {
      color = val
      continue
   }
   if (!isNaN(parseFloat(val))) {
      strokeWidth = parseFloat(val)
      continue
   }
   if (variants.includes(val)) {
      variant = val
      continue
   }
   if (val.includes('/')) {
      outputDir = val
      continue
   }
}

let iconName = options[0]

const fillColor = { form: `fill="#141B34"`, to: `fill="${color}"` }
const strokeWidthConvert = { form: `stroke-width="1.5"`, to: `stroke-width="${strokeWidth}"` }
const strokeColorConvert = { from: `stroke="#141B34"`, to: `stroke="${color}"` }

function createFolderIfNotExists(path: string) {
   if (!fs.existsSync(path)) fs.mkdirSync(path, { recursive: true })
}

function replaceIconContent(iconString: string): string {
   return iconString
      .replace(new RegExp(fillColor.form, 'g'), fillColor.to)
      .replace(new RegExp(strokeWidthConvert.form, 'g'), strokeWidthConvert.to)
      .replace(new RegExp(strokeColorConvert.from, 'g'), strokeColorConvert.to)
}

async function main() {
   if (!iconName) {
      console.error('Please enter icon name to continue')
   } else {
      const iconPath = `${outputDir}/${iconName}-${variant}.svg`
      console.log()
      console.log('📛', iconName, '🖌️ ', strokeWidth, ' 🎨', color, '🪆 ', variant)
      console.log('📂', iconPath)

      const url = `${URL}/${iconName}-${variant}.svg`
      const iconData = await fetch(url)
      if (!iconData.ok) {
         console.error(`Icon ${iconName}-${variant}.svg not found\n`)
         process.exit(1)
      }

      const iconStr = replaceIconContent(await iconData.text())
      createFolderIfNotExists(outputDir)

      fs.writeFileSync(iconPath, iconStr)

      console.log()
      //  console.log(`Icon ${iconName}-${variant}.svg downloaded successfully`)
   }
}

main()
