import test from 'japa'
import execa from 'execa'
import Database from '@ioc:Adonis/Lucid/Database'
import supertest from 'supertest'

import { AdminFactory } from 'Database/factories'
// import { Ace } from '@adonisjs/core/build/src/Ignitor/Ace'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

test.group('admin', (group) => {
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

  test('create admin', async (assert) => {
    const email = 'admin'
    const password = '12345678'
    const date_cad = '2020/11/29'

    const admin = await supertest(BASE_URL)
      .post(`/createAdmin`)
      .send({ email: email, password: password, date_cad: date_cad })

    assert.equal(admin.status, 201)
    assert.exists(admin.body)
  })

  test('get admin by email', async (assert) => {
    const email = 'admin'

    await AdminFactory.merge({ email: email}).create()

    const admin = await supertest(BASE_URL)
      .get(`/getAdmin/${email}`)
      .send({ email: email })

    assert.equal(admin.status, 200)
    assert.exists(admin.body.email)
    assert.exists(admin.body.date_cad)
  })
})
