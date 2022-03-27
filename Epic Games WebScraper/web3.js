const fs = require('fs')
const path = require('path')


function processData(gameName, gameInfo, genF, dvlCom, specs, minSpecs, recommendedSpecs, supportedLang) {

    let gameDirPath = path.join(__dirname, 'games')
    dirCreator(gameDirPath)

    
    let finalGameDirPath = path.join(gameDirPath , gameName)
    dirCreator(finalGameDirPath)

    let gameFilePath = path.join(finalGameDirPath, gameName + '.txt')

    let gameObj = {
        gameName,
        gameInfo,
        genF,
        dvlCom,
        specs,
        minSpecs,
        recommendedSpecs,
        supportedLang
    }

    let content = ""

    for (let i in gameObj) {
        content += gameObj[i] + '\n\n'
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

