import { request } from "graphql-request";
import * as faker from "faker";

import { createTypeormConn } from "../../../utils/createTypeormConn";
import { User } from "../../../entity/User";

beforeAll(async () => {
  await createTypeormConn();
});

const email = faker.internet.email();
const password = faker.internet.password();

const mutation = `
  mutation {
    register(email: "${email}" password: "${password}"){
      path
      message
    }
  }
`;

export const host = "http://localhost:4000";

describe("Register User", () => {
  it("test for duplicate email", async () => {
    await request(host, mutation);
    const users = await User.find({ where: { email } });
    expect(users).toHaveLength(1);

    const user = users[0];
    expect(user.email).toEqual(email);
    expect(user.password).not.toEqual(password);
  });

  it("Register User", async () => {
    const response = await request(host, mutation);
    expect(response).toEqual({ register: true });
    const users = await User.find({ where: { email } });

    expect(users).toHaveLength(1);
    const user = users[0];
    expect(user.email).toEqual(email);
    expect(user.password).not.toEqual(password);
    expect(typeof user.createdAt).toBe("string");
  });
});
