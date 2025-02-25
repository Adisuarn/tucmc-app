import { getSession } from "@tucc/auth";
import { Button } from "@tucc/ui/button";
import { headers } from "next/headers";
import { auth } from "@tucc/auth";
import { redirect } from "next/navigation";

export async function AuthShowcase() {
  const session = await getSession();
  if (!session) {
    return (
      <form>
        <Button
          size="lg"
          formAction={async () => {
            "use server";
            const res = await auth.api.signInSocial({
              body: {
                provider: "google",
                callbackURL: "/"
              },
            });
            redirect(res.url ?? "/");
          }}
        >
          Sign in with Google
        </Button>
      </form>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="text-center text-2xl">
        <span>Logged in as {session.user.name}</span>
      </div>

      <form>
        <Button
          size="lg"
          formAction={async () => {
            "use server";
            await auth.api.signOut({
              headers: await headers(),
            });
            throw redirect("/")
          }}
        >
          Sign out
        </Button>
      </form>
    </div>
  );
}
