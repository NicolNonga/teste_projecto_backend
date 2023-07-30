import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Consulta from 'App/Models/Consulta'

export default class ConsultasController {
  public async create({ request, response }: HttpContextContract) {
    const payload = request.only(['paciente_id', 'data_consulta', 'tipo', 'observacao'])
    const consulta = await Consulta.create(payload)

    return response.status(200).send({ message: 'criado', data: consulta })
  }

  public async getByPaciente({ request, response, params }: HttpContextContract) {
    const { pacienteId } = params
    const consulta = await Consulta.query().where('paciente_id', pacienteId)

    return response.ok(consulta)
  }

  public async index({ request, response, params }: HttpContextContract) {
    const consulta = await Consulta.query()
      .preload('paciente', (builder) => {
        builder.preload('user_info')
      })
      .preload('medico', (builder) => {
        builder.preload('user_info')
      })
      .orderBy('created_at', 'desc')
    return response.ok(consulta)
  }

  public async update({ request, response, params }: HttpContextContract) {
    const { consultaId } = params
    const { estado } = request.only(['estado'])
    await Consulta.query().where('id', consultaId).update({
      estado_consulta: estado,
    })

    return response.status(200).send({ message: 'Actualizado' })
  }

  public async adicionarMedico({ request, response, params }: HttpContextContract) {
    const { consultaId } = params
    const { medicoId } = request.only(['medicoId'])

    await Consulta.query().where('id', consultaId).update({
      medico_id: medicoId,
    })

    return response.status(200).send({ message: 'Actualizado' })
  }

  public async getByMedico({ request, response, params }: HttpContextContract) {
    const { medicoId } = params
    const consulta = await Consulta.query()
      .where('medico_id', medicoId)
      .preload('paciente', (builder) => {
        builder.preload('user_info')
      })

    return response.ok(consulta)
  }
}
