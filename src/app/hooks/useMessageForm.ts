import { useState, useEffect } from 'react';
import useFetchCampaigns from './useFetchCampaigns';
import useFetchMessagesByCampaignId from './useFetchMessagesByCampaignId';
import { useToast } from './useToast';

const useMessageForm = () => {
    const { campaigns, error: campaignsError } = useFetchCampaigns();
    const [formData, setFormData] = useState({
        campaign: '',
        network: '',
        fromDate: null as Date | null,
        toDate: null as Date | null,
    });
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { showSuccess, showError, showInfo, dismiss } = useToast();

    const { messages, error: fetchMessagesError, setShouldFetch } = useFetchMessagesByCampaignId(
        formData.campaign,
        formData.network,
        formData.fromDate?.toISOString() || '',
        formData.toDate?.toISOString() || ''
    );

    useEffect(() => {
        if (fetchMessagesError) {
            setError(fetchMessagesError);
        }
    }, [fetchMessagesError]);

    useEffect(() => {
        if (campaignsError) {
            setError(campaignsError);
        }
    }, [campaignsError]);

    const handleChange = (field: string) => (value: string) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleDateChange = (field: string) => (date: Date | null) => {
        setFormData({ ...formData, [field]: date });
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!formData.campaign || !formData.network || !formData.fromDate || !formData.toDate) {
            setError('All fields are required');
            console.log('Form data missing:', formData);
            return;
        }

        setIsFetching(true);
        dismiss(); // Ensure any previous toasts are dismissed
        showInfo('Fetching messages...');
        console.log('Form data submitted:', formData);
        try {
            setShouldFetch(true);
            // Use a timeout to allow setShouldFetch to trigger
            setTimeout(() => setShouldFetch(false), 0);
            dismiss(); // Dismiss the fetching info toast
            showSuccess('Messages fetched successfully');
        } catch (err) {
            dismiss(); // Dismiss the fetching info toast
            showError('Failed to fetch messages', err instanceof Error ? err.message : undefined);
        } finally {
            setIsFetching(false);
        }
    };

    const options = {
        campaigns: campaigns.map((c) => ({ value: c.Id, label: c.Name })),
        networks: [
            { value: 'LinkedIn', label: 'LinkedIn' },
            { value: 'Facebook', label: 'Facebook' },
            { value: 'Twitter', label: 'Twitter' },
            { value: 'Instagram', label: 'Instagram' },
        ],
    };

    return { formData, handleChange, handleDateChange, handleSubmit, options, messages, error, isFetching };
};

export default useMessageForm;
