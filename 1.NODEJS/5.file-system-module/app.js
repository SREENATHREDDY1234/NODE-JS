const fs = require('fs');
const path = require("path");

const dataFolder = path.join(__dirname,"data");

if(!fs.existsSync(dataFolder)){
    fs.mkdirSync(dataFolder);
    console.log("data folder created");
}

const filePath = path.join(dataFolder,"example.txt")

fs.writeFileSync(filePath,"Hello from Node.js")
console.log("file create successfully");

const readContentFromFile = fs.readFileSync(filePath,'utf8');
console.log("File content: ",readContentFromFile);

fs.appendFileSync(filePath,'\n this is a new line added to the file.');
console.log("new file content added");

//async way of creating the file
const asyncFilePath = path.join(dataFolder,'async-example.txt');
fs.writeFile(asyncFilePath,"hello Async node js",(err)=>{
    if(err)throw err;
    console.log("Async file is create successfully");
    fs.readFile(asyncFilePath,'utf-8',(err,data)=>{
        if(err)throw err;
        console.log("file content : ",data);
        fs.appendFile(asyncFilePath,"\nThis is another line added.",(err)=>{
            if(err)throw err;
            console.log("New Line is added to the file.");
            fs.readFile(asyncFilePath,'utf-8',(err,data)=>{
                if(err)throw err;
                console.log("Updtated file content : ",data);
            });
        });
    });
});
