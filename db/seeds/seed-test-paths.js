const simpleBP = require('./blueprints/simpleBP');
const mediumBP = require('./blueprints/mediumBP');
const averageBP = require('./blueprints/averageBP');
const { getAllPaths } = require('@flowbuild/test-core');

exports.seed = async function(knex) {
  await knex("paths").del();
  await knex("paths").insert([
    {
      id: '38e1d039-39c1-4a48-adb3-736eee1d771e',
      workflow_id: '8a126b08-f5e2-48a8-b913-d201ac6ca409',
      workflow_name: simpleBP.name,
      name: simpleBP.name + '_1',
      nodes: getAllPaths(simpleBP).paths[0].nodes,
      steps: getAllPaths(simpleBP).paths[0].steps
    },{
      id: 'ac5f6b5a-97f4-4f34-a9df-849b888a376c',
      workflow_id: '8a126b08-f5e2-48a8-b913-d201ac6ca409',
      workflow_name: simpleBP.name,
      name: simpleBP.name + '_2',
      nodes: getAllPaths(simpleBP).paths[1].nodes,
      steps: getAllPaths(simpleBP).paths[1].steps
    },
    {
      id: '33e9b130-3cf4-4aaa-8d34-2d6c44749824',
      workflow_id: '198b620d-f344-4241-bd3a-f015fe9feb4f',
      workflow_name: mediumBP.name,
      name: mediumBP.name + '_1',
      nodes: getAllPaths(mediumBP).paths[0].nodes,
      steps: getAllPaths(mediumBP).paths[0].steps
    },
    {
      id: 'aa808890-c921-4da7-8b96-eb322791d067',
      workflow_id: '198b620d-f344-4241-bd3a-f015fe9feb4f',
      workflow_name: mediumBP.name,
      name: mediumBP.name + '_2',
      nodes: getAllPaths(mediumBP).paths[1].nodes,
      steps: getAllPaths(mediumBP).paths[1].steps
    },
    {
      id: '0668167b-9397-480a-ba19-b5823a5f3e26',
      workflow_id: '198b620d-f344-4241-bd3a-f015fe9feb4f',
      workflow_name: mediumBP.name,
      name: mediumBP.name + '_3',
      nodes: getAllPaths(mediumBP).paths[2].nodes,
      steps: getAllPaths(mediumBP).paths[2].steps
    },
    {
      id: 'ec28fdfa-78ed-427e-90e1-33b843ce5672',
      workflow_id: '198b620d-f344-4241-bd3a-f015fe9feb4f',
      workflow_name: mediumBP.name,
      name: mediumBP.name + '_4',
      nodes: getAllPaths(mediumBP).paths[3].nodes,
      steps: getAllPaths(mediumBP).paths[3].steps
    },
    {
      id: 'ebe338d0-a5e7-474d-aed9-f39842bc2cb0',
      workflow_id: 'c6652885-27c3-44da-80ad-f9b1a44a735e',
      workflow_name: averageBP.name,
      name: averageBP.name + '_1',
      nodes: getAllPaths(averageBP).paths[0].nodes,
      steps: getAllPaths(averageBP).paths[0].steps
    },
    {
      id: '495e5362-e568-4e79-8f8a-b959977085e1',
      workflow_id: 'c6652885-27c3-44da-80ad-f9b1a44a735e',
      workflow_name: averageBP.name,
      name: averageBP.name + '_2',
      nodes: getAllPaths(averageBP).paths[1].nodes,
      steps: getAllPaths(averageBP).paths[1].steps
    },
    {
      id: '2d6cc5ea-4633-43c0-9213-e3578cf20d57',
      workflow_id: 'c6652885-27c3-44da-80ad-f9b1a44a735e',
      workflow_name: averageBP.name,
      name: averageBP.name + '_3',
      nodes: getAllPaths(averageBP).paths[2].nodes,
      steps: getAllPaths(averageBP).paths[2].steps
    },
    {
      id: '805af65b-0547-4d15-9296-19bc592c59fe',
      workflow_id: 'c6652885-27c3-44da-80ad-f9b1a44a735e',
      workflow_name: averageBP.name,
      name: averageBP.name + '_4',
      nodes: getAllPaths(averageBP).paths[3].nodes,
      steps: getAllPaths(averageBP).paths[3].steps
    },
    {
      id: 'e51878c3-3748-46ff-ad5a-3959e9d86089',
      workflow_id: 'c6652885-27c3-44da-80ad-f9b1a44a735e',
      workflow_name: averageBP.name,
      name: averageBP.name + '_5',
      nodes: getAllPaths(averageBP).paths[4].nodes,
      steps: getAllPaths(averageBP).paths[4].steps
    },
    {
      id: 'c8fd07d1-eeb4-4451-87bc-6c7bfc244e7d',
      workflow_id: 'c6652885-27c3-44da-80ad-f9b1a44a735e',
      workflow_name: averageBP.name,
      name: averageBP.name + '_6',
      nodes: getAllPaths(averageBP).paths[5].nodes,
      steps: getAllPaths(averageBP).paths[5].steps
    },
    {
      id: '51a27df4-e9cb-4d22-84c4-2b042c8dd9a8',
      workflow_id: 'c6652885-27c3-44da-80ad-f9b1a44a735e',
      workflow_name: averageBP.name,
      name: averageBP.name + '_7',
      nodes: getAllPaths(averageBP).paths[6].nodes,
      steps: getAllPaths(averageBP).paths[6].steps
    },
    {
      id: 'cd82877d-c53a-4d78-9650-9066dbd77f94',
      workflow_id: 'c6652885-27c3-44da-80ad-f9b1a44a735e',
      workflow_name: averageBP.name,
      name: averageBP.name + '_8',
      nodes: getAllPaths(averageBP).paths[7].nodes,
      steps: getAllPaths(averageBP).paths[7].steps
    },
    {
      id: 'ca29e717-d181-4b5f-a137-b33643fcf8c3',
      workflow_id: 'c6652885-27c3-44da-80ad-f9b1a44a735e',
      workflow_name: averageBP.name,
      name: averageBP.name + '_9',
      nodes: getAllPaths(averageBP).paths[8].nodes,
      steps: getAllPaths(averageBP).paths[8].steps
    }
  ]);
};
