#!/usr/bin/env node
import fs from 'fs'
import path from 'path'

const publicDir = path.join(process.cwd(), 'public')
if (fs.existsSync(publicDir)) fs.rmSync(publicDir, { recursive: true, force: true })
console.log('Cleaned public/')
