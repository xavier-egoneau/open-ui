import { describe, expect, it } from 'vitest'
import { getShowcaseCatalog, getShowcaseComponent, normalizeComponentProps } from './catalog.js'

const schema = {
  variants: {
    tone: {
      type: 'select',
      options: ['neutral', 'positive'],
      default: 'neutral'
    },
    disabled: {
      type: 'checkbox',
      default: false
    },
    columns: {
      type: 'number',
      default: 2
    }
  },
  content: {
    label: {
      type: 'text',
      default: 'Continuer'
    },
    items: {
      type: 'array',
      item: {
        fields: {
          text: { type: 'text', default: 'Nouveau lien' },
          href: { type: 'text', default: '#' },
          current: { type: 'checkbox', default: false }
        }
      },
      default: []
    },
    action: {
      type: 'component-params',
      default: {}
    }
  }
}

describe('normalizeComponentProps', () => {
  it('normalise tous les contrôles directs déclarés par le composant', () => {
    expect(normalizeComponentProps(schema, {
      tone: 'positive',
      disabled: 1,
      columns: '3',
      label: 42,
      items: [
        { text: 'Accueil', href: '/', current: 1, unknown: 'ignoré' },
        { text: 'Contact', href: '/contact' }
      ],
      action: { href: '/continuer' },
      unknown: 'ignoré'
    })).toEqual({
      tone: 'positive',
      disabled: true,
      columns: 3,
      label: '42',
      items: [
        { text: 'Accueil', href: '/', current: true },
        { text: 'Contact', href: '/contact', current: false }
      ],
      action: { href: '/continuer' }
    })
  })

  it('revient aux valeurs par défaut pour un payload absent ou invalide', () => {
    expect(normalizeComponentProps(schema, null)).toEqual({
      tone: 'neutral',
      disabled: false,
      columns: 2,
      label: 'Continuer',
      items: [],
      action: {}
    })

    expect(normalizeComponentProps(schema, {
      tone: 'inconnue',
      columns: 'pas-un-nombre',
      items: {},
      action: []
    })).toEqual({
      tone: 'neutral',
      disabled: false,
      columns: 2,
      label: 'Continuer',
      items: [],
      action: {}
    })
  })
})

describe('empty workspace', () => {
  it('expose un catalogue vide sans inventer de composant', () => {
    expect(getShowcaseCatalog([])).toEqual([])
    expect(getShowcaseComponent('button', [])).toBeNull()
  })
})
