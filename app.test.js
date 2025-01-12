'use strict';

const request = require('supertest');
const app = require('./app');

describe('GET /', () => {
    test('succeeds', () => {
        return request(app)
	    .get('/')
	    .expect(200);
    });
    
    test('returns index.html', () => {
        return request(app)
	    .get('/')
	    .expect('Content-type', /html/);
    });

    test('returns 404 when erroneous GET request made', () => {
        return request(app)
	    .get('/frog')
	    .expect(404);
    });
});

describe('Testing posts Entity', () => {
    describe('GET /posts', () => {
        test('succeeds', () => {
            return request(app)
            .get('/posts')
            .expect(200);
        });

        test('returns a json list of posts', () => {
            return request(app)
            .get('/posts')
            .expect('Content-type', /json/);
        });
    });

    describe('GET /posts/tags', () => {
        test('succeeds', () => {
            return request(app)
            .get('/posts/tags')
            .expect(200);
        });
    
        test('returns a json file', () => {
            return request(app)
            .get('/posts/tags')
            .expect('Content-type', /json/);
        });
    
        test('contains the tag "Prog"', () => {
            return request(app)
            .get('/posts/tags')
            .expect(/Prog/);
        });
    });

    describe('GET /posts/:user', () => {
        test('returns a json list of posts', () => {
            return request(app)
            .get('/posts/0')
            .expect('Content-type', /json/);
        });
    });
    
    describe('GET /posts/:user/:tag', () => {
        test('returns a json list of posts with the tag "Voice"', () => {
            return request(app)
            .get('/posts/0/Voice')
            .expect('Content-type', /json/);
        });
    });

    describe('POST /posts/:user/new', () => {
        test('succeeds', () => {
            const params = { 'song-name': 'Happy Birthday', 'song-author': 'Patty Hill', 'song-musician': 'Homer Simpson', 'song-date': '05/05/2024', 'song-link': 'https://www.youtube.com/watch?v=inS9gAgSENE', 'song-instrument': 'Voice' };
            return request(app)
            .post('/posts/2/new')
            .send(params)
            .expect(200);
        });
    });    
});

describe('Testing user Entity', () => {
    describe('GET /user', () => {
        test('succeeds', () => {
            return request(app)
            .get('/user')
            .expect(200);
        });
        
        test('returns a json list', () => {
            return request(app)
            .get('/user')
            .expect('Content-type', /json/);
        });
    });

    describe('GET /user/ids', () => {
        test('succeeds', () => {
            return request(app)
            .get('/user/ids')
            .expect(200);
        });
        
        test('returns a json list', () => {
            return request(app)
            .get('/user/ids')
            .expect('Content-type', /json/);
        });

        test('includes "0"', () => {
            return request(app)
            .get('/user/ids')
            .expect(/0/);
        });
    });

    describe('GET /user/:id', () => {
        test('returns json Profile data', () => {
            return request(app)
            .get('/user/0')
            .expect('Content-type', /json/);
        });
    });
    
    describe('GET /user/:id/profile-pic', () => {
        test('returns an image', () => {
            return request(app)
            .get('/user/0/profile-pic/')
            .expect('Content-type', /image/);
        });

        test('returns 404 if user does not exist, as cannot be found', () => {
            return request(app)
            .get('/user/100000000/profile-pic/')
            .expect(404);
        });
    });

    describe('POST /user/new', () => {
        test('succeeds', () => {
            return request(app)
            .post('/user/new')
            .expect(200);
        });
    });
    
    describe('POST /user/:id/edit', () => {
        test('succeeds', () => {
            const params = { 'username': 'newUsername', 'biography': 'newBio'};
            return request(app)
            .post('/user/2/edit')
            .send(params)
            .expect(200);
        });

        test('throws a 400 when both fields are empty', () => {
            const params = { 'username': '', 'biography': ''};
            return request(app)
            .post('/user/2/edit')
            .send(params)
            .expect(400);
        });
    }); 
    
});
