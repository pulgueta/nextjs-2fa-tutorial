import { Loader } from "lucide-react";

const Loading = () => {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-4">
      <Loader size={16} className="animate-spin" />
      <p className="text-center font-medium text-muted-foreground">
        Loading...
      </p>
    </main>
  );
};
export default Loading;
