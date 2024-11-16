import type { FC, PropsWithChildren } from "react";

const AuthLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <main className="flex min-h-dvh w-full flex-col items-center justify-center p-4">
      {children}
    </main>
  );
};
export default AuthLayout;
