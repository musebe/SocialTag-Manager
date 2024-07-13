'use client';
import React from 'react';
import { Calendar } from '../ui/calendar';
import { Popover, PopoverTrigger, PopoverContent } from '../ui/popover';
import { Button } from '../ui/button';
import { format } from 'date-fns';

export const DateInput: React.FC<{
  label: string;
  value: Date | null;
  onChange: (date: Date | null) => void;
}> = ({ label, value, onChange }) => {
  return (
    <div className='flex flex-col'>
      <label className='mb-1 text-gray-700'>{label}</label>
      <Popover>
        <PopoverTrigger asChild>
          <Button className='w-full md:w-auto'>
            {value ? format(value, 'PPP') : 'Pick a date'}
          </Button>
        </PopoverTrigger>
        <PopoverContent className='bg-white'>
          {' '}
          {/* Add bg-white class here */}
          <Calendar
            mode='single'
            selected={value ?? undefined}
            onSelect={(date) => onChange(date ?? null)}
            initialFocus
            fromDate={new Date(1900, 0, 1)}
            toDate={new Date(2100, 11, 31)}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};
