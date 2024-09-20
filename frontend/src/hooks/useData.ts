import axiosInstance from "../api/axiosInstance.ts";
import {useEffect, useState} from "react";
import {AxiosResponse} from "axios";

export const useData = <T>(endpoint: string) => {
    const [data, setData] = useState<T[]>([]);
    const [error, setError] = useState<Error>();
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (endpoint) {
            const controller = new AbortController();
            setLoading(true);
            axiosInstance.get(endpoint)
                .then((response: AxiosResponse<T[]>)=> setData(response.data))
                .catch((error) => {
                    setError(error);
                })
                .finally(() => setLoading(false));
            return () => controller.abort();
        }
    }, [endpoint]);
    return {data, error, loading};
}
