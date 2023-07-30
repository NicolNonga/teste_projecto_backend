import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UserInfos extends BaseSchema {
  protected tableName = 'user_infos'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().notNullable().references('id').inTable('users')
      table.string('nome').notNullable()
      table.dateTime('data_nascimento')
      table.string('sexo')
      table.string('residencia')
      table.string('bi').notNullable()
      table.string('telefone').notNullable()
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
