/**
 * Clicks every button and link on every screen and checks that something
 * actually happened: a navigation, a DOM change (sheet/modal/state change),
 * or a toast. Anything inert is reported as a dead control.
 *
 * The page is only reloaded when a click navigated away or mutated the DOM
 * enough that later controls would have shifted, which keeps this quick.
 */
import puppeteer from 'puppeteer-core'

const BASE = 'http://localhost:5183'
const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe'
const wait = (ms) => new Promise((r) => setTimeout(r, ms))
const log = (s) => process.stdout.write(s + '\n')

const ROUTES = [
  '/onboarding', '/language', '/goal', '/daily-goal', '/placement', '/placement-result',
  '/plan', '/home', '/learn', '/lesson/intro-yourself', '/lesson/intro-yourself/study',
  '/conversation', '/grammar', '/pronunciation', '/listening', '/vocabulary',
  '/ielts', '/ielts/speaking', '/practice', '/progress', '/premium', '/profile',
  '/settings', '/settings/account', '/login', '/notifications', '/achievements', '/help',
]

/** Controls that are inert on purpose. */
const ALLOW_INERT = [/^Listen to all/]

const VISIBLE = `
  [...document.querySelectorAll('button, a')].filter((el) => {
    const r = el.getBoundingClientRect()
    return r.width > 0 && r.height > 0 && !el.disabled
  })
`

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  args: ['--no-sandbox', '--hide-scrollbars'],
})

const dead = []
const errors = []
let clicked = 0

const page = await browser.newPage()
await page.setViewport({ width: 430, height: 915 })
page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`))
page.on('console', (m) => {
  if (m.type() === 'error') errors.push(`console: ${m.text()}`)
})

for (const route of ROUTES) {
  const load = async () => {
    await page.goto(BASE + route, { waitUntil: 'domcontentloaded' })
    await wait(1200)
  }
  await load()

  const total = await page.evaluate(`(${VISIBLE}).length`)
  let routeDead = 0

  for (let i = 0; i < total; i += 1) {
    const info = await page.evaluate(
      (idx, src) => {
        // eslint-disable-next-line no-eval
        const els = eval(src)
        const el = els[idx]
        if (!el) return null
        return {
          label: (el.innerText || el.getAttribute('aria-label') || el.tagName)
            .trim()
            .replace(/\s+/g, ' ')
            .slice(0, 45),
          href: el.getAttribute('href') || '',
          path: location.pathname,
          size: document.body.innerHTML.length,
        }
      },
      i,
      VISIBLE,
    )
    if (!info) {
      await load()
      continue
    }

    await page.evaluate(
      (idx, src) => {
        // eslint-disable-next-line no-eval
        eval(src)[idx]?.click()
      },
      i,
      VISIBLE,
    )
    await wait(520)

    const after = await page.evaluate(() => ({
      path: location.pathname,
      size: document.body.innerHTML.length,
    }))

    clicked += 1
    const moved = after.path !== info.path
    const changed = after.size !== info.size

    if (!moved && !changed) {
      if (!ALLOW_INERT.some((re) => re.test(info.label))) {
        dead.push(`${route} → "${info.label}"${info.href ? ` [${info.href}]` : ''}`)
        routeDead += 1
      }
    }

    // Reset whenever the click changed anything, so indices stay stable.
    if (moved || changed) await load()
  }

  log(`  ${route.padEnd(30)} ${String(total).padStart(3)} controls${routeDead ? `  ← ${routeDead} dead` : ''}`)
}

await browser.close()

log('\n================================')
log(`clicked ${clicked} controls across ${ROUTES.length} screens`)
const uniqueErrors = [...new Set(errors)]
if (uniqueErrors.length) {
  log(`\n${uniqueErrors.length} ERROR(S):`)
  uniqueErrors.forEach((e) => log('  • ' + e))
}
if (dead.length) {
  log(`\n${dead.length} DEAD CONTROL(S):`)
  dead.forEach((d) => log('  • ' + d))
} else {
  log('\nEvery button and link produced a response.')
}
process.exit(dead.length || uniqueErrors.length ? 1 : 0)
