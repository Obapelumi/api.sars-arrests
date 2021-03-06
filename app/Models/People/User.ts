import { DateTime } from "luxon";
import Hash from "@ioc:Adonis/Core/Hash";
import {
  column,
  beforeSave,
  BaseModel,
  hasMany,
  HasMany,
  hasOne,
  HasOne
} from "@ioc:Adonis/Lucid/Orm";
import Arrest from "../Reports/Arrest";
import Tweep from "../Tweep";

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public active: boolean;

  @column()
  public name: string;

  @column()
  public email: string;

  @column()
  public phone: string;

  @column()
  public avatar: string;

  @column()
  public twitterAccount: number;

  @column()
  public password: string;

  @column()
  public rememberMeToken?: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password);
    }
  }

  /**
   * Relationships
   */
  @hasMany(() => Arrest)
  public arrests: HasMany<typeof Arrest>;

  @hasOne(() => Tweep)
  public tweep: HasOne<typeof Tweep>;
}
