import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Medicos extends BaseSchema {
  protected tableName = 'medicos'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('funcao').notNullable()
      table
        .integer('especilidade_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('especilidades')
      table.integer('user_info_id').unsigned().notNullable().references('id').inTable('user_infos')
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
