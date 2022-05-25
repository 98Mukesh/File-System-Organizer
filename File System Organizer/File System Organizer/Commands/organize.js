const fs = require('fs')

const path = require('path')

let types = {
    media: ["mp4", "mkv", "mp3", "jpeg" , "jpg" , "png" , "gif" , "svg" , "webp" , "jfif"],
    archives: ["zip", "7z", "rar", "tar", "gz", "ar", "iso", "xz"],
    documents: [
      "docx",
      "doc",
      "pdf",
      "xlsx",
      "xls",
      "odt",
      "ods",
      "odp",
      "odg",
      "odf",
      "txt",
      "ps",
      "tex",
    ],
    app: ["exe", "dmg", "pkg", "deb"],
  };

function organizeFn(dirPath){
        // input of directory Path
    let destPath;
    
    if(dirPath == undefined){
        console.log('Please Enter a Valid Directory Path')
        // Check whether dirPath is passed or not 
        return;
    }
    else{
        let doesExist = fs.existsSync(dirPath)
        // This tell whether the dirPath exists or not

        if (doesExist == true){
            destPath = path.join(dirPath , 'Organized_Files')
            
            // C:\Users\Mukesh\Desktop\Dev\Websites\test Folder\Organized_Files -> We Want to create a Folder in this path

            if(fs.existsSync(destPath) == false){
                fs.mkdirSync(destPath)          // We will only create a folder if it does not exists
            }else{
                console.log('This Folder Already Exists')
            }
        }
        else{
            console.log('Please Enter a Valid Directory Path')
        }
    }

    organizeHelper(dirPath , destPath)
}

// Writing this function to categorize our files
function organizeHelper(src , dest){
    let childNames = fs.readdirSync(src)        // get all files and folders inside your src
    // console.log(childNames)                  // output in the form of Array

    for (let i = 0 ; i < childNames.length ; i++){
        let childAddress = path.join(src , childNames[i])       // Identify path for the files
        let isFile = fs.lstatSync(childAddress).isFile()        // Check and Identify only files
        // console.log(childAddress + "  " + isFile)

        if (isFile == true){
            let fileCategory = getCategory(childNames[i])
            console.log(childNames[i] + "  belongs to  " + fileCategory)

            sendFiles(childAddress , dest , fileCategory)
        }
    }
}

function getCategory(name){
    let ext = path.extname(name)        // Gives the extension names of the files , say .txt
    ext = ext.slice(1)                  // Give extension name without dot (.) -> txt
    // console.log(ext)


    for (let type in types){
        let cTypeArr = types[type]
        // console.log(cTypeArr)

        for (let i = 0; i < cTypeArr.length; i++){
            if (ext == cTypeArr[i])
                                // We Compare the extensions with the values present in cTypeArr
            return type
        }
    }
    return 'others'
}


function sendFiles(srcFilePath , dest , fileCategory){
    let catPath = path.join(dest , fileCategory)        // creating file category path

    if(fs.existsSync(catPath) == false){            // checking for folder path category
        fs.mkdirSync(catPath)
    }

    let fileName = path.basename(srcFilePath)       // Extract the name of the files
    let destFilePath = path.join(catPath , fileName)   // Created a path for the files in category folders

    fs.copyFileSync(srcFilePath , destFilePath)     // Copied file from src to dest
    fs.unlinkSync(srcFilePath)              // Delete file after copying

    console.log(fileName + "  is copied to  " + fileCategory)

}

module.exports = {
    organizeKey : organizeFn
}