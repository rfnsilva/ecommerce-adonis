import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Mail from '@ioc:Adonis/Addons/Mail'
import { randomBytes } from 'crypto'
import { promisify } from 'util'

import Admin from 'App/Models/Admin'

export default class AdminsController {
  public async forgotAdmin({ request, response }: HttpContextContract) {
    const { email } = request.post()

    const admin = await Admin.findBy('email', email)

    if(!admin){
      return response.status(400).send({error: 'admin/email não encontrado'})
    }

    const random = await promisify(randomBytes)(24)
    // const token = await Admin.tokens()

    Mail.send((message) => {
      message
        .from('ricardo@example.com')
        .to(admin.email)
        .subject('Teste recuperação de senha')
        .htmlView('emails/forgotEmail', { admin })
    })
  }
}
