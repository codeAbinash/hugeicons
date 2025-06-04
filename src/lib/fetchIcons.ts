import { URL, variants } from './constants'

export default async function fetchIcons(iconName: string): Promise<string[]> {
  const urls = variants.map((variant) => URL + '/' + iconName + '-' + variant + '.svg')

  console.log('⚡ Fetching icons variants of: ' + iconName)

  const data = await Promise.all(urls.map((url) => fetch(url)))
  if (data.some((d) => !d.ok)) {
    console.error(`Icon ${iconName} not found`)
    process.exit(1)
  }

  const iconsData = await Promise.all(data.map((d) => d.text()))
  return iconsData
}
