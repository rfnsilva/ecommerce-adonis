import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Admin from 'App/Models/Admin'

export default class AdminsController {

  public async create({ request, response }: HttpContextContract) {
    const { email, password, date_cad } = request.post()

    const admin = await Admin.create({email, password, date_cad })

    return response.status(201).send(admin)
  }

  public async getByEmail({ params, response }: HttpContextContract) {
    const email = params.email

    const admin = await Admin.findBy('email', email)

    return response.status(200).send(admin)
  }

}
