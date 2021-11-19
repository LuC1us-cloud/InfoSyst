const request = require('supertest');
const app = require('../../app');

describe('GET /', () => {
    it('respond with json containing "Hello World!"', (done) => {
        request(app)
        .get('/')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, { message: 'Hello World!' }, done);
    });
}
);