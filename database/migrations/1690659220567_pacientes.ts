import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Pacientes extends BaseSchema {
  protected tableName = 'pacientes'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('militar_id').unsigned().notNullable().references('id').inTable('militars')
      table.integer('user_info_id').unsigned().notNullable().references('id').inTable('user_infos')
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
