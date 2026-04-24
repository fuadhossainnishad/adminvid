import { useEffect, useState } from "react";
import apiList from "@/services/api/apiList";
import apiCall, { TMethods } from "@/services/api/apiMethodList";
import { IRecentSignup } from "@/app/(admin)/users/_components/UserTable";
import { mapUsersResponseToUsers } from "../mapper/user.mapper";

export default function useUsers() {
    const [users, setUsers] = useState<IRecentSignup[]>([]);

    const handleFetchUsers = async () => {
        try {
            const res = await apiCall(TMethods.get, apiList.user, {});

            if (res?.success && Array.isArray(res.results)) {
                const mappedUsers = mapUsersResponseToUsers(res.results);
                setUsers(mappedUsers);
            } else {
                setUsers([]);
            }
        } catch (error) {
            console.error("Failed to fetch users", error);
            setUsers([]);
        }
    };

    useEffect(() => {
        handleFetchUsers();
    }, []);

    return { users };
}