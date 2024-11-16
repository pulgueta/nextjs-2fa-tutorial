import dynamic from "next/dynamic";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const TwoFactorForm = dynamic(
  () =>
    import("@/components/2fa-form").then(({ TwoFactorForm }) => TwoFactorForm),
  { loading: () => <p>Loading...</p> }
);

const TwoFA = () => {
  return (
    <Card className="w-full max-w-sm md:max-w-lg mx-auto">
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
