import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Mail from '@ioc:Adonis/Addons/Mail'
import * as bcrypt from 'phc-bcrypt'

import Admin from 'App/Models/Admin'

export default class AdminsController {

  public async loginAdmin({ request, response, auth }: HttpContextContract) {
    const { email, password } = request.post()

    const admin = await Admin.findBy('email', email)

    if(await bcrypt.verify(admin?.password, password)){
      const { token } = await auth.use('api').attempt(email, password)

      return { token }
    }

    return response.status(400).send({message: 'senhas diferentes.'})
  }

}
