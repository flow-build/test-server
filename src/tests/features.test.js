require('dotenv').config();
const { v4: uuid, validate } = require('uuid');
const supertest = require('supertest');
const { startServer } = require('../app');
const { db } = require('../utils/db');
const simpleFeature = require('fs').readFileSync('./db/seeds/features/simpleBP.feature', 'utf8');
const averageFeature = require('fs').readFileSync('./db/seeds/features/averageBP.feature', 'utf8');
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
  test('should return 201 with paths attached', async () => {
    
    const response = await request.post('/features').type('form')
      .send({
        workflow_name: 'Average BP',
        feature: averageFeature
      });
    
    expect(response.status).toBe(201);
    expect(response.body.feature.name).toEqual('Average BP');
    expect(response.body.feature.workflow_name).toEqual('Average BP');
    expect(response.body.message).toEqual("feature attached to workflow 'Average BP' paths");
  });

  test('should return 201 with paths attached', async () => {
    const response = await request.post('/features').type('form')
      .send({
        workflow_name: 'No Paths',
        feature: simpleFeature
      });
    
    expect(response.status).toBe(201);
    expect(response.body.feature.name).toEqual('Simple BP');
    expect(response.body.feature.workflow_name).toEqual('No Paths');
    expect(response.body.message).toEqual("feature not attached to any path: no paths for workflow 'No Paths'");
  });

  test('should return 400 for existing workflow feature', async () => {
    const response = await request.post('/features').type('form')
      .send({
        workflow_name: 'Simple BP',
        feature: simpleFeature
      });
    
    expect(response.status).toBe(400);
    expect(response.body.message).toEqual("workflow 'Simple BP' already has a feature");
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

describe('GET /features', () => {
  test('should return 200', async () => {
    const response = await request.get('/features');
    
    expect(response.status).toBe(200);
    expect(response.body.length).toBeTruthy();
  });
});

describe('GET /features/:id', () => {
  test('should return 200', async () => {
    const response = await request.get('/features/0bbed45c-59e9-4e9a-80af-8d8ae83dbe55');
    
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body.message).not.toBeDefined();
  });

  test('should return 404 for non existing feature', async () => {
    const response = await request.get('/features/5bbed45c-59e9-4e9a-80af-8d8ae83dbe22');

    expect(response.status).toBe(404);
    expect(response.body.message).toEqual('Feature not found');
  });

  test('should return 400 for invalid uuid', async () => {
    const response = await request.get('/features/123456');

      expect(response.status).toBe(400);
      expect(response.body.message).toEqual('Invalid uuid');
  });
});

describe('GET /workflows/name/:workflow_name/features', () => {
  test('should return 200', async () => {
    const response = await request.get('/workflows/name/Simple BP/features');
    
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body.message).not.toBeDefined();
  });

  test('should return 404 for non existing feature', async () => {
    const response = await request.get('/workflows/name/Difficult/features');

    expect(response.status).toBe(404);
    expect(response.body.message).toEqual(`feature not found for workflow 'Difficult'`);
  });
});

describe('DELETE /features/:id', () => {
  test('should return 204', async () => {
    const response = await request.del('/features/0bbed45c-59e9-4e9a-80af-8d8ae83dbe55');
    
    expect(response.status).toBe(204);
    expect(response.body.length).toBeFalsy();
  });

  test('should return 404 for non existing feature', async () => {
    const response = await request.del('/features/5bbed45c-59e9-4e9a-80af-8d8ae83dbe22');

    expect(response.status).toBe(404);
    expect(response.body.message).toEqual('Feature not found');
  });

  test('should return 400 for invalid uuid', async () => {
    const response = await request.del('/features/123456');

      expect(response.status).toBe(400);
      expect(response.body.message).toEqual('Invalid uuid');
  });
});