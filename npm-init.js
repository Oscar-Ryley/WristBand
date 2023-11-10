const http = require("http");
const express = require("express"); 
const path = require("path");
const app = express(); 
app.use(express.static('client')); 

app.get('/', (req, res) => {
    res.writeHead(200, "text/html");
    const filePath = path.resolve(__dirname, 'index.html');
    res.sendFile(filePath); 
    res.end();
}).listen(8080)

app.get('/index', (req, res) => {
    res.writeHead(200, "text/html");
    const filePath = path.resolve(__dirname, 'index.html');
    res.sendFile(filePath); 
    res.end();
})

console.log('Server running at http://127.0.0.1:8080/'); 

app.get('/random/:max', function(req, resp){ 
  max = parseInt(req.params.max);
  rand = Math.floor(Math.random()*max) +1;
  console.log('Max via url is ' + max + ' rand is ' + rand);
  resp.send('' + rand);
});

app.get('/r', function(req, resp){ 
  max = parseInt(req.query.max); 
  rand = Math.floor(Math.random()*max) +1;
  console.log('Max via query is ' + max + ' rand is ' + rand); 
  resp.send('' + rand);
});

app.listen(8090);