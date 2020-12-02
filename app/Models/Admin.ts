import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import {
  column,
  beforeSave,
  BaseModel,
  hasOne,
  HasOne
} from '@ioc:Adonis/Lucid/Orm'

export default class Admin extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public email: string

  @column()
  public password: string

  @column()
  public office: string

  @column()
  public status: string

  @column()
  public date_cad: string

  @column()
  public rememberMeToken?: string

  // @hasOne(() => Token)
  // public token: HasOne<typeof Token>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword (admin: Admin) {
    if (admin.$dirty.password) {
      admin.password = await Hash.make(admin.password)
    }
  }
}
