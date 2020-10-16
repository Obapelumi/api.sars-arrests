import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class Arrests extends BaseSchema {
  protected tableName = "arrests";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table.string("name").nullable();
      table.string("twitter_account").nullable();
      table.text("location").nullable();
      table.string("officer").nullable();
      table
        .integer("arrest_status_id")
        .unsigned()
        .references("id")
        .inTable("arrest_statuses")
        .nullable()
        .onDelete("CASCADE");
      table
        .integer("created_by")
        .unsigned()
        .references("id")
        .inTable("users")
        .nullable()
        .onDelete("CASCADE");
      table.timestamps(true, true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
