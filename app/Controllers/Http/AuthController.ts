import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class AuthController {
  public async login({ auth, request, response }: HttpContextContract) {
    const { email, password } = request.only(['email', 'password'])
    const user = await User.query().where('email', email).first()

    try {
      const token = await auth.use('api').attempt(email, password)
      return response.ok({
        token,
        user,
      })
    } catch (error) {
      return response.status(401).send({ message: 'Senha Ou Email invalido' })
    }
  }
}
