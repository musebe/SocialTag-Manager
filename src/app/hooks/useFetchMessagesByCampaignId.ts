import { useState, useEffect } from 'react';

const useFetchMessagesByCampaignId = (campaignId: string, network: string, from: string, to: string) => {
    const [messages, setMessages] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [shouldFetch, setShouldFetch] = useState(false);

    useEffect(() => {
        if (!shouldFetch) return;

        if (!campaignId || !network || !from || !to) {
            setError('Missing required query parameters: campaignId, network, from, to');
            console.log('Missing required query parameters:', { campaignId, network, from, to });
            return;
        }

        const fetchMessages = async () => {
            console.log('Fetching with params:', { campaignId, network, from, to }); // Log fetch parameters
            try {
                const response = await fetch(`/api/oktopost/fetchMessagesByCampaignId?campaignId=${campaignId}&network=${network}&from=${from}&to=${to}`);
                const data = await response.json();
                if (response.ok) {
                    setMessages(data);
                    setError(null);
                    console.log('Fetched messages:', data); // Log fetched data
                } else {
                    setError(data.error || 'An unknown error occurred');
                    console.log('Error response:', data.error); // Log error response
                }
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                    console.log('Fetch error:', err.message); // Log fetch error
                } else {
                    setError('An unknown error occurred');
                    console.log('Unknown fetch error'); // Log unknown fetch error
                }
            }
        };

        fetchMessages();
        setShouldFetch(false); // Reset shouldFetch after fetching
    }, [shouldFetch, campaignId, network, from, to]);

    return { messages, error, setShouldFetch };
};

export default useFetchMessagesByCampaignId;
