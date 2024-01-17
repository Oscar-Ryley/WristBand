const http = require('http');
const express = require('express');
const path = require('path');
const app = express();
const fs = require('fs');
const { allowedNodeEnvironmentFlags } = require('process');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use('/images', express.static('images'));
// app.use(express.urlencoded())

const posts = require('./data/posts.json'); 
const profiles = require('./data/profiles.json'); 
var user = 0;

var songList = [];
var i = 0;
for (i in posts[user]) {
  songList.push(posts[user][i]);
};

var userdata = profiles[user];

app.get('/', (req, res) => {
  fs.readFile('index.html', function (error, html) {
    if (error) {
      res.writeHeader(403, { 'Content-Type': 'text/html' });
      res.write('<h1>403 error file not found</h1>');
    };
    res.writeHeader(200, { 'Content-Type': 'text/html' });
    res.write(html);
    res.send("403");
``;
  });
});

app.get('/tags', function (req, res) {
  let tags = [];
  for (const item of songList) {
    tags = tags.concat(item.tags);
  }
  const tagSet = new Set(tags);
  res.send([...tagSet]);
});

app.get('/songs/:tag', function (req, res) {
  const tag = req.params.tag;
  const results = [];
  for (const song of songList) {
    if (song.tags.includes(tag)) {
      results.push(song.text);
    }
  }
  res.send(results);
});

app.get('/user/', function (req, res) {
  const userdata = profiles[user];
  res.send(userdata);
});

app.get('/profile-pic/', function (req, res) {
  var src = profiles[user]["profile-pic"]
  src = __dirname + src
  res.sendFile(src)
});

app.put('/changeuser/', function (req, res) {
  console.log(req.body);
  user = req.body;
  res.end();
});

module.exports = app;