import React from 'react';
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

interface MessageCardProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  message: string;
  tags: string[];
}

const MessageCard: React.FC<MessageCardProps> = ({
  open,
  setOpen,
  message,
  tags,
}) => {
  const formattedMessage = message
    ? message.split(' ').map((word, index) => {
        if (word.startsWith('http://') || word.startsWith('https://')) {
          return (
            <a
              key={index}
              href={word}
              target='_blank'
              rel='noopener noreferrer'
              className='text-blue-500 hover:underline'
            >
              {word}
            </a>
          );
        }
        return word + ' ';
      })
    : 'N/A';

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className='hidden' />
      </DialogTrigger>
      <DialogContent className='p-6 bg-white rounded-lg shadow-lg w-full max-w-md mx-auto md:max-w-2xl'>
        <DialogHeader>
          <DialogTitle className='text-lg font-semibold'>
            Message Details
          </DialogTitle>
          <DialogDescription asChild>
            <div className='mt-2 text-sm text-gray-700'>{formattedMessage}</div>
          </DialogDescription>
        </DialogHeader>
        <div className='mt-4'>
          {tags.length > 0 ? (
            <div className='flex flex-wrap gap-2'>
              {tags.map((tag) => (
                <Tag key={tag} text={tag} />
              ))}
            </div>
          ) : (
            <p>No tags available</p>
          )}
        </div>
        <div className='mt-4 flex justify-end'>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MessageCard;
