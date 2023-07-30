import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import GrauParentesco from 'App/Models/GrauParentesco'
export default class GrauParentescosController {
  public async create({ request, response }: HttpContextContract) {
    const { designacao } = request.only(['designacao'])

    Database.transaction(async (trx) => {
      try {
        await GrauParentesco.create({
          designacao,
        })
        trx.commit()

        return response.ok({ message: 'GrauParentesco Cadastrado' })
      } catch (error) {}
    })
  }

  public async index({ response }: HttpContextContract) {
    const data = await GrauParentesco.query().orderBy('created_at', 'desc')

    response.ok(data)
  }
}
