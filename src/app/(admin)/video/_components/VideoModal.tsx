"use client";

import React, {
    useEffect,
    useMemo,
    useState,
} from "react";

import Image from "next/image";

import {
    X,
    Upload,
    Video,
    ImageIcon,
    Crown,
} from "lucide-react";

import { useForm } from "react-hook-form";

import { IVideo } from "@/services/video/video.type";
import { Button } from "@/components/ui/button";

interface VideoFormValues {
    title: string;
    description: string;
    thumbnail: FileList;
    video_file: FileList;
    is_premium: boolean;
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
    const isEdit = mode === "edit";

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        watch,
        formState: { isSubmitting },
    } = useForm<VideoFormValues>({
        defaultValues: {
            title: "",
            description: "",
            is_premium: false,
        },
    });

    const [thumbnailPreview, setThumbnailPreview] =
        useState<string | null>(null);

    const [videoPreview, setVideoPreview] =
        useState<string | null>(null);

    const watchedThumbnail = watch("thumbnail");
    const watchedVideo = watch("video_file");

    /*
    |--------------------------------------------------------------------------
    | Existing Data
    |--------------------------------------------------------------------------
    */

    useEffect(() => {
        if (!initialData) {
            reset();

            setThumbnailPreview(null);
            setVideoPreview(null);

            return;
        }

        setValue("title", initialData.title);
        setValue("description", initialData.description);

        setValue(
            "is_premium",
            initialData.is_premium,
        );

        setThumbnailPreview(initialData.thumbnail);

        setVideoPreview(initialData.video_file);
    }, [initialData, reset, setValue]);

    /*
    |--------------------------------------------------------------------------
    | Thumbnail Preview
    |--------------------------------------------------------------------------
    */

    useEffect(() => {
        const file = watchedThumbnail?.[0];

        if (!file) return;

        const objectUrl = URL.createObjectURL(file);

        setThumbnailPreview(objectUrl);

        return () => URL.revokeObjectURL(objectUrl);
    }, [watchedThumbnail]);

    /*
    |--------------------------------------------------------------------------
    | Video Preview
    |--------------------------------------------------------------------------
    */

    useEffect(() => {
        const file = watchedVideo?.[0];

        if (!file) return;

        const objectUrl = URL.createObjectURL(file);

        setVideoPreview(objectUrl);

        return () => URL.revokeObjectURL(objectUrl);
    }, [watchedVideo]);

    /*
    |--------------------------------------------------------------------------
    | Submit
    |--------------------------------------------------------------------------
    */

    const submit = async (
        data: VideoFormValues,
    ) => {
        if (isView) return;

        const formData = new FormData();

        formData.append("title", data.title);

        formData.append(
            "description",
            data.description,
        );

        formData.append(
            "is_premium",
            String(data.is_premium),
        );

        const thumbnail =
            data.thumbnail?.item(0);

        const video =
            data.video_file?.item(0);

        if (thumbnail) {
            formData.append(
                "thumbnail",
                thumbnail,
            );
        }

        if (video) {
            formData.append(
                "video_file",
                video,
            );
        }

        await onSubmit(formData);

        reset();

        onClose();
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
            <div className="relative flex max-h-[95vh] w-full max-w-7xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl">

                {/* HEADER */}

                <div className="flex items-center justify-between border-b border-neutral-200 px-8 py-5">
                    <div>
                        <h2 className="text-2xl font-bold text-neutral-900">
                            {mode === "create"
                                ? "Upload Video"
                                : mode === "edit"
                                    ? "Edit Video"
                                    : "Video Details"}
                        </h2>

                        <p className="mt-1 text-sm text-neutral-500">
                            Manage video content and media assets
                        </p>
                    </div>

                    <Button
                        onClick={onClose}
                        className="rounded-xl p-2 transition hover:bg-neutral-100"
                    >
                        <X size={22} />
                    </Button>
                </div>

                {/* BODY */}

                <div className="grid flex-1 overflow-y-auto lg:grid-cols-[1.2fr_0.8fr]">

                    {/* LEFT SIDE */}

                    <div className="space-y-6 p-8">

                        {/* VIDEO */}

                        <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-black">
                            {videoPreview ? (
                                <video
                                    controls
                                    className="aspect-video w-full"
                                >
                                    <source
                                        src={videoPreview}
                                    />
                                </video>
                            ) : (
                                <div className="flex aspect-video items-center justify-center text-white">
                                    <div className="flex flex-col items-center gap-3">
                                        <Video size={48} />
                                        <p>No video selected</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* THUMBNAIL */}

                        <div className="rounded-2xl border border-neutral-200 p-4">
                            <p className="mb-4 text-sm font-semibold text-neutral-700">
                                Thumbnail Preview
                            </p>

                            {thumbnailPreview ? (
                                <div className="relative h-60 overflow-hidden rounded-xl">
                                    <Image
                                        src={thumbnailPreview}
                                        alt="thumbnail"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            ) : (
                                <div className="flex h-60 items-center justify-center rounded-xl border border-dashed border-neutral-300">
                                    <div className="flex flex-col items-center gap-2 text-neutral-500">
                                        <ImageIcon size={36} />
                                        <p>No thumbnail selected</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* RIGHT SIDE */}

                    <div className="border-l border-neutral-200 bg-neutral-50">
                        <form
                            onSubmit={handleSubmit(submit)}
                            className="flex h-full flex-col"
                        >
                            <div className="flex-1 space-y-6 overflow-y-auto p-8">

                                {/* TITLE */}

                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-neutral-700">
                                        Video Title
                                    </label>

                                    <input
                                        disabled={isView}
                                        placeholder="Enter video title"
                                        className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 outline-none transition focus:border-black disabled:bg-neutral-100"
                                        {...register("title", {
                                            required: true,
                                        })}
                                    />
                                </div>

                                {/* DESCRIPTION */}

                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-neutral-700">
                                        Description
                                    </label>

                                    <textarea
                                        disabled={isView}
                                        rows={6}
                                        placeholder="Write video description..."
                                        className="w-full resize-none rounded-xl border border-neutral-300 bg-white px-4 py-3 outline-none transition focus:border-black disabled:bg-neutral-100"
                                        {...register(
                                            "description",
                                            {
                                                required: true,
                                            },
                                        )}
                                    />
                                </div>

                                {/* PREMIUM */}

                                <div className="rounded-2xl border border-neutral-200 bg-white p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="rounded-xl bg-amber-100 p-3">
                                            <Crown
                                                className="text-amber-600"
                                                size={20}
                                            />
                                        </div>

                                        <div className="flex-1">
                                            <p className="font-semibold">
                                                Premium Content
                                            </p>

                                            <p className="text-sm text-neutral-500">
                                                Restrict this video
                                                to premium users
                                            </p>
                                        </div>

                                        <input
                                            type="checkbox"
                                            disabled={isView}
                                            className="h-5 w-5"
                                            {...register(
                                                "is_premium",
                                            )}
                                        />
                                    </div>
                                </div>

                                {/* THUMBNAIL INPUT */}

                                {!isView && (
                                    <div className="space-y-3">
                                        <label className="text-sm font-semibold text-neutral-700">
                                            Thumbnail Image
                                        </label>

                                        <label className="flex cursor-pointer items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-neutral-300 bg-white px-5 py-10 transition hover:border-black">
                                            <Upload size={20} />

                                            <span className="font-medium">
                                                Upload Thumbnail
                                            </span>

                                            <input
                                                type="file"
                                                accept="image/*"
                                                hidden
                                                {...register(
                                                    "thumbnail",
                                                )}
                                            />
                                        </label>
                                    </div>
                                )}

                                {/* VIDEO INPUT */}

                                {!isView && (
                                    <div className="space-y-3">
                                        <label className="text-sm font-semibold text-neutral-700">
                                            Video File
                                        </label>

                                        <label className="flex cursor-pointer items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-neutral-300 bg-white px-5 py-10 transition hover:border-black">
                                            <Video size={20} />

                                            <span className="font-medium">
                                                Upload Video
                                            </span>

                                            <input
                                                type="file"
                                                accept="video/*"
                                                hidden
                                                {...register(
                                                    "video_file",
                                                )}
                                            />
                                        </label>
                                    </div>
                                )}

                                {/* INFO */}

                                {initialData && (
                                    <div className="rounded-2xl border border-neutral-200 bg-white p-5">
                                        <h3 className="mb-4 font-semibold">
                                            Metadata
                                        </h3>

                                        <div className="space-y-3 text-sm">
                                            <div className="flex justify-between">
                                                <span className="text-neutral-500">
                                                    Video ID
                                                </span>

                                                <span className="font-medium">
                                                    #{initialData.id}
                                                </span>
                                            </div>

                                            <div className="flex justify-between">
                                                <span className="text-neutral-500">
                                                    Upload Date
                                                </span>

                                                <span className="font-medium">
                                                    {new Date(
                                                        initialData.upload_date,
                                                    ).toLocaleDateString()}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* FOOTER */}

                            {!isView && (
                                <div className="sticky bottom-0 flex items-center justify-end gap-4 border-t border-neutral-200 bg-white px-8 py-5">
                                    <button
                                        type="button"
                                        onClick={onClose}
                                        className="rounded-xl border border-neutral-300 px-6 py-3 font-medium transition hover:bg-neutral-100"
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        disabled={isSubmitting}
                                        className="rounded-xl bg-black px-6 py-3 font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
                                    >
                                        {isSubmitting
                                            ? "Processing..."
                                            : isEdit
                                                ? "Update Video"
                                                : "Upload Video"}
                                    </button>
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}