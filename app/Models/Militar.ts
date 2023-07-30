import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import UserInfo from './UserInfo'
import Unidade from './Unidade'

export default class Militar extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public patente: string

  @column()
  public militar_nip: number
  @column()
  public medido_id: number
  @column()
  public user_info_id: number
  @column()
  public unidade_id: number

  @belongsTo(() => UserInfo, {
    foreignKey: 'user_info_id',
  })
  public user_info: BelongsTo<typeof UserInfo>

  @belongsTo(() => Unidade, {
    foreignKey: 'unidade_id',
  })
  public unidade: BelongsTo<typeof Unidade>
}
