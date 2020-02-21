import * as faker from "faker";
import { invalidCredentials } from "@blog/common";
import { Connection } from "typeorm";

import { createTestConn } from "../../../testUtils/createTestConn";
import { TestClient } from "../../../utils/TestClient";
import { testHost } from "../../../utils/constants";

const email = faker.internet.email();
const password = faker.internet.password();

let conn: Connection;

beforeAll(async () => {
  conn = await createTestConn();
});

afterAll(async () => {
  await conn.close();
});

const loginExpectError = async (
  client: TestClient,
  e: string,
  p: string,
  errMsg: string,
  path: string,
  sessionId: any
): Promise<void> => {
  const response: any = await client.login(e, p);

  expect(response.data).toEqual({
    login: {
      errors: [{ path, message: errMsg }],
      sessionId
    }
  });
};
describe("login tests", () => {
  it("for unregistered emails", async () => {
    const client = new TestClient(testHost);
    await loginExpectError(
      client,
      email,
      password,
      invalidCredentials,
      "email",
      null
    );
  });
});
