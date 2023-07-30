import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import UserInfo from 'App/Models/UserInfo'
import { rules, schema } from '@ioc:Adonis/Core/Validator'
import Database from '@ioc:Adonis/Lucid/Database'
import Paciente from 'App/Models/Paciente'

export default class PacientesController {
  public async create({ request, response }: HttpContextContract) {
    const validations = await schema.create({
      email: schema.string({}, [rules.email(), rules.unique({ table: 'users', column: 'email' })]),
      password: schema.string({}, [rules.confirmed()]),
      user_type: schema.enum(['admin', 'medico', 'paciente', 'militar']),
      username: schema.string(),
      name: schema.string(),
      date_birth: schema.string(),
      telefone: schema.string(),
      bi: schema.string(),
      sex: schema.string(),
      residence: schema.string(),
      militar_id: schema.number(),
      grau_parentesco_id: schema.number(),
    })

    await Database.transaction(async (trx) => {
      try {
        const data = await request.validate({ schema: validations })

        const user = await User.create(
          {
            user_type: data.user_type,
            email: data.email,
            password: data.password,
            username: data.username,
          },
          trx
        )

        const userInfos = await UserInfo.create(
          {
            nome: data.name,
            data_nascimento: new Date(data.date_birth),
            user_id: user.id,
            sexo: data.sex,
            residencia: data.residence,
            telefone: data.telefone,
            bi: data.bi,
          },
          trx
        )

        await Paciente.create(
          {
            militar_id: data?.militar_id,
            user_info_id: userInfos?.id,
            grau_parentesco_id: data?.grau_parentesco_id,
          },
          trx
        )
        trx.commit()

        return response.created(userInfos)
      } catch (error) {
        console.log(error?.messages)
        trx.rollback()
        return response.badRequest({
          message: 'Não foi possivel concluir tenta mais tarde',
        })
      }
    })
  }

  public async index({ request, response }: HttpContextContract) {
    const data = await Paciente.query()
      .preload('user_info', (builder) => {
        builder.preload('user')
      })
      .preload('militar', (builder) => {
        builder.preload('user_info')
      })
      .preload('grau')
      .orderBy('created_at', 'desc')
    response.ok(data)
  }
}
