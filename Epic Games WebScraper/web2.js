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

    let gameName = $('.css-spkfbn [data-component="Text"]').text()

    if (gameName.length > 30) {
        let gameArr = gameName.split(':')
        gameName = gameArr[0]
    }


    let info = $('.css-jc8dhw h2')
    let info1 = $('.css-jc8dhw .css-1g0mw3g')
    let info2 = $('.css-jc8dhw .css-1chn1kq')
    let textLength
    let mainInfo
    let gameInfo = `-> Info :\n`

    if (info1.length != 0) {
        textLength = info.length >= info1.length ? info.length : info1.length
        mainInfo = info1
    } else {
        textLength = info.length > info2.length ? info.length : info2.length
        mainInfo = info2
    }
    for (let i = 0; i < textLength; i++) {
        gameInfo += `${$(info[i]).text()}\n${$(mainInfo[i]).text()}\n`
    }


    let genreFeature = $('.css-1pj7rfu span[data-component="Message"]')

    let genF = '-> Genre & Features :\n'
    for (let i = 0; i < genreFeature.length; i++) {
        genF += `• ${$(genreFeature[i]).text()}\n`
    }


    let dvComp = $('.css-fxdlmq span')
    let dvlCom = '-> Game Development :\n'
    for (let i = 0; i < dvComp.length - 1; i += 2) {
        dvlCom += `• ${$(dvComp[i]).text()} : ${$(dvComp[i + 1]).text()} \n`
    }


    let specs = '-> Specifications :'
    let minSpecs = '• Minimum Requirements :\n\n'
    let recommendedSpecs = '• Recommended Requirements :\n\n'

    let spec = $('.css-3rds8q .css-2sc5lq span')
    for (let i = 0; i < spec.length; i += 2) {
        if (i % 4 == 0) {
            minSpecs += `◦ ${$(spec[i]).text()} : ${$(spec[i + 1]).text()} \n`
        }
        else {
            recommendedSpecs += `◦ ${$(spec[i]).text()} : ${$(spec[i + 1]).text()} \n`
        }
    }


    let language = $('.css-k204li')
    let supportedLang = '-> Supported Languages :\n'
    if (language.length != 0) {
        for (let i = 0; i < language.length; i++) {
            supportedLang += `• ${$(language[i]).text()}\n`
        }
    }
    else {
        supportedLang = ''
    }


    webObj.ps(gameName, gameInfo, genF, dvlCom, specs, minSpecs, recommendedSpecs, supportedLang)
}

module.exports = {
    getFinal: getFinalUrl
}