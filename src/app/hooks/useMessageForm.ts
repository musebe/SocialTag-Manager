import { useState, useEffect } from 'react';
import useFetchCampaigns from './useFetchCampaigns';
import { fetchMessagesByCampaignId } from '@/lib/api/oktopostApi';
import { useToast } from './useToast';

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
    const [isFetching, setIsFetching] = useState(false);
    const { showSuccess, showError, showInfo, dismiss } = useToast();

    const handleChange = (field: string) => (value: string) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleDateChange = (field: string) => (date: Date | null) => {
        setFormData({ ...formData, [field]: date });
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setIsFetching(true);
        showInfo('Fetching messages...');
        try {
            const messages = await fetchMessagesByCampaignId(
                formData.campaign,
                formData.network,
                formData.fromDate?.toISOString() || '',
                formData.toDate?.toISOString() || ''
            );
            setMessages(messages);
            dismiss();
            showSuccess('Messages fetched successfully');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred');
            dismiss();
            showError('Failed to fetch messages', err instanceof Error ? err.message : undefined);
        } finally {
            setIsFetching(false);
        }
    };

    useEffect(() => {
        if (campaignsError) {
            setError(campaignsError);
        }
    }, [campaignsError]);

    const options = {
        campaigns: campaigns.map((c) => ({ value: c.Id, label: c.Name })),
        networks: [
            { value: 'LinkedIn', label: 'LinkedIn' },
            { value: 'Facebook', label: 'Facebook' },
            { value: 'Twitter', label: 'Twitter' },
        ],
    };

    return { formData, handleChange, handleDateChange, handleSubmit, options, messages, error, isFetching };
};

export default useMessageForm;
