import { defineConfig } from "drizzle-kit";

import "dotenv/config";

export default defineConfig({
  dialect: "postgresql",
  schema: "./db/schemas",
  out: "./drizzle",
  dbCredentials: {
    url: process.env.DATABASE_URL ?? "",
  },
  verbose: true,
  strict: true,
  casing: "snake_case",
});
