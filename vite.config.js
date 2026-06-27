import fs from 'fs'
import path from 'path'
import { defineConfig } from 'vite'
import Twig from 'twig'

const ROOT = process.cwd()
const PAGES_DIR = path.join(ROOT, 'dev/pages')
const SKETCHES_DIR = path.join(ROOT, 'dev/sketches')
const OUT_DIR = path.join(ROOT, 'public')
const PUBLIC_SKETCHES_DIR = path.join(OUT_DIR, 'sketches')
const FULL_RELOAD_DELAY = 150

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

function copySketchesToPublic() {
  if (!fs.existsSync(SKETCHES_DIR)) return
  fs.rmSync(PUBLIC_SKETCHES_DIR, { recursive: true, force: true })
  fs.cpSync(SKETCHES_DIR, PUBLIC_SKETCHES_DIR, { recursive: true })
}

function serveFile(filePath, res) {
  const ext = path.extname(filePath)
  const contentTypes = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'text/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.svg': 'image/svg+xml',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.webp': 'image/webp'
  }

  res.setHeader('Content-Type', contentTypes[ext] || 'application/octet-stream')
  res.end(fs.readFileSync(filePath))
}

function openUIPlugin() {
  let fullReloadTimer
  const tempHtmlFiles = new Set()

  function assertTempHtmlWritable(filePath) {
    if (!fs.existsSync(filePath)) return
    if (!tempHtmlFiles.has(filePath)) {
      throw new Error(`Refusing to overwrite existing root HTML file at ${filePath}`)
    }
  }

  function cleanBuildCache() {
    for (const file of tempHtmlFiles) {
      if (fs.existsSync(file)) fs.unlinkSync(file)
    }
    tempHtmlFiles.clear()
  }

  return {
    name: 'openui',

    // Build : rend chaque page Twig → HTML temporaire racine, passé à Rollup comme entrée.
    // Vite émet les pages HTML selon leur chemin relatif au root; les fichiers temporaires
    // restent donc à la racine le temps du build mais ne sont jamais écrasés s'ils existent déjà.
    async config(cfg, { command }) {
      if (command !== 'build') return
      cleanBuildCache()
      const pages = fs.existsSync(PAGES_DIR) ? fs.readdirSync(PAGES_DIR).filter(f => f.endsWith('.twig')) : []
      const inputs = {}
      for (const file of pages) {
        const slug = file.replace('.twig', '')
        const html = await renderTwig(path.join(PAGES_DIR, file), {})
        const tmpPath = path.join(ROOT, `${slug}.html`)
        assertTempHtmlWritable(tmpPath)
        fs.writeFileSync(tmpPath, html, 'utf8')
        tempHtmlFiles.add(tmpPath)
        inputs[slug] = tmpPath
      }
      cfg.build ??= {}
      cfg.build.rollupOptions ??= {}
      cfg.build.rollupOptions.input = inputs
    },

    buildEnd() {
      cleanBuildCache()
    },

    // Build : publie les esquisses séparément
    closeBundle() {
      cleanBuildCache()
      copySketchesToPublic()
    },

    // Dev : rendu Twig à la volée + preview des esquisses hors DS canonique
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const pathname = new URL(req.url, 'http://localhost').pathname

        if (pathname.startsWith('/sketches/')) {
          const relativePath = decodeURIComponent(pathname.replace('/sketches/', ''))
          const requestedPath = path.normalize(path.join(SKETCHES_DIR, relativePath))
          if (!requestedPath.startsWith(SKETCHES_DIR)) return next()
          const filePath = fs.existsSync(requestedPath) && fs.statSync(requestedPath).isDirectory()
            ? path.join(requestedPath, 'index.html')
            : requestedPath
          if (!fs.existsSync(filePath)) return next()
          serveFile(filePath, res)
          return
        }

        const slug = pathname === '/' ? null : pathname.slice(1).replace(/\.html$/, '')

        // Index : liste des pages disponibles et esquisses séparées
        if (!slug) {
          const pages = fs.existsSync(PAGES_DIR)
            ? fs.readdirSync(PAGES_DIR).filter(f => f.endsWith('.twig')).map(f => f.replace('.twig', ''))
            : []
          const sketches = fs.existsSync(SKETCHES_DIR)
            ? fs.readdirSync(SKETCHES_DIR, { withFileTypes: true }).filter(d => d.isDirectory()).map(d => d.name)
            : []
          const pageLinks = pages.map(p => `<li><a href="/${p}.html">${p}</a></li>`).join('\n')
          const sketchLinks = sketches.map(s => `<li><a href="/sketches/${s}/">${s}</a> <small>sketch</small></li>`).join('\n')
          res.setHeader('Content-Type', 'text/html; charset=utf-8')
          res.end(`<!DOCTYPE html><html lang="fr"><head><meta charset="UTF-8"><title>Pages</title></head><body><h1>Pages</h1><ul>${pageLinks}</ul><h2>Sketches</h2><ul>${sketchLinks}</ul></body></html>`)
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

    // HMR : rechargement complet sur changement .twig ou esquisse
    handleHotUpdate({ file, server }) {
      if (file.endsWith('.twig') || file.includes(`${path.sep}dev${path.sep}sketches${path.sep}`)) {
        clearTimeout(fullReloadTimer)
        fullReloadTimer = setTimeout(() => {
          server.ws.send({ type: 'full-reload' })
        }, FULL_RELOAD_DELAY)
        return []
      }
    }
  }
}

export default defineConfig({
  plugins: [openUIPlugin()],
  server: {
    port: 3000,
    watch: {
      awaitWriteFinish: {
        stabilityThreshold: 200,
        pollInterval: 50
      },
      ignored: [
        '**/.git/**',
        '**/node_modules/**',
        '**/public/**',
        '*.html'
      ]
    }
  },
  publicDir: false,
  build: {
    outDir: 'public',
    emptyOutDir: true
  }
})
