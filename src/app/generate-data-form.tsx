"use client";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function GenerateDataForm() {
    const createData = useMutation(api.placeholder_data.makeData);

    return (
        <form onSubmit={async (e) => {
            e.preventDefault();
            const form = e.target as HTMLFormElement;
            const formData = new FormData(form);
            const title = formData.get("title") as string;
            await createData({ title });
            form.reset();
        }}>
            <div className="gap-5">
                <label htmlFor="title">Enter a title: </label>
                <input type="text" name="title" className="border border-gray-300 rounded-md p-2" />
            </div>
        </form>
    )
}
