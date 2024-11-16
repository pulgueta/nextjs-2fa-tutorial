import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { pgTable, text, timestamp, boolean, uuid } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: uuid()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text().notNull(),
  email: text().notNull().unique(),
  password: text(),
  emailVerified: boolean().default(false),
  image: text(),
  twoFactorEnabled: boolean().default(false),
  createdAt: timestamp().defaultNow(),
  updatedAt: timestamp().$onUpdateFn(() => new Date()),
});

export type CreateUser = InferInsertModel<typeof user>;
export type User = InferSelectModel<typeof user>;

export const session = pgTable("session", {
  id: uuid()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  expiresAt: timestamp().notNull(),
  ipAddress: text(),
  userAgent: text(),
  userId: uuid()
    .notNull()
    .references(() => user.id),
  createdAt: timestamp().defaultNow(),
  updatedAt: timestamp().$onUpdateFn(() => new Date()),
});

export const account = pgTable("account", {
  id: uuid()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  accountId: text().notNull(),
  providerId: text().notNull(),
  userId: uuid()
    .notNull()
    .references(() => user.id),
  accessToken: text(),
  refreshToken: text(),
  idToken: text(),
  expiresAt: timestamp(),
  password: text(),
  createdAt: timestamp().defaultNow(),
  updatedAt: timestamp().$onUpdateFn(() => new Date()),
});

export const verification = pgTable("verification", {
  id: uuid()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  identifier: text().notNull(),
  value: text().notNull(),
  expiresAt: timestamp().notNull(),
  createdAt: timestamp().defaultNow(),
  updatedAt: timestamp().$onUpdateFn(() => new Date()),
});

export const twoFactor = pgTable("two_factor", {
  id: uuid()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  secret: text().notNull(),
  backupCodes: text().notNull(),
  userId: uuid()
    .notNull()
    .references(() => user.id),
  createdAt: timestamp().defaultNow(),
  updatedAt: timestamp().$onUpdateFn(() => new Date()),
});
