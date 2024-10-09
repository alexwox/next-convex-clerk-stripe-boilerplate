import { SignInButton, SignOutButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import GenerateDataForm from "./generate-data-form";
import DisplayData from "./display-data";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="w-full max-w-4xl p-8 bg-white rounded-lg shadow-md">
        <SignedOut>
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-6">Welcome to Our App</h1>
            <p className="mb-4">Please sign in to access the features.</p>
            <SignInButton mode="modal">
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                Sign In
              </button>
            </SignInButton>
          </div>
        </SignedOut>
        
        <SignedIn>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <div className="flex items-center space-x-4">
              <UserButton />
              <SignOutButton>
                <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
                  Sign Out
                </button>
              </SignOutButton>
            </div>
          </div>
          
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">Generate Data</h2>
              <GenerateDataForm />
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">Display Data</h2>
              <DisplayData />
            </section>
          </div>
        </SignedIn>
      </div>
    </main>
  );
}
