import test from 'japa'
import supertest from 'supertest'

import { AdminFactory } from 'Database/factories'
import Database from '@ioc:Adonis/Lucid/Database'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

test.group('session admin', (group) => {
  group.beforeEach(async () => {
    await Database.beginGlobalTransaction()
  })

  group.afterEach(async () => {
    await Database.rollbackGlobalTransaction()
  })

  test('session admin sucess', async (assert) => {
    const admin = {
      email: 'admin',
      password: '12345678'
    }

    await AdminFactory.merge(admin).create()

    const response = await supertest(BASE_URL)
      .post(`/loginAdmin`)
      .send(admin)

    assert.equal(response.status, 200)
    assert.exists(response.body.token)
  })

  test('session admin pass diferents', async (assert) => {
    const admin = {
      email: 'admin',
      password: '12345678'
    }

    await AdminFactory.merge(admin).create()

    const response = await supertest(BASE_URL)
      .post(`/loginAdmin`)
      .send({ email: admin.email, password: '1234567' })

    assert.equal(response.status, 400)
    assert.notExists(response.body.token)
  })
})
