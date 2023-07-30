import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Militars extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.enum('user_type', ['admin', 'medico', 'paciente', 'militar']).alter()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
