import { useEffect, useState } from "react";

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(url);
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await res.json();
                if (data) {
                    setIsPending(false);
                    setError(null);
                    setData(data);
                }
            }
            catch (error) {
                setIsPending(false);
                setError(error.message);
                setData(null);
            }
        }
        fetchData();
    }, [url]);
    return { data, isPending, error }
}

export default useFetch;