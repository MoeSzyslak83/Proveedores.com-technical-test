const { chromium } = require('playwright');

(async () => {
    const generalitatWebpage = 'https://web.gencat.cat/ca/inici/'
    const browser = await chromium.launch({ headless: false, slowMo: 50 });
    const page = await browser.newPage()
    const threeSeconds = 3000

    await page.goto(generalitatWebpage)
    await page.type('[id= cercadorOcultGoogle]', ' agenda cultural')
    await page.click('[aria-label = Cercar]')
   // await scrollFullPage(page)
    //await page.screenshot({ path: 'screenshot.png', fullPage:true })
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
          
          if (totalHeight >= scrollHeight){
            clearInterval(timer)
            resolve()
          }
        }, 100)
      })
    })
  }


