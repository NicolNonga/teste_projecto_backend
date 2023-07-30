import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class GrauParentescos extends BaseSchema {
  protected tableName = 'grau_parentescos'

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
