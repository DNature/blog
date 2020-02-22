import { Connection } from 'typeorm'
import * as faker from 'faker'

import { createTestConn } from '../../../testUtils/createTestConn'
import { TestClient } from '../../../utils/TestClient'
import { testHost } from '../../../utils/constants'
import { User } from '../../../entity/User'

let conn: Connection
let userId = ""

const email = faker.internet.email()
const password = faker.internet.password();
const fullName = `${faker.name.firstName()} ${faker.name.lastName()}`;

beforeAll(async() => {
    conn = await createTestConn()
    const user = await User.create({
        email, password, fullName
    }).save()

    userId = user.id
})

afterAll(async() => {
    await conn.close()
})

describe("Logout test", () => {
    it("for multiple sessions", async () => {
        const sess1 = new TestClient(testHost);
        const sess2 = new TestClient(testHost)

        await sess1.login(email, password);
        await sess2.login(email, password)

        expect(await sess1.me()).toEqual(await sess2.me())
        await sess1.logout()
        expect(await sess1.me()).toEqual(await sess2.me())
    })

    it("for single session", async() => {
        const client = new TestClient(testHost)
        await client.login(email, password)
        const response: any = await client.me()


        expect(response.data).toEqual({
            me: {
                id: userId,
                email
            }
        })

        await client.logout()

        const response2: any= await client.me()

        expect(response2.data).toBeNull()
    })
})