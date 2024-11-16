"use server";

import { redirect } from "next/navigation";

import {
  createUser,
  disable2FA,
  generateQrCode,
  getUserByEmail,
  login,
  signOut,
  validateTotp,
} from "@/lib/db";
import type { PrevState } from "@/types";

export const registerAction = async (_prev: PrevState, formData: FormData) => {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!name || !email || !password) {
    return {
      message: "Name, email and password are required",
      success: false,
      defaultValues: { name, email, password },
    };
  }

  const userExists = await getUserByEmail(email);

  if (userExists) {
    return { message: "User already exists", success: false };
  }

  await createUser({ email, name, password });

  return redirect("/login");
};

export const loginAction = async (_prev: PrevState, formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const remember = !!formData.get("remember");

  if (!email || !password) {
    return {
      message: "Email and password are required",
      success: false,
      defaultValues: { email, password, remember },
    };
  }

  const logged = await login({ email, password, remember });

  if ("twoFactorEnabled" in logged.user && logged.user.twoFactorEnabled) {
    return redirect("/2fa");
  }

  return redirect("/app");
};

export const generateQrCodeAction = async (
  _prev: PrevState,
  formData: FormData
) => {
  const password = formData.get("password") as string;

  if (!password) {
    return { message: "Password is required", success: false };
  }

  const { message, verification } = await generateQrCode(password);

  return { message, success: true, verification };
};

export const twoFactorAction = async (_prev: PrevState, formData: FormData) => {
  const code = formData.get("otp") as string;

  if (!code) {
    return {
      message: "Code is required",
      success: false,
      defaultValues: { code },
    };
  }

  await validateTotp(code);

  return redirect("/app");
};

export const disable2faAction = async (
  _prev: PrevState,
  formData: FormData
) => {
  const password = formData.get("password") as string;

  if (!password) {
    return { message: "Password is required", success: false };
  }

  const disabled = await disable2FA(password);

  return {
    message: disabled ? "2FA disabled" : "Error disabling 2FA",
    success: disabled,
  };
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const signOutAction = async (_prev: PrevState, formData: FormData) => {
  const isSignedOut = await signOut();

  if (!isSignedOut) {
    return { message: "Error signing out", success: false };
  }

  return redirect("/login");
};
