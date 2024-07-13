// src/app/page.tsx

'use client';

import { useState } from 'react';
import MessageForm from '@/components/forms/MessageForm';
import MessagesTable from '@/components/table/MessagesTable';

export default function Home() {
  const [messages, setMessages] = useState<any[]>([]);

  const handleMessagesFetched = (fetchedMessages: any[]) => {
    setMessages(fetchedMessages);
  };

  return (
    <div className='p-4'>
      <div className='flex flex-col items-center space-y-8'>
        <MessageForm onMessagesFetched={handleMessagesFetched} />
        <div className='mt-24 w-full'>
          <MessagesTable messages={messages} />
        </div>
      </div>
    </div>
  );
}
