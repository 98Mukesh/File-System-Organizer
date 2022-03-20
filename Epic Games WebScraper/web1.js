const baseUrl = 'https://store.epicgames.com'
const request = require('request')
const cheerio = require('cheerio')

const webObj = require('./web2')

function getUrl(url) {
    request(url, function (err, response, html) {
        if (err) {
            console.log(err)
        }
        else {
            getLink(html)
        }
    })
}

function getLink(html) {
    let $ = cheerio.load(html)
    let gameElement = $('li.css-lrwy1y .css-1jx3eyg')

    for (let i = 0; i < gameElement.length / 3; i++) {
        let link = $(gameElement[i]).attr('href')

        let fullLink = baseUrl + link

        webObj.getFinal(fullLink)
    }
}


module.exports = {
    get: getUrl
}
