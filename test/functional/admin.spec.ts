import test from 'japa'
import Database from '@ioc:Adonis/Lucid/Database'
import supertest from 'supertest'

import { AdminFactory } from 'Database/factories'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

test.group('admin', (group) => {
  group.beforeEach(async () => {
    await Database.beginGlobalTransaction()
  })

  group.afterEach(async () => {
    await Database.rollbackGlobalTransaction()
  })

  test('create admin', async (assert) => {
    const admin = {
      email: 'admin',
      password: '12345678',
      date_cad: '12/12/2020'
    }

    const response = await supertest(BASE_URL)
      .post(`/createAdmin`)
      .send(admin)

    assert.equal(response.status, 201)
    assert.exists(response.body)
  })

  test('get admin by email', async (assert) => {
    const email = 'admin'

    await AdminFactory.merge({ email }).create()

    const response = await supertest(BASE_URL)
      .get(`/getAdmin/${email}`)
      .send({ email })

    assert.equal(response.status, 200)
    assert.exists(response.body.email)
    assert.exists(response.body.date_cad)
  })
})
