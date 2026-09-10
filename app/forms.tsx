'use client';

import React, { useState } from 'react';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';

export function today(): string {
  return new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' });
}

export function money(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount / (amount > 100000 ? 100 : 1)); // handles both raw paise and rupees gracefully
}

export type ChoiceOption = string | { value: string; label: string };

export function Choice({
  name,
  label,
  value,
  defaultValue,
  onChange,
  options,
  required = false
}: {
  name: string;
  label: string;
  value?: string;
  defaultValue?: string;
  onChange?: (val: string) => void;
  options: ChoiceOption[];
  required?: boolean;
}) {
  const normalizedOptions = options.map((opt) => 
    typeof opt === 'string' ? { value: opt, label: opt } : opt
  );

  const initialVal = value !== undefined ? value : (defaultValue || (normalizedOptions[0]?.value ?? ''));
  const [internalVal, setInternalVal] = useState(initialVal);

  const currentVal = value !== undefined ? value : internalVal;

  const handleValueChange = (newVal: string) => {
    setInternalVal(newVal);
    if (onChange) {
      onChange(newVal);
    }
  };

  return (
    <div className="flex flex-col gap-1.5 field">
      {label && <label htmlFor={name} className="text-sm font-medium text-slate-700">{label}</label>}
      <input type="hidden" name={name} value={currentVal} />
      <Select value={currentVal} onValueChange={handleValueChange}>
        <SelectTrigger id={name} className="w-full h-11 bg-white border-[#e0e6ee]">
          <SelectValue placeholder="Select..." />
        </SelectTrigger>
        <SelectContent>
          {normalizedOptions.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export function Field({
  name,
  label,
  value,
  defaultValue,
  onChange,
  type = "text",
  required = false,
  min
}: {
  name: string;
  label: string;
  value?: string;
  defaultValue?: string;
  onChange?: (val: string) => void;
  type?: string;
  required?: boolean;
  min?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5 field">
      {label && (
        <label htmlFor={name} className="text-sm font-medium text-slate-700">
          {label}{required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        id={name}
        type={type}
        name={name}
        {...(onChange ? { value: value ?? '' } : { defaultValue: value ?? defaultValue ?? '' })}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        required={required}
        min={min}
        className="flex h-11 w-full rounded-md border border-[#e0e6ee] bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#c51b78] focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50"
      />
    </div>
  );
}

export function TimeSlotPicker({ value, onChange }: { value: string; onChange: (val: string) => void }) {
  const slots = [];
  for (let h = 9; h <= 20; h++) {
    for (let m = 0; m < 60; m += 30) {
      if (h === 20 && m > 30) continue; 
      
      const hour12 = h > 12 ? h - 12 : h;
      const ampm = h >= 12 ? 'PM' : 'AM';
      const min = m === 0 ? '00' : '30';
      const timeString = `${hour12}:${min} ${ampm}`;
      
      slots.push({
        value: `${h.toString().padStart(2, '0')}:${min}`, 
        label: timeString
      });
    }
  }

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-slate-700">Time Slot</label>
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-48 overflow-y-auto p-1">
        {slots.map((slot) => (
          <button
            key={slot.value}
            type="button"
            onClick={() => onChange(slot.value)}
            className={`text-xs py-2 px-1 rounded-md border transition-colors ${
              value === slot.value 
                ? 'bg-[#c51b78] text-white border-[#c51b78]' 
                : 'bg-white text-slate-700 border-slate-200 hover:border-[#c51b78]'
            }`}
          >
            {slot.label}
          </button>
        ))}
      </div>
    </div>
  );
}
