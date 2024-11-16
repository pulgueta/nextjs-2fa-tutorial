import { headers } from "next/headers";

import { db } from "@/db/config";
import type { CreateUser } from "@/db/schemas";
import { auth } from "../auth";

export const getUserByEmail = async (email: string) => {
  const user = await db.query.user.findFirst({
    where: (t, { eq }) => eq(t.email, email),
  });

  return user;
};

export const createUser = async (data: CreateUser) => {
  const createdUser = await auth.api.signUpEmail({
    body: {
      email: data.email,
      password: data.password ?? "",
      name: data.name,
    },
  });

  return createdUser.user;
};

interface LoginData extends Pick<CreateUser, "email" | "password"> {
  remember: boolean;
}

export const login = async (data: LoginData) => {
  const loggedUser = await auth.api.signInEmail({
    body: {
      email: data.email,
      password: data.password ?? "",
      remember: data.remember,
    },
  });

  return loggedUser;
};

export const generateQrCode = async (pwd: string) => {
  const verification = await auth.api.enableTwoFactor({
    headers: await headers(),
    body: {
      password: pwd,
    },
  });

  return {
    message: "Código QR generado",
    verification,
  };
};

export const validateTotp = async (code: string) => {
  const { user } = await auth.api.verifyTOTP({
    headers: await headers(),
    body: {
      code,
    },
  });

  return user;
};

export const signOut = async () => {
  const { success } = await auth.api.signOut({
    headers: await headers(),
  });

  return success;
};

export const disable2FA = async (password: string) => {
  const success = await auth.api.disableTwoFactor({
    headers: await headers(),
    body: {
      password,
    },
  });

  return success.status;
};
