"use client";

import { profileService } from "@/services/profile/profile.service";
import { IUserProfile } from "@/services/profile/profile.type";
import {
    useCallback,
    useEffect,
    useState,
} from "react";

import { toast } from "sonner";



export const useProfile = (
    userId: number,
) => {
    const [profile, setProfile] =
        useState<IUserProfile | null>(null);

    const [loading, setLoading] =
        useState(true);

    const [updating, setUpdating] =
        useState(false);

    const fetchProfile =
        useCallback(async () => {
            try {
                setLoading(true);

                const data =
                    await profileService.getProfile(
                        userId,
                    );

                setProfile(data);
            } catch {
                toast.error(
                    "Failed to fetch profile",
                );
            } finally {
                setLoading(false);
            }
        }, [userId]);

    useEffect(() => {
        fetchProfile();
    }, [fetchProfile]);

    const updateProfile = async (
        formData: FormData,
    ) => {
        try {
            setUpdating(true);

            const updated =
                await profileService.updateProfile(
                    userId,
                    formData,
                );

            setProfile(updated);

            toast.success(
                "Profile updated successfully",
            );
        } catch {
            toast.error(
                "Failed to update profile",
            );
        } finally {
            setUpdating(false);
        }
    };

    return {
        profile,
        loading,
        updating,
        updateProfile,
    };
};