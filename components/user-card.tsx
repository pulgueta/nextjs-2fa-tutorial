"use client";

import type { FC } from "react";
import { useState } from "react";

import { useRouter } from "next/navigation";

import { Loader2, LogOutIcon } from "lucide-react";

import type { Session } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "@/lib/auth.client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Enable2FADialog } from "./enable-2fa.dialog";
import { Disable2FADialog } from "./disable-2fa.dialog";

interface UserCardProps {
  user: Session["user"] | undefined;
}

export const UserCard: FC<UserCardProps> = ({ user }) => {
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const { isPending } = useSession();

  const handleSignOut = async () => {
    await signOut({
      fetchOptions: {
        onRequest: () => setLoading((prev) => !prev),
        onSuccess: () => router.push("/login"),
      },
    });
  };

  return (
    <Card className="w-full max-w-sm md:max-w-lg lg:max-w-xl">
      <CardHeader>
        <CardTitle>
          {user ? `Welcome back, ${user.name}!` : "Not signed in"}
        </CardTitle>
        <CardDescription>
          {user
            ? `You are signed in as ${user.email}`
            : "You are not signed in"}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium">
            Two factor authentication is
            {user?.twoFactorEnabled ? " " : " not "}enabled
          </p>
          {!user?.twoFactorEnabled ? <Enable2FADialog /> : <Disable2FADialog />}
        </div>

        <div className="flex items-center justify-between">
          <p className="text-sm font-medium">Name</p>
          <p className="text-sm text-gray-500">{user?.name}</p>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-sm font-medium">Email is verified</p>
          <p className="text-sm text-gray-500">
            {user?.emailVerified ? "Yes" : "No"}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-sm font-medium">Joined</p>
          <p className="text-sm text-gray-500">
            {new Date(user?.createdAt ?? new Date()).toLocaleString()}
          </p>
        </div>
      </CardContent>
      <CardFooter className="justify-end">
        {user && (
          <Button
            variant={"destructive"}
            size={isPending || loading ? "icon" : "default"}
            disabled={isPending || loading}
            onClick={handleSignOut}
          >
            {isPending || loading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <>
                <LogOutIcon size={16} />
                Sign out
              </>
            )}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};
