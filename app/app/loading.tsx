import { Loader } from "lucide-react";

const Loading = () => {
  return (
    <main className="flex items-center justify-center flex-col gap-4 min-h-dvh">
      <Loader size={16} className="animate-spin" />
      <p className="text-muted-foreground font-medium text-center">
        Loading...
      </p>
    </main>
  );
};
export default Loading;
