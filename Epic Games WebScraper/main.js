const game = "Tomb Raider"
const url = "https://store.epicgames.com"
let puppeteer = require('puppeteer');

const webObj = require('./web1');

(async function () {
    try {
        let openWebSite = await puppeteer.launch({
            headless: false,
            defaultViewport: null,
            args: ["--start-maximized"]
        })

        let newTab = await openWebSite.newPage()

        await newTab.goto(url)

        await newTab.type('input[placeholder="Search"]', game, { delay: 100 })

        await newTab.keyboard.press('Enter', { delay: 20 })

        let link = newTab.url()

        webObj.get(link)

    }
    catch (error) {
        console.log(error)
    }
})()


