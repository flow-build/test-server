exports.up = function (knex) {
  return knex.schema.createTable("tests", (table) => {
    table.uuid("id").primary();
    table.uuid("workflow_id").notNullable();
    table.jsonb("test_report").notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("tests");
};
