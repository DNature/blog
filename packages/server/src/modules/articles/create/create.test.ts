import { validationError, notAuthenticated } from "@blog/common";
import * as faker from "faker";

import { createTestConn } from "../../../testUtils/createTestConn";
import { Connection } from "typeorm";
import { TestClient } from "../../../utils/TestClient";
import { testHost } from "../../../utils/constants";

let conn: Connection;

const email = faker.internet.email();
const password = faker.internet.password();
const fullName = `${faker.name.firstName()} ${faker.name.lastName()}`;

beforeAll(async () => {
  conn = await createTestConn();
});

afterAll(async () => {
  await conn.close();
});

describe("Create Article test", () => {
  it("for unauthenticated user", async () => {
    const client = new TestClient(testHost);
    const response: any = await client.createArticle();

    expect(response.data.createArticle).toEqual([
      validationError("email", notAuthenticated)
    ]);
  });

  it("for creating an article successfully", async () => {
    const client = new TestClient(testHost);
    await client.register(email, password, fullName);
    await client.login(email, password);

    const response: any = await client.createArticle();
    expect(response.data.createArticle).toBeNull();
  });
});
