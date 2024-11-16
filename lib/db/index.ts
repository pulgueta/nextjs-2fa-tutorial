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

export const login = async (
  data: Pick<CreateUser, "email" | "password"> & { remember: boolean }
) => {
  const loggedUser = await auth.api.signInEmail({
    body: {
      email: data.email,
      password: data.password ?? "",
      remember: data.remember,
    },
  });

  return loggedUser.user;
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

export const disable2FA = async (pwd: string) => {
  const verification = await auth.api.disableTwoFactor({
    headers: await headers(),
    body: {
      password: pwd,
    },
  });

  return {
    message: "2FA deshabilitado",
    success: verification.status,
  };
};

export const verifyTotp = async (code: string) => {
  const verification = await auth.api.verifyTOTP({
    headers: await headers(),
    body: {
      code,
    },
  });

  return {
    message: "Código verificado",
    user: verification.user,
  };
};
