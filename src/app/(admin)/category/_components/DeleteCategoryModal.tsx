"use client";

interface Props {
    open: boolean;
    title: string;
    loading: boolean;
    onClose: () => void;
    onConfirm: () => Promise<void>;
}

export default function DeleteCategoryModal({
    open,
    title,
    loading,
    onClose,
    onConfirm,
}: Props) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="w-full max-w-md rounded-2xl bg-white p-6">
                <h2 className="text-xl font-semibold text-zinc-900">
                    Delete Category
                </h2>

                <p className="mt-3 text-zinc-600">
                    Are you sure you want to delete{" "}
                    <span className="font-semibold">{title}</span>?
                </p>

                <div className="mt-6 flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="rounded-xl border px-5 py-2"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={onConfirm}
                        disabled={loading}
                        className="rounded-xl bg-red-600 px-5 py-2 text-white"
                    >
                        {loading ? "Deleting..." : "Delete"}
                    </button>
                </div>
            </div>
        </div>
    );
}