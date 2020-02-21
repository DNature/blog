export const redisSessionPrefix = "sess:";
export const userSessionIdPrefix = "userSids";
export const productionEnv = process.env.NODE_ENV === "production";
export const testEnv = process.env.NODE_ENV === "test";
export const frontEndHost =
  (process.env.FRONTEND_HOST as string) || "http://localhost:3000";
export const testHost = process.env.TEST_HOST as string