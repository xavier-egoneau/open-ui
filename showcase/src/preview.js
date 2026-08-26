import 'virtual:openui-project-styles.scss'
import { SHOWCASE_API, SHOWCASE_MESSAGES, SHOWCASE_PREVIEW_SOURCE, SHOWCASE_SOURCE } from '../shared/protocol.js'
import { normalizeAxeResults } from './quality-state.js'

const root = document.querySelector('#preview-root')
const placeholder = document.querySelector('#preview-placeholder')
const errorPanel = document.querySelector('#preview-error')
let activeRequest = null
let axeModulePromise = null

window.addEventListener('message', handleMessage)
document.addEventListener('submit', (event) => event.preventDefault())
document.addEventListener('click', (event) => {
  const link = event.target instanceof Element
    ? event.target.closest('a[href]')
    : null
  if (link) event.preventDefault()
})

const resizeObserver = new ResizeObserver(reportHeight)
resizeObserver.observe(root)

postToShowcase(SHOWCASE_MESSAGES.ready)

async function handleMessage(event) {
  if (event.source !== window.parent) return
  if (event.origin !== location.origin) return
  if (event.data?.source !== SHOWCASE_SOURCE) return

  if (event.data.type === SHOWCASE_MESSAGES.connect) {
    postToShowcase(SHOWCASE_MESSAGES.ready)
    return
  }

  if (event.data.type === SHOWCASE_MESSAGES.settings) {
    document.body.dataset.background = event.data.background ?? 'light'
    return
  }

  if (event.data.type === SHOWCASE_MESSAGES.audit) {
    runAccessibilityAudit(event.data.revision)
    return
  }

  if (event.data.type !== SHOWCASE_MESSAGES.render) return

  const revision = event.data.revision
  activeRequest?.abort()
  activeRequest = new AbortController()
  root.setAttribute('aria-busy', 'true')
  errorPanel.hidden = true

  try {
    const response = await fetch(SHOWCASE_API.render, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        componentId: event.data.componentId,
        props: event.data.props
      }),
      signal: activeRequest.signal
    })
    const payload = await response.json()
    if (!response.ok) throw new Error(payload.error ?? 'Le rendu Twig a échoué.')

    root.innerHTML = payload.html
    root.dataset.level = payload.component.level
    root.setAttribute('aria-busy', 'false')
    placeholder.hidden = true
    errorPanel.hidden = true
    postToShowcase(SHOWCASE_MESSAGES.rendered, {
      componentId: payload.component.id,
      html: payload.html,
      revision
    })
    requestAnimationFrame(reportHeight)
  } catch (error) {
    if (error.name === 'AbortError') return
    root.replaceChildren()
    root.setAttribute('aria-busy', 'false')
    placeholder.hidden = true
    errorPanel.hidden = false
    errorPanel.textContent = error.message
    postToShowcase(SHOWCASE_MESSAGES.error, { error: error.message, revision })
    reportHeight()
  }
}

async function runAccessibilityAudit(revision) {
  try {
    axeModulePromise ??= import('axe-core').then((module) => module.default)
    const axe = await axeModulePromise
    const results = await axe.run(root, {
      resultTypes: ['violations', 'incomplete', 'passes']
    })

    postToShowcase(SHOWCASE_MESSAGES.audited, {
      revision,
      violations: normalizeAxeResults(results.violations),
      incomplete: normalizeAxeResults(results.incomplete),
      passes: results.passes.length
    })
  } catch (error) {
    postToShowcase(SHOWCASE_MESSAGES.auditError, {
      revision,
      error: error.message
    })
  }
}

function reportHeight() {
  const rootHeight = Math.ceil(root.getBoundingClientRect().height)
  postToShowcase(SHOWCASE_MESSAGES.resize, { height: rootHeight + 96 })
}

function postToShowcase(type, payload = {}) {
  window.parent.postMessage({
    source: SHOWCASE_PREVIEW_SOURCE,
    type,
    ...payload
  }, location.origin)
}
