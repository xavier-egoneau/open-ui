import { SHOWCASE_API, SHOWCASE_MESSAGES, SHOWCASE_PREVIEW_SOURCE, SHOWCASE_SOURCE } from '../shared/protocol.js'
import { getComponentDefaults, renderComposition, renderControls } from './controls.js'
import { isCurrentRender, normalizeRenderedHtml } from './render-state.js'

const LEVEL_ORDER = ['atom', 'molecule', 'organism', 'template']
const LEVEL_LABELS = {
  atom: 'Atoms',
  molecule: 'Molécules',
  organism: 'Organismes',
  template: 'Templates'
}

const elements = {
  catalogStatus: document.querySelector('#catalog-status'),
  catalogCount: document.querySelector('#catalog-count'),
  componentList: document.querySelector('#component-list'),
  search: document.querySelector('#component-search'),
  componentMeta: document.querySelector('#component-meta'),
  componentTitle: document.querySelector('#component-title'),
  componentDescription: document.querySelector('#component-description'),
  reset: document.querySelector('#reset-controls'),
  empty: document.querySelector('#inspector-empty'),
  controls: document.querySelector('#controls-container'),
  composition: document.querySelector('#composition-container'),
  propsOutput: document.querySelector('#props-output'),
  previewFrame: document.querySelector('#preview-frame'),
  previewShell: document.querySelector('#preview-shell'),
  workspaceEmpty: document.querySelector('#workspace-empty'),
  workspaceEmptyTitle: document.querySelector('#workspace-empty-title'),
  workspaceEmptyDescription: document.querySelector('#workspace-empty-description'),
  viewportPicker: document.querySelector('.viewport-picker'),
  renderStatus: document.querySelector('#render-status'),
  htmlStatus: document.querySelector('#html-output-status'),
  htmlPre: document.querySelector('#html-output-pre'),
  htmlCode: document.querySelector('#html-output-code'),
  copyHtml: document.querySelector('#copy-html'),
  copyHtmlStatus: document.querySelector('#copy-html-status'),
  background: document.querySelector('#preview-background')
}

const state = {
  components: [],
  selected: null,
  props: {},
  previewReady: false,
  renderTimer: null,
  renderRevision: 0,
  renderedHtml: ''
}

elements.search.addEventListener('input', () => renderCatalog(elements.search.value))
elements.reset.addEventListener('click', resetSelectedComponent)
elements.background.addEventListener('change', sendPreviewSettings)
elements.previewFrame.addEventListener('load', connectPreview)
elements.copyHtml.addEventListener('click', copyRenderedHtml)

for (const input of document.querySelectorAll('input[name="viewport"]')) {
  input.addEventListener('change', updateViewport)
}

window.addEventListener('message', handlePreviewMessage)
window.addEventListener('hashchange', selectFromHash)

connectPreview()
loadCatalog()

async function loadCatalog() {
  elements.catalogStatus.textContent = 'Chargement du catalogue…'

  try {
    const response = await fetch(SHOWCASE_API.catalog, { headers: { Accept: 'application/json' } })
    const payload = await response.json()
    if (!response.ok) throw new Error(payload.error ?? 'Catalogue indisponible.')

    state.components = payload.components ?? []
    elements.catalogCount.textContent = String(state.components.length)
    elements.catalogStatus.textContent = `${state.components.length} composants chargés`
    renderCatalog('')

    if (!state.components.length) {
      showEmptyWorkspace()
      return
    }

    enableComponentWorkspace()
    selectFromHash()
  } catch (error) {
    elements.catalogStatus.textContent = 'Showcase indisponible'
    elements.componentList.replaceChildren(createMessage(error.message, 'catalog__empty'))
    elements.renderStatus.textContent = 'Lancez le Showcase avec npm run dev.'
    showWorkspaceError(error.message)
  }
}

function renderCatalog(query) {
  const normalizedQuery = query.trim().toLocaleLowerCase('fr')
  const filtered = state.components.filter((component) => {
    const haystack = [component.name, component.id, component.category, component.description]
      .filter(Boolean)
      .join(' ')
      .toLocaleLowerCase('fr')
    return haystack.includes(normalizedQuery)
  })

  elements.componentList.replaceChildren()

  if (!filtered.length) {
    const message = state.components.length
      ? 'Aucun composant ne correspond à cette recherche.'
      : 'Aucun composant dans dev/components pour le moment.'
    elements.componentList.append(createMessage(message, 'catalog__empty'))
    return
  }

  const grouped = new Map()
  for (const level of LEVEL_ORDER) grouped.set(level, [])
  for (const component of filtered) {
    if (!grouped.has(component.level)) grouped.set(component.level, [])
    grouped.get(component.level).push(component)
  }

  for (const [level, components] of grouped) {
    if (!components.length) continue

    const section = document.createElement('section')
    section.className = 'catalog-group'
    const title = document.createElement('h3')
    title.textContent = LEVEL_LABELS[level] ?? level
    const list = document.createElement('ul')

    for (const component of components.sort((a, b) => a.name.localeCompare(b.name, 'fr'))) {
      const item = document.createElement('li')
      const button = document.createElement('button')
      button.className = 'component-button'
      button.type = 'button'
      button.dataset.componentId = component.id
      button.setAttribute('aria-pressed', component.id === state.selected?.id ? 'true' : 'false')
      button.addEventListener('click', () => selectComponent(component.id))

      const name = document.createElement('span')
      name.className = 'component-button__name'
      name.textContent = component.name
      const category = document.createElement('span')
      category.className = 'component-button__category'
      category.textContent = component.category
      button.append(name, category)
      item.append(button)
      list.append(item)
    }

    section.append(title, list)
    elements.componentList.append(section)
  }
}

function selectFromHash() {
  if (!state.components.length) return
  const requested = decodeURIComponent(location.hash.replace(/^#/, ''))
  const component = state.components.find((entry) => entry.id === requested) ?? state.components[0]
  if (component.id !== state.selected?.id) selectComponent(component.id, false)
}

function selectComponent(componentId, updateHash = true) {
  const component = state.components.find((entry) => entry.id === componentId)
  if (!component) return

  state.selected = component
  state.props = getComponentDefaults(component)
  enableComponentWorkspace()

  if (updateHash) history.replaceState(null, '', `#${encodeURIComponent(component.id)}`)

  elements.componentMeta.textContent = `${component.level} · ${component.category} · ${component.id}`
  elements.componentTitle.textContent = component.name
  elements.componentDescription.textContent = component.description
  elements.previewFrame.title = `Prévisualisation du composant ${component.name}`
  elements.empty.hidden = true
  elements.reset.disabled = false

  renderControls(elements.controls, component, state.props, updateProp)
  renderComposition(elements.composition, component)
  updatePropsOutput()
  renderCatalog(elements.search.value)
  scheduleRender(true)
}

function enableComponentWorkspace() {
  elements.search.disabled = false
  elements.viewportPicker.disabled = false
  elements.background.disabled = false
  elements.workspaceEmpty.hidden = true
  elements.previewShell.hidden = false
}

function showEmptyWorkspace() {
  elements.catalogStatus.textContent = 'Workspace vide · prêt'
  elements.search.disabled = true
  elements.viewportPicker.disabled = true
  elements.background.disabled = true
  elements.workspaceEmpty.hidden = false
  elements.previewShell.hidden = true
  elements.workspaceEmptyTitle.textContent = 'Commencez par votre premier composant.'
  elements.workspaceEmptyDescription.textContent = 'Le Showcase est opérationnel sans source projet. Ajoutez un contrat JSON, un template Twig et sa documentation quand vous êtes prêt.'
  elements.componentMeta.textContent = 'Workspace · 0 composant'
  elements.componentTitle.textContent = 'Design system prêt à démarrer'
  elements.componentDescription.textContent = 'dev/ peut rester vide au début du projet.'
  elements.empty.hidden = false
  elements.empty.textContent = 'Les variables apparaîtront ici dès qu’un composant sera ajouté.'
  elements.renderStatus.textContent = 'Aucun rendu à générer.'
  elements.htmlStatus.textContent = 'Aucun composant'
  elements.htmlPre.setAttribute('aria-busy', 'false')
  elements.htmlCode.textContent = '<!-- Ajoutez un composant pour générer son HTML. -->'
}

function showWorkspaceError(message) {
  showEmptyWorkspace()
  elements.catalogStatus.textContent = 'Showcase indisponible'
  elements.workspaceEmptyTitle.textContent = 'Le catalogue ne peut pas être chargé.'
  elements.workspaceEmptyDescription.textContent = message
  elements.componentMeta.textContent = 'Erreur de connexion'
  elements.componentTitle.textContent = 'Showcase indisponible'
  elements.componentDescription.textContent = 'Vérifiez que le serveur Vite est lancé.'
  elements.renderStatus.textContent = 'Lancez le Showcase avec npm run dev.'
}

function updateProp(key, value) {
  state.props[key] = value
  updatePropsOutput()
  scheduleRender(false)
}

function resetSelectedComponent() {
  if (!state.selected) return
  state.props = getComponentDefaults(state.selected)
  renderControls(elements.controls, state.selected, state.props, updateProp)
  updatePropsOutput()
  scheduleRender(true)
}

function updatePropsOutput() {
  elements.propsOutput.textContent = JSON.stringify(state.props, null, 2)
}

function scheduleRender(immediate) {
  clearTimeout(state.renderTimer)
  state.renderRevision += 1
  elements.renderStatus.textContent = 'Mise à jour du rendu…'
  invalidateRenderedHtml()

  if (immediate) {
    sendRender()
    return
  }

  state.renderTimer = setTimeout(sendRender, 120)
}

function sendRender() {
  if (!state.previewReady || !state.selected) return

  elements.previewFrame.contentWindow.postMessage({
    source: SHOWCASE_SOURCE,
    type: SHOWCASE_MESSAGES.render,
    componentId: state.selected.id,
    props: state.props,
    revision: state.renderRevision
  }, location.origin)
}

function invalidateRenderedHtml() {
  state.renderedHtml = ''
  elements.htmlStatus.textContent = 'Mise à jour…'
  elements.htmlPre.setAttribute('aria-busy', 'true')
  elements.htmlCode.textContent = 'Le HTML sera disponible après le prochain rendu.'
  elements.copyHtml.disabled = true
  elements.copyHtmlStatus.textContent = ''
}

function updateRenderedHtml(html) {
  state.renderedHtml = normalizeRenderedHtml(html)
  elements.htmlStatus.textContent = 'À jour'
  elements.htmlPre.setAttribute('aria-busy', 'false')
  elements.htmlCode.textContent = state.renderedHtml || '<!-- Le composant ne produit aucun HTML. -->'
  elements.copyHtml.disabled = !state.renderedHtml
  elements.copyHtmlStatus.textContent = ''
}

async function copyRenderedHtml() {
  if (!state.renderedHtml) return

  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(state.renderedHtml)
    } else {
      copyWithTemporaryField(state.renderedHtml)
    }
    elements.copyHtmlStatus.textContent = 'HTML copié.'
  } catch {
    elements.copyHtmlStatus.textContent = 'Copie impossible. Sélectionnez le code pour le copier manuellement.'
  }
}

function copyWithTemporaryField(value) {
  const previousFocus = document.activeElement
  const field = document.createElement('textarea')
  field.className = 'clipboard-helper'
  field.value = value
  field.readOnly = true
  document.body.append(field)
  field.select()
  const copied = document.execCommand('copy')
  field.remove()
  previousFocus?.focus()
  if (!copied) throw new Error('Copie refusée.')
}

function connectPreview() {
  state.previewReady = false
  if (state.selected) {
    state.renderRevision += 1
    elements.renderStatus.textContent = 'Reconnexion au rendu…'
    invalidateRenderedHtml()
  }
  elements.previewFrame.contentWindow?.postMessage({
    source: SHOWCASE_SOURCE,
    type: SHOWCASE_MESSAGES.connect
  }, location.origin)
}

function sendPreviewSettings() {
  if (!state.previewReady) return
  elements.previewFrame.contentWindow.postMessage({
    source: SHOWCASE_SOURCE,
    type: SHOWCASE_MESSAGES.settings,
    background: elements.background.value
  }, location.origin)
}

function updateViewport(event) {
  if (!event.target.checked) return
  elements.previewShell.style.width = event.target.value === 'auto'
    ? '100%'
    : `${event.target.value}px`
}

function handlePreviewMessage(event) {
  if (event.source !== elements.previewFrame.contentWindow) return
  if (event.origin !== location.origin) return
  if (event.data?.source !== SHOWCASE_PREVIEW_SOURCE) return

  if (event.data.type === SHOWCASE_MESSAGES.ready) {
    state.previewReady = true
    sendPreviewSettings()
    sendRender()
    return
  }

  if (event.data.type === SHOWCASE_MESSAGES.rendered) {
    if (!isCurrentRender(event.data.revision, state.renderRevision)) return
    elements.renderStatus.textContent = 'Rendu à jour'
    updateRenderedHtml(event.data.html)
    return
  }

  if (event.data.type === SHOWCASE_MESSAGES.error) {
    if (!isCurrentRender(event.data.revision, state.renderRevision)) return
    elements.renderStatus.textContent = `Erreur : ${event.data.error}`
    state.renderedHtml = ''
    elements.htmlStatus.textContent = 'Erreur de rendu'
    elements.htmlPre.setAttribute('aria-busy', 'false')
    elements.htmlCode.textContent = `<!-- ${event.data.error} -->`
    elements.copyHtml.disabled = true
    elements.copyHtmlStatus.textContent = ''
    return
  }

  if (event.data.type === SHOWCASE_MESSAGES.resize) {
    const height = Math.max(448, Math.min(Number(event.data.height) || 448, 900))
    elements.previewFrame.style.height = `${height}px`
  }
}

function createMessage(text, className) {
  const message = document.createElement('p')
  message.className = className
  message.textContent = text
  return message
}
