import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import UserInfo from './UserInfo'
import Militar from './Militar'
import GrauParentesco from './GrauParentesco'

export default class Paciente extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column()
  public militar_id: number
  @column()
  public user_info_id: number
  @column()
  public grau_parentesco_id: number

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => UserInfo, {
    foreignKey: 'user_info_id',
  })
  public user_info: BelongsTo<typeof UserInfo>


  @belongsTo(() => Militar, {
    foreignKey: 'militar_id',
  })
  public militar: BelongsTo<typeof Militar>


  @belongsTo(() => GrauParentesco, {
    foreignKey: 'grau_parentesco_id',
  })
  public grau: BelongsTo<typeof GrauParentesco>
}
