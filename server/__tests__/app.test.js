const request = require('supertest');
const app = require("../index.cjs");

describe('GET /users', function() {
  it('responds with json', function() {
    return request(app)
      .get('/api/tasks')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
  });
});

describe('GET /tasks/ with an id', function() {
  it('responds with json', function() {
    return request(app)
      .get('/api/tasks/1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
  });
});

describe('DELETE /tasks/ with an id', function() {
  it('responds with json', function() {
    return request(app)
      .delete('/api/tasks/1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
  });
});

describe('POST /tasks/ with an id', function() {
  it('responds with json', function() {
    return request(app)
      .post('/api/tasks/')
      .send({ "name": "test", "completed": false })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
  });
});

describe('PATCH /tasks/ with an id', function() {
  it('responds with json', function() {
    return request(app)
      .patch('/api/tasks/1')
      .send({ "name": "patch", "completed": false })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
  });
});