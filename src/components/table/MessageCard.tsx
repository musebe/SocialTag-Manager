import React, { useEffect, useState, useCallback } from 'react';
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
import { Message, Tag as TagType } from '@/types';

interface MessageCardProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  message: Message;
  updateMessage: (updatedMessage: Message) => void;
}

const MessageCard: React.FC<MessageCardProps> = ({
  open,
  setOpen,
  message,
  updateMessage,
}) => {
  const { tags: allTags } = useFetchTags();
  const { updateMessageTags, success, error, setError, setSuccess } =
    useUpdateMessageTags();
  const [selectedTags, setSelectedTags] = useState<TagType[]>(message.Tags);
  const { showSuccess, showError } = useToast();

  useEffect(() => {
    if (success) {
      showSuccess('Tags updated successfully');
      updateMessage({ ...message, Tags: selectedTags });
      setOpen(false);
      setSuccess(false); // Reset success to avoid re-triggering
    }
    if (error) {
      showError(error);
      setError(null); // Clear error to avoid re-triggering
    }
  }, [
    success,
    error,
    message,
    selectedTags,
    updateMessage,
    setOpen,
    showSuccess,
    showError,
    setSuccess,
    setError,
  ]);

  const handleAddTag = useCallback((tag: TagType) => {
    setSelectedTags((prev) => [...prev, tag]);
  }, []);

  const handleRemoveTag = useCallback((tag: TagType) => {
    setSelectedTags((prev) => prev.filter((t) => t.Id !== tag.Id));
  }, []);

  const handleUpdateTags = useCallback(() => {
    const tagIds = selectedTags.map((tag) => tag.Id);
    updateMessageTags(message.Id, tagIds);
  }, [selectedTags, message.Id, updateMessageTags]);

  const getTagColor = useCallback((index: number) => {
    const colors = [
      'bg-green-100',
      'bg-yellow-100',
      'bg-blue-100',
      'bg-purple-100',
      'bg-red-100',
      'bg-gray-100',
    ];
    return colors[index % colors.length] + ' text-gray-800';
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className='hidden'></button>
      </DialogTrigger>
      <DialogContent className='p-6 bg-white rounded-lg shadow-lg w-full max-w-4xl mx-auto'>
        <DialogHeader>
          <DialogTitle className='text-lg font-semibold'>
            Message Details
          </DialogTitle>
          <DialogDescription asChild>
            <div className='mt-2 text-sm text-gray-700'>
              {message.Message.split(' ').map((part, index) =>
                part.match(/https?:\/\//) ? (
                  <a
                    key={index}
                    href={part}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-blue-500 hover:underline'
                  >
                    {part}
                  </a>
                ) : (
                  <span key={index}>{part} </span>
                )
              )}
            </div>
          </DialogDescription>
        </DialogHeader>
        <div className='mt-4'>
          <h3 className='text-md font-medium'>Available Tags</h3>
          <div className='flex flex-wrap gap-2 mt-2 max-h-32 overflow-y-auto'>
            {allTags.map((tag, index) => (
              <Button key={tag.Id} onClick={() => handleAddTag(tag)}>
                <Tag text={tag.Tag} colorClass={getTagColor(index)} />
              </Button>
            ))}
          </div>
          <h3 className='text-md font-medium mt-4'>Selected Tags</h3>
          <div className='flex flex-wrap gap-2 mt-2'>
            {selectedTags.map((tag, index) => (
              <button key={tag.Id} onClick={() => handleRemoveTag(tag)}>
                <Tag text={tag.Tag} colorClass={getTagColor(index)} />
              </button>
            ))}
          </div>
        </div>
        <div className='mt-4 flex justify-end space-x-2'>
          <Button onClick={handleUpdateTags}>Update Tags</Button>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MessageCard;
