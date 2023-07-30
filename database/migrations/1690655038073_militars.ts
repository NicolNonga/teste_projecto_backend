import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Militars extends BaseSchema {
  protected tableName = 'militars'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('patente', 45).notNullable()

      table.integer('militar_nip').notNullable()

      table.integer('medico_id').unsigned().nullable().references('id').inTable('medicos')
      table.integer('user_info_id').unsigned().notNullable().references('id').inTable('user_infos')
      table.integer('unidade_id').unsigned().notNullable().references('id').inTable('unidades')
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
