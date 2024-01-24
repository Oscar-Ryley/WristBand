'use strict';

const request = require('supertest');
const app = require('./app');

describe('Test the basic page is loading', () => {
    test('GET / returns index.html', () => {
        return request(app)
	    .get('/')
	    .expect('Content-type', /html/);
    });

    test('GET /tags succeeds', () => {
        return request(app)
	    .get('/tags')
	    .expect(200);
    });

    test('GET /tags contains "Prog"', () => {
        return request(app)
	    .get('/tags')
	    .expect(/Prog/);
    });
});

describe('Testing posts Entity', () => {
    test('GET /posts/0 returns a Json list of posts', () => {
        return request(app)
	    .get('/posts/0')
	    .expect('Content-type', /json/);
    });

    test('GET /posts/0/Voice returns a Json list of posts with the tag "Voice"', () => {
        return request(app)
	    .get('/posts/0/Voice')
	    .expect('Content-type', /json/);
    });

    test('POST /posts/0/new succeeds', () => {
        const params = { 'song-name': 'Happy Birthday', 'song-author': 'Patty Hill', 'song-musician': 'Oscar Ryley', 'song-date': '05/05/2024', 'song-link': 'https://www.youtube.com/watch?v=inS9gAgSENE', 'song-instrument': 'Voice' };
        return request(app)
        .post('/posts/0/new')
        .send(params)
	    .expect(200);
    });
});

describe('Testing user Entity', () => {
    test('GET /user/ids succeeds', () => {
        return request(app)
	    .get('/user/ids')
	    .expect(200);
    });

    test('GET /user/ids includes "0"', () => {
        return request(app)
	    .get('/user/ids')
	    .expect(/0/);
    });

    test('GET /user/0 Json Profile data', () => {
        return request(app)
	    .get('/user/0')
	    .expect('Content-type', /json/);
    });

    test('GET /user/0/profile-pic/ returns an image', () => {
        return request(app)
	    .get('/user/0/profile-pic/')
	    .expect('Content-type', /image/);
    });

    test('POST /user/new succeeds', () => {
        return request(app)
	    .get('/user/new')
	    .expect(200);
    });

    test('POST /user/0/edit succeeds', () => {
        const params = { 'username': 'newUsername', 'biography': 'newBio', 'profile-pic':'/assets/profile-pictures/blank.png' };
        return request(app)
        .post('/posts/0/new')
        .send(params)
	    .expect(200);
    });
});
