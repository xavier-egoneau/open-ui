import path from 'path'
import { describe, expect, it } from 'vitest'
import { listJsonFiles } from './design-system.js'

describe('empty design-system workspace', () => {
  it('accepte un dossier dev/components absent', () => {
    const missingComponents = path.join(process.cwd(), 'dev/__openui_missing__/components')

    expect(listJsonFiles(missingComponents)).toEqual([])
  })
})
