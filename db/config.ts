import { drizzle } from "drizzle-orm/postgres-js";

import * as schema from "./schemas";

export const db = drizzle(process.env.DATABASE_URL ?? "", {
  logger: true,
  casing: "snake_case",
  schema,
});
