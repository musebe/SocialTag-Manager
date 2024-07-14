import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import Tag from './Tag';
import useFetchTags from '@/app/hooks/useFetchTags';
import useUpdateMessageTags from '@/app/hooks/useUpdateMessageTags';
import { useToast } from '@/app/hooks/useToast';

interface MessageCardProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  message: {
    Id: string;
    Created: string;
    Network: string;
    Message: string;
    Tags: { Id: string; Tag: string }[];
  };
}

const MessageCard: React.FC<MessageCardProps> = ({
  open,
  setOpen,
  message,
}) => {
  const { tags: allTags, error: fetchTagsError } = useFetchTags();
  const {
    updateMessageTags,
    success,
    error: updateTagsError,
  } = useUpdateMessageTags();
  const [selectedTags, setSelectedTags] = useState<
    { Id: string; Tag: string }[]
  >(message.Tags);
  const { showSuccess, showError } = useToast();

  const colors = [
    'bg-green-100 text-green-800',
    'bg-yellow-100 text-yellow-800',
    'bg-blue-100 text-blue-800',
    'bg-purple-100 text-purple-800',
    'bg-red-100 text-red-800',
    'bg-gray-100 text-gray-800',
  ];

  const tagColorMapping: { [key: string]: string } = {};
  allTags.forEach((tag, index) => {
    tagColorMapping[tag.Id] = colors[index % colors.length];
  });

  useEffect(() => {
    if (success) {
      showSuccess('Tags updated successfully');
    }
    if (updateTagsError) {
      showError(updateTagsError);
    }
  }, [success, updateTagsError, showSuccess, showError]);

  const handleAddTag = (tag: { Id: string; Tag: string }) => {
    if (!selectedTags.some((t) => t.Id === tag.Id)) {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleRemoveTag = (tag: { Id: string; Tag: string }) => {
    setSelectedTags(selectedTags.filter((t) => t.Id !== tag.Id));
  };

  const handleUpdateTags = () => {
    const tagIds = selectedTags.map((tag) => tag.Id);
    updateMessageTags(message.Id, tagIds);
  };

  const urlRegex = /(https?:\/\/[^\s]+)/g;

  const formattedMessage = message.Message
    ? message.Message.split(urlRegex).map((part, index) => {
        if (urlRegex.test(part)) {
          return (
            <a
              key={index}
              href={part}
              target='_blank'
              rel='noopener noreferrer'
              className='text-blue-500 hover:underline'
            >
              {part}
            </a>
          );
        }
        return <span key={index}>{part} </span>;
      })
    : 'N/A';

  const isLongMessage = message.Message.split(' ').length > 150;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className='hidden' />
      </DialogTrigger>
      <DialogContent className='p-6 bg-white rounded-lg shadow-lg w-full max-w-4xl mx-auto'>
        <DialogHeader>
          <DialogTitle className='text-lg font-semibold'>
            Message Details
          </DialogTitle>
          <DialogDescription asChild>
            <div
              className={`mt-2 text-sm text-gray-700 ${
                isLongMessage ? 'max-h-60 overflow-y-auto' : ''
              }`}
            >
              {formattedMessage}
            </div>
          </DialogDescription>
        </DialogHeader>
        <div className='mt-4'>
          <h3 className='text-md font-medium'>Available Tags</h3>
          <div className='flex flex-wrap gap-2 mt-2 max-h-32 overflow-y-auto'>
            {allTags.map((tag) => (
              <Button key={tag.Id} onClick={() => handleAddTag(tag)}>
                <Tag text={tag.Tag} colorClass={tagColorMapping[tag.Id]} />
              </Button>
            ))}
          </div>
          <h3 className='text-md font-medium mt-4'>Selected Tags</h3>
          <div className='flex flex-wrap gap-2 mt-2'>
            {selectedTags.map((tag) => (
              <button key={tag.Id} onClick={() => handleRemoveTag(tag)}>
                <Tag text={tag.Tag} colorClass={tagColorMapping[tag.Id]} />
              </button>
            ))}
          </div>
        </div>
        <div className='mt-4 flex justify-end space-x-2'>
          <Button onClick={handleUpdateTags}>Update Tags</Button>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </div>
        {fetchTagsError && (
          <p className='mt-4 text-red-500'>{fetchTagsError}</p>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default MessageCard;
