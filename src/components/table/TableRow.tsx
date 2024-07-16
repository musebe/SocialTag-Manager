// src/components/table/TableRow.tsx
import React, { useState } from 'react';
import Tag from './Tag';
import MessageCard from './MessageCard';
import { Message } from '@/types';

interface TableRowProps {
  message: Message;
  updateMessage: (updatedMessage: Message) => void;
}

const TableRow: React.FC<TableRowProps> = ({ message, updateMessage }) => {
  const [open, setOpen] = useState(false);

  const colors = [
    'bg-green-100 text-green-800',
    'bg-yellow-100 text-yellow-800',
    'bg-blue-100 text-blue-800',
    'bg-purple-100 text-purple-800',
    'bg-red-100 text-red-800',
    'bg-gray-100 text-gray-800',
  ];

  const getTagColor = (index: number) => colors[index % colors.length];

  return (
    <>
      <tr
        onClick={() => setOpen(true)}
        className='cursor-pointer hover:bg-gray-100'
      >
        <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 hidden md:table-cell'>
          {new Date(message.Created).toLocaleDateString()}
        </td>
        <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
          {message.Network}
        </td>
        <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
          {message.Message.length > 50
            ? `${message.Message.substring(0, 50)}...`
            : message.Message}
        </td>
        <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
          <div className='flex flex-wrap gap-1'>
            {message.Tags.slice(0, 6).map((tag, index) => (
              <Tag
                key={tag.Id}
                text={tag.Tag}
                colorClass={getTagColor(index)}
              />
            ))}
            {message.Tags.length > 6 && (
              <span className='text-gray-500'>
                +{message.Tags.length - 6} more
              </span>
            )}
          </div>
        </td>
      </tr>
      <MessageCard
        open={open}
        setOpen={setOpen}
        message={message}
        updateMessage={updateMessage}
      />
    </>
  );
};

export default TableRow;
