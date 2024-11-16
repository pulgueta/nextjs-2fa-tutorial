"use client";

import { useActionState, useId } from "react";

import Form from "next/form";

import { AlertOctagon, Check, Loader2Icon } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { registerAction } from "@/actions/auth";

export const RegisterForm = () => {
  const [state, formAction, pending] = useActionState(
    registerAction,
    undefined
  );
  const [name, email, password] = [useId(), useId(), useId()];

  const errorClass = cn({
    "border-destructive/80": state && !state.success,
  });

  const errorLabelClass = cn({
    "text-destructive": state && !state.success,
  });

  return (
    <section className="flex flex-col w-full gap-4">
      <Form action={formAction} className="flex flex-col w-full gap-4">
        <div>
          <Label className={errorLabelClass} htmlFor={name}>
            Name
          </Label>
          <Input
            className={errorClass}
            id={name}
            name="name"
            disabled={pending}
          />
        </div>
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
          />
        </div>

        <Button disabled={pending} className="w-full">
          {pending ? (
            <Loader2Icon size={16} className="animate-spin" />
          ) : (
            "Register"
          )}
        </Button>
      </Form>

      {state &&
        (!state.success ? (
          <Alert variant="destructive">
            <AlertOctagon size={16} />
            <AlertTitle>Error!</AlertTitle>
            <AlertDescription>
              {state?.message || "An error occurred"}
            </AlertDescription>
          </Alert>
        ) : (
          <Alert variant="success">
            <Check size={16} />
            <AlertTitle>Success!</AlertTitle>
            <AlertDescription>
              {state?.message || "An error occurred"}
            </AlertDescription>
          </Alert>
        ))}
    </section>
  );
};
