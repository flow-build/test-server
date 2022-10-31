require('dotenv').config();
const { v4: uuid, validate } = require('uuid');
const supertest = require('supertest');
const { startServer } = require('../app');
const { db } = require('../utils/db');
const verySimpleBP = require('../../db/seeds/blueprints/verySimpleBP');
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
})

describe('GET /workflows/:id/scenarios', () => {
  test('should return 200', async () => {

    const response = await request.get('/workflows/8a126b08-f5e2-48a8-b913-d201ac6ca409/scenarios')

    expect(response.status).toBe(200);
    expect(response.body.length).toBeTruthy();
    expect(response.body[0].name).toEqual('START->END');
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

describe('PATCH /scenarios/:id', () => {
  test('should return 200', async () => {

    const response = await request
      .patch('/scenarios/218f5b5a-6024-4ec4-a5da-639d516bad2d')
      .send({ name: 'Happy Path' });

    expect(response.status).toBe(200);
    expect(response.body.id).toEqual('218f5b5a-6024-4ec4-a5da-639d516bad2d');
    expect(response.body.name).toEqual('Happy Path');
  });

  test('should return 400 for invalid uuid', async () => {

    const response = await request
      .patch('/scenarios/7a126b08')
      .send({ name: 'Happy Path' });

    expect(response.status).toBe(400);
    expect(response.body.message).toEqual('Invalid uuid');
  });

  test('should return 404 for scenario not found', async () => {

    const response = await request
      .patch('/scenarios/7a126b08-f5e2-48a8-b913-d201ac6ca408')
      .send({ name: 'Happy Path' });

    expect(response.status).toBe(404);
    expect(response.body.message).toEqual('Scenario not found');
  });

  test('should return 400 for invalid request body', async () => {

    const response = await request
      .patch('/scenarios/218f5b5a-6024-4ec4-a5da-639d516bad2d')
      .send({});

    expect(response.status).toBe(400);
    expect(response.body.message).toEqual('Invalid Request Body');
    expect(response.body.errors[0].message).toEqual("must have required property 'name'");
  });

  test('should return 400 for invalid request body', async () => {

    const response = await request
      .patch('/scenarios/218f5b5a-6024-4ec4-a5da-639d516bad2d')
      .send({ name: 'New Name', nodes: ['START', 'FINISH'] });

    expect(response.status).toBe(400);
    expect(response.body.message).toEqual('Invalid Request Body');
    expect(response.body.errors[0].message).toEqual("must NOT have additional properties");
  });
});

describe('POST /scenarios/calculate', () => {
  test('should return 201', async () => {

    const response = await request.post('/scenarios/calculate?strategy=persist')
      .send({
        workflow_id: uuid(), 
        blueprint_spec: verySimpleBP.blueprint_spec
      });
    
    expect(response.status).toBe(201);
    expect(response.body.length).toBeTruthy();
    expect(response.body[0].name).toEqual('START-END');
  });

  test('should return 200', async () => {

    const response = await request.post('/scenarios/calculate')
      .send({
        blueprint_spec: verySimpleBP.blueprint_spec
      });
    
    expect(response.status).toBe(200);
    expect(response.body.totalScenarios).toBeDefined();
    expect(response.body.scenarios.length).toBeTruthy();
  });

  test('should return 400 for existing workflow_id', async () => {

    const response = await request.post('/scenarios/calculate?strategy=persist')
    .send({
      workflow_id: '8a126b08-f5e2-48a8-b913-d201ac6ca409', 
      blueprint_spec: verySimpleBP.blueprint_spec
    });  

    expect(response.status).toBe(400);
    expect(response.body.message).toEqual('Scenarios already exists for workflow_id: 8a126b08-f5e2-48a8-b913-d201ac6ca409');
  });

  test('should return 400 for invalid request body', async () => {

    const response = await request.post('/scenarios/calculate')
      .send({
        workflow_id: uuid(),
        blueprint_spec: {
          lanes: [1, 2]
        }
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toEqual('Invalid Request Body');
    expect(response.body.errors[0].message).toEqual("must have required property 'nodes'");
  });

  test('should return 400 for invalid request body', async () => {

    const response = await request.post('/scenarios/calculate')
      .send({});

    expect(response.status).toBe(400);
    expect(response.body.message).toEqual('Invalid Request Body');
    expect(response.body.errors[0].message).toEqual("must have required property 'blueprint_spec'");
  });
});

describe('POST /workflows/:id/scenarios/save', () => {
  test('should return 201', async () => {
    nock(process.env.FLOWBUILD_URL)
      .get('/workflows/9a126b08-f5e2-48a8-b913-d201ac6ca402')
      .reply(200, verySimpleBP);

    const response = await request.post(`/workflows/9a126b08-f5e2-48a8-b913-d201ac6ca402/scenarios/save`);
    
    expect(response.status).toBe(201);
    expect(response.body.length).toBeTruthy();
    expect(response.body[0].id).toBeDefined();
    expect(validate(response.body[0].id)).toBeTruthy();
  });

  test('should return 404 for workflow not found', async () => {
    nock(process.env.FLOWBUILD_URL)
      .get('/workflows/8a126b08-f5e2-48a8-b913-d201ac6ca401')
      .reply(204);

    const response = await request.post(`/workflows/8a126b08-f5e2-48a8-b913-d201ac6ca401/scenarios/save`);
    
    expect(response.status).toBe(404);
    expect(response.body.message).toEqual('Workflow not found');
  });

  test('should return 400 for existing workflow_id', async () => {
    nock(process.env.FLOWBUILD_URL)
      .get('/workflows/8a126b08-f5e2-48a8-b913-d201ac6ca409')
      .reply(200, verySimpleBP);

    const response = await request.post(`/workflows/8a126b08-f5e2-48a8-b913-d201ac6ca409/scenarios/save`);

    expect(response.status).toBe(400);
    expect(response.body.message).toEqual('Scenarios already exists for workflow_id: 8a126b08-f5e2-48a8-b913-d201ac6ca409');
  });

  test('should return 400 for invalid uuid', async () => {

    const response = await request.post(`/workflows/48a8-b913/scenarios/save`);

    expect(response.status).toBe(400);
    expect(response.body.message).toEqual('Invalid uuid');
  });

  test('should return 500 for flowbuild server down', async () => {
    nock(process.env.FLOWBUILD_URL)
      .get('/workflows/7a126b08-f5e2-48a8-b913-d201ac6ca408')
      .replyWithError(`connect ECONNREFUSED ${process.env.FLOWBUILD_URL}`);
    
    const response = await request.post(`/workflows/7a126b08-f5e2-48a8-b913-d201ac6ca408/scenarios/save`);

    expect(response.status).toBe(502);
    expect(response.body.message).toEqual('Flowbuild server unavailable');
  });
});

describe('DELETE /workflows/:id/scenarios', () => {
  test('should return 204', async () => {

    const response = await request.del('/workflows/8a126b08-f5e2-48a8-b913-d201ac6ca409/scenarios')

    expect(response.status).toBe(204);
  });

  test('should return 400 for invalid uuid', async () => {

    const response = await request.del('/workflows/8a126b08/scenarios')

    expect(response.status).toBe(400);
    expect(response.body.message).toEqual('Invalid uuid');
  });

  test('should return 404 for workflow not found', async () => {

    const response = await request.del('/workflows/7a126b08-f5e2-48a8-b913-d201ac6ca408/scenarios')

    expect(response.status).toBe(404);
    expect(response.body.message).toEqual('Workflow not found');
  });
});