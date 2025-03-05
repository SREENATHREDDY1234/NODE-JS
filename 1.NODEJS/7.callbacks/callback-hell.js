const { error } = require('console');
const fs = require('fs');

fs.readFile('input.txt','utf8',(err,data)=>{
    if(err){
        console.error("error reading file",err);
        return;
    }
    console.log(data);
    const modifyFileData = data.toUpperCase();
    fs.writeFile('output.txt',modifyFileData,(err)=>{
        if(err){
            console.error("error writing file",err);
            return;
        }
        console.log("data written to the new file");
        
        fs.readFile('output.txt','utf8',(err,data)=>{
            if(err){
                console.error("error reading file",err);
                return;
            }
            console.log(data);
        })
    })
})