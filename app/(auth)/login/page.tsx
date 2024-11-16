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

const LoginForm = dynamic(
  () => import("@/components/login-form").then(({ LoginForm }) => LoginForm),
  { loading: () => <p>Loading...</p> }
);

const Login = () => {
  return (
    <Card className="w-full max-w-sm md:max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Enter your credentials to login</CardDescription>
      </CardHeader>
      <CardContent>
        <LoginForm />
      </CardContent>
      <CardFooter className="text-muted-foreground flex items-center justify-center">
        <p className="text-sm">
          No account?{" "}
          <Link
            href="/register"
            className="hover:underline hover:underline-offset-4"
          >
            Register here
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};
export default Login;
