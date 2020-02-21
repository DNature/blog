import * as faker from "faker";
import { Connection } from "typeorm";

import { createTestConn } from "../../../testUtils/createTestConn";
import { TestClient } from "../../../utils/TestClient";
import { testHost } from "../../../utils/constants";
import { User } from "../../../entity/User";

const email = faker.internet.email();
const password = faker.internet.password();
const fullName = `${faker.name.firstName()} ${faker.name.lastName()}`;

let conn: Connection;
let userId: string;

beforeAll(async () => {
  conn = await createTestConn();
  const user = await User.create({
    email,
    password,
    fullName
  }).save();
  userId = user.id;
});

afterAll(async () => {
  await conn.close();
});

describe("Me tests", () => {
  it("for null cookie", async () => {
    const client = new TestClient(testHost);
    const response: any = await client.me();
    expect(response.data).toBeNull();
  });

  it("for current user", async() => {
    const client = new TestClient(testHost)
    await client.login(email, password)
    const response: any = await client.me()
    expect(response.data).toEqual({
      me: {
        id: userId,
        email
      }
    })
  })
});
