import * as faker from "faker";
import { createTestConn } from "../../../testUtils/createTestConn";
import { TestClient } from "../../../utils/TestClient";
import { testHost } from "../../../utils/constants";
import { invalidCredentials } from "@blog/common";

const email = faker.internet.email();
const password = faker.internet.password();

beforeAll(async () => {
  await createTestConn();
});

describe("login tests", () => {
  it("Send error for unregistered emails", async () => {
    const client = new TestClient(testHost);
    console.log("test host :", testHost);
    const response = await client.login("b@kajsndf.cpasdf", password);
    console.log(response.data);
    expect(response.data).toEqual({
      login: {
        errors: {
          path: "email",
          message: invalidCredentials
        },
        sessionId: null
      }
    });
  });
});
