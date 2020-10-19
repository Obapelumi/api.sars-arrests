import { DateTime } from "luxon";
import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class TwitterToken extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public requestToken: string;

  @column()
  public requestSecret: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
