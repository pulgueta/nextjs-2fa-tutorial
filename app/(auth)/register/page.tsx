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

const RegisterForm = dynamic(
  () =>
    import("@/components/register-form").then(
      ({ RegisterForm }) => RegisterForm
    ),
  { loading: () => <p>Loading...</p> }
);

const Register = () => {
  return (
    <Card className="w-full max-w-sm md:max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>Register</CardTitle>
        <CardDescription>
          Create an account to access the dashboard
        </CardDescription>
      </CardHeader>
      <CardContent>
        <RegisterForm />
      </CardContent>
      <CardFooter className="text-muted-foreground flex items-center justify-center">
        <p className="text-sm">
          Already have an account?{" "}
          <Link
            href="/login"
            className="hover:underline hover:underline-offset-4"
          >
            Login here
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};
export default Register;
