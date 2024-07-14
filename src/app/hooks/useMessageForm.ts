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
            console.log('Form data missing:', formData); // Add logging
            return;
        }

        setIsFetching(true);
        showInfo('Fetching messages...');
        console.log('Form data submitted:', formData); // Add logging
        try {
            setShouldFetch(true); // Trigger the fetch
            setTimeout(() => { setShouldFetch(false); }, 0); // Prevent immediate re-triggering
            setIsFetching(false);
            dismiss();
            showSuccess('Messages fetched successfully');
        } catch (err) {
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
            { value: 'Instagram', label: 'Instagram' },
            // Add any other networks as needed
        ],
    };

    return { formData, handleChange, handleDateChange, handleSubmit, options, messages, error, isFetching };
};

export default useMessageForm;
