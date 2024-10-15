"use client";
import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import PayButton from "./pay-button";

export default function GenerateDataForm() {
    const createData = useMutation(api.placeholder_data.makeData);
    const user = useQuery(api.users.getUser);
    const [showModal, setShowModal] = useState(false);

    const isPremium = user && user.isPremium;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        const title = formData.get("title") as string;

        if (isPremium) {
            await createData({ title });
            form.reset();
        } else {
            setShowModal(true);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="flex items-center gap-5">
                    <label htmlFor="title">Enter a title: </label>
                    <input 
                        type="text" 
                        name="title" 
                        className="border border-gray-300 rounded-md p-2 flex-grow" 
                    />
                    <Button type="submit">Generate</Button>
                </div>
            </form>

            <Dialog open={showModal} onOpenChange={setShowModal}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Premium Feature</DialogTitle>
                        <DialogDescription>
                            Generating data is a premium feature. Upgrade your account to access this functionality.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="secondary" onClick={() => setShowModal(false)}>
                            Cancel
                        </Button>
                        <PayButton />
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}