"use client";

import { useActionState, useId } from "react";

import Form from "next/form";

import { Loader2Icon } from "lucide-react";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { loginAction } from "@/actions/auth";
import { FormErros } from "./form-errors";

export const LoginForm = () => {
  const [email, password, remember] = [useId(), useId(), useId()];

  const [state, formAction, pending] = useActionState(loginAction, undefined);

  const errorClass = cn({
    "border-destructive/80": state && !state.success,
  });

  const errorLabelClass = cn({
    "text-destructive": state && !state.success,
  });

  return (
    <section className="flex w-full flex-col gap-4">
      <Form action={formAction} className="flex w-full flex-col gap-4">
        <div>
          <Label className={errorLabelClass} htmlFor={email}>
            Email
          </Label>
          <Input
            className={errorClass}
            id={email}
            type="email"
            name="email"
            disabled={pending}
            defaultValue={state?.defaultValues.email}
            autoFocus
          />
        </div>
        <div>
          <Label className={errorLabelClass} htmlFor={password}>
            Password
          </Label>
          <Input
            className={errorClass}
            id={password}
            type="password"
            name="password"
            disabled={pending}
            defaultValue={state?.defaultValues.password}
          />
        </div>

        <div className="flex items-center gap-x-2">
          <Checkbox
            id={remember}
            name="remember"
            disabled={pending}
            defaultChecked={state?.defaultValues.remember}
          />
          <Label htmlFor={remember}>Remember me</Label>
        </div>

        <FormErros state={state} />

        <Button disabled={pending} className="w-full">
          {pending ? (
            <Loader2Icon size={16} className="animate-spin" />
          ) : (
            "Sign in"
          )}
        </Button>
      </Form>
    </section>
  );
};
