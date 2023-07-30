import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UserSetEnums extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.enum('user_type', ['admin', 'medico', 'paciente']).notNullable()
      table.string('username').notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
