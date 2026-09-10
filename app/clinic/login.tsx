'use client';
import { useState, useRef } from 'react';
import Brand from '../brand';
import { PawPrint, Lock, ArrowRight } from 'lucide-react';

export default function Login() {
  const [digits, setDigits] = useState(['', '', '', '']);
  const [error, setError] = useState('');
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  const submit = async (pin: string) => {
    setError('');
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin })
      });
      if (res.ok) {
        window.location.href = '/clinic';
      } else {
        setError('Incorrect PIN. Please try again.');
        setDigits(['', '', '', '']);
        inputs.current[0]?.focus();
      }
    } catch (e) {
      setError('An error occurred.');
    }
  };

  function handleDigit(index: number, value: string) {
    if (!/^\d?$/.test(value)) return;
    const next = [...digits];
    next[index] = value;
    setDigits(next);
    if (value && index < 3) inputs.current[index + 1]?.focus();
    if (value && index === 3) {
      submit(next.join(''));
    }
  }

  function handleKeyDown(index: number, e: React.KeyboardEvent) {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  }

  return (
    <div className="tap-login min-h-screen bg-[#132e51] flex items-center justify-center p-4">
      <div className="tap-login-card bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl flex flex-col items-center">
        <div className="mb-6">
          <Brand size="small" />
        </div>
        <PawPrint className="w-12 h-12 text-[#c51b78] mb-4" />
        <h1 className="text-2xl font-serif text-[#132e51] font-bold mb-2">Clinic workspace</h1>
        <p className="text-[#68768a] mb-8">Enter your PIN to continue</p>
        
        <div className="flex gap-4 mb-6">
          {digits.map((d, i) => (
            <input
              key={i}
              ref={el => { inputs.current[i] = el; }}
              type="password"
              inputMode="numeric"
              value={d}
              onChange={e => handleDigit(i, e.target.value)}
              onKeyDown={e => handleKeyDown(i, e)}
              className="w-14 h-14 text-center text-2xl font-bold border-2 border-[#e0e6ee] rounded-xl focus:border-[#c51b78] focus:outline-none transition-colors"
              maxLength={1}
            />
          ))}
        </div>
        
        {error && (
          <div className="text-red-500 mb-6 text-sm animate-bounce">{error}</div>
        )}
        
        <button
          onClick={() => submit(digits.join(''))}
          disabled={digits.join('').length < 4}
          className="w-full bg-[#c51b78] hover:bg-[#a91666] text-white py-4 rounded-full font-medium transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
        >
          Access Workspace <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
