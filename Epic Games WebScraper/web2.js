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

    if (gameName.length > 32) {
        let gameArr = gameName.split(':')
        gameName = gameArr[0]
    }

    let info = $('.css-1g0mw3g[data-component="MarkdownParagraph"]')
    let gameInfo = '-> Info :\n\n'
    for (let i = 0 ; i < info.length ; i++){
        gameInfo += `• ${$(info[i]).text()} \n\n`
    }


    let genreFeatureHeading = $('.css-encdnt .css-i96ixb')
    let genreFeatureData = $('.css-encdnt .css-7agjck')
    let genre = `-> ${$(genreFeatureHeading[0]).text()} : \n\n`
    let features = `-> ${$(genreFeatureHeading[1]).text()} : \n\n`

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
    let dvlCom = '-> Development And Release Date :\n\n'
    for (let i = 0; i < developerCompany1.length; i++) {
        dvlCom += `• ${$(developerCompany1[i]).text()}  :  ${$(developerCompany2[i]).text()} \n` 
    }


    let specs = '-> Specifications :'
    let minSpecs = '• Minimum Requirements :\n\n'
    let recommendedSpecs = '• Recommended Requirements :\n\n'

    let spec1 = $('.css-3rds8q .css-i96ixb[data-component]')
    let spec2 = $('.css-3rds8q .css-1yqcr93[data-component]')
    for (let i = 0; i < spec1.length; i++) {
        if (i % 2 == 0) {
            minSpecs += `□ ${$(spec1[i]).text()} : ${$(spec2[i]).text()} \n`
        }
        else {
            recommendedSpecs += `□ ${$(spec1[i]).text()} : ${$(spec2[i]).text()} \n`
        }
    }


    let language = $('.css-k204li span')
    let supportedLang = `-> Supported Languages :\n\n • ${$(language[0]).text()}\n\n • ${$(language[1]).text()}`


    webObj.ps(gameName, gameInfo, genre, features, dvlCom, specs, minSpecs, recommendedSpecs, supportedLang)
}

module.exports = {
    getFinal: getFinalUrl
}