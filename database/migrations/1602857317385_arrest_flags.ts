import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class ArrestFlags extends BaseSchema {
  protected tableName = "arrest_flags";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table
        .integer("arrest_id")
        .unsigned()
        .references("id")
        .inTable("arrests")
        .nullable()
        .onDelete("CASCADE");
      table
        .integer("comment_id")
        .unsigned()
        .references("id")
        .inTable("comments")
        .nullable()
        .onDelete("CASCADE");
      table.timestamps(true, true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
