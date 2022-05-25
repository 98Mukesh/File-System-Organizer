function helpfn(){                      
    console.log(`List of all Commands :                                 
                    1. Tree Command -> node Fo.js tree <dirName>
                    2. Organize Command -> node Fo.js organize <dirName>
                    3. Help Command -> node Fo.js help <dirName>`)
}

module.exports = {
    helpkey : helpfn
}