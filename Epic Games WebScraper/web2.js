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

    console.log(gameName)
    if (gameName.length > 32) {
        let gameArr = gameName.split(':')
        gameName = gameArr[0]
    }

    let info = $('.css-1g0mw3g[data-component="MarkdownParagraph"]')
    let gameInfo = ""
    for (let i = 0 ; i < info.length ; i++){
        gameInfo += `• ${$(info[i]).text()} \n\n`
    }


    let genreFeatureHeading = $('.css-encdnt .css-i96ixb')
    let genreFeatureData = $('.css-encdnt .css-7agjck')
    let genre = $(genreFeatureHeading[0]).text() + ' : \n'
    let features = $(genreFeatureHeading[1]).text() + ' : \n'

    for (let i = 0; i < genreFeatureData.length; i++) {
        if (i < genreFeatureData.length / 2) {
            genre += `•  ${$(genreFeatureData[i]).text()}  \n`
        }
        else {
            features += `•  ${$(genreFeatureData[i]).text()}  \n`
        }
    }


    let developerCompany1 = $('.css-b6wrti .css-i96ixb')
    let developerCompany2 = $('.css-b6wrti .css-btns76')
    let dvlCom = ""
    for (let i = 0; i < developerCompany1.length; i++) {
        dvlCom += `${$(developerCompany1[i]).text()}  :  ${$(developerCompany2[i]).text()} \n` 
    }
    console.log(dvlCom)

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

    console.log(minSpecs)
    console.log(recommendedSpecs)

    let language = $('.css-k204li span')
    let supportedLang = 'Supported Languages : \r\r' + $(language[0]).text() + '\r\r' + $(language[1]).text()


    webObj.ps(gameName, gameInfo, genre, features, dvlCom, specs, minSpecs, recommendedSpecs, supportedLang)
}

module.exports = {
    getFinal: getFinalUrl
}