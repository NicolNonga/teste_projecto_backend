import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, HasOne, belongsTo, column, hasOne } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Paciente from './Paciente'
import Medico from './Medico'

export default class UserInfo extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public user_id: number
  @column()
  public nome: string
  @column()
  public data_nascimento: Date
  @column()
  public especialidade: string
  @column()
  public patente: string
  @column()
  public sexo: string
  @column()
  public telefone: string
  @column()
  public bi: string

  @column()
  public residencia: string
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => User, {
    foreignKey: 'user_id',
  })
  public user: BelongsTo<typeof User>

  @hasOne(() => Paciente, {
    foreignKey: 'user_info_id',
  })
  public paceinte: HasOne<typeof Paciente>

  @hasOne(() => Medico, {
    foreignKey: 'user_info_id',
  })
  public medico: HasOne<typeof Medico>
}
