import dynamic from "next/dynamic";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const TwoFactorForm = dynamic(
  () =>
    import("@/components/2fa-form").then(({ TwoFactorForm }) => TwoFactorForm),
  { loading: () => <Skeleton className="h-20 w-full" /> }
);

const TwoFA = () => {
  return (
    <Card className="mx-auto w-full max-w-sm md:max-w-lg">
      <CardHeader>
        <CardTitle>Two factor authentication</CardTitle>
        <CardDescription>
          Enter the code from your authenticator app to login
        </CardDescription>
      </CardHeader>
      <CardContent>
        <TwoFactorForm />
      </CardContent>
    </Card>
  );
};
export default TwoFA;
