"use server";

import { redirect } from "next/navigation";

import {
  createUser,
  disable2FA,
  generateQrCode,
  getUserByEmail,
  login,
  verifyTotp,
} from "@/lib/db";
import type { PrevState } from "@/types";

export const registerAction = async (_prev: PrevState, formData: FormData) => {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!name || !email || !password) {
    return { message: "Name, email and password are required", success: false };
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
    return { message: "Email and password are required", success: false };
  }

  await login({ email, password, remember });

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

export const disable2FAAction = async (
  _prev: PrevState,
  formData: FormData
) => {
  const password = formData.get("password") as string;

  if (!password) {
    return { message: "Password is required", success: false };
  }

  const { message, success } = await disable2FA(password);

  return { message, success };
};

export const verifyTotpAction = async (
  _prev: PrevState,
  formData: FormData
) => {
  const code = formData.get("otp") as string;

  if (!code) {
    return { message: "Code is required", success: false };
  }

  await verifyTotp(code);

  return redirect("/app");
};
