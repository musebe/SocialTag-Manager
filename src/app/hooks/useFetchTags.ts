import { useState, useEffect } from 'react';

const useFetchTags = () => {
    const [tags, setTags] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTags = async () => {
            try {
                const response = await fetch('/api/oktopost/fetchTags');
                const data = await response.json();
                if (response.ok) {
                    setTags(data);
                } else {
                    setError(data.error);
                }
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('An unknown error occurred');
                }
            }
        };

        fetchTags();
    }, []);

    return { tags, error };
};

export default useFetchTags;
