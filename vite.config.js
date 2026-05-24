import fs from 'fs'
import path from 'path'
import { defineConfig } from 'vite'
import Twig from 'twig'

const ROOT = process.cwd()
const PAGES_DIR = path.join(ROOT, 'dev/pages')

// Les includes utilisent des chemins depuis la racine ('dev/components/...')
// settings.views = ROOT indique à twig 3.x d'utiliser ROOT comme base de résolution.
function renderTwig(filePath, data = {}) {
  return new Promise((resolve, reject) => {
    Twig.cache(false)
    Twig.renderFile(filePath, { ...data, settings: { views: ROOT } }, (err, html) => {
      if (err) reject(err)
      else resolve(html)
    })
  })
}

function openUIPlugin() {
  return {
    name: 'openui',

    // Build : rend chaque page Twig → HTML temporaire, passé à Rollup comme entrée
    async config(cfg, { command }) {
      if (command !== 'build') return
      const pages = fs.readdirSync(PAGES_DIR).filter(f => f.endsWith('.twig'))
      const inputs = {}
      for (const file of pages) {
        const slug = file.replace('.twig', '')
        const html = await renderTwig(path.join(PAGES_DIR, file), {})
        const tmpPath = path.join(ROOT, `${slug}.html`)
        fs.writeFileSync(tmpPath, html, 'utf8')
        inputs[slug] = tmpPath
      }
      cfg.build ??= {}
      cfg.build.rollupOptions ??= {}
      cfg.build.rollupOptions.input = inputs
    },

    // Build : nettoie les HTML temporaires après le bundle
    closeBundle() {
      const pages = fs.existsSync(PAGES_DIR)
        ? fs.readdirSync(PAGES_DIR).filter(f => f.endsWith('.twig'))
        : []
      for (const file of pages) {
        const tmpPath = path.join(ROOT, file.replace('.twig', '.html'))
        if (fs.existsSync(tmpPath)) fs.unlinkSync(tmpPath)
      }
    },

    // Dev : rendu Twig à la volée
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const pathname = new URL(req.url, 'http://localhost').pathname
        const slug = pathname === '/' ? null : pathname.slice(1).replace(/\.html$/, '')

        // Index : liste des pages disponibles
        if (!slug) {
          const pages = fs.existsSync(PAGES_DIR)
            ? fs.readdirSync(PAGES_DIR).filter(f => f.endsWith('.twig')).map(f => f.replace('.twig', ''))
            : []
          const links = pages.map(p => `<li><a href="/${p}.html">${p}</a></li>`).join('\n')
          res.setHeader('Content-Type', 'text/html; charset=utf-8')
          res.end(`<!DOCTYPE html><html lang="fr"><head><meta charset="UTF-8"><title>Pages</title></head><body><ul>${links}</ul></body></html>`)
          return
        }

        const twigPath = path.join(PAGES_DIR, `${slug}.twig`)
        if (!fs.existsSync(twigPath)) return next()

        try {
          let html = await renderTwig(twigPath, {})
          html = html.replace('</head>', '  <script type="module" src="/@vite/client"></script>\n</head>')
          res.setHeader('Content-Type', 'text/html; charset=utf-8')
          res.end(html)
        } catch (e) {
          res.statusCode = 500
          res.end(`<!DOCTYPE html><html><body><pre style="color:red">Twig Error in ${slug}.twig:\n${e.message}</pre></body></html>`)
        }
      })
    },

    // HMR : rechargement complet sur changement .twig
    handleHotUpdate({ file, server }) {
      if (file.endsWith('.twig')) {
        server.ws.send({ type: 'full-reload' })
        return []
      }
    }
  }
}

export default defineConfig({
  plugins: [openUIPlugin()],
  server: {
    port: 3000
  },
  publicDir: false,
  build: {
    outDir: 'public',
    emptyOutDir: true
  }
})
