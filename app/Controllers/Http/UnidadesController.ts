import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Unidade from 'App/Models/Unidade'
import Database from '@ioc:Adonis/Lucid/Database'

export default class UnidadesController {
  public async create({ request, response }: HttpContextContract) {
    const { designacao } = request.only(['designacao'])

    Database.transaction(async (trx) => {
      try {
        await Unidade.create({
          designacao,
        })
        trx.commit()

        return response.ok({ message: 'Unidade Cadastrado' })
      } catch (error) {}
    })
  }

  public async index({ response }: HttpContextContract) {
    const data = await Unidade.query().orderBy('created_at', 'desc')

    response.ok(data)
  }
}
