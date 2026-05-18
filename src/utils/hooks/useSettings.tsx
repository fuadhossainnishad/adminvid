"use client";

import { useCallback, useEffect, useState } from "react";

import axiosInstance from "@/config/axios.config";

export interface ISettings {
    id?: number;
    key:
    | "privacy_policy"
    | "terms_conditions"
    | "about_us";
    title: string;
    content: string;
}

interface ISettingsResponse {
    code: number;
    success: boolean;
    message: string;
    timestamp: number;
    data: ISettings;
}

const useSettings = (
    key: ISettings["key"],
) => {
    /*
    |--------------------------------------------------------------------------
    | STATE
    |--------------------------------------------------------------------------
    */

    const [settings, setSettings] =
        useState<ISettings | null>(
            null,
        );

    const [loading, setLoading] =
        useState(false);

    const [saving, setSaving] =
        useState(false);

    /*
    |--------------------------------------------------------------------------
    | FETCH SETTINGS
    |--------------------------------------------------------------------------
    */

    const fetchSettings =
        useCallback(async () => {
            try {
                setLoading(true);

                const response =
                    await axiosInstance.get<ISettingsResponse>(
                        `/system/legal/${key}/`,
                    );

                if (
                    response.data.success
                ) {
                    setSettings(
                        response.data.data,
                    );
                }
            } catch (error) {
                console.error(
                    "Failed to fetch settings:",
                    error,
                );
            } finally {
                setLoading(false);
            }
        }, [key]);

    /*
    |--------------------------------------------------------------------------
    | INITIAL FETCH
    |--------------------------------------------------------------------------
    */

    useEffect(() => {
        fetchSettings();
    }, [fetchSettings]);

    /*
    |--------------------------------------------------------------------------
    | SAVE SETTINGS
    |--------------------------------------------------------------------------
    */

    const handleSaveChanges =
        async (
            content: string,
        ) => {
            if (!settings?.id) return;

            try {
                setSaving(true);

                const payload = {
                    key: settings.key,

                    title:
                        settings.title,

                    content,
                };

                const response =
                    await axiosInstance.patch<ISettingsResponse>(
                        `/system/admin/settings/${settings.id}/`,
                        payload,
                    );

                if (
                    response.data.success
                ) {
                    setSettings(
                        response.data.data,
                    );
                }

                return response.data;
            } catch (error) {
                console.error(
                    "Failed to save settings:",
                    error,
                );

                throw error;
            } finally {
                setSaving(false);
            }
        };

    return {
        settings,

        loading,

        saving,

        handleSaveChanges,
    };
};

export default useSettings;