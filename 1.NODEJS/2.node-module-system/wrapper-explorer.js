
console.log("Node module in wrapper explorer");

console.log("filename in wrapper explorer ",__filename);
console.log("directoryname in wrapper explorer ",__dirname);

module.exports.greet = function(name){
    console.log("hello ",name);  
}


