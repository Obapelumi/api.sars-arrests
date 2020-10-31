import { DateTime } from "luxon";
import {
  BaseModel,
  column,
  HasMany,
  hasMany,
  scope
} from "@ioc:Adonis/Lucid/Orm";
import Database from "@ioc:Adonis/Lucid/Database";
import ArrestLog from "./ArrestLog";

export default class Arrest extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public details: string;

  @column()
  public location: string;

  @column()
  public officer: string;

  @column()
  public twitterAccount: number;

  @column()
  public tweetId: number;

  @column()
  public tweetReplyId: number;

  @column()
  public arrestStatusId: number;

  @column()
  public createdBy: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  /**
   * Relationships
   */
  @hasMany(() => ArrestLog, {
    onQuery: (query) => (query.isRelatedQuery ? query.preload("status") : query)
  })
  public logs: HasMany<typeof ArrestLog>;

  /**
   * Scopes
   */

  public static statuses = scope((query, statuses: Array<string>) => {
    if (statuses.length < 1) return query;

    const statusQuery = Database.from("arrest_statuses")
      .whereIn("code", statuses)
      .select("id");
    return query.whereIn("arrest_status_id", statusQuery);
  });
}
