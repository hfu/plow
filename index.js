const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch()
  const page = await browser.newPage({
    viewport: { width: 512, height: 512 }
  })
  await page.goto('https://hfu.github.io/plow/#18/32.7528/129.888')
  await page.waitForNavigation()
  await page.waitForTimeout(1500)
  await page.screenshot({ path: `img/a.png` })
  await browser.close()
})()

