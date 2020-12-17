const fs = require('fs');
const readLine = require('readline')
const {listenerCount} = require('process');
const {fileURLToPath} = require('url');
let file = process.argv[2];


const r1 = readLine.createInterface({
    input: process.stdin,
    output: process.stdout


})
//An empty array list to store all the todo items
let list = [];

//Converting file data using Json-parse
function readJason() {
    let rawdata = fs.readFileSync(file);
    let newData = JSON.parse(rawdata);
    console.log(newData)
    for (let eachFile in newData) {
        if (newData[eachFile]['completed'] === true) {
            list.push(`[âœ“]${newData[eachFile]['title']}`)
        } else {
            list.push(`[ ]${newData[eachFile]['title']}`)
        }
    }
}

//This is the command variable with heading and options
const ask = ('Welcome to todo CLI!\n-------------------\n(v)View • (n)New • (cX)Complete • (s)Save •(dX)Delete • (q)Quit')

//This is the quitting function to exit the application 
function quitApplication() {
    console.log('See you soon!😄„');
    r1.close();
}

//This is the viewing function to view all the items added to the list
function viewItems() {
    if (list.length === 0) {
        console.log('The List is empty...')
    } else {
        for (let i = 0; i < list.length; i++) {
            console.log(`${i}${list[i]}`)
        }
    }
    console.log(ask);
    process.stdout.write('>');
}

//This is the adding function to add items to the list
function addItems() {
    r1.question('What?\n>', newtask => {
        list.push(`[ ]${newtask}`)
        console.log(ask);
        process.stdout.write('>');
    })
}

//This is the completion funtion to mark items as complete on the list
function completeItem(num) {     //num - is actual number of some existed task
    if (list[num].indexOf("✓") === -1) {  // check if task with such number is not completed
        let oldTaskStatus = list[num].slice(2);     //take first 2 leters from tasks name (which will be '[ ')
        list[num] = `[✓${oldTaskStatus}`; //instead of them put '[✓“'
        console.log(`Completed ${oldTaskStatus.slice(1)}`);
    } else {
        console.log("task is already completed");
    }
    console.log(ask);
}

//This is the deleting function that deletes an item from tye list
function deletingItem(num) {
    console.log(`Deteted ${list[num].slice(3)}`)
    list.splice(num, 1);
    console.log(ask);
}

//This is the saving function that saves the added items to the json file
function saveItems() {
    let obj = {}
    let savedList = []
    let jsonFile = {}
    for (let i = 0; i < list.length; i++) {
        if (list[i].includes('✓')) {
            jsonFile['completed'] === true;
            obj['completed'] = true
        } else {
            jsonFile['completed'] === false;
            obj['completed'] = false
        }
        jsonFile['title'] = list[i].slice(3)
        // console.log(jsonFile)
        // console.log(savedList)

        let obj2 = {...obj, ...jsonFile}
        // console.log(obj2)

        savedList.push(obj2)
        // console.log(savedList)
    }
    let jsonFileData = JSON.stringify(savedList);
    let question = 'Where?';
    if (file){
        question+=" ("+file+")";
    }
    r1.question(question+'\n>', placeToSave => {
        console.log(placeToSave)
        if (placeToSave === '') {
            let file = 'myTodos.json'
            fs.writeFileSync(file, jsonFileData);
            console.log(`List saved to ${file}`)

        } else if (placeToSave.includes('.json')) {
            fs.writeFileSync(placeToSave, jsonFileData)
            console.log(`List saved to ${placeToSave}`)
        } else {
            let anotherPlaceTosave = placeToSave + './json'
            fs.writeFileSync(anotherPlaceTosave, jsonFileData)
            console.log(`List saved to ${anotherPlaceTosave}`)
        }
        console.log(ask);
    })

}

//This function validates user input
function validateAndGetNumber(userInput) {
  let str = userInput.slice(1);
  if (!isNaN(parseInt(str))) {
      let num = parseInt(str);
      if (list[num]) {
          return num;
      } else {
          return false;
      }
  } else {
      return false;
  }
}

//All together and prompt the user for input
if (file !== undefined) {
    readJason()
}
console.log(ask);

function menu(userInput) {
    switch (userInput[0]) {
        case 'q':
            quitApplication();

            break;
        case 'v':
            viewItems();
            break;
        case 'n':
            addItems();
            break;
        case 'c':
            let cNum = validateAndGetNumber(userInput);
            if (cNum !== false) {
                completeItem(cNum);
            } else {
                console.log("no such task");
                console.log(ask);
                process.stdout.write('>');
            }
            break;
        case 'd':
            let dNum = validateAndGetNumber(userInput);
            if (dNum !== false) {
                deletingItem(dNum);
            } else {
                console.log("no such task");
                console.log(ask);
                process.stdout.write('>');
            }
            break;
        case 's':
            saveItems();
            break;
        default:
            console.log('wrong option');
            console.log(ask);
            process.stdout.write('>');
    }
}

r1.on('line', (userInput)=>{
    menu(userInput);
})

/*r1.on('line', function (userInput) {
    menu(userInput);
});*/

