import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Paciente from './Paciente'
import Medico from './Medico'

export default class Consulta extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public estado_consulta: string
  @column()
  public observacao: string
  @column()
  public tipo: string
  @column()
  public paciente_id: number

  @column()
  public medico_id: number

  @column()
  public data_consulta: DateTime

  @belongsTo(() => Paciente, {
    foreignKey: 'paciente_id',
  })
  public paciente: BelongsTo<typeof Paciente>

  @belongsTo(() => Medico, {
    foreignKey: 'medico_id',
  })
  public medico: BelongsTo<typeof Medico>
}
