const EventEmitter = require('events');

const myFirstEmiiter = new EventEmitter();

//register a listerner
myFirstEmiiter.on('greet',(name)=>{
    console.log("hello",name);
})

myFirstEmiiter.emit("greet","sreenath");