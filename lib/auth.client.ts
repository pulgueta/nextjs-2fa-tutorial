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
            `Has excedido el límite de peticiones. Intenta nuevamente en ${retry} segundos.`
          );
          break;

        case 500:
          console.error("Ocurrió un error. Intenta nuevamente más tarde.");
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
