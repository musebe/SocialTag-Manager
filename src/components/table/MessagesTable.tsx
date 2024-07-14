import React from 'react';
import TableHeader from './TableHeader';
import TableRow from './TableRow';

interface MessagesTableProps {
  messages: any[];
}

const MessagesTable: React.FC<MessagesTableProps> = ({ messages }) => {
  return (
    <div className='flex justify-center items-start w-full mt-24'>
      <div className='px-4 sm:px-6 lg:px-8 w-full max-w-7xl'>
        <div className='sm:flex sm:items-center'>
          <div className='sm:flex-auto'>
            <h1 className='text-base font-semibold leading-6 text-gray-900'>
              Messages
            </h1>
            <p className='mt-2 text-sm text-gray-700'>
              A list of all the messages in your account including their posted
              date, network, message, and tags.
            </p>
          </div>
        </div>
        <div className='mt-8 flow-root'>
          <div className='-mx-4 -my-2 overflow-x-auto sm:overflow-x-visible sm:-mx-6 lg:-mx-8'>
            <div className='inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8'>
              <div className='overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg'>
                <table className='min-w-full divide-y divide-gray-300'>
                  <TableHeader />
                  <tbody className='divide-y divide-gray-200 bg-white'>
                    {messages.map((message) => (
                      <TableRow key={message.Id} message={message} />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagesTable;
