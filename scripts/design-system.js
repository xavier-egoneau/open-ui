import fs from 'fs'
import path from 'path'

export const ROOT = process.cwd()
export const COMPONENTS_DIR = path.join(ROOT, 'dev/components')
export const PAGES_DIR = path.join(ROOT, 'dev/pages')
export const SCSS_DIR = path.join(ROOT, 'dev/assets/scss')

export function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'))
}

export function kebabFromFile(filePath) {
  return path.basename(filePath, '.json')
}

export function listJsonFiles(dir) {
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir, { withFileTypes: true })
    .flatMap((entry) => {
      const entryPath = path.join(dir, entry.name)
      if (entry.isDirectory()) return listJsonFiles(entryPath)
      if (entry.isFile() && entry.name.endsWith('.json')) return [entryPath]
      return []
    })
    .sort()
}

export function getComponentEntries() {
  return listJsonFiles(COMPONENTS_DIR).map((jsonPath) => {
    const id = kebabFromFile(jsonPath)
    const dir = path.dirname(jsonPath)
    return {
      id,
      dir,
      jsonPath,
      twigPath: path.join(dir, `${id}.twig`),
      mdPath: path.join(dir, `${id}.md`),
      scssPath: path.join(SCSS_DIR, 'components', `_${id}.scss`),
      schema: readJson(jsonPath)
    }
  })
}

export function getPageEntries() {
  return listJsonFiles(PAGES_DIR).map((jsonPath) => {
    const id = kebabFromFile(jsonPath)
    const dir = path.dirname(jsonPath)
    return {
      id,
      dir,
      jsonPath,
      twigPath: path.join(dir, `${id}.twig`),
      scssPath: path.join(SCSS_DIR, 'components', `_${id}-page.scss`),
      schema: readJson(jsonPath)
    }
  })
}

export function collectRefs(schema) {
  const refs = new Set()

  for (const part of Object.values(schema.parts ?? {})) {
    if (part.component) refs.add(part.component)
  }

  for (const collection of Object.values(schema.collections ?? {})) {
    if (collection.itemComponent) refs.add(collection.itemComponent)
    if (collection.component) refs.add(collection.component)
  }

  for (const family of Object.values(schema.families ?? {})) {
    if (family.component) refs.add(family.component)
  }

  for (const instance of Object.values(schema.instances ?? {})) {
    if (instance.component) refs.add(instance.component)
  }

  for (const group of Object.values(schema.layoutGroups ?? {})) {
    if (group.component) refs.add(group.component)
  }

  for (const control of Object.values(schema.content ?? {})) {
    if (control.ref) refs.add(control.ref)
  }

  return [...refs].sort()
}

export function collectTwigIncludes(twigPath) {
  if (!fs.existsSync(twigPath)) return []
  const content = fs.readFileSync(twigPath, 'utf8')
  const refs = new Set()
  const includeRe = /include\s+['"]dev\/components\/([^/]+)\/[^'"]+['"]/g
  for (const match of content.matchAll(includeRe)) refs.add(match[1])
  return [...refs].sort()
}

export function collectImpactGraph() {
  const components = getComponentEntries()
  const pages = getPageEntries()
  const graph = new Map()

  for (const component of components) {
    graph.set(component.id, { components: new Set(), pages: new Set() })
  }

  function addImpact(target, sourceType, sourceId) {
    if (!graph.has(target)) graph.set(target, { components: new Set(), pages: new Set() })
    graph.get(target)[sourceType].add(sourceId)
  }

  for (const component of components) {
    const refs = new Set([...collectRefs(component.schema), ...collectTwigIncludes(component.twigPath)])
    for (const ref of refs) addImpact(ref, 'components', component.id)
  }

  for (const page of pages) {
    const refs = new Set([...collectRefs(page.schema), ...collectTwigIncludes(page.twigPath)])
    for (const ref of refs) addImpact(ref, 'pages', page.id)
  }

  return Object.fromEntries([...graph.entries()].map(([id, value]) => [id, {
    components: [...value.components].sort(),
    pages: [...value.pages].sort()
  }]))
}
