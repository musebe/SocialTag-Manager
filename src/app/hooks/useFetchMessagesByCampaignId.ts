import { useState, useEffect } from 'react';

const useFetchMessagesByCampaignId = (campaignId: string, network: string, from: string, to: string) => {
    const [messages, setMessages] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await fetch(`/api/oktopost/fetchMessagesByCampaignId?campaignId=${campaignId}&network=${network}&from=${from}&to=${to}`);
                const data = await response.json();
                if (response.ok) {
                    setMessages(data);
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

        fetchMessages();
    }, [campaignId, network, from, to]);

    return { messages, error };
};

export default useFetchMessagesByCampaignId;
