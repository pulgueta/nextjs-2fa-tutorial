"use client";

import { useActionState, useEffect, useId } from "react";

import Form from "next/form";
import { useRouter } from "next/navigation";

import { AlertCircle } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { disable2FAAction } from "@/actions/auth";

export const Disable2FA = () => {
  const passwordId = useId();

  const [state, action, isPending] = useActionState(
    disable2FAAction,
    undefined
  );

  const router = useRouter();

  useEffect(() => {
    if (state?.success) {
      router.refresh();
    }
  }, [state, router]);

  return (
    <Form action={action} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor={passwordId}>Password</Label>

        <Input
          type="password"
          autoComplete="current-password"
          placeholder="********"
          className="shadow"
          id={passwordId}
          name="password"
        />
      </div>

      {state && !state?.success && (
        <Alert variant="destructive" className="my-4">
          <AlertCircle className="size-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{state?.message}</AlertDescription>
        </Alert>
      )}

      <Button className="mt-4 w-full" disabled={isPending}>
        {isPending ? "Validating..." : "Disable 2FA"}
      </Button>
    </Form>
  );
};
