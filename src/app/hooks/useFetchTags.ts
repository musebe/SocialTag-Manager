import { useState, useEffect } from 'react';

interface Tag {
    Id: string;
    Created: string;
    Tag: string;
    LastUsedDate: string;
    Color: string;  // Ensure this property is included in the interface
}

const useFetchTags = () => {
    const [tags, setTags] = useState<Tag[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTags = async () => {
            try {
                const response = await fetch('/api/oktopost/fetchTags');
                const data = await response.json();
                if (response.ok) {
                    const tagsWithColor = data.map((tag: Tag) => ({  // Explicitly typing `tag` as `Tag`
                        ...tag,
                        Color: tag.Color || 'default-color'  // Adding a default color if missing
                    }));
                    setTags(tagsWithColor);
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

        fetchTags();
    }, []);

    return { tags, error };
};

export default useFetchTags;
