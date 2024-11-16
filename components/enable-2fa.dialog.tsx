import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Enable2FA } from "./enable-2fa";

export const Enable2FADialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          Enable 2FA
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Enable 2FA</DialogTitle>
          <DialogDescription>
            Please enter your password to enable 2FA protection.
          </DialogDescription>
        </DialogHeader>

        <Enable2FA />
      </DialogContent>
    </Dialog>
  );
};
