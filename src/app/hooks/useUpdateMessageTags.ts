import { useState } from 'react';

const useUpdateMessageTags = () => {
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);

    const updateMessageTags = async (id: string, tags: string[], callback?: (success: boolean, error?: string) => void) => {
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
                if (callback) callback(true);
            } else {
                setError(data.error);
                if (callback) callback(false, data.error);
            }
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
            setError(errorMessage);
            if (callback) callback(false, errorMessage);
        }
    };

    return { updateMessageTags, success, error };
};

export default useUpdateMessageTags;
