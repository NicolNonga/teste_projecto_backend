import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Especilidade from 'App/Models/Especilidade'

export default class EspecilidadesController {
  public async create({ request, response }: HttpContextContract) {
    const { designacao } = request.only(['designacao'])

    Database.transaction(async (trx) => {
      try {
        await Especilidade.create({
          designacao,
        })
        trx.commit()

        return response.send({
          message: 'especialidade criado',
          code: 200,
        })
      } catch (error) {}
    })
  }

  public async index({ response }: HttpContextContract) {
    const data = await Especilidade.query().orderBy('created_at', 'desc')

    response.ok(data)
  }
}
