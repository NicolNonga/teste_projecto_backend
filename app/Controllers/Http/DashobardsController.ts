import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Consulta from 'App/Models/Consulta'
import Medico from 'App/Models/Medico'
import Paciente from 'App/Models/Paciente'

export default class DashobardsController {
  public async index({ request, response }: HttpContextContract) {
    const totalPaciente = await Paciente.query().count(' * as total')
    const totalMedicos = await Medico.query().count(' * as total')
    const totalConsulta = await Consulta.query().count(' * as total')

    return response.ok({
      totalConsulta,
      totalMedicos,
      totalPaciente,
    })
  }
}
