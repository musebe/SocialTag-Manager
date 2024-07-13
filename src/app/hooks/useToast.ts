import { toast } from 'sonner';

export const useToast = () => {
    const showSuccess = (message: string, description?: string) => {
        toast.success(message, {
            description: description || '',
        });
    };

    const showError = (message: string, description?: string) => {
        toast.error(message, {
            description: description || '',
        });
    };

    return { showSuccess, showError };
};
