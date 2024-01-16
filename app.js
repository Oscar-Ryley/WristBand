const http = require('http');
const express = require('express');
const path = require('path');
const app = express();
const fs = require('fs');
const { allowedNodeEnvironmentFlags } = require('process');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
// app.use(express.urlencoded())

const posts = require('./data/posts.json'); 

var user = 0;

var songList = [];
for (let i =0; i <= 31; i++) {
  songList.push(posts[user][i]);
};

console.log(songList);

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

module.exports = app;