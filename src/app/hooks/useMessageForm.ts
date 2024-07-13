import { useState, useEffect } from 'react';
import useFetchCampaigns from './useFetchCampaigns';
import { fetchMessagesByCampaignId } from '@/lib/api/oktopostApi';

const useMessageForm = () => {
    const { campaigns, error: campaignsError } = useFetchCampaigns();
    const [formData, setFormData] = useState({
        campaign: '',
        network: '',
        fromDate: null as Date | null,
        toDate: null as Date | null,
    });
    const [messages, setMessages] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [shouldFetchMessages, setShouldFetchMessages] = useState(false);

    const handleChange = (field: string) => (value: string) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleDateChange = (field: string) => (date: Date | null) => {
        setFormData({ ...formData, [field]: date });
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        setShouldFetchMessages(true);
    };

    useEffect(() => {
        if (shouldFetchMessages) {
            const fetchMessages = async () => {
                try {
                    const messages = await fetchMessagesByCampaignId(
                        formData.campaign,
                        formData.network,
                        formData.fromDate?.toISOString() || '',
                        formData.toDate?.toISOString() || ''
                    );
                    setMessages(messages);
                    setShouldFetchMessages(false);
                } catch (err) {
                    if (err instanceof Error) {
                        setError(err.message);
                    } else {
                        setError('An unknown error occurred');
                    }
                    setShouldFetchMessages(false);
                }
            };
            fetchMessages();
        }
    }, [shouldFetchMessages, formData.campaign, formData.network, formData.fromDate, formData.toDate]);

    const options = {
        campaigns: campaigns.map((c) => ({ value: c.Id, label: c.Name })),
        networks: [
            { value: 'LinkedIn', label: 'LinkedIn' },
            { value: 'Facebook', label: 'Facebook' },
            { value: 'Twitter', label: 'Twitter' },
        ],
    };

    return { formData, handleChange, handleDateChange, handleSubmit, options, messages, error };
};

export default useMessageForm;
