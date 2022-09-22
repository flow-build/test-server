const verySimpleBP = require('./blueprints/verySimpleBP');
const simpleBP = require('./blueprints/simpleBP');
const mediumBP = require('./blueprints/mediumBP');
const loopSimpleBP = require('./blueprints/loopSimpleBP');
const loopMediumBP = require('./blueprints/loopMediumBP');
const averageBP = require('./blueprints/averageBP');
const { getAllPaths } = require('@flowbuild/test-core');

exports.seed = async function(knex) {
  await knex("scenarios").del();
  await knex("scenarios").insert([
    {
      id: '218f5b5a-6024-4ec4-a5da-639d516bad2d',
      workflow_id: '8a126b08-f5e2-48a8-b913-d201ac6ca409',
      name: getAllPaths(verySimpleBP).scenarios[0].name,
      nodes: getAllPaths(verySimpleBP).scenarios[0].nodes,
      steps: getAllPaths(verySimpleBP).scenarios[0].steps
    },
    {
      id: '38e1d039-39c1-4a48-adb3-736eee1d771e',
      workflow_id: '198b620d-f344-4241-bd3a-f015fe9feb4f',
      name: getAllPaths(simpleBP).scenarios[0].name,
      nodes: getAllPaths(simpleBP).scenarios[0].nodes,
      steps: getAllPaths(simpleBP).scenarios[0].steps
    },{
      id: 'ac5f6b5a-97f4-4f34-a9df-849b888a376c',
      workflow_id: '198b620d-f344-4241-bd3a-f015fe9feb4f',
      name: getAllPaths(simpleBP).scenarios[1].name,
      nodes: getAllPaths(simpleBP).scenarios[1].nodes,
      steps: getAllPaths(simpleBP).scenarios[1].steps
    },
    {
      id: '33e9b130-3cf4-4aaa-8d34-2d6c44749824',
      workflow_id: 'c6652885-27c3-44da-80ad-f9b1a44a735e',
      name: getAllPaths(mediumBP).scenarios[0].name,
      nodes: getAllPaths(mediumBP).scenarios[0].nodes,
      steps: getAllPaths(mediumBP).scenarios[0].steps
    },
    {
      id: 'aa808890-c921-4da7-8b96-eb322791d067',
      workflow_id: 'c6652885-27c3-44da-80ad-f9b1a44a735e',
      name: getAllPaths(mediumBP).scenarios[1].name,
      nodes: getAllPaths(mediumBP).scenarios[1].nodes,
      steps: getAllPaths(mediumBP).scenarios[1].steps
    },
    {
      id: '0668167b-9397-480a-ba19-b5823a5f3e26',
      workflow_id: 'c6652885-27c3-44da-80ad-f9b1a44a735e',
      name: getAllPaths(mediumBP).scenarios[2].name,
      nodes: getAllPaths(mediumBP).scenarios[2].nodes,
      steps: getAllPaths(mediumBP).scenarios[2].steps
    },
    {
      id: 'ec28fdfa-78ed-427e-90e1-33b843ce5672',
      workflow_id: 'c6652885-27c3-44da-80ad-f9b1a44a735e',
      name: getAllPaths(mediumBP).scenarios[3].name,
      nodes: getAllPaths(mediumBP).scenarios[3].nodes,
      steps: getAllPaths(mediumBP).scenarios[3].steps
    },
    {
      id: 'e5873c93-e2c5-4df8-a882-33e736c67af7',
      workflow_id: '8bd8a5d6-4cd2-49df-83a0-084a9d244b09',
      name: getAllPaths(loopSimpleBP).scenarios[0].name,
      nodes: getAllPaths(loopSimpleBP).scenarios[0].nodes,
      steps: getAllPaths(loopSimpleBP).scenarios[0].steps
    },
    {
      id: '7dedcd69-7bbb-4617-bebd-3b277f79088a',
      workflow_id: '8bd8a5d6-4cd2-49df-83a0-084a9d244b09',
      name: getAllPaths(loopSimpleBP).scenarios[1].name,
      nodes: getAllPaths(loopSimpleBP).scenarios[1].nodes,
      steps: getAllPaths(loopSimpleBP).scenarios[1].steps
    },
    {
      id: '48d07ca7-925e-42ed-a143-9b3f15808cf7',
      workflow_id: '8bd8a5d6-4cd2-49df-83a0-084a9d244b09',
      name: getAllPaths(loopSimpleBP).scenarios[2].name,
      nodes: getAllPaths(loopSimpleBP).scenarios[2].nodes,
      steps: getAllPaths(loopSimpleBP).scenarios[2].steps
    },
    {
      id: '7f5c9def-c2c2-4d05-a879-5e42d29950fa',
      workflow_id: '8bd8a5d6-4cd2-49df-83a0-084a9d244b09',
      name: getAllPaths(loopSimpleBP).scenarios[3].name,
      nodes: getAllPaths(loopSimpleBP).scenarios[3].nodes,
      steps: getAllPaths(loopSimpleBP).scenarios[3].steps
    },
    {
      id: '349bacd5-9cef-47ed-86c6-19c3e866b63d',
      workflow_id: '8bd8a5d6-4cd2-49df-83a0-084a9d244b09',
      name: getAllPaths(loopSimpleBP).scenarios[4].name,
      nodes: getAllPaths(loopSimpleBP).scenarios[4].nodes,
      steps: getAllPaths(loopSimpleBP).scenarios[4].steps
    },
    {
      id: 'd941100c-d768-4c92-8992-a77271d0f17b',
      workflow_id: '8bd8a5d6-4cd2-49df-83a0-084a9d244b09',
      name: getAllPaths(loopSimpleBP).scenarios[5].name,
      nodes: getAllPaths(loopSimpleBP).scenarios[5].nodes,
      steps: getAllPaths(loopSimpleBP).scenarios[5].steps
    },
    {
      id: 'd181c0e4-2567-4dd5-9327-a9a83c670e26',
      workflow_id: '6732c89f-3c98-4137-8d83-971ff5b00f92',
      name: getAllPaths(loopMediumBP).scenarios[0].name,
      nodes: getAllPaths(loopMediumBP).scenarios[0].nodes,
      steps: getAllPaths(loopMediumBP).scenarios[0].steps
    },
    {
      id: 'cd0f1759-aa28-4374-a4bf-036adaaa1d90',
      workflow_id: '6732c89f-3c98-4137-8d83-971ff5b00f92',
      name: getAllPaths(loopMediumBP).scenarios[1].name,
      nodes: getAllPaths(loopMediumBP).scenarios[1].nodes,
      steps: getAllPaths(loopMediumBP).scenarios[1].steps
    },
    {
      id: '493264f5-e0dd-4140-867e-9931e042e75d',
      workflow_id: '6732c89f-3c98-4137-8d83-971ff5b00f92',
      name: getAllPaths(loopMediumBP).scenarios[2].name,
      nodes: getAllPaths(loopMediumBP).scenarios[2].nodes,
      steps: getAllPaths(loopMediumBP).scenarios[2].steps
    },
    {
      id: '1257a32e-c443-4ae4-bde7-40a3869ac64f',
      workflow_id: '6732c89f-3c98-4137-8d83-971ff5b00f92',
      name: getAllPaths(loopMediumBP).scenarios[3].name,
      nodes: getAllPaths(loopMediumBP).scenarios[3].nodes,
      steps: getAllPaths(loopMediumBP).scenarios[3].steps
    },
    {
      id: 'b11ebcb3-dc30-49df-b965-c3f0ba970d14',
      workflow_id: '6732c89f-3c98-4137-8d83-971ff5b00f92',
      name: getAllPaths(loopMediumBP).scenarios[4].name,
      nodes: getAllPaths(loopMediumBP).scenarios[4].nodes,
      steps: getAllPaths(loopMediumBP).scenarios[4].steps
    },
    {
      id: '2a9ae10c-5cce-42e1-81fd-93bc96f43a04',
      workflow_id: '6732c89f-3c98-4137-8d83-971ff5b00f92',
      name: getAllPaths(loopMediumBP).scenarios[5].name,
      nodes: getAllPaths(loopMediumBP).scenarios[5].nodes,
      steps: getAllPaths(loopMediumBP).scenarios[5].steps
    },
    {
      id: '08ce889b-4221-4273-aa92-c25f852fcca5',
      workflow_id: '6732c89f-3c98-4137-8d83-971ff5b00f92',
      name: getAllPaths(loopMediumBP).scenarios[6].name,
      nodes: getAllPaths(loopMediumBP).scenarios[6].nodes,
      steps: getAllPaths(loopMediumBP).scenarios[6].steps
    },
    {
      id: '4fa50c7d-a294-4f65-b682-99086223ed80',
      workflow_id: '6732c89f-3c98-4137-8d83-971ff5b00f92',
      name: getAllPaths(loopMediumBP).scenarios[7].name,
      nodes: getAllPaths(loopMediumBP).scenarios[7].nodes,
      steps: getAllPaths(loopMediumBP).scenarios[7].steps
    },
    {
      id: 'ebe338d0-a5e7-474d-aed9-f39842bc2cb0',
      workflow_id: 'ea7745df-5bae-4c61-bbf2-6d353851b8ff',
      name: getAllPaths(averageBP).scenarios[0].name,
      nodes: getAllPaths(averageBP).scenarios[0].nodes,
      steps: getAllPaths(averageBP).scenarios[0].steps
    },
    {
      id: '495e5362-e568-4e79-8f8a-b959977085e1',
      workflow_id: 'ea7745df-5bae-4c61-bbf2-6d353851b8ff',
      name: getAllPaths(averageBP).scenarios[1].name,
      nodes: getAllPaths(averageBP).scenarios[1].nodes,
      steps: getAllPaths(averageBP).scenarios[1].steps
    },
    {
      id: '2d6cc5ea-4633-43c0-9213-e3578cf20d57',
      workflow_id: 'ea7745df-5bae-4c61-bbf2-6d353851b8ff',
      name: getAllPaths(averageBP).scenarios[2].name,
      nodes: getAllPaths(averageBP).scenarios[2].nodes,
      steps: getAllPaths(averageBP).scenarios[2].steps
    },
    {
      id: '805af65b-0547-4d15-9296-19bc592c59fe',
      workflow_id: 'ea7745df-5bae-4c61-bbf2-6d353851b8ff',
      name: getAllPaths(averageBP).scenarios[3].name,
      nodes: getAllPaths(averageBP).scenarios[3].nodes,
      steps: getAllPaths(averageBP).scenarios[3].steps
    },
    {
      id: 'e51878c3-3748-46ff-ad5a-3959e9d86089',
      workflow_id: 'ea7745df-5bae-4c61-bbf2-6d353851b8ff',
      name: getAllPaths(averageBP).scenarios[4].name,
      nodes: getAllPaths(averageBP).scenarios[4].nodes,
      steps: getAllPaths(averageBP).scenarios[4].steps
    },
    {
      id: 'c8fd07d1-eeb4-4451-87bc-6c7bfc244e7d',
      workflow_id: 'ea7745df-5bae-4c61-bbf2-6d353851b8ff',
      name: getAllPaths(averageBP).scenarios[5].name,
      nodes: getAllPaths(averageBP).scenarios[5].nodes,
      steps: getAllPaths(averageBP).scenarios[5].steps
    },
    {
      id: '51a27df4-e9cb-4d22-84c4-2b042c8dd9a8',
      workflow_id: 'ea7745df-5bae-4c61-bbf2-6d353851b8ff',
      name: getAllPaths(averageBP).scenarios[6].name,
      nodes: getAllPaths(averageBP).scenarios[6].nodes,
      steps: getAllPaths(averageBP).scenarios[6].steps
    },
    {
      id: 'cd82877d-c53a-4d78-9650-9066dbd77f94',
      workflow_id: 'ea7745df-5bae-4c61-bbf2-6d353851b8ff',
      name: getAllPaths(averageBP).scenarios[7].name,
      nodes: getAllPaths(averageBP).scenarios[7].nodes,
      steps: getAllPaths(averageBP).scenarios[7].steps
    },
    {
      id: 'ca29e717-d181-4b5f-a137-b33643fcf8c3',
      workflow_id: 'ea7745df-5bae-4c61-bbf2-6d353851b8ff',
      name: getAllPaths(averageBP).scenarios[8].name,
      nodes: getAllPaths(averageBP).scenarios[8].nodes,
      steps: getAllPaths(averageBP).scenarios[8].steps
    }
  ]);
};
