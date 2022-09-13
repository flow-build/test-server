require('dotenv').config();
const { v4: uuid } = require('uuid');
const supertest = require('supertest');
const { startServer } = require('../app');
const { db } = require('../utils/db');
const verySimpleBP = require('../../db/seeds/blueprints/verySimpleBP');

let server;

beforeAll(async () => {
  server = startServer(5001);
  request = supertest(server);
})

beforeEach(() => {
  return db.raw('START TRANSACTION');
});

afterEach(() => {
  return db.raw('ROLLBACK');
});

afterAll(async () => {
  await server.close();
})

describe('GET /workflows/:id/scenarios', () => {
  test('should return 200', async () => {

    const response = await request.get('/workflows/8a126b08-f5e2-48a8-b913-d201ac6ca409/scenarios')

    expect(response.status).toBe(200);
    expect(response.body.totalScenarios).toBeDefined();
    expect(response.body.scenarios.length).toBeTruthy();
  });

  test('should return 400 for invalid uuid', async () => {

    const response = await request.get('/workflows/8a126b08/scenarios')

    expect(response.status).toBe(400);
    expect(response.body.message).toEqual('Invalid uuid');
  });

  test('should return 404 for workflow not found', async () => {

    const response = await request.get('/workflows/7a126b08-f5e2-48a8-b913-d201ac6ca408/scenarios')

    expect(response.status).toBe(404);
    expect(response.body.message).toEqual('Workflow not found');
  });
});

describe('PATCH /workflows/:workflow_id/scenarios/:scenario_id', () => {
  test('should return 200', async () => {

    const response = await request
      .patch('/workflows/8a126b08-f5e2-48a8-b913-d201ac6ca409/scenarios/0')
      .send({ name: 'Happy Path' });

    expect(response.status).toBe(200);
    expect(response.body.scenarios.length).toBeTruthy();
    expect(response.body.scenarios[0].name).toEqual('Happy Path');
  });

  test('should return 400 for invalid uuid', async () => {

    const response = await request
      .patch('/workflows/7a126b08/scenarios/0')
      .send({ name: 'Happy Path' });

    expect(response.status).toBe(400);
    expect(response.body.message).toEqual('Invalid uuid');
  });

  test('should return 404 for workflow not found', async () => {

    const response = await request
      .patch('/workflows/7a126b08-f5e2-48a8-b913-d201ac6ca408/scenarios/0')
      .send({ name: 'Happy Path' });

    expect(response.status).toBe(404);
    expect(response.body.message).toEqual('Workflow not found');
  });

  test('should return 404 for scenario not found', async () => {

    const response = await request
      .patch('/workflows/8a126b08-f5e2-48a8-b913-d201ac6ca409/scenarios/1')
      .send({ name: 'Happy Path' });

    expect(response.status).toBe(404);
    expect(response.body.message).toEqual('Scenario not found');
  });

  test('should return 400 for invalid request body', async () => {

    const response = await request
      .patch('/workflows/8a126b08-f5e2-48a8-b913-d201ac6ca409/scenarios/0')
      .send({});

    expect(response.status).toBe(400);
    expect(response.body.message).toEqual('Invalid Request Body');
    expect(response.body.errors[0].message).toEqual("must have required property 'name'");
  });

  test('should return 400 for invalid request body', async () => {

    const response = await request
      .patch('/workflows/8a126b08-f5e2-48a8-b913-d201ac6ca409/scenarios/0')
      .send({ name: 'New Name', nodes: ['START', 'FINISH'] });

    expect(response.status).toBe(400);
    expect(response.body.message).toEqual('Invalid Request Body');
    expect(response.body.errors[0].message).toEqual("must NOT have additional properties");
  });
});

describe('POST /scenarios/blueprint/save', () => {
  test('should return 201', async () => {

    const response = await request.post('/scenarios/blueprint/save')
      .send({
        workflow_id: '8a126b08-f5e2-48a8-b913-d201ac6ca409', 
        blueprint_spec: verySimpleBP.blueprint_spec
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toEqual('Scenarios already exists for workflow_id: 8a126b08-f5e2-48a8-b913-d201ac6ca409');
  });

  test('should return 400 for existing workflow_id', async () => {

    const response = await request.post('/scenarios/blueprint/save')
      .send({
        workflow_id: uuid(), 
        blueprint_spec: verySimpleBP.blueprint_spec
      });

    expect(response.status).toBe(201);
    expect(response.body.totalScenarios).toBeDefined();
    expect(response.body.scenarios.length).toBeTruthy();
  });

  test('should return 400 for invalid request body', async () => {

    const response = await request.post('/scenarios/blueprint/save')
      .send({
        blueprint_spec: verySimpleBP.blueprint_spec
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toEqual('Invalid Request Body');
    expect(response.body.errors[0].message).toEqual("must have required property 'workflow_id'");
  });

  test('should return 400 for invalid request body', async () => {

    const response = await request.post('/scenarios/blueprint/save')
      .send({
        workflow_id: uuid()
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toEqual('Invalid Request Body');
    expect(response.body.errors[0].message).toEqual("must have required property 'blueprint_spec'");
  });

  test('should return 400 for invalid request body', async () => {

    const response = await request.post('/scenarios/blueprint/save')
      .send({
        workflow_id: uuid(),
        blueprint_spec: {
          lanes: []
        }
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toEqual('Invalid Request Body');
    expect(response.body.errors[0].field).toEqual("/blueprint_spec");
    expect(response.body.errors[0].message).toEqual("must have required property 'nodes'");
  });
});