'use client';


import MessageForm from '@/components/forms/MessageForm';
import MessagesTable from '@/components/table/MessagesTable';

export default function Home() {


  return (
    <div className='p-4'>
      <div className='flex flex-col items-center space-y-8'>
        <MessageForm  />
        <div className='mt-24 w-full'>
          {/* <MessagesTable/> */}
        </div>
      </div>
    </div>
  );
}
