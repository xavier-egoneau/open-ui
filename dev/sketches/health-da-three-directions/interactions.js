const menuButton = document.querySelector('[data-menu-button]')
const menu = document.querySelector('[data-menu]')
const modal = document.querySelector('[data-modal]')
const backdrop = document.querySelector('[data-modal-backdrop]')
let lastFocused = null

function closeMenu() {
  if (!menu || !menuButton) return
  menu.hidden = true
  menuButton.setAttribute('aria-expanded', 'false')
}

function openMenu() {
  if (!menu || !menuButton) return
  menu.hidden = false
  menuButton.setAttribute('aria-expanded', 'true')
  menu.querySelector('button')?.focus()
}

menuButton?.addEventListener('click', () => {
  if (menu?.hidden) openMenu()
  else closeMenu()
})

menuButton?.addEventListener('mouseenter', () => {
  if (window.matchMedia('(hover: hover)').matches) {
    menu.hidden = false
    menuButton.setAttribute('aria-expanded', 'true')
  }
})

menu?.addEventListener('mouseleave', closeMenu)

document.addEventListener('click', (event) => {
  if (!event.target.closest('.clinical-actions-menu')) closeMenu()
})

function openModal() {
  if (!modal || !backdrop) return
  lastFocused = document.activeElement
  backdrop.hidden = false
  modal.hidden = false
  modal.querySelector('[data-close-modal]')?.focus()
}

function closeModal() {
  if (!modal || !backdrop) return
  modal.hidden = true
  backdrop.hidden = true
  lastFocused?.focus?.()
}

document.querySelectorAll('[data-open-modal]').forEach((button) => {
  button.addEventListener('click', openModal)
})

document.querySelectorAll('[data-close-modal]').forEach((button) => {
  button.addEventListener('click', closeModal)
})

backdrop?.addEventListener('click', closeModal)

if (window.location.hash === '#menu-open') openMenu()
if (window.location.hash === '#care-modal-open') openModal()

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeMenu()
    closeModal()
  }

  if (event.key !== 'Tab' || modal?.hidden) return
  const focusables = [...modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')]
  if (!focusables.length) return
  const first = focusables[0]
  const last = focusables[focusables.length - 1]

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault()
    last.focus()
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault()
    first.focus()
  }
})
