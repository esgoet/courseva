import axiosInstance from "../api/axiosInstance.ts";
import {useEffect, useState} from "react";
import {AxiosResponse} from "axios";
import {AppUser} from "../types/userTypes.ts";

export const useDataArray = <T>(endpoint: string, userDependency?: (AppUser | null | undefined)) => {
    const [data, setData] = useState<T[]>([]);
    const [error, setError] = useState<Error>();
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (endpoint) {
            const controller = new AbortController();
            setLoading(true);
            axiosInstance.get(endpoint)
                .then((response: AxiosResponse<T[]>)=> {
                    setData(response.data)
                })
                .catch((error) => {
                    setError(error);
                })
                .finally(() => setLoading(false));
            return () => controller.abort();
        }
    }, userDependency ? [endpoint, userDependency] : [endpoint]);
    return {data, setData, loading, error};
}