const http = require("http");
const express = require("express"); 
const path = require("path");
const app = express(); 
const fs = require('fs')
app.use(express.static(path.join(__dirname, 'public'))); 

app.get('/', (req, res) => {
  fs.readFile('index.html', function(error, html){
    if (error) {
      res.writeHeader(403, {"Content-Type": "text/html"});
      res.write('<h1>403 error file not found</h1>');
    };
    res.writeHeader(200, {"Content-Type": "text/html"});
    res.write(html);
    res.end();
``});
}).listen(8080)

console.log('Server running at http://127.0.0.1:8080/'); 