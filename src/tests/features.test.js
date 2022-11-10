require('dotenv').config();
const { v4: uuid, validate } = require('uuid');
const supertest = require('supertest');
const { startServer } = require('../app');
const { db } = require('../utils/db');
const simpleFeature = require('fs').readFileSync('./db/seeds/features/simpleBP.feature', 'utf8');
const nock = require('nock');

nock(process.env.FLOWBUILD_URL)
  .post('/token')
  .reply(200, {
    jwtToken: 'genericTestToken'
  });

let server;

beforeAll(async () => {
  server = startServer(5001);
  request = supertest(server);
})

beforeAll(() => {
  return db.raw('START TRANSACTION');
});

afterAll(() => {
  return db.raw('ROLLBACK');
});

afterAll(async () => {
  await server.close();
});

describe('POST /features', () => {
  test('should return 201', async () => {
    const response = await request.post('/features').type('form')
      .send({
        workflow_name: 'Test',
        feature: simpleFeature
      });
    
    expect(response.status).toBe(201);
    expect(response.body.name).toEqual('Simple BP');
    expect(response.body.workflow_name).toEqual('Test');
  });

  test('should return 400 for missing workflow_name', async () => {
    const response = await request.post('/features').type('form')
      .send({
        feature: simpleFeature
      });

    expect(response.status).toBe(400);
    expect(response.body.errors[0].message).toEqual("must have required property 'workflow_name'");
  });

  test('should return 400 for missing feature', async () => {
    const response = await request.post('/features').type('form')
      .send({
        workflow_name: 'Test'
      });

    expect(response.status).toBe(400);
    expect(response.body.errors[0].message).toEqual("must have required property 'feature'");
  });
});