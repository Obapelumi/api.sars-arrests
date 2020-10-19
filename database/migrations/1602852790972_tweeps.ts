import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class Tweeps extends BaseSchema {
  protected tableName = "tweeps";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table.bigInteger("twitter_account").nullable();
      table.string("twitter_handle", 50).nullable();
      table.text("token").nullable();
      table.text("token_secret").nullable();
      table
        .integer("user_id")
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
