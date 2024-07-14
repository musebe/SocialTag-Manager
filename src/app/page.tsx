'use client';

import { useState } from 'react';
import MessageForm from '@/components/forms/MessageForm';
import MessagesTable from '@/components/table/MessagesTable';

export default function Home() {
  const [messages, setMessages] = useState<any[]>([]);
  const [selectedNetwork, setSelectedNetwork] = useState<string>('');

  const handleMessagesFetched = (fetchedMessages: any[], network: string) => {
    setMessages(fetchedMessages);
    setSelectedNetwork(network);
  };

  return (
    <div className='p-4'>
      <div className='flex flex-col items-center space-y-8'>
        <MessageForm onMessagesFetched={handleMessagesFetched} />
        <div className='mt-10 w-full'>
          <MessagesTable
            messages={messages}
            selectedNetwork={selectedNetwork}
          />
        </div>
      </div>
    </div>
  );
}
