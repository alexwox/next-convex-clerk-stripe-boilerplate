"use client";
import { Button } from "@/components/ui/button";
import { useAction, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useRouter } from "next/navigation";

export default function PayButton() {
    const pay = useAction(api.stripe.pay);
    const router = useRouter();
    const user = useQuery(api.users.getUser);

    const isPremium = user && user.isPremium;

    async function handleUpgradeClick() {
        const url = await pay();
        console.log("Upgrade clicked");
        router.push(url);
    };

    if (user && !isPremium) {
        return (

            <Button onClick={handleUpgradeClick} className="relative overflow-hidden bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:from-purple-600 hover:via-pink-600 hover:to-red-600 text-white font-bold py-2 px-4 rounded">
                <span className="relative z-10">Upgrade</span>
                <span className="absolute inset-0 h-full w-full bg-white opacity-0 hover:opacity-20 transition-opacity duration-300 ease-in-out"></span>
                <span className="absolute top-0 left-0 w-4 h-4 bg-white rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse"></span>
                <span className="absolute bottom-0 right-0 w-4 h-4 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse"></span>
            </Button>
        );
    } else if (user && isPremium) {
        return (
            <div className="relative overflow-hidden bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold py-2 px-4 rounded-md shadow-lg">
                <span className="relative z-10 flex items-center justify-center">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    PREMIUM
                </span>
                <span className="absolute top-0 left-0 w-full h-full bg-white opacity-0 hover:opacity-10 transition-opacity duration-300 ease-in-out"></span>
                <span className="absolute top-0 left-0 w-2 h-2 bg-white rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse"></span>
                <span className="absolute bottom-0 right-0 w-2 h-2 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse"></span>
            </div>
        );
    }
    return null;
}