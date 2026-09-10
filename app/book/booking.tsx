'use client';

import { useState } from 'react';
import Brand from '../brand';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, ChevronRight, Calendar, Clock, PawPrint, User, Phone, Info } from 'lucide-react';

type Step = 1 | 2 | 3;

interface FormData {
  petName: string;
  species: string;
  breed: string;
  ownerName: string;
  phone: string;
  date: string;
  time: string;
  reason: string;
}

const initialFormData: FormData = {
  petName: '',
  species: 'Dog',
  breed: '',
  ownerName: '',
  phone: '',
  date: '',
  time: '',
  reason: '',
};

export default function Booking() {
  const [step, setStep] = useState<Step>(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const updateForm = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => setStep(prev => Math.min(prev + 1, 3) as Step);
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1) as Step);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError('');
    
    try {
      const res = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (!res.ok) {
        throw new Error('Failed to book appointment');
      }
      
      setIsSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const timeSlots = [];
  for (let i = 9; i <= 20; i++) {
    timeSlots.push(`${i > 12 ? i - 12 : i}:00 ${i >= 12 ? 'PM' : 'AM'}`);
    if (i !== 20) {
      timeSlots.push(`${i > 12 ? i - 12 : i}:30 ${i >= 12 ? 'PM' : 'AM'}`);
    }
  }

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-inter">
      <header className="bg-white border-b border-slate-200 py-4">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Brand size="small" />
          <Link href="/" className="text-sm font-medium text-slate-500 hover:text-navy flex items-center gap-2">
            <ArrowLeft size={16} /> Back to home
          </Link>
        </div>
      </header>

      <main className="flex-grow py-12 px-4">
        <div className="max-w-2xl mx-auto">
          {isSuccess ? (
            <div className="bg-white p-12 rounded-3xl shadow-sm border border-slate-200 text-center space-y-6">
              <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 size={40} />
              </div>
              <h1 className="text-4xl font-playfair font-semibold text-navy">You're all set!</h1>
              <p className="text-slate-600 max-w-md mx-auto text-lg">
                We've received your booking request for {formData.petName}. We'll see you on {formData.date} at {formData.time}.
              </p>
              <div className="pt-8">
                <Link href="/" className="inline-block bg-navy hover:bg-slate-800 text-white px-8 py-3 rounded-full font-medium transition-colors">
                  Return to Website
                </Link>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden booking">
              <div className="bg-navy p-8 text-white">
                <h1 className="text-3xl font-playfair font-semibold mb-2">Book a Visit</h1>
                <p className="text-pink-200 text-sm">Fill out the details below to schedule your appointment.</p>
                
                <div className="flex items-center gap-2 mt-8 text-sm font-medium">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 1 ? 'bg-pink-600' : 'bg-slate-700'}`}>1</div>
                  <div className={`h-1 w-12 rounded-full ${step >= 2 ? 'bg-pink-600' : 'bg-slate-700'}`}></div>
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 2 ? 'bg-pink-600' : 'bg-slate-700'}`}>2</div>
                  <div className={`h-1 w-12 rounded-full ${step >= 3 ? 'bg-pink-600' : 'bg-slate-700'}`}></div>
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 3 ? 'bg-pink-600' : 'bg-slate-700'}`}>3</div>
                </div>
              </div>

              <div className="p-8">
                {error && (
                  <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 text-sm font-medium">
                    {error}
                  </div>
                )}

                {step === 1 && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 form-grid">
                    <div>
                      <h2 className="text-xl font-semibold text-navy mb-4 flex items-center gap-2">
                        <PawPrint size={20} className="text-pink-600" /> Pet Details
                      </h2>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-slate-700 block">Pet's Name</label>
                          <input type="text" value={formData.petName} onChange={e => updateForm('petName', e.target.value)} className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all" placeholder="e.g. Max" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-slate-700 block">Species</label>
                          <select value={formData.species} onChange={e => updateForm('species', e.target.value)} className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all bg-white">
                            <option>Dog</option>
                            <option>Cat</option>
                            <option>Bird</option>
                            <option>Other</option>
                          </select>
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <label className="text-sm font-medium text-slate-700 block">Breed (Optional)</label>
                          <input type="text" value={formData.breed} onChange={e => updateForm('breed', e.target.value)} className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all" placeholder="e.g. Golden Retriever" />
                        </div>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-slate-100">
                      <h2 className="text-xl font-semibold text-navy mb-4 flex items-center gap-2">
                        <User size={20} className="text-pink-600" /> Your Details
                      </h2>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-slate-700 block">Your Name</label>
                          <input type="text" value={formData.ownerName} onChange={e => updateForm('ownerName', e.target.value)} className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all" placeholder="John Doe" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-slate-700 block">Phone Number</label>
                          <input type="tel" value={formData.phone} onChange={e => updateForm('phone', e.target.value)} className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all" placeholder="+91" />
                        </div>
                      </div>
                    </div>

                    <div className="pt-6 flex justify-end">
                      <button 
                        onClick={nextStep} 
                        disabled={!formData.petName || !formData.ownerName || !formData.phone}
                        className="bg-navy hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-3 rounded-full font-medium transition-colors flex items-center gap-2"
                      >
                        Continue <ChevronRight size={18} />
                      </button>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500 form-grid">
                    <div>
                      <h2 className="text-xl font-semibold text-navy mb-4 flex items-center gap-2">
                        <Calendar size={20} className="text-pink-600" /> Appointment Time
                      </h2>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-slate-700 block">Preferred Date</label>
                          <input type="date" min={today} value={formData.date} onChange={e => updateForm('date', e.target.value)} className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-slate-700 block">Preferred Time</label>
                          <select value={formData.time} onChange={e => updateForm('time', e.target.value)} className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all bg-white">
                            <option value="">Select a time</option>
                            {timeSlots.map(t => (
                              <option key={t} value={t}>{t}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-slate-100">
                      <h2 className="text-xl font-semibold text-navy mb-4 flex items-center gap-2">
                        <Info size={20} className="text-pink-600" /> Visit Reason
                      </h2>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700 block">Brief description</label>
                        <textarea value={formData.reason} onChange={e => updateForm('reason', e.target.value)} rows={4} className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all resize-none" placeholder="e.g. Annual vaccination and general checkup..."></textarea>
                      </div>
                    </div>

                    <div className="pt-6 flex justify-between">
                      <button onClick={prevStep} className="text-slate-500 hover:text-navy font-medium px-4 py-2 transition-colors">Back</button>
                      <button 
                        onClick={nextStep} 
                        disabled={!formData.date || !formData.time || !formData.reason}
                        className="bg-navy hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-3 rounded-full font-medium transition-colors flex items-center gap-2"
                      >
                        Review Booking <ChevronRight size={18} />
                      </button>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
                    <div>
                      <h2 className="text-xl font-semibold text-navy mb-6">Review your details</h2>
                      <div className="bg-slate-50 rounded-2xl p-6 space-y-4 border border-slate-100">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <div className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">Pet</div>
                            <div className="font-semibold text-navy">{formData.petName} <span className="text-slate-400 font-normal">({formData.species}{formData.breed ? `, ${formData.breed}` : ''})</span></div>
                          </div>
                          <div>
                            <div className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">Owner</div>
                            <div className="font-semibold text-navy">{formData.ownerName}</div>
                          </div>
                          <div>
                            <div className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">Contact</div>
                            <div className="font-semibold text-navy">{formData.phone}</div>
                          </div>
                          <div>
                            <div className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">Date & Time</div>
                            <div className="font-semibold text-navy">{formData.date} at {formData.time}</div>
                          </div>
                          <div className="col-span-2">
                            <div className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">Reason</div>
                            <div className="font-medium text-slate-700">{formData.reason}</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 flex justify-between items-center">
                      <button onClick={prevStep} disabled={isSubmitting} className="text-slate-500 hover:text-navy font-medium px-4 py-2 transition-colors disabled:opacity-50">Back</button>
                      <button 
                        onClick={handleSubmit} 
                        disabled={isSubmitting}
                        className="bg-pink-600 hover:bg-pink-700 disabled:opacity-50 text-white px-8 py-3 rounded-full font-medium transition-colors flex items-center gap-2"
                      >
                        {isSubmitting ? 'Confirming...' : 'Confirm Booking'}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
