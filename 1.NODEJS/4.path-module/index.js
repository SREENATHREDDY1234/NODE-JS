const path = require('path')

console.log('Directory name:',path.dirname(__filename));

console.log('File name',path.basename(__filename))

console.log("file extension",path.extname(__filename));

let joinpath = path.join('user',"documents","node","file.js")
console.log("joined path",joinpath);

let resolvepath = path.resolve("user","documents","node")
console.log("Resolve path",resolvepath);

let normalizepath = path.normalize("/user/.document/..node/projects");
console.log("normalizePath",normalizepath);


