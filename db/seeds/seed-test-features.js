const featureSimpleBP = require('fs').readFileSync('./db/seeds/features/simpleBP.feature', 'utf8');
const simpleBP = require('./blueprints/simpleBP');
const featureMediumBP = require('fs').readFileSync('./db/seeds/features/mediumBP.feature', 'utf8');
const mediumBP = require('./blueprints/mediumBP');
const featureAverageBP = require('fs').readFileSync('./db/seeds/features/averageBP.feature', 'utf8');
const averageBP = require('./blueprints/averageBP');


exports.seed = async function(knex) {
  await knex("features").del();
  await knex("features").insert([
    {
      id: '0bbed45c-59e9-4e9a-80af-8d8ae83dbe55',
      workflow_name: simpleBP.name,
      name: simpleBP.name,
      file: featureSimpleBP
    },
    {
      id: '080ae1b5-f849-476a-b2a3-d17afdd7ba28',
      workflow_name: mediumBP.name,
      name: mediumBP.name,
      file: featureMediumBP
    },
    {
      id: '86923b7b-8dce-4284-8b64-aaee1cee0ae2',
      workflow_name: averageBP.name,
      name: averageBP.name,
      file: featureAverageBP
    }
  ])
}