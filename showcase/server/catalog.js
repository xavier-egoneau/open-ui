import fs from 'fs'
import { getComponentEntries } from '../../scripts/design-system.js'

const CONTROL_GROUPS = ['variants', 'content']

export function getShowcaseCatalog(components = getComponentEntries()) {
  return components.map((component) => ({
    id: component.id,
    ...component.schema,
    documentation: fs.existsSync(component.mdPath)
      ? fs.readFileSync(component.mdPath, 'utf8')
      : ''
  }))
}

export function getShowcaseComponent(componentId, components = getComponentEntries()) {
  return components.find((component) => component.id === componentId) ?? null
}

export function normalizeComponentProps(schema, submittedProps = {}) {
  const safeProps = submittedProps && typeof submittedProps === 'object' && !Array.isArray(submittedProps)
    ? submittedProps
    : {}
  const normalized = {}

  for (const groupName of CONTROL_GROUPS) {
    for (const [key, control] of Object.entries(schema[groupName] ?? {})) {
      const submitted = Object.hasOwn(safeProps, key)
        ? safeProps[key]
        : control.default

      normalized[key] = normalizeControlValue(control, submitted)
    }
  }

  return normalized
}

function normalizeControlValue(control, value) {
  if (control.type === 'checkbox') return Boolean(value)

  if (control.type === 'number') {
    const number = Number(value)
    return Number.isFinite(number) ? number : Number(control.default ?? 0)
  }

  if (control.type === 'select') {
    return Array.isArray(control.options) && control.options.includes(value)
      ? value
      : control.default
  }

  if (control.type === 'array') {
    const items = Array.isArray(value) ? value : structuredClone(control.default ?? [])
    return control.item ? items.map((item) => normalizeArrayItem(control.item, item)) : items
  }

  if (control.type === 'component-params') {
    return value && typeof value === 'object' && !Array.isArray(value)
      ? value
      : structuredClone(control.default ?? {})
  }

  return value == null ? '' : String(value)
}

function normalizeArrayItem(itemSchema, value) {
  if (itemSchema.fields && typeof itemSchema.fields === 'object' && !Array.isArray(itemSchema.fields)) {
    const safeValue = value && typeof value === 'object' && !Array.isArray(value) ? value : {}
    return Object.fromEntries(Object.entries(itemSchema.fields).map(([fieldKey, fieldControl]) => {
      const fieldValue = Object.hasOwn(safeValue, fieldKey)
        ? safeValue[fieldKey]
        : fieldControl.default
      return [fieldKey, normalizeControlValue(fieldControl, fieldValue)]
    }))
  }

  return normalizeControlValue(itemSchema, value)
}
