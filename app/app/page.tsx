import { UserCardPromise } from "@/components/user/use-card-promise";
import { getCurrentSession } from "@/lib/session";

const App = () => {
  const user = getCurrentSession();

  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-4">
      <UserCardPromise userPromise={user} />
    </main>
  );
};
export default App;
