import { collectImpactGraph } from './design-system.js'

const target = process.argv[2]
const graph = collectImpactGraph()

if (!target) {
  console.log(JSON.stringify(graph, null, 2))
  process.exit(0)
}

if (!graph[target]) {
  console.error(`Unknown component: ${target}`)
  process.exit(1)
}

const impacts = graph[target]
console.log(`# Impact: ${target}`)
console.log('')
console.log(`Components: ${impacts.components.length ? impacts.components.join(', ') : 'none'}`)
console.log(`Pages: ${impacts.pages.length ? impacts.pages.join(', ') : 'none'}`)
