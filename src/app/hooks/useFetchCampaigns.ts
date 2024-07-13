import { useState, useEffect } from 'react';

const useFetchCampaigns = () => {
    const [campaigns, setCampaigns] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCampaigns = async () => {
            try {
                const response = await fetch('/api/oktopost/fetchCampaigns');
                const data = await response.json();
                if (response.ok) {
                    setCampaigns(data);
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

        fetchCampaigns();
    }, []);

    return { campaigns, error };
};

export default useFetchCampaigns;
