const http = require('http');
const express = require('express');
const path = require('path');
const app = express();
const fs = require('fs');
const { allowedNodeEnvironmentFlags } = require('process');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded());

const posts = require('./data/posts.json');
const profiles = require('./data/profiles.json'); 

app.get('/', (req, res) => {
  fs.readFile('index.html', function (error, html) {
    if (error) {
      res.writeHeader(403, { 'Content-Type': 'text/html' });
      res.write('<h1>403 error file not found</h1>');
    };
    res.writeHeader(200, { 'Content-Type': 'text/html' });
    res.write(html);
    res.send('403');
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

app.get('/songs/:user', function (req, res) {
  const user = req.params.user;
  const songList = [];
  for (var i in posts[user]) {
    songList.push(posts[user][i]);
  };
  var results = [];
  for (const song of songList) {
      results.push(song.text);
  };
  res.send(results);
});

app.get('/songs/:user/:tag', function (req, res) {
  const tag = req.params.tag;
  const user = req.params.user;
  var songList = [];
  for (var i in posts[user]) {
    songList.push(posts[user][i]);
  };
  var results = [];
  for (const song of songList) {
    if (song.tags.includes(tag)) {
      results.push(song.text);
    }
  }
  res.send(results);
});

app.get('/user/:id', function (req, res) {
  const user = req.params.id;
  const userdata = profiles[user];
  res.send(userdata);
});

app.get('/user/:id/profile-pic/', function (req, res) {
  const id = req.params.id;
  let src = profiles[id]['profile-pic'];
  src = __dirname + src;
  res.sendFile(src);
});

app.put('/changeuser/', function (req, res) {
  data = req.body;
  globalThis.user = data.num;
  const songList = [];
  for (var i in posts[user]) {
    songList.push(posts[user][i]);
  };
  const userdata = profiles[user];
  res.end();
});

module.exports = app;