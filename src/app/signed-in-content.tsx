"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { ModeToggle } from "@/components/ui/mode-toggle";
import PayButton from "./pay-button";
import { SignOutButton } from "@clerk/nextjs";
import GenerateDataForm from "./generate-data-form";
import DisplayData from "./display-data";

export default function SignedInContent() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold dark:text-white">Dashboard</h1>

                {/* Hamburger menu for mobile */}
                <button
                    className="md:hidden"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <Menu className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                </button>

                {/* Desktop menu */}
                <div className="hidden md:flex items-center space-x-4">
                    <UserButton />
                    <ModeToggle />
                    <PayButton />
                    <SignOutButton>
                        <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
                            Sign Out
                        </button>
                    </SignOutButton>
                </div>
            </div>

            {/* Mobile menu */}

            {isMenuOpen && (
                <div className="md:hidden flex flex-col space-y-4 mb-6">
                    <div className="flex justify-between items-center">
                        <UserButton />
                        <ModeToggle />
                    </div>
                    <div className="w-full">
                        <PayButton />
                    </div>
                    <SignOutButton>
                        <button className="bg-red-500 hover:bg-red-600 text-white font-bold p-2 rounded-md w-full">
                            Sign Out
                        </button>
                    </SignOutButton>
                </div>
            )}
        
        <div className="space-y-8">
            <section>
                <h2 className="text-2xl font-semibold mb-4 dark:text-white">Generate Data</h2>
        <GenerateDataForm />
            </section>

            <section>
                <h2 className="text-2xl font-semibold mb-4 dark:text-white">Display Data</h2>
                    <DisplayData />
            </section>
        </div>
        </>
    );
}
