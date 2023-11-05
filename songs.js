"use strict";
song_list = [["05/10", "MCS", "Smoke Gets in Your Eyes", "Gertrude Niesen with Ray Sinatra", "https://www.youtube.com/watch?v=bTRACvVc5zE&ab_channel=SwingBluesJazz78RPM", "Concertina"]
["05/10", "Prog", "King James Version", "Billy Bragg", "https://www.youtube.com/watch?v=hNVBwWkUtJI&ab_channel=hmc1410", "Concertina"]
["06/10", "Prog", "Reynardine", "trad/ Fairport Convention", "https://www.youtube.com/watch?v=O3RMut_8IxQ&ab_channel=deviantdopefiend", "Voice"]
["12/10", "MCS", "Nobody Knows You When You're Down and Out", "Bessie Smith", "https://www.youtube.com/watch?v=kxTyV_cBz7o&ab_channel=BessieSmithVEVO", "Concertina"]
["12/10", "Prog", "Only You", "The Flying Pickets", "https://www.youtube.com/watch?v=qgDKtLPp46s&ab_channel=LotharZ", "Concertina"]
["13/10", "Prog", "Piggy Song", "Unkown", "https://www.youtube.com/", "Voice"]
["19/10", "MCS", "You've Got a Friend", "Carole King", "https://www.youtube.com/watch?v=eAR_Ff5A8Rk&ab_channel=CaroleKingVEVO", "Concertina"]
["19/10", "Prog", "Minnie the Moocher", "Cab Calloway", "https://www.youtube.com/watch?v=8mq4UT4VnbE&ab_channel=moontreal", "Concertina"]
["20/10", "Prog", "A Shooting Star is not a Star", "They Might be Giant", "https://www.youtube.com/watch?v=JqBChyNyLhU&ab_channel=TMBGkids", "Voice"]
["26/10", "MCS", "Louisiana 1927", "Randy Newman", "https://www.youtube.com/watch?v=MGs2iLoDUYE&ab_channel=WestHam712", "Concertina"]
["26/10", "Prog", "When First I Came to Caledonia", "Waterson:Carthey", "https://www.youtube.com/watch?v=092hEqAq1Ps&ab_channel=FolkABC-Americana%2CBlues%2CCountry", "Concertina"]
["27/10", "Prog", "Mister Cellophane", "John C. Reilley (from Chicago)", "https://www.youtube.com/watch?v=wfNIYUvPrsM&ab_channel=Miramax", "Concertina"]
["02/11", "MCS", "Moon Over Bourbon Street", "String", "https://www.youtube.com/watch?v=5i_0PkOqLKA&ab_channel=posilipos", "Double Bass"]];

class song {
    constructor(date_of_song, module_of_song, song_title, song_artist, song_link, song_instrument) {
        this.date = date_of_song;
        this.module = module_of_song;
        this.title = song_title;
        this.artist = song_artist;
        this.link = song_link;
        this.instrument = song_instrument;
    }
}