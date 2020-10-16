import { DateTime } from "luxon";
import { BaseModel, column, belongsTo, BelongsTo } from "@ioc:Adonis/Lucid/Orm";
import ArrestStatus from "./ArrestStatus";
import Arrest from "./Arrest";

export default class ConsultationLog extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public commentId: number;

  @column()
  public createdBy: number;

  @column()
  public consultationId: number;

  @column()
  public consultationStatusId: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  /**
   * Relationships
   */

  @belongsTo(() => Arrest)
  public consultation: BelongsTo<typeof Arrest>;

  @belongsTo(() => ArrestStatus)
  public status: BelongsTo<typeof ArrestStatus>;
}
