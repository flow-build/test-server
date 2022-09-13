exports.up = function (knex) {
  return knex.schema.createTable("scenarios", (table) => {
    table.uuid("id").primary();
    table.uuid("workflow_id").notNullable().unique();
    table.string("total_scenarios", 255).notNullable();
    table.jsonb("scenarios").notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("scenarios");
};
