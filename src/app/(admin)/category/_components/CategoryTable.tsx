"use client";

import { Button } from "@/components/ui/button";
import { CategoryItem } from "@/services/category/category.type";
import { Pencil, Trash2 } from "lucide-react";

interface Props {
    data: CategoryItem[];
    onEdit: (item: CategoryItem) => void;
    onDelete: (item: CategoryItem) => void;
}

export default function CategoryTable({
    data,
    onEdit,
    onDelete,
}: Props) {
    return (
        <div className="overflow-hidden rounded-xl border border-zinc-200">
            <table className="w-full">
                <thead className="bg-zinc-100">
                    <tr>
                        <th className="px-5 py-4 text-left text-sm font-semibold text-zinc-700">
                            ID
                        </th>

                        <th className="px-5 py-4 text-left text-sm font-semibold text-zinc-700">
                            Name
                        </th>

                        <th className="px-5 py-4 text-right text-sm font-semibold text-zinc-700">
                            Actions
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {data.map((item) => (
                        <tr
                            key={item.id}
                            className="border-t border-zinc-200"
                        >
                            <td className="px-5 py-4 text-sm text-zinc-600">
                                {item.id}
                            </td>

                            <td className="px-5 py-4 font-medium text-zinc-900">
                                {item.name}
                            </td>

                            <td className="px-5 py-4">
                                <div className="flex justify-end gap-2">
                                    <Button
                                        onClick={() => onEdit(item)}
                                        className="rounded-lg border border-zinc-200 p-2 transition hover:bg-zinc-100"
                                    >
                                        <Pencil size={18} />
                                    </Button>

                                    <Button
                                        onClick={() => onDelete(item)}
                                        className="rounded-lg border border-red-200 p-2 text-red-600 transition hover:bg-red-50"
                                    >
                                        <Trash2 size={18} />
                                    </Button>
                                </div>
                            </td>
                        </tr>
                    ))}

                    {!data.length && (
                        <tr>
                            <td
                                colSpan={3}
                                className="py-10 text-center text-zinc-500"
                            >
                                No data found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}