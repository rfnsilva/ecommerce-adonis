import test from 'japa'
import supertest from 'supertest'

import { AdminFactory } from 'Database/factories'
import Database from '@ioc:Adonis/Lucid/Database'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

test.group('forgot admin', (group) => {
  // group.beforeEach(async () => {
  //   await Database.beginGlobalTransaction()
  // })

  // group.afterEach(async () => {
  //   await Database.rollbackGlobalTransaction()
  // })

  test.only('send email forgot password admin', async (assert) => {
    const email = 'admin'

    await AdminFactory.merge({ email }).create()

    const response = await supertest(BASE_URL)
      .post(`/forgotAdmin`)
      .send({ email })

    console.log(response.body)

    assert.equal(response.status, 200)
  })
})
