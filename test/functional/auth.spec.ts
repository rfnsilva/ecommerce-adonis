import test from 'japa'
import execa from 'execa'
import Database from '@ioc:Adonis/Lucid/Database'
import supertest from 'supertest'

import { AdminFactory } from 'Database/factories'
// import { Ace } from '@adonisjs/core/build/src/Ignitor/Ace'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

test.group('authentication', (group) => {
  group.afterEach(async () => {
    await execa.node('ace', ['migration:rollback'], {
      stdio: 'inherit',
    })
  })
  group.beforeEach(async () => {
    await execa.node('ace', ['migration:run'], {
      stdio: 'inherit',
    })
  })

  test('login admin', async (assert) => {
    const email = 'admin'
    const password = '12345678'

    await AdminFactory.merge({ email: email, password: password }).create()

    const { body: { token } } = await supertest(BASE_URL)
      .post(`/loginAdmin`)
      .send({ email: email, password: password })

    assert.exists(token)
  })
})
