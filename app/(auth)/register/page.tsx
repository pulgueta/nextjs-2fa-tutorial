import Link from "next/link";
import dynamic from "next/dynamic";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const RegisterForm = dynamic(
  () =>
    import("@/components/register-form").then(
      ({ RegisterForm }) => RegisterForm
    ),
  { loading: () => <Skeleton className="h-64 w-full" /> }
);

const Register = () => {
  return (
    <Card className="mx-auto w-full max-w-sm md:max-w-lg">
      <CardHeader>
        <CardTitle>Register</CardTitle>
        <CardDescription>
          Create an account to access the dashboard
        </CardDescription>
      </CardHeader>
      <CardContent>
        <RegisterForm />
      </CardContent>
      <CardFooter className="flex items-center justify-center text-muted-foreground">
        <p className="text-sm">
          Already have an account?{" "}
          <Link
            href="/login"
            className="hover:underline hover:underline-offset-4"
            prefetch={false}
          >
            Login here
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};
export default Register;
