import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Especilidades extends BaseSchema {
  protected tableName = 'especilidades'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('designacao').notNullable()
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
