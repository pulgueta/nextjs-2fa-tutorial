import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Disable2FA } from "./disable-2fa";

export const Disable2FADialog = () => {
  return (
    <Dialog>
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

        <Disable2FA />
      </DialogContent>
    </Dialog>
  );
};
