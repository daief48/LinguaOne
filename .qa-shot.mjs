import puppeteer from 'puppeteer-core'
import path from 'node:path'
import fs from 'node:fs'
const OUT = process.argv[2]
fs.mkdirSync(OUT, { recursive: true })
const browser = await puppeteer.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: 'new', args: ['--no-sandbox','--hide-scrollbars'] })
const wait = ms => new Promise(r => setTimeout(r, ms))
for (const r of process.argv.slice(3)) {
  const page = await browser.newPage()
  await page.setViewport({ width: 1500, height: 1030, deviceScaleFactor: 2 })
  await page.goto('http://localhost:5183' + r, { waitUntil: 'networkidle2' })
  await wait(2400)
  await page.screenshot({ path: path.join(OUT, (r === '/' ? 'root' : r.replace(/\W+/g,'_')) + '.png') })
  await page.close()
}
await browser.close(); console.log('ok')
