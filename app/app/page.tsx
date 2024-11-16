import { UserCard } from "@/components/user-card";
import { getCurrentSession } from "@/lib/session";

const App = async () => {
  const user = await getCurrentSession();

  return (
    <main className="flex items-center justify-center flex-col gap-4 min-h-dvh">
      <UserCard user={user} />
    </main>
  );
};
export default App;
