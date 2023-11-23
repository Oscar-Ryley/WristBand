let song_list = [
["05/10", "MCS", "Smoke Gets in Your Eyes", "Gertrude Niesen with Ray Sinatra", "https://www.youtube.com/watch?v=bTRACvVc5zE&ab_channel=SwingBluesJazz78RPM", "Concertina"],
["05/10", "Prog", "King James Version", "Billy Bragg", "https://www.youtube.com/watch?v=hNVBwWkUtJI&ab_channel=hmc1410", "Concertina"],
["06/10", "Prog", "Reynardine", "trad/ Fairport Convention", "https://www.youtube.com/watch?v=O3RMut_8IxQ&ab_channel=deviantdopefiend", "Voice"],
["12/10", "MCS", "Nobody Knows You When You're Down and Out", "Bessie Smith", "https://www.youtube.com/watch?v=kxTyV_cBz7o&ab_channel=BessieSmithVEVO", "Concertina"],
["12/10", "Prog", "Only You", "The Flying Pickets", "https://www.youtube.com/watch?v=qgDKtLPp46s&ab_channel=LotharZ", "Concertina"],
["13/10", "Prog", "Piggy Song", "Unkown", "https://www.youtube.com/", "Voice"],
["19/10", "MCS", "You've Got a Friend", "Carole King", "https://www.youtube.com/watch?v=eAR_Ff5A8Rk&ab_channel=CaroleKingVEVO", "Concertina"],
["19/10", "Prog", "Minnie the Moocher", "Cab Calloway", "https://www.youtube.com/watch?v=8mq4UT4VnbE&ab_channel=moontreal", "Concertina"],
["20/10", "Prog", "A Shooting Star is not a Star", "They Might be Giant", "https://www.youtube.com/watch?v=JqBChyNyLhU&ab_channel=TMBGkids", "Voice"],
["26/10", "MCS", "Louisiana 1927", "Randy Newman", "https://www.youtube.com/watch?v=MGs2iLoDUYE&ab_channel=WestHam712", "Concertina"],
["26/10", "Prog", "When First I Came to Caledonia", "Waterson:Carthey", "https://www.youtube.com/watch?v=092hEqAq1Ps&ab_channel=FolkABC-Americana%2CBlues%2CCountry", "Concertina"],
["27/10", "Prog", "Mister Cellophane", "John C. Reilley (from Chicago)", "https://www.youtube.com/watch?v=wfNIYUvPrsM&ab_channel=Miramax", "Concertina"],
["02/11", "MCS", "Moon Over Bourbon Street", "String", "https://www.youtube.com/watch?v=5i_0PkOqLKA&ab_channel=posilipos", "Double Bass"],
["03/11", "Prog", "O how peaceful living in the country", "Jan Holdstock", "https://www.youtube.com/watch?v=AT9aeninA5k", "Voice"],
["09/11", "MCS", "Raglan Road", "Luke Kelly", "https://www.youtube.com/watch?v=ZIqr1Ge8Z5w", "Concertina"],
["09/11", "Prog", "Fareweel Regality", "The Unthanks", "https://www.youtube.com/watch?v=-d7AzaPptl8", "Concertina"],
["10/11", "Prog", "Shiver me timbers", "Tom Waits", "https://www.youtube.com/watch?v=vfLY8NZCQMg", "Concertina"],
["16/11", "Prog", "The Goslings", "Frederick Bridge", "https://www.youtube.com/watch?v=wHpjUfCEAr4", "Concertina"],
["17/11", "Prog", "She", "Elvis Costello (from Notting Hill)", "https://www.youtube.com/watch?v=O040xuq2FR0", "Concertina"]
];

let template = ["", "", "", "", "", ""]

function generate(){
    for (let i = 0; i < song_list.length; i++) {
        this.document.getElementById("jsinput").insertAdjacentHTML("afterend", 
        `<div class="card song-container my-auto" style="width: 18rem;"><div class="card-body"><h4 class="card-title">${song_list[i][2]}</h4><h5 class="card-text">by ${song_list[i][3]}</h5><p class="card-text">Instrument: ${song_list[i][5]}<br> Lecture: ${song_list[i][1]}<br> Date: ${song_list[i][0]}</p><a href="${song_list[i][4]}" target = "_blank" class="btn btn-primary" id="link-button">Link to Video</a></div></div><br>`
        );
    }
}

window.addEventListener('click', function(event){
    this.fetch('http://127.0.0.1:8080/songs/song')
    .then(response => response.text())
    .then(body =>
      this.document.getElementById('content').innerHTML=body
      )
  })