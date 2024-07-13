import { useState } from 'react';

const useUpdateMessageTags = () => {
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);

    const updateMessageTags = async (id: string, tags: string[]) => {
        try {
            const response = await fetch('/api/oktopost/updateMessageTags', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id, tags }),
            });
            const data = await response.json();
            if (response.ok) {
                setSuccess(true);
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

    return { updateMessageTags, success, error };
};

export default useUpdateMessageTags;
