import apiList from "@/services/api/apiList";
import apiCall, { TMethods } from "@/services/api/apiMethodList";
import { useEffect, useState } from "react";

export interface ISettings {
    id?: number;
    key: "privacy_policy" | "terms_conditions" | "about_us";
    title: string;
    content: string;
}

const useSettings = (key: ISettings["key"]) => {
    const [settings, setSettings] = useState<ISettings | null>(null);
    const [loading, setLoading] = useState(false);



    const handleSaveChanges = async (content: string) => {
        if (!settings?.id) return;

        const payload = {
            key: settings.key,
            title: settings.title,
            content,
        };

        const res = await apiCall(
            TMethods.patch,
            apiList.updateSettings(settings.id),
            payload
        );

        if (res?.success) {
            setSettings(res.data);
        }
    };

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                setLoading(true);

                const res = await apiCall(TMethods.get, apiList.settings, { key });

                if (res?.success) {
                    setSettings(res.data);
                }
            } finally {
                setLoading(false);
            }
        };
        fetchSettings();
    }, [key]);

    return { settings, loading, handleSaveChanges };
};

export default useSettings;