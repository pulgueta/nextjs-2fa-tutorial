"use client";

import { useActionState, useEffect, useId, useState } from "react";

import Form from "next/form";
import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { disable2faAction } from "@/actions/auth";
import { cn } from "@/lib/utils";
import { FormErros } from "./form-errors";

export const Disable2FADialog = () => {
  const [open, setOpen] = useState<boolean>(false);

  const [state, formAction, pending] = useActionState(
    disable2faAction,
    undefined
  );

  const passwordId = useId();

  const { refresh } = useRouter();

  const errorClass = cn({
    "border-destructive/80": state && !state.success,
  });

  const errorLabelClass = cn({
    "text-destructive": state && !state.success,
  });

  useEffect(() => {
    if (state && state.success) {
      setOpen((prev) => !prev);
      refresh();
    }
  }, [state, refresh]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          Disable 2FA
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Disable 2FA</DialogTitle>
          <DialogDescription>
            Please enter your password to disable 2FA protection.
          </DialogDescription>
        </DialogHeader>

        <Form action={formAction} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor={passwordId} className={errorLabelClass}>
              Password
            </Label>

            <Input
              type="password"
              autoComplete="current-password"
              placeholder="********"
              className={errorClass}
              id={passwordId}
              name="password"
              disabled={pending}
            />
          </div>

          <FormErros state={state} />

          <Button className="mt-4 w-full" disabled={pending}>
            {pending ? "Disabling..." : "Disable 2FA"}
          </Button>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
