import { SignInButton, SignedIn, SignedOut} from "@clerk/nextjs";
import SignedInContent from "./signed-in-content";


export default function Home() {

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
      <div className="w-full max-w-4xl p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <SignedOut>
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-6 dark:text-white">Welcome to Our App</h1>
            <p className="mb-4 dark:text-gray-300">Please sign in to access the features.</p>
            <SignInButton mode="modal">
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                Sign In or Sign up
              </button>
            </SignInButton>
          </div>
        </SignedOut>
        
        <SignedIn>
          <SignedInContent />
        </SignedIn>
      </div>
    </main>
  );
}
