"use client";
import { Button } from "@/components/ui/button";
import { useAction } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useRouter } from "next/navigation";

export default function PayButton() {
    const pay = useAction(api.stripe.pay);
    const router = useRouter();
    async function handleUpgradeClick() {
        const url = await pay();
        console.log("Upgrade clicked");
        router.push(url);
    };

    return (
        <Button onClick={handleUpgradeClick} className="relative overflow-hidden bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:from-purple-600 hover:via-pink-600 hover:to-red-600 text-white font-bold py-2 px-4 rounded">
            <span className="relative z-10">Upgrade</span>
            <span className="absolute inset-0 h-full w-full bg-white opacity-0 hover:opacity-20 transition-opacity duration-300 ease-in-out"></span>
            <span className="absolute top-0 left-0 w-4 h-4 bg-white rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse"></span>
            <span className="absolute bottom-0 right-0 w-4 h-4 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse"></span>
        </Button>
    );
}