const http = require("http");
const express = require("express"); 
const path = require("path");
const app = express(); 
const fs = require('fs')
app.use(express.static(path.join(__dirname, 'public'))); 

let song_list = [
  { "text":["05/10", "MCS", "Smoke Gets in Your Eyes", "Gertrude Niesen with Ray Sinatra", "https://www.youtube.com/watch?v=bTRACvVc5zE&ab_channel=SwingBluesJazz78RPM", "Concertina"], 
  "tags":["song", "MCS", "Concertina", "October"]},
  { "text":["05/10", "Prog", "King James Version", "Billy Bragg", "https://www.youtube.com/watch?v=hNVBwWkUtJI&ab_channel=hmc1410", "Concertina"], 
  "tags":["song", "Prog", "Concertina", "October"]},
  { "text":["06/10", "Prog", "Reynardine", "trad/ Fairport Convention", "https://www.youtube.com/watch?v=O3RMut_8IxQ&ab_channel=deviantdopefiend", "Voice"], 
  "tags":["song", "Prog", "Voice", "October"]},
  { "text":["12/10", "MCS", "Nobody Knows You When You're Down and Out", "Bessie Smith", "https://www.youtube.com/watch?v=kxTyV_cBz7o&ab_channel=BessieSmithVEVO", "Concertina"], 
  "tags":["song", "MCS", "Concertina", "October"]},
  { "text":["12/10", "Prog", "Only You", "The Flying Pickets", "https://www.youtube.com/watch?v=qgDKtLPp46s&ab_channel=LotharZ", "Concertina"], 
  "tags":["song", "Prog", "Concertina", "October"]},
  { "text":["13/10", "Prog", "Piggy Song", "Unkown", "https://www.youtube.com/", "Voice"], 
  "tags":["song", "Prog", "Voice", "October"]},
  { "text":["19/10", "MCS", "You've Got a Friend", "Carole King", "https://www.youtube.com/watch?v=eAR_Ff5A8Rk&ab_channel=CaroleKingVEVO", "Concertina"], 
  "tags":["song", "MCS", "Concertina", "October"]},
  { "text":["19/10", "Prog", "Minnie the Moocher", "Cab Calloway", "https://www.youtube.com/watch?v=8mq4UT4VnbE&ab_channel=moontreal", "Concertina"], 
  "tags":["song", "Prog", "Concertina", "October"]},
  { "text":["20/10", "Prog", "A Shooting Star is not a Star", "They Might be Giant", "https://www.youtube.com/watch?v=JqBChyNyLhU&ab_channel=TMBGkids", "Voice"], 
  "tags":["song", "Prog", "Voice", "October"]},
  { "text":["26/10", "MCS", "Louisiana 1927", "Randy Newman", "https://www.youtube.com/watch?v=MGs2iLoDUYE&ab_channel=WestHam712", "Concertina"], 
  "tags":["song", "MCS", "Concertina", "October"]},
  { "text":["26/10", "Prog", "When First I Came to Caledonia", "Waterson:Carthey", "https://www.youtube.com/watch?v=092hEqAq1Ps&ab_channel=FolkABC-Americana%2CBlues%2CCountry", "Concertina"], 
  "tags":["song", "Prog", "Concertina", "October"]},
  { "text":["27/10", "Prog", "Mister Cellophane", "John C. Reilley (from Chicago)", "https://www.youtube.com/watch?v=wfNIYUvPrsM&ab_channel=Miramax", "Concertina"], 
  "tags":["song", "Prog", "Concertina", "October"]},
  { "text":["02/11", "MCS", "Moon Over Bourbon Street", "String", "https://www.youtube.com/watch?v=5i_0PkOqLKA&ab_channel=posilipos", "Double Bass"], 
  "tags":["song", "MCS", "Double Bass", "November"]},
  { "text":["03/11", "Prog", "O how peaceful living in the country", "Jan Holdstock", "https://www.youtube.com/watch?v=AT9aeninA5k", "Voice"], 
  "tags":["song", "Prog", "Voice", "November"]},
  { "text":["09/11", "MCS", "Raglan Road", "Luke Kelly", "https://www.youtube.com/watch?v=ZIqr1Ge8Z5w", "Concertina"], 
  "tags":["song", "MCS", "Concertina", "November"]},
  { "text":["09/11", "Prog", "Fareweel Regality", "The Unthanks", "https://www.youtube.com/watch?v=-d7AzaPptl8", "Concertina"], 
  "tags":["song", "Prog", "Concertina", "November"]},
  { "text":["10/11", "Prog", "Shiver me timbers", "Tom Waits", "https://www.youtube.com/watch?v=vfLY8NZCQMg", "Concertina"], 
  "tags":["song", "Prog", "Concertina", "November"]},
  { "text":["16/11", "Prog", "The Goslings", "Frederick Bridge", "https://www.youtube.com/watch?v=wHpjUfCEAr4", "Concertina"], 
  "tags":["song", "Prog", "Concertina", "November"]},
  { "text":["17/11", "Prog", "She", "Elvis Costello (from Notting Hill)", "https://www.youtube.com/watch?v=O040xuq2FR0", "Concertina"], 
  "tags":["song", "Prog", "Concertina", "November"]},
  { "text":["20/11", "MCS", "The Maid of Llanwellyn", "Kate Rusby", "https://www.youtube.com/watch?v=lo05meaz97I", "Concertina"], 
  "tags":["song", "MCS", "Concertina", "November"]},
  { "text":["23/11", "MCS", "House of the Rising Sun", "The Animals", "https://www.youtube.com/watch?v=4-43lLKaqBQ", "Concertina"], 
  "tags":["song", "MCS", "Concertina", "November"]},
  { "text":["23/11", "Prog", "Song for Yesterday", "Kris Drever", "https://www.youtube.com/watch?v=JzGth-NbRUE", "Concertina"], 
  "tags":["song", "Prog", "Concertina", "November"]},
  { "text":["24/11", "Prog", "Lady Franklin’s Lament / Lord Franklin", "Bob Dylan/ it's a folk song", "https://www.youtube.com/watch?v=zl5EI3odI8w", "Concertina"], 
  "tags":["song", "Prog", "Concertina", "November"]}
];

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

app.get("/tags", function (req, res){
  let tags = []
  for (let item of song_list) {
    tags = tags.concat(item.tags)
  }
  let tagSet = new Set(tags);
  res.send([...tagSet]);
})

app.get("/songs/:tag", function (req, res){
  let tag = req.params.tag;
  let results = [];
  for (let song of song_list){
    if(song.tags.includes(tag)){
      results.push(song.text);
    }
  }
  res.send(results);
})

console.log('Server running at http://127.0.0.1:8080/'); 