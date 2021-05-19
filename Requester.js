const { chromium } = require('playwright');
const Dictionary = require('./Dictionary');

(async () => {
  const browser = await chromium.launch({ headless: false, slowMo: 50 });
  const page = await browser.newPage()
  const threeSeconds = 3000

  await page.goto(Dictionary.webPage)
  await page.type(Dictionary.searchBar, Dictionary.searchMessage)
  await page.click(Dictionary.searchButton)
  await scrollFullPage(page)
  await page.screenshot({ path: 'screenshot.png', fullPage: true })
  setTimeout(() => { browser.close() }, threeSeconds)
})()


async function scrollFullPage(page) {
  await page.evaluate(async () => {
    await new Promise(resolve => {
      let totalHeight = 0;
      const distance = 100;
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight
        window.scrollBy(0, distance)
        totalHeight += distance

        if (totalHeight >= scrollHeight) {
          clearInterval(timer)
          resolve()
        }
      }, 100)
    })
  })
}


