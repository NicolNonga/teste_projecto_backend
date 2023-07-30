import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AddGrauParentescos extends BaseSchema {
  protected tableName = 'pacientes'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table
        .integer('grau_parentesco_id')
        .unsigned()
        .nullable()
        .references('id')
        .inTable('grau_parentescos')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
