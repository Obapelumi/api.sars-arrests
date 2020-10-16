import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class ArrestLogs extends BaseSchema {
  protected tableName = "arrest_logs";

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
      table
        .integer("created_by")
        .unsigned()
        .references("id")
        .inTable("users")
        .nullable()
        .onDelete("CASCADE");
      table
        .integer("arrest_status_id")
        .unsigned()
        .references("id")
        .inTable("arrest_statuses")
        .nullable()
        .onDelete("CASCADE");
      table.timestamps();
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
