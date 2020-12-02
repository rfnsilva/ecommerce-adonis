import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Mail from '@ioc:Adonis/Addons/Mail'
import { randomBytes } from 'crypto'
import { promisify } from 'util'

import Database from '@ioc:Adonis/Lucid/Database'
import Admin from 'App/Models/Admin'

export default class AdminsController {
  public async forgotAdmin({ request, response }: HttpContextContract) {
    const { email } = request.post()

    const admin = await Admin.findBy('email', email)

    if(!admin){
      return response.status(400).send({error: 'admin/email não encontrado'})
    }

    const random = await promisify(randomBytes)(24)
    const token = random.toString('hex')

    await Database
      .insertQuery()
      .table('api_tokens')
      .insert({
        admins_id: admin.id,
        name: 'token forgot',
        type: 'forgot_password',
        token: token,
        expires_at: '1 days',
        created_at: new Date()
      })

    const urlResetPassword = `http://localhost:3000/token=${token}`

    Mail.send((message) => {
      message
        .from('ricardo@example.com')
        .to(admin.email)
        .subject('Teste recuperação de senha')
        .htmlView('emails/forgotEmail', { admin, urlResetPassword })
    })
  }
}
