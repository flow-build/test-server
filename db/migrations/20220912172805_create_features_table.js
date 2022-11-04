exports.up = function (knex) {
  return knex.schema.createTable("features", (table) => {
    table.uuid("id").primary();
    table.string("workflow_name", 255).notNullable();
    table.unique(["workflow_name"]);
    table.string("name", 255).notNullable();
    table.text("file", "longtext").notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("features");
};
