import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class TwitterTokens extends BaseSchema {
  protected tableName = "twitter_tokens";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table.string("request_token").nullable();
      table.string("request_secret").nullable();
      table.timestamps(true, true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
