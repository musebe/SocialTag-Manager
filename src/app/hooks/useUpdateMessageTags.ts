import { useState, useCallback } from 'react';

const useUpdateMessageTags = () => {
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);

    const updateMessageTags = useCallback(async (id: string, tags: string[]) => {
        setError(null);  // Reset error state on new request
        setSuccess(false);  // Reset success state on new request
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
                setError(data.error || 'Failed to update tags');
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred');
        }
    }, []);

    return { updateMessageTags, success, error, setError, setSuccess };
};

export default useUpdateMessageTags;
