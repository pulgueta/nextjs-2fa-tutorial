"use client";

import { useActionState, useId } from "react";

import Form from "next/form";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { cn } from "@/lib/utils";
import { twoFactorAction } from "@/actions/auth";
import { FormErros } from "./form-errors";

export const TwoFactorForm = () => {
  const codeId = useId();

  const [state, formAction, pending] = useActionState(
    twoFactorAction,
    undefined
  );

  const errorClass = cn({
    "border-destructive/80": state && !state.success,
  });

  const errorLabelClass = cn({
    "text-destructive": state && !state.success,
  });

  return (
    <Form action={formAction} className="space-y-2">
      <Label htmlFor={codeId} className={errorLabelClass}>
        Enter the 6-digit code from your authenticator app
      </Label>
      <Input
        placeholder="123456"
        name="otp"
        id={codeId}
        autoFocus
        type="number"
        maxLength={6}
        pattern="\d{6}"
        className={errorClass}
        disabled={pending}
        defaultValue={state?.defaultValues.code}
      />

      <FormErros state={state} />

      <Button className="w-full" disabled={pending}>
        {pending ? "Verifying..." : "Verify"}
      </Button>
    </Form>
  );
};
