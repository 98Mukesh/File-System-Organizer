const fs = require('fs')

const path = require('path')

function treeFn(dirPath){
    if (dirPath == undefined){
        console.log('Please Enter a Valid Command')
    }
    else{
        let doesExist = fs.existsSync(dirPath)
        if(doesExist == true){
            treeHelper(dirPath , " ")
        }
    }
}

function treeHelper(targetPath , indent){
    let isFile = fs.lstatSync(targetPath).isFile()
    
    if (isFile == true){
        let fileName = path.basename(targetPath)
        console.log(indent + '├──' + fileName)
    }
    else{
        let dirName = path.basename(targetPath)  
        console.log(indent + '└──' + dirName)       // display the folders


        let children = fs.readdirSync(targetPath)       // Extracting all the children of the test Folder
        // console.log(children)


        for (let i = 0 ; i < children.length;i++){
            let childPath = path.join(targetPath , children[i])
            // console.log(childPath)

            treeHelper(childPath , indent +'\t')        // Using Recursion to repeat the process for all files and folders
        }
    }
}

module.exports = {
    treeKey : treeFn
}