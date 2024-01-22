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
});

app.post('/user/:id/edit', function (req, res) {  
  console.log(JSON.stringify(req.body));
  const id = req.params.id;
  //const profileFile = req.files.profile.name
  //var userdata = profiles_list[id.toString()];
  const newUsername = req.body["username"];
  const newBiography = req.body["biography"];
  //const newProfilePic = req.body["profile-pic"];
  profiles_list[id.toString()] = {"username": newUsername, "biography": newBiography, "profile-pic":"/assets/profile-pictures/Oscar-Ryley-Profile-Picture.png" };
  fs.writeFileSync('./data/profiles.json', JSON.stringify(profiles_list));
});

module.exports = app;