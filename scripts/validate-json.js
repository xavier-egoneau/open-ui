import fs from 'fs'
import { collectRefs, getComponentEntries, getPageEntries } from './design-system.js'

const errors = []
const warnings = []
const components = getComponentEntries()
const pages = getPageEntries()
const componentIds = new Set(components.map((component) => component.id))
const allowedControlTypes = new Set(['select', 'checkbox', 'text', 'color', 'number', 'array', 'component-params'])
const allowedLevels = new Set(['atom', 'molecule', 'organism', 'template'])

function fail(file, message) {
  errors.push(`${file}: ${message}`)
}

function warn(file, message) {
  warnings.push(`${file}: ${message}`)
}

function validateControls(file, groupName, controls = {}) {
  for (const [key, control] of Object.entries(controls)) {
    if (!control || typeof control !== 'object') {
      fail(file, `${groupName}.${key} must be an object`)
      continue
    }
    if (!control.label) warn(file, `${groupName}.${key} has no label`)
    if (!control.type) fail(file, `${groupName}.${key} has no type`)
    if (control.type && !allowedControlTypes.has(control.type)) {
      fail(file, `${groupName}.${key} has unsupported type "${control.type}"`)
    }
    if (control.type === 'select' && !Array.isArray(control.options)) {
      fail(file, `${groupName}.${key} select control must define options[]`)
    }
    if (!Object.hasOwn(control, 'default')) warn(file, `${groupName}.${key} has no default`)
  }
}

for (const component of components) {
  const file = component.jsonPath
  const schema = component.schema

  if (!schema.name) fail(file, 'missing name')
  if (!schema.level) fail(file, 'missing level')
  if (schema.level && !allowedLevels.has(schema.level)) fail(file, `unsupported level "${schema.level}"`)
  if (!schema.category) fail(file, 'missing category')
  if (!schema.description) fail(file, 'missing description')
  if (!fs.existsSync(component.twigPath)) fail(file, `missing twig file ${component.twigPath}`)
  if (!fs.existsSync(component.scssPath)) warn(file, `missing component scss ${component.scssPath}`)
  if (!fs.existsSync(component.mdPath)) warn(file, `missing component documentation ${component.mdPath}`)

  validateControls(file, 'variants', schema.variants ?? {})
  validateControls(file, 'content', schema.content ?? {})

  for (const ref of collectRefs(schema)) {
    if (ref !== 'grid' && !componentIds.has(ref)) fail(file, `references unknown component "${ref}"`)
  }
}

for (const page of pages) {
  const file = page.jsonPath
  const schema = page.schema

  if (!schema.name) fail(file, 'missing name')
  if (!schema.category) warn(file, 'missing category')
  if (!schema.description) warn(file, 'missing description')
  if (!fs.existsSync(page.twigPath)) fail(file, `missing twig file ${page.twigPath}`)

  validateControls(file, 'variants', schema.variants ?? {})
  validateControls(file, 'content', schema.content ?? {})

  for (const ref of collectRefs(schema)) {
    if (ref !== 'grid' && !componentIds.has(ref)) fail(file, `references unknown component "${ref}"`)
  }
}

if (warnings.length) {
  console.log('Warnings:')
  for (const warning of warnings) console.log(`- ${warning}`)
  console.log('')
}

if (errors.length) {
  console.error('Errors:')
  for (const error of errors) console.error(`- ${error}`)
  process.exit(1)
}

console.log(`JSON valid: ${components.length} components, ${pages.length} pages`)
