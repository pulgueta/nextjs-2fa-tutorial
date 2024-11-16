"use client";

import { useActionState, useEffect, useId, useState } from "react";

import Form from "next/form";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { QRCodeBackup } from "@/components/qr-with-codes";
import { generateQrCodeAction } from "@/actions/auth";
import { FormErros } from "./form-errors";

export const Enable2FA = () => {
  const [open, setOpen] = useState<boolean>(false);

  const passwordId = useId();

  const [state, action, isPending] = useActionState(
    generateQrCodeAction,
    undefined
  );

  useEffect(() => {
    if (state?.success) {
      setOpen(state.success);
    }
  }, [state]);

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

      {state?.verification && (
        <QRCodeBackup
          open={open}
          backupCodes={state.verification.backupCodes}
          totpURI={state.verification.totpURI}
        />
      )}

      <FormErros state={state} />

      <Button className="mt-4 w-full" disabled={isPending}>
        {isPending ? "Validating..." : "Generate QR Code"}
      </Button>
    </Form>
  );
};
