import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from 'axios'

export interface Game {
    id: number;
    name: string;
    background_image: string;
    parent_platforms: { platform: PlatForm }[];
    metacritic: number;
}
interface fetchGameResponse {
    count: number;
    results: Game[];
}
export interface PlatForm {
    id: number;
    name: string;
    slug: string;
}
const useGames = () => {
    const [games, setGame] = useState<Game[]>([]);
    const [error, setError] = useState("");
    const [isLoding, setLoding] = useState(false);

    useEffect(() => {
        const controller = new AbortController();
        setLoding(true);
        apiClient
            .get<fetchGameResponse>("games", { signal: controller.signal })
            .then((res) => {
                setGame(res.data.results),
                    setLoding(false)
            })
            .catch((err) => {
                if (err instanceof CanceledError) return;
                setError(err.message);
                setLoding(false);
            })

        return () => controller.abort();
    }, []);

    return { games, error, isLoding }
}

export default useGames;