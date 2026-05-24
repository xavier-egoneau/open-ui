import { collectImpactGraph, collectRefs, collectTwigIncludes, getComponentEntries, getPageEntries } from './design-system.js'

const graph = collectImpactGraph()
const components = getComponentEntries()
const pages = getPageEntries()

console.log('# Open UI component map')
console.log('')
console.log(`Components: ${components.length}`)
console.log(`Pages: ${pages.length}`)
console.log('')

for (const component of components) {
  const schemaRefs = collectRefs(component.schema)
  const twigRefs = collectTwigIncludes(component.twigPath)
  const impacts = graph[component.id] ?? { components: [], pages: [] }
  const refs = [...new Set([...schemaRefs, ...twigRefs])].sort()

  console.log(`## ${component.id}`)
  console.log(`- name: ${component.schema.name ?? component.id}`)
  console.log(`- level: ${component.schema.level ?? 'unknown'}`)
  console.log(`- category: ${component.schema.category ?? 'unknown'}`)
  console.log(`- refs: ${refs.length ? refs.join(', ') : 'none'}`)
  console.log(`- used by components: ${impacts.components.length ? impacts.components.join(', ') : 'none'}`)
  console.log(`- used by pages: ${impacts.pages.length ? impacts.pages.join(', ') : 'none'}`)
  console.log('')
}

console.log('# Pages')
console.log('')
for (const page of pages) {
  const refs = [...new Set([...collectRefs(page.schema), ...collectTwigIncludes(page.twigPath)])].sort()
  console.log(`## ${page.id}`)
  console.log(`- name: ${page.schema.name ?? page.id}`)
  console.log(`- refs: ${refs.length ? refs.join(', ') : 'none'}`)
  console.log('')
}
