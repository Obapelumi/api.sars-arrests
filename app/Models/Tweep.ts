import { DateTime } from "luxon";
import { BaseModel, BelongsTo, belongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import User from "./People/User";

export default class Tweep extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public twitterAccount: number;

  @column()
  public twitterHandle: string;

  @column()
  public token: string;

  @column()
  public tokenSecret: string;

  @column()
  public userId: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  /**
   * Relationships
   */
  @belongsTo(() => User)
  public user: BelongsTo<typeof User>;
}
