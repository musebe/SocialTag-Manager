'use client';

import * as React from 'react';
import { useState } from 'react';
import { toast, Toaster } from 'sonner'; // Ensure this import path matches your project structure
import { Button } from '@/components/ui/button';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp'; // Ensure this import path matches your project structure

export default function AccessCode() {
  const [value, setValue] = useState('');

  const handleChange = (value: string) => {
    // Ensure the value is numeric and has a length <= 6
    if (/^\d*$/.test(value) && value.length <= 6) {
      setValue(value);
    }
  };

  const verifyCode = () => {
    if (value === '123456') {
      document.cookie = `accessCode=${value}; path=/; max-age=3600`;
      toast.success('Access granted. Redirecting...', {
        description: 'You will be redirected shortly.',
      });
      setTimeout(() => {
        window.location.href = '/';
      }, 1500);
    } else {
      toast.error('Invalid access code', {
        description: 'Please try again.',
      });
    }
  };

  return (
    <div className='min-h-screen bg-gray-100 flex items-center justify-center'>
      <div className='p-6 max-w-sm bg-white shadow-lg rounded-lg'>
        <h2 className='text-center text-lg mb-6 font-bold'>
          Input your access code to access the dashboard
        </h2>
        <div className='flex justify-center mb-6'>
          <InputOTP maxLength={6} value={value} onChange={handleChange}>
            <InputOTPGroup>
              <InputOTPSlot index={0} className='otp-input' />
              <InputOTPSlot index={1} className='otp-input' />
              <InputOTPSlot index={2} className='otp-input' />
              <InputOTPSlot index={3} className='otp-input' />
              <InputOTPSlot index={4} className='otp-input' />
              <InputOTPSlot index={5} className='otp-input' />
            </InputOTPGroup>
          </InputOTP>
        </div>
        <Button onClick={verifyCode} className='w-full'>
          Verify Code
        </Button>
      </div>
      <Toaster />
    </div>
  );
}
