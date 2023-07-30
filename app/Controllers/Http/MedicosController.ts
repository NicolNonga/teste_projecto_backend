import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from 'App/Models/User'
import UserInfo from 'App/Models/UserInfo'
import { rules, schema } from '@ioc:Adonis/Core/Validator'
import Database from '@ioc:Adonis/Lucid/Database'
import Medico from 'App/Models/Medico'
export default class MedicosController {
  public async create({ request, response }: HttpContextContract) {
    const validations = await schema.create({
      email: schema.string({}, [rules.email(), rules.unique({ table: 'users', column: 'email' })]),
      password: schema.string({}, [rules.confirmed()]),
      user_type: schema.enum(['admin', 'medico', 'paciente', 'militar']),
      username: schema.string({}, [rules.unique({ table: 'users', column: 'email' })]),
      name: schema.string(),
      date_birth: schema.string(),
      especilidade_id: schema.number(),
      telefone: schema.string(),
      bi: schema.string(),
      sex: schema.string(),
      residence: schema.string(),
      funcao: schema.string(),
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

        await Medico.create(
          {
            funcao: data.funcao,
            especilidade_id: data.especilidade_id,
            user_info_id: userInfos.id,
          },
          trx
        )
        trx.commit()

        return response.created(userInfos)
      } catch (error) {
        console.log(error)
        trx.rollback()
      }
    })
  }

  public async index({ response }: HttpContextContract) {
    const data = await Medico.query()
      .preload('especialidade')
      .preload('user_info', (builder) => {
        builder.preload('user')
      })
      .orderBy('created_at', 'desc')

    response.ok(data)
  }
}
