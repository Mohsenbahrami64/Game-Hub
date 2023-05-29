import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from 'axios'

export interface Genre {
    id: number;
    name: string;
}

interface fetchGenresResponse {
    count: number;
    results: Genre[];
}

const useGenres = () => {
    const [genres, setGenres] = useState<Genre[]>([]);
    const [error, setError] = useState("");
    const [isLoding, setLoding] = useState(false);

    useEffect(() => {
        const controller = new AbortController();
        setLoding(true);
        apiClient
            .get<fetchGenresResponse>("genres", { signal: controller.signal })
            .then((res) => {
                setGenres(res.data.results),
                    setLoding(false)
            })
            .catch((err) => {
                if (err instanceof CanceledError) return;
                setError(err.message);
                setLoding(false);
            })

        return () => controller.abort();
    }, []);

    return { genres, error, isLoding }
}

export default useGenres;