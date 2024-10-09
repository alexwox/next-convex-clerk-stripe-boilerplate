
"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";
import { TrashIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRef } from "react";

export default function DisplayData() {
    const placeholders = useQuery(api.placeholder_data.getData);
    const deletePlaceholders = useMutation(api.placeholder_data.deleteData);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const lastChecked = useRef<string | null>(null);

    const handleCheckboxChange = (id: string, isChecked: boolean, event: React.MouseEvent) => {
        if ('shiftKey' in event && event.shiftKey && lastChecked.current) {
            const currentIndex = placeholders!.findIndex(p => p._id === id);
            const lastIndex = placeholders!.findIndex(p => p._id === lastChecked.current);
            const start = Math.min(currentIndex, lastIndex);
            const end = Math.max(currentIndex, lastIndex);

            const newSelectedIds = new Set(selectedIds);
            for (let i = start; i <= end; i++) {
                if (isChecked) {
                    newSelectedIds.add(placeholders![i]._id);
                } else {
                    newSelectedIds.delete(placeholders![i]._id);
                }
            }
            setSelectedIds(Array.from(newSelectedIds));
        } else {
            setSelectedIds(prev =>
                isChecked ? [...prev, id] : prev.filter(item => item !== id)
            );
        }
        lastChecked.current = id;
    };

    const handleRowClick = (id: string, isChecked: boolean, event: React.MouseEvent) => {
        handleCheckboxChange(id, !isChecked, event);
    };

    const handleDelete = async () => {
        if (selectedIds.length === 0) return;
        for (const id of selectedIds) {
            await deletePlaceholders({ id: id as Id<"placeholder_data"> });
        }
        setSelectedIds([]);
    };

    return (
        <div className="flex flex-col">
            <div className="flex justify-end mb-4">
                <Button
                    onClick={handleDelete}
                    disabled={selectedIds.length === 0}
                    className="flex items-center"
                    variant="destructive"
                >
                    <TrashIcon className="w-4 h-4 mr-2" /> Delete Selected ({selectedIds.length})
                </Button>
            </div>
            {placeholders?.map((placeholder) => (
                <div
                    key={placeholder._id}
                    className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={(e) => handleRowClick(placeholder._id, selectedIds.includes(placeholder._id), e)}
                >
                    <input
                        type="checkbox"
                        checked={selectedIds.includes(placeholder._id)}
                        className="mr-2"
                        onClick={(e) => e.stopPropagation()}
                    />
                    <span>{placeholder.title}</span>
                </div>
            ))}
        </div>
    );
}