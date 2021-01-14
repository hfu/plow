const { chromium } = require('playwright')

const MAXZ = 16

const tile2long = (x, z) => {
  return x / 2 ** z * 360 - 180
}

const tile2lat = (y, z) => {
  const n = Math.PI - 2 * Math.PI * y / 2 ** z
  return 180 / Math.PI * Math.atan(0.5 * (Math.exp(n) - Math.exp(-n)))
}

const jumpInto = async (page, z, x, y) => {
  await page.goto(
    `https://hfu.github.io/plow/#${z}/${tile2lat(y + 0.5, z)}/${tile2long(x + 0.5, z)}`
  )
  await page.waitForNavigation()
  await page.waitForTimeout(2500 * (MAXZ - z))
  const path = `docs/img/${z}/${x}/${y}.png`
  await page.screenshot({
    path: path,
    clip: {
      x: 128,
      y: 128,
      width: 512,
      height: 512
    }
  })
  console.log(path)
  if (z === MAXZ) {
  } else {
    await jumpInto(page, z + 1, x * 2 + 0, y * 2 + 0)
    await jumpInto(page, z + 1, x * 2 + 1, y * 2 + 0)
    await jumpInto(page, z + 1, x * 2 + 0, y * 2 + 1)
    await jumpInto(page, z + 1, x * 2 + 1, y * 2 + 1)
  }
}

(async (Z, X, Y) => {
  const browser = await chromium.launch({ headless: false })
  const page = await browser.newPage({
    viewport: { width: 768, height: 768 }
  })
  await page.goto(`https://hfu.github.io/plow/#8/32.7528/129.888`)
  await page.waitForTimeout(3000)
  await jumpInto(page, Z, X, Y)
  await jumpInto(page, Z, X, Y)
  await browser.close()
})(10, 881, 413)
