const http = require('http');
//create an HTTP server
// const server = http.createServer((req,res)=>{
//     if(req.url === '/'){
//         res.writeHead(200, {'content-type':'text/plain'});
//         res.end('welcome to homepage!\n');
//     }else if(req.url === '/about'){
//         res.writeHead(200, {'content-type':'text/plain'});
//         res.end('welcome to aboutpage!\n');
//     }else{
//         res.writeHead(404, {'content-type':'text/plain'});
//         res.end('404 page not found\n');
//     }
    
// });

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    const responseData = { message: 'Hello from Node.js', status: 'success' };
    res.end(JSON.stringify(responseData));
});

//Listen on port 3000
server.listen(3000,()=>{
    console.log('server is running on http://localhost:3000');
})