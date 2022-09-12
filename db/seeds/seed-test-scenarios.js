const verySimpleBP = require('./blueprints/verySimpleBP');
const simpleBP = require('./blueprints/simpleBP');
const mediumBP = require('./blueprints/mediumBP');
const loopSimpleBP = require('./blueprints/loopSimpleBP');
const loopMediumBP = require('./blueprints/loopMediumBP');
const averageBP = require('./blueprints/averageBP');
const loopMultipleBP = require('./blueprints/loopMultipleBP');
const { getAllPaths } = require('@flowbuild/test-core');

exports.seed = async function(knex) {
  await knex("scenarios").del();
  await knex("scenarios").insert([
    {
      id: '218f5b5a-6024-4ec4-a5da-639d516bad2d',
      workflow_id: '8a126b08-f5e2-48a8-b913-d201ac6ca409',
      total_scenarios: getAllPaths(verySimpleBP).totalScenarios,
      scenarios: JSON.stringify(getAllPaths(verySimpleBP).scenarios)
    },
    {
      id: '38e1d039-39c1-4a48-adb3-736eee1d771e',
      workflow_id: '198b620d-f344-4241-bd3a-f015fe9feb4f',
      total_scenarios: getAllPaths(simpleBP).totalScenarios,
      scenarios: JSON.stringify(getAllPaths(simpleBP).scenarios)
    },
    {
      id: 'ac5f6b5a-97f4-4f34-a9df-849b888a376c',
      workflow_id: 'c6652885-27c3-44da-80ad-f9b1a44a735e',
      total_scenarios: getAllPaths(mediumBP).totalScenarios,
      scenarios: JSON.stringify(getAllPaths(mediumBP).scenarios)
    },
    {
      id: 'e5873c93-e2c5-4df8-a882-33e736c67af7',
      workflow_id: '8bd8a5d6-4cd2-49df-83a0-084a9d244b09',
      total_scenarios: getAllPaths(loopSimpleBP).totalScenarios,
      scenarios: JSON.stringify(getAllPaths(loopSimpleBP).scenarios)
    },
    {
      id: 'd181c0e4-2567-4dd5-9327-a9a83c670e26',
      workflow_id: '6732c89f-3c98-4137-8d83-971ff5b00f92',
      total_scenarios: getAllPaths(loopMediumBP).totalScenarios,
      scenarios: JSON.stringify(getAllPaths(loopMediumBP).scenarios)
    },
    {
      id: 'ebe338d0-a5e7-474d-aed9-f39842bc2cb0',
      workflow_id: 'ea7745df-5bae-4c61-bbf2-6d353851b8ff',
      total_scenarios: getAllPaths(averageBP).totalScenarios,
      scenarios: JSON.stringify(getAllPaths(averageBP).scenarios)
    },
    {
      id: '6b8939fe-49f9-449d-80f5-f13c31ffd5ce',
      workflow_id: 'ed7e216e-95b8-4874-98e6-b008c6f9dc04',
      total_scenarios: getAllPaths(loopMultipleBP).totalScenarios,
      scenarios: JSON.stringify(getAllPaths(loopMultipleBP).scenarios)
    },
  ]);
};
