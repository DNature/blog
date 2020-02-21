// import { request } from "graphql-request";
import * as faker from "faker";
import {
  registerError,
  invalidEmail,
  passwordNotLongEnough
} from "@blog/common";
import { Connection } from "typeorm";

import { User } from "../../../entity/User";
import { TestClient } from "../../../utils/TestClient";
import { testHost } from "../../../utils/constants";
import { createTestConn } from "../../../testUtils/createTestConn";

let conn: Connection;

beforeAll(async () => {
  conn = await createTestConn();
});

afterAll(async () => {
  await conn.close();
});
const email = faker.internet.email();
const password = faker.internet.password();
const fullName = `${faker.name.firstName()} ${faker.name.lastName()}`

describe("Register tests", () => {
  it("for duplicate email", async () => {
    const client = new TestClient(testHost);
    const response: any = await client.register(email, password, fullName);

    expect(response.data).toEqual({ register: null });

    const users = await User.find({ where: { email } });
    expect(users).toHaveLength(1);
    const user = users[0];
    expect(user.email).toEqual(email);
    expect(user.password).not.toEqual(password);

    const response2: any = await client.register(email, password, fullName);
    expect(response2.data.register).toHaveLength(1);
    expect(response2.data.register[0]).toEqual(registerError);
  });

  it("for invalid email", async () => {
    const client = new TestClient(testHost);
    const response: any = await client.register("jad", password, fullName);
    expect(response.data).not.toEqual({ register: null });
    expect(response.data).toEqual({
      register: [
        {
          path: "email",
          message: invalidEmail
        },
        {
          path: "email",
          message: invalidEmail
        }
      ]
    });
  });

  it("for bad password length", async () => {
    const client = new TestClient(testHost);
    const response: any = await client.register(email, "asdf", fullName);
    expect(response.data).not.toEqual({ register: null });
    expect(response.data).toEqual({
      register: [
        {
          path: "password",
          message: passwordNotLongEnough
        }
      ]
    });
  });

  it("for bad email and password", async () => {
    const client = new TestClient(testHost);
    const response: any = await client.register("as", "asdf", fullName);
    expect(response.data).toEqual({
      register: [
        {
          path: "email",
          message: invalidEmail
        },
        {
          path: "email",
          message: invalidEmail
        },
        {
          path: "password",
          message: passwordNotLongEnough
        }
      ]
    });
  });
});
