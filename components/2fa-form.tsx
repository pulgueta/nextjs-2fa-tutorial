"use client";

import { useActionState, useId } from "react";

import Form from "next/form";

import { AlertOctagon } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { verifyTotpAction } from "@/actions/auth";

export const TwoFactorForm = () => {
  const codeId = useId();

  const [state, formAction, pending] = useActionState(
    verifyTotpAction,
    undefined
  );

  return (
    <Form action={formAction} className="space-y-2">
      <Label htmlFor={codeId}>
        Enter the 6-digit code from your authenticator app
      </Label>
      <Input
        placeholder="123456"
        name="otp"
        id={codeId}
        type="number"
        maxLength={6}
        pattern="\d{6}"
      />

      {state && !state.success && (
        <Alert variant="destructive">
          <AlertOctagon size={16} />
          <AlertTitle>Error!</AlertTitle>
          <AlertDescription>
            {state?.message || "An error occurred"}
          </AlertDescription>
        </Alert>
      )}

      <Button disabled={pending} className="w-full">
        {pending ? "Validating..." : "Verify"}
      </Button>
    </Form>
  );
};
