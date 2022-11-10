const parser = require('gherkin-parse');
const featureSimpleBP = parser.convertFeatureFileToJSON('./db/seeds/features/simpleBP.feature');
const simpleBP = require('./blueprints/simpleBP');
const featureMediumBP = parser.convertFeatureFileToJSON('./db/seeds/features/mediumBP.feature');
const mediumBP = require('./blueprints/mediumBP');
const featureAverageBP = parser.convertFeatureFileToJSON('./db/seeds/features/averageBP.feature');
const averageBP = require('./blueprints/averageBP');


exports.seed = async function(knex) {
  await knex("features").del();
  await knex("features").insert([
    {
      id: '0bbed45c-59e9-4e9a-80af-8d8ae83dbe55',
      workflow_name: simpleBP.name,
      name: featureSimpleBP.feature.name,
      feature: featureSimpleBP.feature
    },
    {
      id: '080ae1b5-f849-476a-b2a3-d17afdd7ba28',
      workflow_name: mediumBP.name,
      name: featureMediumBP.feature.name,
      feature: featureMediumBP.feature
    },
    {
      id: '86923b7b-8dce-4284-8b64-aaee1cee0ae2',
      workflow_name: averageBP.name,
      name:featureAverageBP.feature.name,
      feature: featureAverageBP.feature
    }
  ])
}