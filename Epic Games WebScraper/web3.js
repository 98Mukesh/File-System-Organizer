const fs = require('fs')
const path = require('path')

function processData(gameName, gameInfo, genre, features, dvlCom, specs, minSpecs, recommendedSpecs, supportedLang) {

    let gameDirPath = path.join(__dirname, 'games')

    dirCreator(gameDirPath)

    let gameFilePath = path.join(gameDirPath, gameName + '.txt')

    let gameArr = [
        gameName,
        gameInfo,
        genre,
        features,
        dvlCom,
        specs,
        minSpecs,
        recommendedSpecs,
        supportedLang
    ]

    let content = ""

    for (let i = 0; i < gameArr.length; i++) {
        content += gameArr[i] + '\n\n'
    }

    fs.writeFileSync(gameFilePath, content)

}


function dirCreator(dirPath) {
    if (fs.existsSync(dirPath) == false) {
        fs.mkdirSync(dirPath)
    }
}


module.exports = {
    ps: processData
}

