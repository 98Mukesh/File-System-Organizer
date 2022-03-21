const request = require('request')
const cheerio = require('cheerio')

const webObj = require('./web3')

function getFinalUrl(url) {
    request(url, function (err, response, html) {
        if (err) {
            console.log(err)
        }
        else {
            extractData(html)
        }
    })
}

function extractData(html) {
    let $ = cheerio.load(html)

    let gameName = $('.css-spkfbn[data-component="PDPTitleHeader"]').text()

    if (gameName.length > 30) {
        let gameArr = gameName.split(':')
        gameName = gameArr[0]
    }

    let info = $('[data-component="MarkdownParagraph"]')
    let gameInfo = 'Info :' + '\n' + $(info[0]).text() + '\n\n' + $(info[1]).text()


    let genreFeature = $('.css-encdnt .css-1pj7rfu')
    let genre = $(genreFeature[0]).text() + '\r' + $(genreFeature[1]).text()
    let features = $(genreFeature[2]).text() + '\r' + $(genreFeature[3]).text()


    let developerCompany = $('.css-b6wrti .css-1k1wbhe')
    let dvlCom = ""
    for (let i = 0; i < developerCompany.length; i++) {
        dvlCom += $(developerCompany[i]).text() + '\n'
    }


    let specs = 'Specifications :'
    let minSpecs = 'Minimum Requirements :\n\n'
    let recommendedSpecs = 'Recommended Requirements :\n\n'

    let spec = $('.css-3rds8q .css-2sc5lq')
    for (let i = 0; i < spec.length; i++) {
        if (i % 2 == 0) {
            minSpecs += $(spec[i]).text() + '\n'
        }
        else {
            recommendedSpecs += $(spec[i]).text() + '\n'
        }
    }


    let language = $('.css-k204li span')
    let supportedLang = 'Supported Languages : \r\r' + $(language[0]).text() + '\r\r' + $(language[1]).text()


    webObj.ps(gameName, gameInfo, genre, features, dvlCom, specs, minSpecs, recommendedSpecs, supportedLang)
}

module.exports = {
    getFinal: getFinalUrl
}