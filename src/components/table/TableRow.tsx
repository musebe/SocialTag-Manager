import React, { useState } from 'react';
import Tag from './Tag';
import MessageCard from './MessageCard';

interface TableRowProps {
  message: {
    Id: string;
    Created: string;
    Network: string;
    Message: string;
    Tags: string[];
  };
}

const TableRow: React.FC<TableRowProps> = ({ message }) => {
  const [open, setOpen] = useState(false);

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
            {message.Tags.slice(0, 6).map((tag) => (
              <Tag key={tag} text={tag} />
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
        message={message.Message}
        tags={message.Tags}
      />
    </>
  );
};

export default TableRow;
