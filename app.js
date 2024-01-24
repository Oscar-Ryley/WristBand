const express = require('express');
const path = require('path');
const app = express();
const fs = require('fs');
const fileupload = require('express-fileupload')
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(fileupload());

const posts = require('./data/posts.json');
const profiles = require('./data/profiles.json'); 
const profiles_list = JSON.parse(fs.readFileSync('./data/profiles.json'));
const posts_list = JSON.parse(fs.readFileSync('./data/posts.json'))

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

app.get('/posts/:user', function (req, res) {
  const user = req.params.user;
  const songList = [];
  for (var i in posts[user]) {
    songList.push(posts[user][i]);
  };
  var results = [];
  for (const song of songList) {
      results.push(song);
  };
  res.send(results);
});

app.get('/posts/:user/:tag', function (req, res) {
  const tag = req.params.tag;
  const user = req.params.user;
  var songList = [];
  for (var i in posts[user]) {
    songList.push(posts[user][i]);
  };
  var results = [];
  for (const song of songList) {
    if (song.tags.includes(tag)) {
      results.push(song);
    }
  }
  res.send(results);
});

app.post('/posts/:user/new', function (req, res) {  
  const user = req.params.user;
  const newSongName = req.body["song-name"];
  const newSongAuthor = req.body["song-author"];
  const newMusician = req.body["song-musician"];
  const newDate = req.body["song-date"];
  const newLink = req.body["song-link"];
  const newInstrument = req.body["song-instrument"];
  const newTagsList = [newInstrument, newMusician, newDate, newSongName, newSongAuthor]
  var nextnum = Object.keys(posts_list[user.toString()]).length;
  var number = nextnum.toString();
  const newPost = {"date": newDate, "name": newSongName, "author": newSongAuthor, "link": newLink, "instrument": newInstrument, "musician": newMusician, "tags":newTagsList }
  posts_list[user.toString()][number] = newPost;
  fs.writeFileSync('./data/posts.json', JSON.stringify(posts_list));
  res.send("200");
});

app.get('/user/ids', function (req, res) {
  var userids = [];
  for(var i in profiles) {
    userids.push(i);
  };
  res.send(userids);
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

app.post('/user/new', function (req, res) {  
  var userids = [];
  for(var i in profiles) {
    userids.push(i);
  };
  var nextnum = parseInt(userids[userids.length - 1]) + 1;
  var num = nextnum.toString();
  const newUser = { "username": "Username", "biography": "Biography", "profile-pic": "/assets/profile-pictures/blank.png"};
  profiles_list[num] = (newUser);
  fs.writeFileSync('./data/profiles.json', JSON.stringify(profiles_list));
  posts_list[num] = {}
  fs.writeFileSync('./data/posts.json', JSON.stringify(posts_list));
  res.send("200");
});

app.post('/user/:id/edit', function (req, res) {  
  const id = req.params.id;
  const newUsername = req.body["username"];
  const newBiography = req.body["biography"];
  profiles_list[id.toString()] = {"username": newUsername, "biography": newBiography, "profile-pic":"/assets/profile-pictures/Oscar-Ryley-Profile-Picture.png" };
  fs.writeFileSync('./data/profiles.json', JSON.stringify(profiles_list));
  res.send("200");
});

module.exports = app;