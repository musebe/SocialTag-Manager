import { z } from 'zod';

export const formSchema = z.object({
    campaign: z.string().min(1, 'Select a campaign'),
    network: z.string().min(1, 'Select a network'),
    fromDate: z.string().min(1, 'Select a start date'),
    toDate: z.string().min(1, 'Select an end date'),
    code: z.string().min(5, 'Code must be at least 5 characters long'),
});
