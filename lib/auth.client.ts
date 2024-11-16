import { createAuthClient } from "better-auth/react";
import {
  inferAdditionalFields,
  twoFactorClient,
} from "better-auth/client/plugins";

import type { auth } from "./auth";

const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_SITE_URL,
  plugins: [
    inferAdditionalFields<typeof auth>(),
    twoFactorClient({ twoFactorPage: "/2fa", redirect: true }),
  ],
  fetchOptions: {
    onError: async (ctx) => {
      switch (ctx.response.status) {
        case 429:
          const retry = ctx.response.headers.get("X-Retry-After");

          console.info(
            `You are being rate limited. Please try again in ${retry} seconds.`
          );
          break;

        case 500:
          console.error("An internal server error occurred.");
          break;
      }
    },
  },
});

export const {
  signIn,
  $Infer,
  useSession,
  signUp,
  signOut,
  twoFactor,
  getSession,
} = authClient;
