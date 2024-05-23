import React, { useState } from 'react';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectGroup,
} from '@/components/ui/select'; // Update the import path as necessary

interface TaskFilterProps {
  label: string;
  options: string[];
  onFilterChange: (value: string) => void;
}

export const TaskFilter: React.FC<TaskFilterProps> = ({ label, options, onFilterChange }) => {
  const [selected, setSelected] = useState('');

  const handleSelect = (value: string) => {
    setSelected(value);
    onFilterChange(value);
  };

  return (
    <Select onValueChange={handleSelect}>
      <SelectTrigger>
        <SelectValue placeholder={`Select ${label.toLowerCase()}...`} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{label}</SelectLabel>
          {options.map(option => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
