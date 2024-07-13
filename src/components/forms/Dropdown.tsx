import React from 'react';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
  SelectValue,
} from '../ui/select';

interface DropdownProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}

const Dropdown: React.FC<DropdownProps> = ({
  label,
  value,
  onChange,
  options,
}) => {
  return (
    <div className='flex flex-col'>
      <label className='mb-1 text-gray-700'>{label}</label>
      <Select onValueChange={onChange}>
        <SelectTrigger className='w-full bg-white text-black'>
          <SelectValue placeholder='Select option' />
        </SelectTrigger>
        <SelectContent className='bg-white text-black'>
          <SelectGroup>
            <SelectLabel className='text-black'>{label}</SelectLabel>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default Dropdown;
