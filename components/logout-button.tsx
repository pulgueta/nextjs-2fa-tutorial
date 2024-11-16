import Form from "next/form";

import { Loader2, LogOutIcon } from "lucide-react";

import { Button } from "./ui/button";
import { useActionState } from "react";
import { signOutAction } from "@/actions/auth";

export const LogoutButton = () => {
  const [, formAction, pending] = useActionState(signOutAction, undefined);

  return (
    <Form action={formAction}>
      <Button
        variant={"destructive"}
        size={pending ? "icon" : "default"}
        disabled={pending}
      >
        {pending ? (
          <Loader2 size={16} className="animate-spin" />
        ) : (
          <>
            <LogOutIcon size={16} />
            Sign out
          </>
        )}
      </Button>
    </Form>
  );
};
