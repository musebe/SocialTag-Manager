import { useState, useEffect } from 'react';

const useFetchMessagesById = (messageId: string) => {
    const [message, setMessage] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMessage = async () => {
            try {
                const response = await fetch(`/api/oktopost/fetchMessagesById?messageId=${messageId}`);
                const data = await response.json();
                if (response.ok) {
                    setMessage(data);
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

        fetchMessage();
    }, [messageId]);

    return { message, error };
};

export default useFetchMessagesById;
