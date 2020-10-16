import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class TweepUsers extends BaseSchema {
  protected tableName = "tweep_user";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table
        .integer("tweep_id")
        .unsigned()
        .references("id")
        .inTable("tweeps")
        .nullable()
        .onDelete("CASCADE");
      table
        .integer("user_id")
        .unsigned()
        .references("id")
        .inTable("users")
        .nullable()
        .onDelete("CASCADE");
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
