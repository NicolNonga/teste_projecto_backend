import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import { EstadoConsulta } from 'Contracts/enums'

export default class Consultas extends BaseSchema {
  protected tableName = 'consultas'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .enum('estado_consulta', ['pendente', 'aceite', 'rejeitado', 'concluida'])
        .defaultTo(EstadoConsulta.Pendente)
      table.integer('paciente_id').unsigned().notNullable().references('id').inTable('pacientes')
      table.integer('medico_id').unsigned().nullable().references('id').inTable('medicos')
      table.dateTime('data_consulta')
      table.string('tipo')
      table.text('observacao').nullable()
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
