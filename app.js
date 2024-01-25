const express = require('express');
const path = require('path');
const app = express();
const fs = require('fs');
const fileupload = require('express-fileupload');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(fileupload());

const posts = require('./data/posts.json');
const profiles = require('./data/profiles.json');
const profilesList = JSON.parse(fs.readFileSync('./data/profiles.json'));
const postsList = JSON.parse(fs.readFileSync('./data/posts.json'));

// General

app.get('/', (req, res) => {
  fs.readFile('index.html', function (error, html) {
    if (error) {
      res.writeHeader(403, { 'Content-Type': 'text/html' });
      res.write('<h1>403 error file not found</h1>');
    };
    res.writeHeader(200, { 'Content-Type': 'text/html' });
    res.write(html);
  });
});

// Posts

app.get('/posts', function (req, res) {
  res.send(postsList);
});

app.get('/posts/tags', function (req, res) {
  let tags = [];
  for (const i in postsList) {
    for (const j in postsList[i]) {
      tags = tags.concat(postsList[i][j].tags);
    }
  };
  const tagSet = new Set(tags);
  res.send([...tagSet]);
});

app.get('/posts/:user', function (req, res) {
  const user = req.params.user;
  const songList = [];
  for (const i in posts[user]) {
    songList.push(posts[user][i]);
  };
  const results = [];
  for (const song of songList) {
      results.push(song);
  };
  res.send(results);
});

app.get('/posts/:user/:tag', function (req, res) {
  const tag = req.params.tag;
  const user = req.params.user;
  const songList = [];
  for (const i in posts[user]) {
    songList.push(posts[user][i]);
  };
  const results = [];
  for (const song of songList) {
    if (song.tags.includes(tag)) {
      results.push(song);
    }
  }
  res.send(results);
});

app.post('/posts/:user/new', function (req, res) {
  const user = req.params.user;
  const newSongName = req.body['song-name'];
  const newSongAuthor = req.body['song-author'];
  const newMusician = req.body['song-musician'];
  const newDate = req.body['song-date'];
  const newLink = req.body['song-link'];
  const newInstrument = req.body['song-instrument'];
  const newTagsList = [newInstrument, newMusician, newDate, newSongName, newSongAuthor];
  const nextnum = Object.keys(postsList[user.toString()]).length;
  const number = nextnum.toString();
  const newPost = { date: newDate, name: newSongName, author: newSongAuthor, link: newLink, instrument: newInstrument, musician: newMusician, tags: newTagsList };
  postsList[user.toString()][number] = newPost;
  fs.writeFileSync('./data/posts.json', JSON.stringify(postsList));
  res.sendStatus(200);
});

// Users

app.get('/user', function (req, res) {
  res.send(profilesList);
});

app.get('/user/ids', function (req, res) {
  const userids = [];
  for (const i in profiles) {
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

app.post('/user/:id/profile-pic/upload', function (req, res) {
  const id = req.params.id;
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400);
  }
  const profileImageFile = req.files.profImage;
  const fileDirectory = '/assets/profile-pictures/' + profileImageFile.name;
  const uploadPath = __dirname + fileDirectory;
  profileImageFile.mv(uploadPath, function (err) {
    if (err) {
      return res.sendStatus(500);
    };
  });
  profilesList[id.toString()]['profile-pic'] = fileDirectory;
  fs.writeFileSync('./data/profiles.json', JSON.stringify(profilesList));
  res.sendStatus(200);
});

app.post('/user/new', function (req, res) {
  const userids = [];
  for (const i in profiles) {
    userids.push(i);
  };
  const nextnum = parseInt(userids[userids.length - 1]) + 1;
  const num = nextnum.toString();
  const newUser = { username: 'Username', biography: 'Biography', 'profile-pic': '/assets/profile-pictures/blank.png' };
  profilesList[num] = (newUser);
  fs.writeFileSync('./data/profiles.json', JSON.stringify(profilesList));
  postsList[num] = {};
  fs.writeFileSync('./data/posts.json', JSON.stringify(postsList));
  res.sendStatus(200);
});

app.post('/user/:id/edit', function (req, res) {
  const id = req.params.id;
  const newUsername = req.body.username;
  const newBiography = req.body.biography;
  console.log(newUsername);
  if (newUsername.length === 0 && newBiography.length === 0) {
    return res.sendStatus(400);
  };
  profilesList[id.toString()].username = newUsername;
  profilesList[id.toString()].biography = newBiography;
  fs.writeFileSync('./data/profiles.json', JSON.stringify(profilesList));
  res.sendStatus(200);
});

module.exports = app;
