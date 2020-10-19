import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class UsersSchema extends BaseSchema {
  protected tableName = "users";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id").primary();
      table.boolean("active").defaultTo(true);
      table.string("name").nullable();
      table.string("email").nullable();
      table.string("phone").nullable();
      table.string("avatar").nullable();
      table.bigInteger("twitter_account").nullable();
      table.string("password", 180).notNullable();
      table.string("remember_me_token").nullable();
      table.timestamps(true, true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
