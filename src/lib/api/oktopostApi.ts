import axios from 'axios';
import base64 from 'base-64';
import qs from 'qs';

const accountId = process.env.NEXT_PUBLIC_ACCOUNT_ID as string;
const apiKey = process.env.NEXT_PUBLIC_API_KEY as string;
const credentials = `${accountId}:${apiKey}`;
const encodedCredentials = base64.encode(credentials);

const axiosConfig = {
    headers: {
        Authorization: `Basic ${encodedCredentials}`,
        'Content-Type': 'application/x-www-form-urlencoded',
    },
};

const handleResponse = (response: any) => {
    console.log('API response status:', response.status, '- Message:', response.data.Message || 'No message');
    console.log('API response data:', response.data); // Add this line to log response data
    return response.data.Result
        ? response.data.Items || response.data.Message || []
        : [];
};


const handleError = (error: any, message: string) => {
    console.error(message, error.response ? `Status: ${error.response.status} - Data: ${error.response.data}` : error.message);
    if (error.response) {
        console.error('API Response Status:', error.response.status);
    }
    throw new Error(message);
};

export const fetchTags = async () => {
    try {
        const response = await axios.get('https://api.oktopost.com/v2/tag', axiosConfig);
        return handleResponse(response);
    } catch (error) {
        handleError(error, 'Error fetching tags:');
    }
};

export const fetchMessagesByCampaignId = async (campaignId: string, network: string, from: string, to: string) => {
    try {
        const params = { campaignId, network, from, to, withTags: 1 };
        const response = await axios.get('https://api.oktopost.com/v2/message', {
            ...axiosConfig,
            params,
        });
        return handleResponse(response);
    } catch (error) {
        handleError(error, `Error fetching messages for campaign ${campaignId}:`);
    }
};

export const fetchMessagesById = async (messageId: string) => {
    try {
        const response = await axios.get(`https://api.oktopost.com/v2/message/${messageId}`, axiosConfig);
        return handleResponse(response);
    } catch (error) {
        handleError(error, `Error fetching message by ID ${messageId}:`);
    }
};

export const fetchCampaigns = async () => {
    try {
        const response = await axios.get('https://api.oktopost.com/v2/campaign', axiosConfig);
        return handleResponse(response);
    } catch (error) {
        handleError(error, 'Error fetching campaigns:');
    }
};

export const updateMessageTags = async (id: string, tags: string[]) => {
    try {
        const data = qs.stringify({ tagIds: tags.join(',') });
        const response = await axios.post(`https://api.oktopost.com/v2/message/${id}`, data, axiosConfig);
        return handleResponse(response);
    } catch (error) {
        handleError(error, `Error updating message tags for message ID ${id}:`);
    }
};
