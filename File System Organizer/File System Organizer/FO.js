// We will be creating a File System Organizer//

/*      Features of the Project :

If you have numerous Files in a folder and they are not Properly arranged
So you can use this tool to arrange them in specific directory according to their extension
Like text files will go into text File Folder , .exe files will go into application folder and so on
So at the end you will have a arranged set of files in specific folders

*/


// let input = process.argv[2]      // argv -> argument vector 
// console.log(input)

/* 
"process.argv" : Method to take input ; In JS, Input given is treated as an Array (Command Line Input)

(Node .\FO.js Mukesh)  ; Node .\FO.js is a Command So we don't need it
Index 0 : Node , Index 1 : .\FO.js , Index 2 : Mukesh
*/

const helpModule = require('./Commands/help')

const organizeModule = require('./Commands/organize')

const treeModule = require('./Commands/tree')


let inputArr = process.argv.slice(2)   // Discard 0th and 1st index (say input is : node Fs.js tree help , node Fs.js is discarded)

// console.log(inputArr)

  

let command = inputArr[0]       // say inputArr = [ 'tree', 'help' ] , inputArr[0] = tree    

switch(command){

    case 'tree' : 
        treeModule.treeKey(inputArr[1])
        break;

    case 'organize' :
        organizeModule.organizeKey(inputArr[1])
        break;
    
    case 'help' :
        helpModule.helpkey()
        break;

    default :                                   // If No case Matches then default case will run
        console.log('Please Enter A Valid Command')
        break;    
}


/* 
=> Take Input in Console : Node .\FO.js Organize 'C:\Users\Mukesh\Desktop\Dev\4_File System Organizer\test Folder'

    1. process.argv[2] : takes input only at 2nd index (Organize)
    2. process.argv.slice(2) : takes input from 2nd index till end 
*/
