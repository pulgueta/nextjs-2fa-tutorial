import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { twoFactor } from "better-auth/plugins";

import { db } from "@/db/config";
import * as schema from "@/db/schemas";
import { hashValue as hash, verifyValue as verify } from "./argon2";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    generateId: () => crypto.randomUUID(),
    schema: {
      user: schema.user,
      session: schema.session,
      account: schema.account,
      verification: schema.verification,
      twoFactor: schema.twoFactor,
    },
  }),
  emailAndPassword: {
    enabled: true,
    maxPasswordLength: 100,
    minPasswordLength: 4,
    requireEmailVerification: false,
    password: {
      hash,
      verify,
    },
  },
  session: {
    storeSessionInDatabase: true,
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24,
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60,
    },
  },
  user: {
    additionalFields: {
      password: {
        type: "string",
        required: true,
        defaultValue: "",
        input: true,
        hashValue: true,
        fieldName: "password",
      },
    },
  },
  baseURL: process.env.BETTER_AUTH_URL ?? "",
  secret: process.env.BETTER_AUTH_SECRET ?? "",
  rateLimit: {
    enabled: false,
  },
  trustedOrigins: [process.env.BETTER_AUTH_URL ?? ""],
  plugins: [twoFactor({ issuer: "Tutorial" })],
});

export type Session = typeof auth.$Infer.Session;
