import Factory from '@ioc:Adonis/Lucid/Factory'
import Admin from 'App/Models/Admin'

export const AdminFactory = Factory
  .define(Admin, ({ faker }) => {
    return {
      email: faker.internet.userName(),
      password: faker.internet.password(),
      date_cad: faker.name.jobDescriptor(),
    }
  })
  .build()
