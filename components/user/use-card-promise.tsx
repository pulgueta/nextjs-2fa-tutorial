"use client";

import type { FC } from "react";
import { use } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Enable2FADialog } from "../enable-2fa.dialog";
import { Disable2FADialog } from "../disable-2fa.dialog";
import { LogoutButton } from "../logout-button";
import { Skeleton } from "../ui/skeleton";
import { DataSkeleton } from "./data-skeleton";
import { getCurrentSession } from "@/lib/session";

interface UserCardPromiseProps {
  userPromise: ReturnType<typeof getCurrentSession>;
}

export const UserCardPromise: FC<UserCardPromiseProps> = ({ userPromise }) => {
  const user = use(userPromise);

  return (
    <Card className="w-full max-w-sm md:max-w-lg lg:max-w-xl">
      <CardHeader>
        <CardTitle>
          {user ? (
            `Welcome back, ${user.name}!`
          ) : (
            <Skeleton className="h-10 w-full max-w-sm" />
          )}
        </CardTitle>
        <CardDescription>
          {user ? (
            `You are signed in as ${user.email}`
          ) : (
            <Skeleton className="h-4 w-full max-w-xs" />
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {user ? (
          <>
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">
                Two factor authentication is
                {user?.twoFactorEnabled ? " " : " not "}enabled
              </p>
              {!user?.twoFactorEnabled ? (
                <Enable2FADialog />
              ) : (
                <Disable2FADialog />
              )}
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
                {new Date(user?.createdAt.toLocaleString()).toLocaleString()}
              </p>
            </div>
          </>
        ) : (
          <DataSkeleton />
        )}
      </CardContent>
      <CardFooter className="justify-end">
        {user ? <LogoutButton /> : <Skeleton className="h-10 w-28" />}
      </CardFooter>
    </Card>
  );
};
