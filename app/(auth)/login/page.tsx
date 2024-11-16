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

const LoginForm = dynamic(
  () => import("@/components/login-form").then(({ LoginForm }) => LoginForm),
  { loading: () => <Skeleton className="h-48 w-full" /> }
);

const Login = () => {
  return (
    <Card className="mx-auto w-full max-w-sm md:max-w-lg">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Enter your credentials to login</CardDescription>
      </CardHeader>
      <CardContent>
        <LoginForm />
      </CardContent>
      <CardFooter className="flex items-center justify-center text-muted-foreground">
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
