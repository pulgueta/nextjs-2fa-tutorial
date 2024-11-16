import { headers } from "next/headers";
import { cache } from "react";

import { auth } from "./auth";

export const getCurrentSession = cache(async () => {
  const currentSession = await auth.api.getSession({
    headers: await headers(),
  });

  return currentSession?.user;
});
