'use client';

import { useState } from 'react';
import Brand from '../brand';
import Link from 'next/link';
import { 
  ArrowLeft, 
  CheckCircle2, 
  ChevronRight, 
  Calendar, 
  Clock, 
  PawPrint, 
  User, 
  Phone, 
  Info,
  AlertTriangle,
  MessageCircle,
  MapPin,
  ShieldCheck
} from 'lucide-react';

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
      
      {/* Emergency Pre-Filter Alert */}
      <div className="bg-rose-950 text-rose-100 py-2.5 px-4 text-xs md:text-sm border-b border-rose-900">
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-center sm:text-left">
            <AlertTriangle size={15} className="text-rose-400 flex-shrink-0" />
            <span>
              <strong>Acute Emergency?</strong> (Trouble breathing, severe trauma, toxin ingestion) Please do not wait for an online form:
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-mono font-bold bg-rose-900 px-2 py-0.5 rounded text-white text-xs border border-rose-700">
              [DATA NEEDED: Emergency Phone]
            </span>
            <a href="tel:+910000000000" className="bg-rose-600 hover:bg-rose-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
              Call Now
            </a>
          </div>
        </div>
      </div>

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
            <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-200 text-center space-y-6">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 size={36} />
              </div>
              
              <h1 className="text-3xl md:text-4xl font-playfair font-semibold text-navy">
                Appointment Request Received!
              </h1>
              
              <p className="text-slate-600 max-w-md mx-auto text-base leading-relaxed">
                Thank you for choosing The Animal Place for <strong>{formData.petName}</strong>. 
                Our front desk team will call or WhatsApp you at <strong>{formData.phone}</strong> within 30 minutes during clinic hours (9 AM – 9 PM) to confirm your exact doctor consultation slot.
              </p>

              {/* Request Summary Card */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 text-left max-w-md mx-auto text-xs space-y-2 text-slate-700">
                <div className="flex justify-between pb-2 border-b border-slate-200 font-semibold text-navy">
                  <span>Requested Slot</span>
                  <span>{formData.date} at {formData.time}</span>
                </div>
                <div className="flex justify-between">
                  <span>Patient</span>
                  <span className="font-medium text-navy">{formData.petName} ({formData.species}{formData.breed ? `, ${formData.breed}` : ''})</span>
                </div>
                <div className="flex justify-between">
                  <span>Owner</span>
                  <span className="font-medium text-navy">{formData.ownerName}</span>
                </div>
                <div className="flex justify-between">
                  <span>Reason</span>
                  <span className="font-medium text-navy">{formData.reason}</span>
                </div>
              </div>

              {/* Immediate Contact / Location Card */}
              <div className="bg-pink-50/70 p-4 rounded-2xl border border-pink-200 max-w-md mx-auto text-xs text-left space-y-2 text-slate-700">
                <div className="font-bold text-navy flex items-center gap-1.5">
                  <MapPin size={14} className="text-pink-600" />
                  Clinic Address: Srinagar Colony, Yousufguda, Hyderabad
                </div>
                <div className="text-slate-600">
                  <span className="font-mono text-[11px] font-bold text-pink-800 bg-pink-100 px-1.5 py-0.5 rounded">
                    [DATA NEEDED: Exact Landmark & Parking Instructions]
                  </span>
                </div>
                <div className="pt-2 flex flex-col sm:flex-row gap-2">
                  <a 
                    href="tel:+910000000000" 
                    className="flex-1 bg-white hover:bg-slate-50 text-navy border border-slate-200 py-2 px-3 rounded-lg text-center font-medium flex items-center justify-center gap-1.5"
                  >
                    <Phone size={13} className="text-pink-600" />
                    <span>Call Desk: [DATA NEEDED: Phone]</span>
                  </a>
                  <a 
                    href="https://wa.me/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-3 rounded-lg text-center font-medium flex items-center justify-center gap-1.5"
                  >
                    <MessageCircle size={13} />
                    <span>WhatsApp Desk</span>
                  </a>
                </div>
              </div>

              <div className="pt-4">
                <Link 
                  href="/" 
                  className="inline-block bg-navy hover:bg-slate-800 text-white px-8 py-3 rounded-full font-medium transition-colors text-sm"
                >
                  Return to Home
                </Link>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden booking">
              <div className="bg-navy p-8 text-white">
                <div className="inline-flex items-center gap-1.5 text-pink-300 text-xs uppercase tracking-wider font-semibold mb-2">
                  <PawPrint size={14} /> Veterinary Care Booking
                </div>
                <h1 className="text-3xl font-playfair font-semibold mb-2">Schedule a Consultation</h1>
                <p className="text-pink-200 text-xs md:text-sm">
                  Fill in your companion's details. Consultations are unhurried with zero waiting-room anxiety.
                </p>
                
                <div className="flex items-center gap-2 mt-6 text-xs font-semibold">
                  <div className={`flex items-center justify-center w-7 h-7 rounded-full ${step >= 1 ? 'bg-pink-600 text-white' : 'bg-slate-700 text-slate-300'}`}>1</div>
                  <span className="text-slate-300 text-xs">Pet & Owner</span>
                  <div className={`h-0.5 w-8 rounded-full ${step >= 2 ? 'bg-pink-600' : 'bg-slate-700'}`}></div>
                  <div className={`flex items-center justify-center w-7 h-7 rounded-full ${step >= 2 ? 'bg-pink-600 text-white' : 'bg-slate-700 text-slate-300'}`}>2</div>
                  <span className="text-slate-300 text-xs">Time Slot</span>
                  <div className={`h-0.5 w-8 rounded-full ${step >= 3 ? 'bg-pink-600' : 'bg-slate-700'}`}></div>
                  <div className={`flex items-center justify-center w-7 h-7 rounded-full ${step >= 3 ? 'bg-pink-600 text-white' : 'bg-slate-700 text-slate-300'}`}>3</div>
                  <span className="text-slate-300 text-xs">Review</span>
                </div>
              </div>

              <div className="p-6 md:p-8">
                {error && (
                  <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 text-sm font-medium">
                    {error}
                  </div>
                )}

                {step === 1 && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div>
                      <h2 className="text-lg font-bold text-navy mb-4 flex items-center gap-2">
                        <PawPrint size={18} className="text-pink-600" /> Patient Details
                      </h2>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-slate-700 block">Pet's Name *</label>
                          <input 
                            type="text" 
                            value={formData.petName} 
                            onChange={e => updateForm('petName', e.target.value)} 
                            className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all" 
                            placeholder="e.g. Bruno" 
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-slate-700 block">Species *</label>
                          <select 
                            value={formData.species} 
                            onChange={e => updateForm('species', e.target.value)} 
                            className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all bg-white"
                          >
                            <option>Dog</option>
                            <option>Cat</option>
                            <option>Bird</option>
                            <option>Other Exotic</option>
                          </select>
                        </div>
                        <div className="space-y-1.5 md:col-span-2">
                          <label className="text-xs font-semibold text-slate-700 block">Breed / Mix (Optional)</label>
                          <input 
                            type="text" 
                            value={formData.breed} 
                            onChange={e => updateForm('breed', e.target.value)} 
                            className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all" 
                            placeholder="e.g. Indie, Golden Retriever, Persian Cat..." 
                          />
                        </div>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-slate-100">
                      <h2 className="text-lg font-bold text-navy mb-4 flex items-center gap-2">
                        <User size={18} className="text-pink-600" /> Pet Parent Information
                      </h2>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-slate-700 block">Your Name *</label>
                          <input 
                            type="text" 
                            value={formData.ownerName} 
                            onChange={e => updateForm('ownerName', e.target.value)} 
                            className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all" 
                            placeholder="e.g. Ramesh Kumar" 
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-slate-700 block">Phone / WhatsApp Number *</label>
                          <input 
                            type="tel" 
                            value={formData.phone} 
                            onChange={e => updateForm('phone', e.target.value)} 
                            className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all" 
                            placeholder="+91 98XXX XXXXX" 
                          />
                          <p className="text-[11px] text-slate-400">We will call or WhatsApp this number to confirm the appointment.</p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 flex justify-end">
                      <button 
                        onClick={nextStep} 
                        disabled={!formData.petName || !formData.ownerName || !formData.phone}
                        className="bg-navy hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-3 rounded-full font-semibold text-sm transition-colors flex items-center gap-2"
                      >
                        <span>Continue to Date & Time</span>
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
                    <div>
                      <h2 className="text-lg font-bold text-navy mb-4 flex items-center gap-2">
                        <Calendar size={18} className="text-pink-600" /> Preferred Consultation Slot
                      </h2>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-slate-700 block">Preferred Date *</label>
                          <input 
                            type="date" 
                            min={today} 
                            value={formData.date} 
                            onChange={e => updateForm('date', e.target.value)} 
                            className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all bg-white" 
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-slate-700 block">Preferred Time *</label>
                          <select 
                            value={formData.time} 
                            onChange={e => updateForm('time', e.target.value)} 
                            className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all bg-white"
                          >
                            <option value="">Select a time</option>
                            {timeSlots.map(t => (
                              <option key={t} value={t}>{t}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-slate-100">
                      <h2 className="text-lg font-bold text-navy mb-4 flex items-center gap-2">
                        <Info size={18} className="text-pink-600" /> Reason for Visit
                      </h2>
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-700 block">Brief Clinical Symptoms / Service Needed *</label>
                        <textarea 
                          value={formData.reason} 
                          onChange={e => updateForm('reason', e.target.value)} 
                          rows={3} 
                          className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all resize-none" 
                          placeholder="e.g. Annual vaccination, scratching ears, limping, vomiting, or routine wellness check..."
                        ></textarea>
                      </div>
                    </div>

                    <div className="pt-4 flex justify-between">
                      <button 
                        onClick={prevStep} 
                        className="text-slate-500 hover:text-navy font-semibold px-4 py-2 text-sm transition-colors"
                      >
                        Back
                      </button>
                      <button 
                        onClick={nextStep} 
                        disabled={!formData.date || !formData.time || !formData.reason}
                        className="bg-navy hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-3 rounded-full font-semibold text-sm transition-colors flex items-center gap-2"
                      >
                        <span>Review Booking</span>
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
                    <div>
                      <h2 className="text-lg font-bold text-navy mb-4">Review Your Consultation Request</h2>
                      <div className="bg-slate-50 rounded-2xl p-5 space-y-4 border border-slate-200">
                        <div className="grid grid-cols-2 gap-4 text-xs">
                          <div>
                            <div className="text-slate-400 font-semibold uppercase tracking-wider mb-0.5">Pet</div>
                            <div className="font-bold text-navy text-sm">{formData.petName} <span className="text-slate-500 font-normal">({formData.species}{formData.breed ? `, ${formData.breed}` : ''})</span></div>
                          </div>
                          <div>
                            <div className="text-slate-400 font-semibold uppercase tracking-wider mb-0.5">Owner</div>
                            <div className="font-bold text-navy text-sm">{formData.ownerName}</div>
                          </div>
                          <div>
                            <div className="text-slate-400 font-semibold uppercase tracking-wider mb-0.5">Contact Number</div>
                            <div className="font-bold text-navy text-sm">{formData.phone}</div>
                          </div>
                          <div>
                            <div className="text-slate-400 font-semibold uppercase tracking-wider mb-0.5">Date & Slot</div>
                            <div className="font-bold text-navy text-sm">{formData.date} at {formData.time}</div>
                          </div>
                          <div className="col-span-2 pt-2 border-t border-slate-200">
                            <div className="text-slate-400 font-semibold uppercase tracking-wider mb-0.5">Reason for Visit</div>
                            <div className="font-medium text-slate-700 text-sm">{formData.reason}</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-xs text-slate-700">
                      <strong>Please note:</strong> Submitting this form sends an appointment request to our front desk. We will contact you via WhatsApp / phone to confirm doctor availability.
                    </div>

                    <div className="pt-2 flex justify-between items-center">
                      <button 
                        onClick={prevStep} 
                        disabled={isSubmitting} 
                        className="text-slate-500 hover:text-navy font-semibold px-4 py-2 text-sm transition-colors disabled:opacity-50"
                      >
                        Back
                      </button>
                      <button 
                        onClick={handleSubmit} 
                        disabled={isSubmitting}
                        className="bg-pink-600 hover:bg-pink-700 disabled:opacity-50 text-white px-8 py-3 rounded-full font-semibold text-sm transition-colors flex items-center gap-2 shadow-md"
                      >
                        {isSubmitting ? 'Sending Request...' : 'Confirm & Send Request'}
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
