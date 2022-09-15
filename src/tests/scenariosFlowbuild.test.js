require('dotenv').config();
const supertest = require('supertest');
const { startServer } = require('../app');
const { db } = require('../utils/db');

let server;

beforeAll(async () => {
  server = startServer(5001);
  request = supertest(server);
});

beforeAll(() => {
  return db.raw('START TRANSACTION');
});

afterAll(() => {
  return db.raw('ROLLBACK');
});

afterAll(async () => {
  await server.close();
});

describe('GET /workflows/:id/scenarios with id from flowbuild server', () => {
  test('should return 200', async () => {

    const response = await request.get('/workflows/d373bef0-1152-11ea-9576-9584815cab84/scenarios')

    expect(response.status).toBe(200);
    expect(response.body.totalScenarios).toBeDefined();
    expect(response.body.scenarios.length).toBeTruthy();
  });
});

describe('POST /scenarios/workflow/:id/save with id from flowbuild server', () => {
  test('should return 200', async () => {

    const response = await request.post('/scenarios/workflow/d373bef0-1152-11ea-9576-9584815cab84/save')

    expect(response.status).toBe(201);
    expect(response.body.totalScenarios).toBeDefined();
    expect(response.body.scenarios.length).toBeTruthy();
  });

  test('should return 400 for existing workflow_id', async () => {

    const response = await request.post('/scenarios/workflow/d373bef0-1152-11ea-9576-9584815cab84/save')

    expect(response.status).toBe(400);
    expect(response.body.message).toEqual('Scenarios already exists for workflow_id: d373bef0-1152-11ea-9576-9584815cab84');
  });

  test('should return 404 for workflow not found', async () => {

    const response = await request.post('/scenarios/workflow/d773bef0-1152-11ea-9576-9584815cab82/save')

    expect(response.status).toBe(404);
    expect(response.body.message).toEqual('Workflow not found');
  });
});

describe('GET /workflows/:workflow_id/scenarios/:scenario_id with workflow_id from flowbuild server', () => {
  test('should return 200', async () => {

    const response = await request.get('/workflows/d373bef0-1152-11ea-9576-9584815cab84/scenarios/0')

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
  });
});