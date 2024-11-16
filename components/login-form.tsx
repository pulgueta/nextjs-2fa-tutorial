"use client";

import type { FormEvent } from "react";
import { useId } from "react";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { signIn } from "@/lib/auth.client";

export const LoginForm = () => {
  const [email, password, remember] = [useId(), useId(), useId()];

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const values = new FormData(e.currentTarget);

    await signIn.email({
      email: values.get("email") as string,
      password: values.get("password") as string,
      rememberMe: !!values.get("remember"),
    });
  };

  return (
    <section className="flex flex-col w-full gap-4">
      <form onSubmit={onSubmit} className="flex flex-col w-full gap-4">
        <div>
          <Label htmlFor={email}>Email</Label>
          <Input id={email} type="email" name="email" />
        </div>
        <div>
          <Label htmlFor={password}>Password</Label>
          <Input id={password} type="password" name="password" />
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id={remember} name="remember" />
          <Label htmlFor={remember}>Remember me</Label>
        </div>

        <Button className="w-full">Sign in</Button>
      </form>
    </section>
  );
};
