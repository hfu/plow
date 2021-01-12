const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch()
  const page = await browser.newPage({
    viewport: { width: 512, height: 512 }
  })
  await page.goto(`https://hfu.github.io/plow/#8/32.7528/129.888`)
  await page.waitForTimeout(1500)
  for (let i = 10; i < 18; i++) {
    await page.goto(`https://hfu.github.io/plow/#${i}/32.7528/129.888`)
    await page.waitForNavigation()
    //await page.waitForTimeout(500)
    await page.screenshot({ path: `img/a${i}.png` })
    console.log(i)
  }
  await browser.close()
})()

