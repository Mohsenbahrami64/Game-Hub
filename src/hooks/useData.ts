import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { AxiosRequestConfig, CanceledError } from 'axios'

export interface Genre {
    id: number;
    name: string;
}

interface fetchResponse<T> {
    count: number;
    results: T[];
}

const useData = <T>(endpoint: string, requestConfig?: AxiosRequestConfig, deps?: any[]) => {
    const [data, setData] = useState<T[]>([]);
    const [error, setError] = useState("");
    const [isLoding, setLoding] = useState(false);

    useEffect(() => {
        const controller = new AbortController();
        setLoding(true);
        apiClient
            .get<fetchResponse<T>>(endpoint, { signal: controller.signal, ...requestConfig })
            .then((res) => {
                setData(res.data.results),
                    setLoding(false)
            })
            .catch((err) => {
                if (err instanceof CanceledError) return;
                setError(err.message);
                setLoding(false);
            })

        return () => controller.abort();
    }, deps ? [...deps] : []);

    return { data, error, isLoding }
}

export default useData;