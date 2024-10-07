import { SignInButton, SignOutButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center ">
      <SignedOut>
        <SignInButton />
        <h1>Boilerplate, Signed out</h1>
      </SignedOut>
      <SignedIn>
        <UserButton />
        <h1>Boilerplate, Signed in</h1>
        <SignOutButton />

        <form>
          <input type="text" name="randString" />
        </form>
      </SignedIn>
    </main>
  );
}
