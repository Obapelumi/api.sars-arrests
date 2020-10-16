import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class ArrestStatuses extends BaseSchema {
  protected tableName = "arrest_statuses";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table.string("name").nullable();
      table.string("code").nullable();
      table.boolean("active").defaultTo(true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
