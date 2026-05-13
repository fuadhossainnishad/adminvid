"use client";

import { IVideo } from "@/services/video/video.type";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface VideoFormValues {
    title: string;
    description: string;
    thumbnail: FileList;
    video_file: FileList;
}

interface Props {
    open: boolean;
    mode: "create" | "edit" | "view";
    initialData?: IVideo | null;
    onClose: () => void;
    onSubmit: (formData: FormData) => Promise<void>;
}

export default function VideoModal({
    open,
    mode,
    initialData,
    onClose,
    onSubmit,
}: Props) {
    const isView = mode === "view";

    const {
        register,
        handleSubmit,
        reset,
        setValue,
    } = useForm<VideoFormValues>();

    const [preview, setPreview] = useState<IVideo | null>(null);

    useEffect(() => {
        if (initialData) {
            setValue("title", initialData.title);
            setValue("description", initialData.description);
            setPreview(initialData);
        } else {
            reset();
            setPreview(null);
        }
    }, [initialData]);

    const submit = async (data: VideoFormValues) => {
        if (isView) return;

        const formData = new FormData();

        formData.append("title", data.title);
        formData.append("description", data.description);

        const thumbnail = data.thumbnail?.item(0);
        const video = data.video_file?.item(0);

        if (thumbnail) formData.append("thumbnail", thumbnail);
        if (video) formData.append("video_file", video);

        await onSubmit(formData);

        reset();
        onClose();
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white w-[800px] p-6 rounded-xl space-y-6">

                <h2 className="text-lg font-semibold">
                    {mode === "create"
                        ? "Upload Video"
                        : mode === "edit"
                            ? "Edit Video"
                            : "View Video"}
                </h2>

                {isView ? (
                    <div>
                        <p><b>Title:</b> {preview?.title}</p>
                        <p><b>Description:</b> {preview?.description}</p>

                        {preview?.thumbnail && (
                            <Image
                                src={preview.thumbnail}
                                alt="video thumbnail"
                                width={128}
                                height={128}
                                className="w-32 h-32 object-cover"
                            />
                        )}

                        <button onClick={onClose} className="mt-4">
                            Close
                        </button>
                    </div>
                ) : (
                    <form
                        onSubmit={handleSubmit(submit)}
                        className="grid grid-cols-2 gap-4"
                    >
                        <input
                            className="border p-2"
                            placeholder="Title"
                            {...register("title", { required: true })}
                        />

                        <textarea
                            className="border p-2"
                            placeholder="Description"
                            {...register("description", { required: true })}
                        />

                        <input type="file" {...register("thumbnail")} />
                        <input type="file" {...register("video_file")} />

                        <div className="col-span-2 flex justify-end gap-3">
                            <button type="button" onClick={onClose}>
                                Cancel
                            </button>

                            <button className="bg-blue-600 text-white px-4 py-2 rounded">
                                {mode === "edit" ? "Update" : "Upload"}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}