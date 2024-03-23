import { AuthProvider } from "@propelauth/nextjs/client";
import { getUserOrRedirect } from "@propelauth/nextjs/server/app-router";

export default function Page() {
  return (
    <AuthProvider authUrl={process.env.NEXT_PUBLIC_AUTH_URL || ""}>
      <main>
        <h1>Sign In</h1>
        <WelcomeMessage />
      </main>
    </AuthProvider>
  );
}

const WelcomeMessage = async () => {
  // If the user is not logged in, they will be redirected to the login page
  const user = await getUserOrRedirect();

  return <div>Hello {user.firstName} {user.lastName}!</div>;
};
