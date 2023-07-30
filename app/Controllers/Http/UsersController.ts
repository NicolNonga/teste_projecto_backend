import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import UserInfo from 'App/Models/UserInfo'
import { rules, schema } from '@ioc:Adonis/Core/Validator'
import Database from '@ioc:Adonis/Lucid/Database'

export default class UsersController {
  public async create({ request, response }: HttpContextContract) {
    const validations = await schema.create({
      email: schema.string({}, [rules.email(), rules.unique({ table: 'users', column: 'email' })]),
      password: schema.string({}, [rules.confirmed()]),
      user_type: schema.enum(['admin', 'medico', 'paciente', 'militar']),
      username: schema.string({}, [rules.unique({ table: 'users', column: 'email' })]),
    })

    await Database.transaction(async (trx) => {
      try {
        const data = await request.validate({ schema: validations })
        const user = await User.create({
          user_type: data.user_type,
          email: data.email,
          password: data.password,
          username: data.username,
        })

        return response.created(user)
      } catch (error) {
        trx.rollback()
      }
    })
  }

  public async getPaciente({ request, response, params }: HttpContextContract) {
    const { userId } = params

    const userInfo = await UserInfo.query().where('user_id', userId).preload('paceinte').first()

    return response.ok(userInfo)
  }

  public async getMedico({ request, response, params }: HttpContextContract) {
    const { userId } = params

    const userInfo = await UserInfo.query().where('user_id', userId).preload('medico').first()

    return response.ok(userInfo)
  }
}
