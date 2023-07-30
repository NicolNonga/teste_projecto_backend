import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Especilidade from './Especilidade'
import UserInfo from './UserInfo'

export default class Medico extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column()
  public funcao: string
  @column()
  public especilidade_id: number
  @column()
  public user_info_id: number
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Especilidade, {
    foreignKey: 'especilidade_id',
  })
  public especialidade: BelongsTo<typeof Especilidade>

  @belongsTo(() => UserInfo, {
    foreignKey: 'user_info_id',
  })
  public user_info: BelongsTo<typeof UserInfo>
}
