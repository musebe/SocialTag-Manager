"use client"

import React, { useState, useCallback } from 'react';
import MessageForm from '@/components/forms/MessageForm';
import MessagesTable from '@/components/table/MessagesTable';
import { Message } from '@/types';

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedNetwork, setSelectedNetwork] = useState<string>('');

  const handleMessagesFetched = useCallback(
    (fetchedMessages: Message[], network: string) => {
      setMessages(fetchedMessages);
      setSelectedNetwork(network);
    },
    []
  );

  const handleUpdateMessage = useCallback((updatedMessage: Message) => {
    setMessages((prevMessages) =>
      prevMessages.map((msg) =>
        msg.Id === updatedMessage.Id ? updatedMessage : msg
      )
    );
  }, []);

  return (
    <div className='p-4'>
      <div className='flex flex-col items-center space-y-8'>
        <MessageForm onMessagesFetched={handleMessagesFetched} />
        <MessagesTable
          messages={messages}
          selectedNetwork={selectedNetwork}
          updateMessage={handleUpdateMessage}
        />
      </div>
    </div>
  );
}
