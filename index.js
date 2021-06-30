const xlsxFile = require('read-excel-file/node');
const fs = require("fs")
let routeFile = "";
let haveGraphName = "";
let generatedJson = {};
let nameFile = '';
let ext = '';
routeFile = process.argv[2];
haveGraphName = process.argv[4]?true:false;
nameFile = process.argv[3] || "myFile.json";
ext = nameFile.split(".")[1];



const createFile = (name)=>{

    fs.exists(name,(exists)=>{
    if(exists){
        console.log("yes file exists");
    } else {
        console.log("file not exists")
        var json = JSON.stringify(generatedJson);
        fs.writeFile(name, json,(err)=>console.log(err));
        }
    });
}

if(routeFile && ext === "json"){

    xlsxFile(routeFile).then((rows) => {
        for(const row of rows){
            let key = row[0].toLowerCase();
            key = key.replace(/\s+/g,"_");

            generatedJson[key]={value: row[0], graph: haveGraphName ? row[1]:row[0]};
        }

    createFile(nameFile);
    })
}


