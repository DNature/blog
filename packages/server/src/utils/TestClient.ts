import * as rp from "request-promise";
import { ErrorsMap, Errors } from "../types/graphqlUtils";

export class TestClient {
  url: string;
  options: {
    jar: any;
    withCredentials: boolean;
    json: boolean;
    headers: any;
  };

  constructor(url: string) {
    this.url = url;
    this.options = {
      withCredentials: true,
      jar: rp.jar(),
      json: true,
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    };
  }

  async register(email: string, password: string): Promise<Errors[]> {
    return await rp.post(this.url, {
      ...this.options,
      body: {
        query: `
          mutation {
              register(email: "${email}" password: "${password}") {
                path
                message
              }
          }
      `
      }
    });
  }

  async login(email: string, password: string): Promise<ErrorsMap> {
    return await rp.post(
      this.url,
      {
        ...this.options,
        body: {
          query: `
            mutation {
                login(email: "${email}" password: "${password}") {
                    errors{
                        path
                        message
                    }
                    sessionId
                }
            }
        `
        }
      },
      err => {
        if (err) console.log(err);
      }
    );
  }

  /*

  async logout(): Promise<boolean> {
    return rp.post(this.url, {
      ...this.options,
      body: {
        query: `
            mutation {
                logout
            }
          `
      }
    });
  } */
}
