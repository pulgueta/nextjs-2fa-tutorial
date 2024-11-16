import type { ElementRef, FC, FormEvent } from "react";
import { useEffect, useId, useRef, useState } from "react";

import Form from "next/form";
import { useRouter } from "next/navigation";

import QRCode from "react-qr-code";
import { Copy } from "lucide-react";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { twoFactor } from "@/lib/auth.client";

interface QRCodeBackupProps {
  totpURI: string;
  backupCodes: string[];
  open: boolean;
}

export const QRCodeBackup: FC<QRCodeBackupProps> = ({
  backupCodes,
  totpURI,
  open,
}) => {
  const [code, setCode] = useState<string>("");

  const otpId = useId();

  const formRef = useRef<ElementRef<typeof Form>>(null);

  const { refresh } = useRouter();

  const onSumbit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { data } = await twoFactor.verifyTotp({
      code,
    });

    if (data) {
      refresh();
    }
  };

  const onCopy = () => {
    navigator.clipboard.writeText(backupCodes.join("\n"));
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        formRef.current?.requestSubmit();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <AlertDialog open={open}>
      <AlertDialogContent className="w-full max-w-sm rounded md:max-w-xl">
        <AlertDialogHeader>
          <AlertDialogTitle>Your QR code</AlertDialogTitle>
          <AlertDialogDescription>
            Scan the QR code with your authenticator app
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="flex flex-col gap-2">
          <QRCode value={totpURI} className="mx-auto w-full" size={128} />

          <div className="text-sm">
            <p>Backup codes:</p>
            <p className="text-muted-foreground">
              Save these codes in a safe place in case you lose access to your
              authenticator app.
            </p>
          </div>

          <div className="mb-2 flex flex-col gap-2">
            <div className="mt-2 flex flex-wrap items-center justify-center gap-4">
              {backupCodes.map((code) => (
                <p
                  key={code}
                  className="text-center text-gray-600 font-medium text-sm"
                >
                  {code}
                </p>
              ))}
            </div>

            <Button className="mx-auto mt-4 w-full max-w-xs" onClick={onCopy}>
              <Copy size={16} />
              Copy backup codes
            </Button>
          </div>

          <form onSubmit={onSumbit} className="space-y-2">
            <Label htmlFor={otpId}>
              Enter the 6-digit code from your authenticator app
            </Label>
            <Input
              placeholder="123456"
              name="otp"
              id={otpId}
              required
              autoFocus
              value={code}
              onChange={(e) => setCode(e.target.value)}
              type="number"
            />
            <Button className="w-full">Validate</Button>
          </form>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};
