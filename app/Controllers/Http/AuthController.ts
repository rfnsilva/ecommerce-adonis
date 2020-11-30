import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

// import Admin from 'App/Models/Admin'

export default class AdminsController {

  public async login({ request, auth }: HttpContextContract) {
    const { email, password } = request.post()

    const token = await auth.use('api').attempt(email, password)

    return token.toJSON()
  }

}
