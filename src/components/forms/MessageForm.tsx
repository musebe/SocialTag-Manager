import React, { useEffect } from 'react';
import Dropdown from './Dropdown';
import { DateInput } from './DateInput';
import useMessageForm from '@/app/hooks/useMessageForm';

const MessageForm: React.FC<{
  onMessagesFetched: (messages: any[]) => void;
}> = ({ onMessagesFetched }) => {
  const {
    formData,
    handleChange,
    handleDateChange,
    handleSubmit,
    options,
    messages,
    error,
    isFetching,
  } = useMessageForm();

  useEffect(() => {
    if (messages.length > 0) {
      onMessagesFetched(messages);
    }
  }, [messages, onMessagesFetched]);

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await handleSubmit(event);
  };

  return (
    <div className='flex justify-center items-start w-full'>
      <section className='bg-white shadow-md rounded-lg p-6 w-full max-w-4xl'>
        <form
          onSubmit={handleFormSubmit}
          className='flex flex-col md:flex-row md:items-end space-y-4 md:space-y-0 md:space-x-4'
        >
          <div className='flex-1'>
            <Dropdown
              label='Select Campaign'
              value={formData.campaign}
              onChange={handleChange('campaign')}
              options={options.campaigns}
            />
          </div>
          <div className='flex-1'>
            <Dropdown
              label='Select Network'
              value={formData.network}
              onChange={handleChange('network')}
              options={options.networks}
            />
          </div>
          <div className='flex-1'>
            <DateInput
              label='From Date'
              value={formData.fromDate}
              onChange={handleDateChange('fromDate')}
            />
          </div>
          <div className='flex-1'>
            <DateInput
              label='To Date'
              value={formData.toDate}
              onChange={handleDateChange('toDate')}
            />
          </div>
          <button
            type='submit'
            className='bg-blue-500 text-white px-4 py-2 rounded shadow'
            disabled={isFetching}
          >
            {isFetching ? 'Fetching...' : 'Fetch Messages'}
          </button>
        </form>
        {error && <p className='mt-4 text-red-500'>{error}</p>}
      </section>
    </div>
  );
};

export default MessageForm;
