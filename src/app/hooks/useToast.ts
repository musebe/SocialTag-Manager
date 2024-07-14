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

    const showInfo = (message: string, description?: string) => {
        toast(message, {
            description: description || '',
        });
    };

    const dismiss = () => {
        toast.dismiss();
    };

    return { showSuccess, showError, showInfo, dismiss };
};
