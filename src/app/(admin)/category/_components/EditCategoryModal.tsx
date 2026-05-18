"use client";

import { Input } from "@/components/ui/input";
import { CategoryItem } from "@/services/category/category.type";
import { useEffect, useState } from "react";

interface Props {
    open: boolean;
    item: CategoryItem | null;
    onClose: () => void;
    onSubmit: (
        id: number,
        payload: { name: string },
    ) => Promise<void>;
}

export default function EditCategoryModal({
    open,
    item,
    onClose,
    onSubmit,
}: Props) {
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (item) {
            setName(item.name);
        }
    }, [item]);

    if (!open || !item) return null;

    const handleSubmit = async () => {
        try {
            setLoading(true);

            await onSubmit(item.id, { name });

            onClose();
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="w-full max-w-md rounded-2xl bg-white p-6">
                <h2 className="mb-5 text-xl font-semibold">
                    Edit Category
                </h2>

                <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-xl border border-zinc-300 px-4 py-3 outline-none focus:border-black"
                />

                <div className="mt-6 flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="rounded-xl border px-5 py-2"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="rounded-xl bg-black px-5 py-2 text-white"
                    >
                        {loading ? "Saving..." : "Save"}
                    </button>
                </div>
            </div>
        </div>
    );
}