#!/usr/bin/env node
import fs from 'fs'
import path from 'path'

const iconsDir = path.join(process.cwd(), 'dev/assets/icons/unitaires')
if (!fs.existsSync(iconsDir)) {
  console.log('No icons directory found. Nothing to generate.')
  process.exit(0)
}

const icons = fs.readdirSync(iconsDir).filter((file) => file.endsWith('.svg')).sort()
console.log(`Icons available: ${icons.length}`)
for (const icon of icons) console.log(`- ${icon}`)
