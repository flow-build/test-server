exports.up = function (knex) {
  return knex.schema.createTable("paths", (table) => {
    table.uuid("id").primary();
    table.uuid("workflow_id").notNullable();
    table.string("workflow_name", 255).notNullable();
    table.string("name", 255).notNullable();
    table.specificType("nodes", "text ARRAY").notNullable();
    table.integer("steps").notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("paths");
};
