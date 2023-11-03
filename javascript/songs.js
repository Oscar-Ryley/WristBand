"use strict";
song_list = [];

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

var data = $.csv.toObjects("songs.txt");