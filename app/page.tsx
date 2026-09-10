'use client';

import { useRef, useState } from 'react';
import { 
  ArrowRight, 
  ArrowLeft, 
  MapPin, 
  Heart, 
  ShieldCheck, 
  Stethoscope, 
  Activity, 
  Scissors, 
  Syringe, 
  Menu, 
  Camera, 
  CalendarDays, 
  PawPrint, 
  Phone, 
  Clock, 
  Star, 
  Sparkles, 
  ChevronRight,
  AlertTriangle,
  MessageCircle,
  Award,
  Check,
  CheckCircle2,
  ExternalLink,
  Navigation,
  FileText
} from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetClose } from '@/components/ui/sheet';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import Brand from './brand';
import Link from 'next/link';
import Image from 'next/image';

// Visual placeholder helper component for missing data/images
function NeedBadge({ type, text }: { type: 'DATA' | 'IMAGE'; text: string }) {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-amber-100 text-amber-900 border border-amber-300">
      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
      <span className="text-amber-700">[{type} NEEDED]</span>
      <span className="font-sans font-medium text-slate-800">{text}</span>
    </span>
  );
}

const posts = [
  { image: '8f4a853802cafb3f', title: 'Our doors are open', slug: 'reel/DdDhuf5BHJ0' },
  { image: '9f1cdcdae8cf45d4', title: 'Diagnostics & imaging', slug: 'p/Dc9D1miB7Pn' },
  { image: 'a49d205deeb9a4fd', title: 'Skin & coat care', slug: 'p/Dc9DEsaBE3U' },
  { image: '64abffbd8a80fcff', title: 'Care for the golden years', slug: 'p/Dc9CpKdB2XH' },
  { image: '9cd38019a41257a0', title: 'Dental health', slug: 'p/Dc9B6XKBpCa' },
  { image: '6a58494ce0daf551', title: 'Vaccination care', slug: 'p/Dc9AVush-ib' },
  { image: '97345086e9da02b6', title: 'Surgery & recovery', slug: 'p/Dc9AAlYhW55' },
  { image: '5635c286c8493230', title: 'Grooming at TAP', slug: 'p/Dc8_WX_BGce' },
  { image: 'bc814334e0f9b0b7', title: 'Nose-to-tail check-ups', slug: 'p/Dc8-jGrhx0Q' },
  { image: 'bd8d25977046c7ae', title: "Your pet's new place", slug: 'p/Dc881JXh2mF' },
];

const services = [
  { 
    Icon: Stethoscope, 
    title: 'Preventive & Wellness', 
    text: 'Thorough, unhurried examinations prioritizing longevity. We catch issues before they surface with comprehensive nose-to-tail checks.', 
    tag: 'PROACTIVE', 
    post: 8,
    features: ['Comprehensive Physical Exams', 'Puppy & Kitten Protocols', 'Senior Pet Health Assessments', 'Weight & Nutrition Consults']
  },
  { 
    Icon: Activity, 
    title: 'Advanced Diagnostics', 
    text: 'State-of-the-art digital X-ray, ultrasound, and in-house laboratory analyzers. Accurate answers within minutes, without agonizing waits.', 
    tag: 'PRECISION', 
    post: 1,
    features: ['15-Min In-House Bloodwork (CBC & Chem)', 'Digital Radiography (X-Ray)', 'Microscopic Skin & Ear Cytology', 'Infectious Disease Rapid Screenings']
  },
  { 
    Icon: Syringe, 
    title: 'Surgical & Dental Care', 
    text: 'Minimally invasive soft-tissue and orthopedic procedures with dedicated multi-parameter anesthetic monitoring and multi-modal pain control.', 
    tag: 'EXPERTISE', 
    post: 5,
    features: ['Sterile Positive-Pressure OT', 'Continuous ECG, SpO2 & Capnography', 'Ultrasonic Dental Scaling & Polishing', 'Dedicated Heated Recovery Suites']
  },
  { 
    Icon: Scissors, 
    title: 'Therapeutic Grooming', 
    text: 'Far beyond cosmetic beauty. Medicated dermatological baths, coat deshedding, and hygienic care crafted specifically for skin health and comfort.', 
    tag: 'COMFORT', 
    post: 7,
    features: ['Medicated & Antifungal Soaks', 'Low-Stress Fear-Free Handling', 'Ear Canal Cleaning & Plucking', 'Gentle Nail Trimming & Paw Care']
  },
];

const doctors = [
  {
    role: 'Chief Veterinarian & Surgeon',
    name: 'Dr. [DATA NEEDED: Chief Vet Full Name, e.g., Ananya Rao]',
    degrees: '[DATA NEEDED: BVSc & AH, MVSc (Surgery & Radiology)]',
    reg: '[DATA NEEDED: TSVC Reg No. e.g. TSVC/2017/0842]',
    exp: '[DATA NEEDED: 10+ Years Experience in Small Animal Surgery]',
    image: '/tap-3d-pets.png',
    hasPlaceholderImage: true,
    bio: 'Specializing in soft tissue reconstructive surgery, emergency stabilization, and compassionate geriatric care. Passionate about fear-free handling and treating every pet like personal family.',
    quote: '"A visit to the vet should relieve anxiety for both pet and parent, never create it."'
  },
  {
    role: 'Associate Veterinarian & Feline Care',
    name: 'Dr. [DATA NEEDED: Associate Vet Name, e.g., Vikram Reddy]',
    degrees: '[DATA NEEDED: BVSc & AH]',
    reg: '[DATA NEEDED: TSVC Reg No. e.g. TSVC/2021/1109]',
    exp: '[DATA NEEDED: 5+ Years Clinical Practice]',
    image: '/pets.png',
    hasPlaceholderImage: true,
    bio: 'Focused on internal medicine, feline-specific wellness, preventive vaccination regimes, and dermatology. Known for an ultra-gentle demeanor that calms even the most nervous cats and dogs.',
    quote: '"Gentle hands and patience are the most essential diagnostic tools we possess."'
  }
];

const pricingMenu = [
  {
    service: 'Comprehensive Physical Examination & Consult',
    category: 'Consultation',
    price: '[DATA NEEDED: ₹600 - ₹800]',
    details: 'Full nose-to-tail check, weight & vitals, dental inspection, lifestyle & diet assessment.'
  },
  {
    service: 'Canine 9-in-1 Annual Booster + Anti-Rabies',
    category: 'Immunization',
    price: '[DATA NEEDED: ₹1,200 - ₹1,500]',
    details: 'Pre-vaccine physical exam included. Cold-chain guaranteed vaccines + digital record card.'
  },
  {
    service: 'Feline Core Vaccine (Tricat Trio + Rabies)',
    category: 'Immunization',
    price: '[DATA NEEDED: ₹1,100 - ₹1,400]',
    details: 'Low-stress feline handling. Protects against Panleukopenia, Calicivirus, Herpesvirus, & Rabies.'
  },
  {
    service: 'Therapeutic Medicated Bath & Grooming',
    category: 'Dermatology & Spa',
    price: '[DATA NEEDED: From ₹1,200+ (by breed/size)]',
    details: 'Vet-prescribed antifungal/antibacterial bath, blowout, ear hygiene, nail trim, sanitary trim.'
  },
  {
    service: 'Ultrasonic Dental Scaling & Polishing',
    category: 'Dental Health',
    price: '[DATA NEEDED: From ₹2,500+ (excl. anesthesia)]',
    details: 'Full supra & sub-gingival ultrasonic plaque removal, enamel polish, dental charting.'
  },
  {
    service: 'In-House Rapid Blood Panel (CBC + Organ Function)',
    category: 'Diagnostics',
    price: '[DATA NEEDED: ₹1,200 - ₹2,000]',
    details: 'Results ready in 15 minutes during your visit. Complete blood count, liver and kidney markers.'
  },
  {
    service: 'ISO Microchip Implantation & Registration',
    category: 'Identification',
    price: '[DATA NEEDED: ₹1,000]',
    details: 'Lifetime 15-digit international microchip with national pet recovery database entry.'
  }
];

export default function Page() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selectedPost, setSelectedPost] = useState<typeof posts[0] | null>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-20 md:pb-0 font-inter">
      
      {/* 1. Emergency Triage Top Alert Ribbon */}
      <aside aria-label="Emergency Care Banner" className="bg-rose-950 text-white py-2.5 px-4 text-xs md:text-sm border-b border-rose-900 shadow-sm">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2 font-medium text-center md:text-left">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
            </span>
            <span className="font-semibold text-rose-300 uppercase tracking-wider text-[11px]">Urgent & Emergency Care:</span>
            <span>If your pet is in critical distress, call our emergency line immediately:</span>
            <NeedBadge type="DATA" text="Emergency Hotline No." />
          </div>
          <div className="flex items-center gap-3">
            <a 
              href="tel:+910000000000" 
              className="bg-rose-600 hover:bg-rose-500 text-white px-3 py-1 rounded-full text-xs font-semibold inline-flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <Phone size={12} /> Call Emergency
            </a>
            <span className="text-slate-400 text-xs hidden lg:inline">Open 7 Days · 9 AM – 9 PM</span>
          </div>
        </div>
      </aside>

      {/* 2. Primary Navigation Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <Brand size="small" />
          
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-700">
            <Link href="#care" className="hover:text-pink-600 transition-colors">Our Care</Link>
            <Link href="#doctors" className="hover:text-pink-600 transition-colors">Meet the Doctors</Link>
            <Link href="#pricing" className="hover:text-pink-600 transition-colors">Pricing & Menu</Link>
            <Link href="#approach" className="hover:text-pink-600 transition-colors">The TAP Approach</Link>
            <Link href="#location" className="hover:text-pink-600 transition-colors">Visit & Directions</Link>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <a 
              href="tel:+910000000000" 
              className="text-xs font-semibold text-slate-700 hover:text-pink-600 flex items-center gap-1.5 border border-slate-200 rounded-full px-3.5 py-1.5 hover:border-pink-300 transition-all"
            >
              <Phone size={13} className="text-pink-600" />
              <span>Call Clinic</span>
            </a>
            <Link 
              href="/book" 
              className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-all shadow-md hover:shadow-pink-600/20"
            >
              Book an Appointment
            </Link>
          </div>
          
          <Sheet>
            <SheetTrigger aria-label="Open Mobile Menu" className="md:hidden p-2 text-slate-700 hover:text-pink-600">
              <Menu size={26} />
            </SheetTrigger>
            <SheetContent side="right" className="bg-white p-6">
              <SheetTitle className="text-left mb-6 font-playfair text-xl text-navy">The Animal Place</SheetTitle>
              <div className="flex flex-col gap-5 text-base font-medium text-slate-800">
                <SheetClose asChild><Link href="#care" className="hover:text-pink-600">Our Care & Services</Link></SheetClose>
                <SheetClose asChild><Link href="#doctors" className="hover:text-pink-600">Meet the Doctors</Link></SheetClose>
                <SheetClose asChild><Link href="#pricing" className="hover:text-pink-600">Transparent Pricing</Link></SheetClose>
                <SheetClose asChild><Link href="#approach" className="hover:text-pink-600">The TAP Philosophy</Link></SheetClose>
                <SheetClose asChild><Link href="#location" className="hover:text-pink-600">Location & Contact</Link></SheetClose>
                
                <div className="h-px bg-slate-200 my-2"></div>
                
                <div className="space-y-3">
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Direct Contact</div>
                  <a href="tel:+910000000000" className="flex items-center gap-2 text-sm text-slate-700 hover:text-pink-600">
                    <Phone size={16} className="text-pink-600" />
                    <span>Call: <NeedBadge type="DATA" text="Phone Number" /></span>
                  </a>
                  <a href="https://wa.me/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-slate-700 hover:text-emerald-600">
                    <MessageCircle size={16} className="text-emerald-600" />
                    <span>WhatsApp: <NeedBadge type="DATA" text="WhatsApp No." /></span>
                  </a>
                </div>

                <div className="pt-4">
                  <SheetClose asChild>
                    <Link href="/book" className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-full text-center font-semibold block transition-colors shadow-md">
                      Book a Visit
                    </Link>
                  </SheetClose>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {/* 3. Hero Section: Warm, High-Converting & Instant Loading */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-slate-100 pt-12 pb-20 md:pt-16 md:pb-28 border-b border-slate-200">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-pink-50 border border-pink-200 text-pink-700 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider">
                <Sparkles size={14} className="text-pink-600" />
                <span>Modern, Empathetic Veterinary Care in Srinagar Colony, Hyderabad</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-playfair font-bold text-navy leading-[1.15] tracking-tight">
                Big love. Better care.<br />
                <span className="text-pink-600 italic">Because, family.</span>
              </h1>
              
              <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Veterinary medicine designed to eliminate anxiety for both pets and their humans. Thorough, unhurried examinations, clear pricing, and medical decisions guided by deep clinical empathy.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link 
                  href="/book" 
                  className="w-full sm:w-auto bg-pink-600 hover:bg-pink-700 text-white px-8 py-4 rounded-full font-semibold text-base transition-all shadow-lg hover:shadow-pink-600/30 hover:-translate-y-0.5 text-center flex items-center justify-center gap-2"
                >
                  <span>Book an Appointment</span>
                  <ArrowRight size={18} />
                </Link>

                <a 
                  href="https://wa.me/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white px-7 py-4 rounded-full font-semibold text-base transition-all shadow-md hover:shadow-emerald-600/20 hover:-translate-y-0.5 text-center flex items-center justify-center gap-2"
                >
                  <MessageCircle size={18} />
                  <span>WhatsApp Clinic</span>
                </a>

                <a 
                  href="tel:+910000000000" 
                  className="w-full sm:w-auto bg-white hover:bg-slate-100 text-navy border border-slate-300 px-7 py-4 rounded-full font-semibold text-base transition-all shadow-xs text-center flex items-center justify-center gap-2"
                >
                  <Phone size={18} className="text-pink-600" />
                  <span>Call Us</span>
                </a>
              </div>

              {/* Missing data tags reminder */}
              <div className="p-3 bg-amber-50/80 border border-amber-200 rounded-xl text-left text-xs space-y-1 text-slate-700 max-w-xl mx-auto lg:mx-0">
                <div className="font-semibold text-amber-900 flex items-center gap-1.5">
                  <AlertTriangle size={14} className="text-amber-600" />
                  Contact Credentials To Link:
                </div>
                <div className="flex flex-wrap gap-2 pt-1">
                  <NeedBadge type="DATA" text="Primary Clinic Calling Number" />
                  <NeedBadge type="DATA" text="WhatsApp Business Number" />
                  <NeedBadge type="DATA" text="Exact Street / Landmark" />
                </div>
              </div>

              {/* Quick Trust Pillars */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-200/80">
                <div className="flex items-start gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-pink-100 text-pink-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Clock size={16} />
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-bold text-navy">Open 7 Days</div>
                    <div className="text-[11px] text-slate-500">9 AM – 9 PM Daily</div>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-pink-100 text-pink-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <ShieldCheck size={16} />
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-bold text-navy">Zero-Anxiety</div>
                    <div className="text-[11px] text-slate-500">Fear-Free Handling</div>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-pink-100 text-pink-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Activity size={16} />
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-bold text-navy">In-House Lab</div>
                    <div className="text-[11px] text-slate-500">15-Min Results</div>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-pink-100 text-pink-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Heart size={16} />
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-bold text-navy">Clear Pricing</div>
                    <div className="text-[11px] text-slate-500">No Surprise Fees</div>
                  </div>
                </div>
              </div>

            </div>

            {/* Hero Visual Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md bg-white p-3 rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100">
                  <Image 
                    src="/tap-3d-pets.png" 
                    alt="The Animal Place Hyderabad" 
                    fill 
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent"></div>
                  
                  {/* Image Needed Placeholder Overlay */}
                  <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
                    <NeedBadge type="IMAGE" text="Hero: Doctor with Patient / Clinic Lobby" />
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="text-xs font-semibold uppercase tracking-wider text-pink-300">Srinagar Colony Clinic</div>
                    <div className="text-lg font-playfair font-semibold">Gentle hands. Lifelong companion care.</div>
                  </div>
                </div>

                {/* Floating Parent Testimonial Quote */}
                <div className="p-4 mt-2 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="flex items-center gap-1 text-amber-400 mb-1.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} fill="currentColor" />
                    ))}
                  </div>
                  <p className="text-xs text-slate-700 italic">
                    "Finally a veterinary clinic in Hyderabad where the doctors don't rush you out after 3 minutes. They explained every blood parameter and treated my cat with extreme gentleness."
                  </p>
                  <div className="text-[11px] font-semibold text-navy mt-2 flex items-center justify-between">
                    <span>— Priya M. (Cat Mom)</span>
                    <NeedBadge type="DATA" text="Real Google Review Quote" />
                  </div>
                </div>
              </div>

              {/* Decorative glows */}
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-pink-200/50 rounded-full blur-3xl -z-10"></div>
              <div className="absolute -top-6 -left-6 w-48 h-48 bg-blue-200/50 rounded-full blur-3xl -z-10"></div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Marquee Service Ribbon */}
      <div className="bg-navy text-pink-200 py-3.5 overflow-hidden flex whitespace-nowrap text-xs md:text-sm font-semibold tracking-widest uppercase shadow-inner">
        <div className="animate-[marquee_25s_linear_infinite] flex items-center gap-8 px-4">
          <span>Wellness & Preventative</span> <span>✳</span>
          <span>In-House Bloodwork & Diagnostics</span> <span>✳</span>
          <span>Sterile Soft-Tissue Surgery</span> <span>✳</span>
          <span>Core & Non-Core Vaccinations</span> <span>✳</span>
          <span>Medicated Dermatological Grooming</span> <span>✳</span>
          <span>Ultrasonic Dental Care</span> <span>✳</span>
          <span>Emergency Triage</span> <span>✳</span>
          <span>Wellness & Preventative</span> <span>✳</span>
          <span>In-House Bloodwork & Diagnostics</span> <span>✳</span>
          <span>Sterile Soft-Tissue Surgery</span> <span>✳</span>
          <span>Core & Non-Core Vaccinations</span>
        </div>
      </div>

      {/* 5. Comprehensive Clinical Services Section */}
      <section id="care" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 text-pink-600 font-semibold tracking-wider text-xs uppercase mb-3 bg-pink-50 px-3 py-1 rounded-full">
              <Stethoscope size={14} /> Full-Spectrum Veterinary Care
            </div>
            <h2 className="text-3xl md:text-5xl font-playfair font-semibold text-navy mb-4">
              Care that goes <span className="text-pink-600 italic">the extra paw.</span>
            </h2>
            <p className="text-slate-600 text-base md:text-lg">
              From pediatric kitten vaccinations to complex soft-tissue surgery and senior comfort care, we have built a modern facility equipped for every stage of your companion's life.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, i) => (
              <div 
                key={i} 
                className="bg-slate-50 p-7 rounded-3xl border border-slate-200 hover:border-pink-300 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="bg-white w-14 h-14 rounded-2xl flex items-center justify-center text-pink-600 mb-6 shadow-sm border border-slate-100">
                    <service.Icon size={28} />
                  </div>
                  <div className="text-xs font-bold text-pink-600 tracking-wider uppercase mb-1.5">{service.tag}</div>
                  <h3 className="text-xl font-bold text-navy mb-3">{service.title}</h3>
                  <p className="text-slate-600 text-sm mb-6 leading-relaxed">{service.text}</p>
                  
                  <ul className="space-y-2 mb-6 pt-4 border-t border-slate-200/60">
                    {service.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-slate-700 font-medium">
                        <Check size={14} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2">
                  <button 
                    onClick={() => setSelectedPost(posts[service.post])}
                    className="inline-flex items-center gap-1.5 text-pink-600 font-semibold text-sm hover:text-pink-700 group cursor-pointer"
                  >
                    <span>View clinic case story</span>
                    <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link 
              href="/book" 
              className="inline-flex items-center gap-2 bg-navy hover:bg-slate-800 text-white px-8 py-3.5 rounded-full font-medium transition-all shadow-sm"
            >
              <CalendarDays size={18} />
              <span>Schedule a Consultation</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 6. NEW: Meet Your Doctors & Clinical Team (The #1 Trust Anchor) */}
      <section id="doctors" className="py-24 bg-slate-50 border-t border-slate-200">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-flex items-center gap-2 text-pink-600 font-semibold tracking-wider text-xs uppercase mb-3 bg-pink-100/70 px-3 py-1 rounded-full">
              <Award size={14} /> Veterinary Leadership & Compassion
            </div>
            <h2 className="text-3xl md:text-5xl font-playfair font-semibold text-navy mb-4">
              The hands you trust <span className="text-pink-600 italic">with their life.</span>
            </h2>
            <p className="text-slate-600 text-base md:text-lg">
              Behind every diagnostic test and treatment plan is a team of licensed veterinary surgeons who treat your companions with the same tender dignity we give our own children.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {doctors.map((doc, i) => (
              <div key={i} className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
                <div className="flex flex-col sm:flex-row gap-6 items-start">
                  
                  {/* Doctor Portrait Container with Image Needed Marker */}
                  <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-2xl bg-slate-100 overflow-hidden flex-shrink-0 border border-slate-200">
                    <Image 
                      src={doc.image} 
                      alt={doc.name} 
                      fill 
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-2 text-center">
                      <span className="text-[10px] font-mono text-white font-bold bg-amber-600/90 px-1.5 py-0.5 rounded">
                        [IMAGE NEEDED: Doctor Photo]
                      </span>
                    </div>
                  </div>

                  {/* Doctor Information */}
                  <div className="space-y-2 flex-grow">
                    <div className="text-xs font-bold text-pink-600 uppercase tracking-wider">{doc.role}</div>
                    <h3 className="text-xl font-bold text-navy">{doc.name}</h3>
                    
                    <div className="space-y-1 text-xs text-slate-500 font-medium">
                      <div className="flex items-center gap-1.5">
                        <Award size={13} className="text-slate-400" />
                        <span>Degrees: {doc.degrees}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <ShieldCheck size={13} className="text-slate-400" />
                        <span>Council Registration: {doc.reg}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock size={13} className="text-slate-400" />
                        <span>Clinical Experience: {doc.exp}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-5 border-t border-slate-100 space-y-3">
                  <p className="text-slate-600 text-sm leading-relaxed">{doc.bio}</p>
                  <blockquote className="text-xs text-slate-500 italic bg-slate-50 p-3 rounded-xl border-l-2 border-pink-500">
                    {doc.quote}
                  </blockquote>
                </div>
              </div>
            ))}
          </div>

          {/* Nursing & Fear-Free Handlers Banner */}
          <div className="mt-8 bg-white border border-slate-200 rounded-2xl p-6 max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-pink-50 text-pink-600 flex items-center justify-center flex-shrink-0">
                <Heart size={24} />
              </div>
              <div>
                <h4 className="font-bold text-navy text-base">Certified Fear-Free Handlers & Veterinary Nurses</h4>
                <p className="text-slate-500 text-xs mt-0.5">
                  Our veterinary technicians are trained in species-specific body language and low-stress restraint techniques to minimize adrenaline and panic.
                </p>
              </div>
            </div>
            <NeedBadge type="DATA" text="Nursing Staff & Head Groomer Names" />
          </div>
        </div>
      </section>

      {/* 7. NEW: Transparent Pricing & Care Menu */}
      <section id="pricing" className="py-24 bg-white border-t border-slate-200">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-flex items-center gap-2 text-pink-600 font-semibold tracking-wider text-xs uppercase mb-3 bg-pink-50 px-3 py-1 rounded-full">
              <FileText size={14} /> Absolute Price Transparency
            </div>
            <h2 className="text-3xl md:text-5xl font-playfair font-semibold text-navy mb-4">
              Honest care. <span className="text-pink-600 italic">No surprise bills.</span>
            </h2>
            <p className="text-slate-600 text-base md:text-lg">
              We know how stressful unexpected vet bills can be. We present clear cost estimates before initiating any treatment, diagnostic testing, or surgical procedure.
            </p>
          </div>

          <div className="max-w-4xl mx-auto bg-slate-50 rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="p-6 md:p-8 bg-navy text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-2xl font-playfair font-bold">Standard Services & Procedure Guide</h3>
                <p className="text-slate-300 text-xs mt-1">All consultation fees include weight check, physical examination, and preventative guidance.</p>
              </div>
              <span className="text-xs bg-pink-600 text-white font-semibold px-3.5 py-1.5 rounded-full uppercase tracking-wider">
                Clear Estimates Upfront
              </span>
            </div>

            <div className="divide-y divide-slate-200">
              {pricingMenu.map((item, index) => (
                <div key={index} className="p-5 md:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-pink-50/40 transition-colors">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold text-pink-600 tracking-wider uppercase bg-pink-100/70 px-2 py-0.5 rounded">
                        {item.category}
                      </span>
                      <h4 className="font-bold text-navy text-base">{item.service}</h4>
                    </div>
                    <p className="text-xs text-slate-500">{item.details}</p>
                  </div>
                  <div className="text-left sm:text-right flex-shrink-0">
                    <div className="font-bold text-navy text-base md:text-lg">{item.price}</div>
                    <div className="text-[10px] text-slate-400">Standard range</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 bg-slate-100/80 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-emerald-600 flex-shrink-0" />
                <span>Custom surgical, hospitalization, and emergency intensive care estimates are provided in writing prior to admission.</span>
              </div>
              <Link 
                href="/book" 
                className="text-pink-600 hover:text-pink-700 font-semibold inline-flex items-center gap-1 flex-shrink-0"
              >
                <span>Book your consultation</span>
                <ChevronRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 8. The TAP Philosophy & Approach */}
      <section id="approach" className="py-24 bg-slate-50 border-t border-slate-200">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="bg-white p-4 pb-16 shadow-xl rounded-sm transform -rotate-2 hover:rotate-0 transition-transform duration-500 max-w-md mx-auto border border-slate-200">
              <div className="relative aspect-square w-full bg-slate-100 rounded-sm overflow-hidden">
                <Image src="/instagram/bd8d25977046c7ae.jpg" alt="The TAP Approach" fill className="object-cover" />
              </div>
              <div className="absolute bottom-6 left-0 right-0 text-center font-playfair italic text-slate-500">
                Your pet's new happy place
              </div>
            </div>
            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-pink-100 rounded-full mix-blend-multiply opacity-50 blur-2xl"></div>
            <div className="absolute -top-8 -left-8 w-32 h-32 bg-blue-100 rounded-full mix-blend-multiply opacity-50 blur-2xl"></div>
          </div>
          
          <div className="space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 text-pink-600 font-semibold tracking-wider text-xs uppercase mb-3 bg-pink-100/70 px-3 py-1 rounded-full">
                <Star size={14} /> The TAP Philosophy
              </div>
              <h2 className="text-3xl md:text-5xl font-playfair font-semibold text-navy mb-4">
                Medicine driven by <span className="text-pink-600 italic">empathy.</span>
              </h2>
              <p className="text-slate-600 text-base md:text-lg">
                A veterinary visit should never be an anxiety-inducing ordeal. We engineered The Animal Place to remove clinical friction, prioritize unhurried conversations, and treat your companion with dignity.
              </p>
            </div>
            
            <ul className="space-y-6">
              {[
                { 
                  title: 'Zero Waiting Room Anxiety', 
                  text: 'Appointments are scheduled with generous buffers. Your pet transitions directly from arrival into a quiet, sanitized examination suite without confronting agitated dogs or cats in the lobby.' 
                },
                { 
                  title: 'Absolute Treatment Transparency', 
                  text: 'No baffling medical jargon or opaque invoicing. We review diagnostic test rationale, walk you through digital X-rays together, and clearly outline therapeutic options.' 
                },
                { 
                  title: 'Species-Specific Cat & Dog Separation', 
                  text: 'Cats have distinct sensory needs. We utilize pheromone-infused calming zones and separate waiting corners to ensure feline guests remain calm and relaxed.' 
                },
                { 
                  title: 'Proactive Digital Medical History', 
                  text: 'Never lose a vaccination certificate or surgical summary again. Access complete clinical notes, lab results, and vaccination reminders directly.' 
                }
              ].map((val, i) => (
                <li key={i} className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center font-bold text-sm">
                    {i + 1}
                  </div>
                  <div>
                    <h4 className="font-bold text-navy text-base">{val.title}</h4>
                    <p className="text-slate-600 text-sm mt-0.5 leading-relaxed">{val.text}</p>
                  </div>
                </li>
              ))}
            </ul>
            
            <Link href="/book" className="inline-flex items-center gap-2 font-bold text-pink-600 hover:text-pink-700 text-base">
              Experience the difference <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* 9. Life at TAP - Clinic Stories & Social Proof */}
      <section id="stories" className="py-24 bg-white border-t border-slate-200 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-12">
            <div>
              <div className="inline-flex items-center gap-2 text-pink-600 font-semibold tracking-wider text-xs uppercase mb-3 bg-pink-50 px-3 py-1 rounded-full">
                <Camera size={14} /> Life at TAP
              </div>
              <h2 className="text-3xl md:text-4xl font-playfair font-semibold text-navy">Follow our patient recoveries</h2>
            </div>
            <div className="hidden md:flex gap-3">
              <button 
                onClick={scrollLeft} 
                aria-label="Scroll left" 
                className="w-11 h-11 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors text-slate-700"
              >
                <ArrowLeft size={18} />
              </button>
              <button 
                onClick={scrollRight} 
                aria-label="Scroll right" 
                className="w-11 h-11 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors text-slate-700"
              >
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
          
          <div ref={scrollRef} className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
            {posts.map((post, i) => (
              <button 
                key={i} 
                onClick={() => setSelectedPost(post)} 
                className="flex-shrink-0 w-72 md:w-80 snap-center group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow text-left bg-slate-100 cursor-pointer"
              >
                <div className="aspect-[4/5] relative">
                  <Image 
                    src={`/instagram/${post.image}.jpg`} 
                    alt={post.title} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                    <div className="text-white">
                      <h4 className="font-bold text-lg">{post.title}</h4>
                      <p className="text-pink-200 text-xs flex items-center gap-1 mt-1">
                        View post story <ChevronRight size={14} />
                      </p>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <a 
              href="https://instagram.com/theanimalplace_vet" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-2 font-semibold text-slate-600 hover:text-pink-600 transition-colors text-sm"
            >
              <Camera size={16} />
              <span>@theanimalplace_vet on Instagram</span>
            </a>
          </div>
        </div>
      </section>

      {/* 10. NEW: Location, Directions, Landmarks & Parking */}
      <section id="location" className="py-24 bg-slate-50 border-t border-slate-200">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-flex items-center gap-2 text-pink-600 font-semibold tracking-wider text-xs uppercase mb-3 bg-pink-100/70 px-3 py-1 rounded-full">
              <MapPin size={14} /> Visiting The Clinic
            </div>
            <h2 className="text-3xl md:text-5xl font-playfair font-semibold text-navy mb-4">
              Easy to reach. <span className="text-pink-600 italic">Comfortable to visit.</span>
            </h2>
            <p className="text-slate-600 text-base md:text-lg">
              Located in the heart of Srinagar Colony, Yousufguda with designated carrier drop-off spots and easy access from Jubilee Hills, Banjara Hills, and Madhapur.
            </p>
          </div>

          <div className="max-w-5xl mx-auto grid md:grid-cols-12 gap-8 items-stretch">
            
            {/* Location Details Card */}
            <div className="md:col-span-6 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-navy mb-2">The Animal Place Clinic</h3>
                  <div className="flex items-start gap-2.5 text-slate-600 text-sm">
                    <MapPin size={18} className="text-pink-600 flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-semibold text-slate-900">Srinagar Colony, Yousufguda, Hyderabad, Telangana 500073</div>
                      <div className="mt-1">
                        <NeedBadge type="DATA" text="Exact Door/Plot No., Road No., Landmark (e.g. Opposite Ganapathi Temple)" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-slate-100 text-sm">
                  <div className="flex items-start gap-3">
                    <Clock size={18} className="text-pink-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-navy">Working Hours</div>
                      <div className="text-slate-600">Open 7 Days a Week: 9:00 AM – 9:00 PM</div>
                      <div className="text-xs text-slate-400">Emergency stabilization available during open hours</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <ShieldCheck size={18} className="text-pink-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-navy">Parking & Drop-Off Guidance</div>
                      <div className="text-slate-600">
                        <NeedBadge type="DATA" text="Reserved Pet Carrier Drop-Off Space / Street Parking Details" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
                <a 
                  href="https://maps.google.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="bg-navy hover:bg-slate-800 text-white px-6 py-3 rounded-full text-sm font-semibold flex items-center justify-center gap-2 transition-colors flex-1"
                >
                  <Navigation size={16} />
                  <span>Open in Google Maps</span>
                </a>

                <a 
                  href="tel:+910000000000" 
                  className="bg-slate-100 hover:bg-slate-200 text-slate-800 px-6 py-3 rounded-full text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  <Phone size={16} className="text-pink-600" />
                  <span>Call for Directions</span>
                </a>
              </div>

            </div>

            {/* Google Map / Visual Placeholder Card */}
            <div className="md:col-span-6 bg-slate-200 rounded-3xl overflow-hidden relative min-h-[320px] flex flex-col items-center justify-center p-8 text-center border border-slate-300">
              <div className="w-16 h-16 rounded-full bg-white text-pink-600 flex items-center justify-center mb-4 shadow-md">
                <MapPin size={32} />
              </div>
              <h4 className="text-xl font-bold text-navy mb-2">Interactive Clinic Map</h4>
              <p className="text-slate-600 text-sm max-w-sm mb-4">
                Srinagar Colony Clinic Location Map & Directions
              </p>
              <div className="space-y-2">
                <NeedBadge type="DATA" text="Embed Google Maps Iframe or Exact Pin URL" />
                <NeedBadge type="IMAGE" text="Exterior Photo of Clinic Building Frontage" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 11. Final Call To Action Banner */}
      <section className="bg-navy py-20 relative overflow-hidden text-white">
        <div className="absolute -right-20 -top-20 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl"></div>
        <div className="absolute -left-20 -bottom-20 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl"></div>
        <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 text-pink-300 mb-6 backdrop-blur-sm">
            <PawPrint size={32} />
          </div>
          <h2 className="text-3xl md:text-5xl font-playfair font-semibold mb-4 leading-tight">
            A familiar face.<br />
            <span className="text-pink-400 italic">A healthier, happier pet.</span>
          </h2>
          <p className="text-slate-300 text-base md:text-lg mb-8 leading-relaxed">
            Whether it's an overdue vaccination, skin allergy advice, or emergency stabilization, our veterinarians are here for your family 7 days a week.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/book" 
              className="w-full sm:w-auto bg-pink-600 hover:bg-pink-700 text-white px-9 py-4 rounded-full font-semibold text-base transition-all shadow-lg hover:shadow-pink-600/30 hover:-translate-y-0.5"
            >
              Book an Appointment
            </Link>
            <a 
              href="tel:+910000000000" 
              className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-4 rounded-full font-semibold text-base transition-colors flex items-center justify-center gap-2"
            >
              <Phone size={18} className="text-pink-400" />
              <span>Call Clinic Desk</span>
            </a>
          </div>
        </div>
      </section>

      {/* 12. Single Consolidated Clean Footer (Duplicate Removed!) */}
      <footer className="bg-slate-950 text-white pt-16 pb-12 border-t border-slate-800">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            
            <div className="md:col-span-2 space-y-4">
              <Brand size="default" />
              <p className="text-slate-400 max-w-md text-sm leading-relaxed">
                The Animal Place is a modern veterinary clinic located in Srinagar Colony, Hyderabad. Compassionate clinical medicine, in-house diagnostics, sterile surgery, and gentle grooming.
              </p>
              
              <div className="pt-2 space-y-2 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <MapPin size={14} className="text-pink-400 flex-shrink-0" />
                  <span>Srinagar Colony, Yousufguda, Hyderabad, Telangana 500073</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={14} className="text-pink-400 flex-shrink-0" />
                  <span>Open 7 Days a week: 9:00 AM – 9:00 PM</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={14} className="text-pink-400 flex-shrink-0" />
                  <span>Front Desk: <NeedBadge type="DATA" text="Official Contact Number" /></span>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-3">
                <a 
                  href="https://instagram.com/theanimalplace_vet" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-pink-600 flex items-center justify-center transition-colors text-slate-300 hover:text-white"
                  aria-label="Instagram"
                >
                  <Camera size={18} />
                </a>
                <a 
                  href="tel:+910000000000" 
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-pink-600 flex items-center justify-center transition-colors text-slate-300 hover:text-white"
                  aria-label="Phone"
                >
                  <Phone size={18} />
                </a>
                <a 
                  href="https://wa.me/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-emerald-600 flex items-center justify-center transition-colors text-slate-300 hover:text-white"
                  aria-label="WhatsApp"
                >
                  <MessageCircle size={18} />
                </a>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-pink-500">Quick Navigation</h4>
              <ul className="space-y-2.5 text-sm text-slate-300 font-medium">
                <li><Link href="#care" className="hover:text-pink-400 transition-colors">Our Clinical Care</Link></li>
                <li><Link href="#doctors" className="hover:text-pink-400 transition-colors">Veterinary Doctors</Link></li>
                <li><Link href="#pricing" className="hover:text-pink-400 transition-colors">Transparent Pricing</Link></li>
                <li><Link href="#approach" className="hover:text-pink-400 transition-colors">The TAP Philosophy</Link></li>
                <li><Link href="#location" className="hover:text-pink-400 transition-colors">Directions & Parking</Link></li>
                <li><Link href="/book" className="hover:text-pink-400 transition-colors">Book an Appointment</Link></li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-pink-500">For Clinic Staff</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Authorized medical staff and receptionist portal for patient records, electronic prescriptions, and appointment management.
              </p>
              <div>
                <Link 
                  href="/clinic" 
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-pink-400 border border-slate-700 rounded-lg px-3 py-2 hover:border-pink-500 transition-all"
                >
                  <span>Clinic Workspace (Staff Portal)</span>
                  <ExternalLink size={13} />
                </Link>
              </div>
            </div>

          </div>
          
          <div className="border-t border-slate-800/80 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <div>&copy; {new Date().getFullYear()} The Animal Place Veterinary Clinic. All rights reserved.</div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-slate-400 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-slate-400 transition-colors">Terms of Care</a>
            </div>
          </div>
        </div>
      </footer>

      {/* 13. Mobile Bottom Floating Sticky Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 p-3 bg-white/95 backdrop-blur-md border-t border-slate-200 z-40 md:hidden flex items-center justify-between gap-3 shadow-lg">
        <div className="flex items-center gap-2">
          <a 
            href="tel:+910000000000" 
            className="w-10 h-10 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center border border-slate-200"
            aria-label="Call Clinic"
          >
            <Phone size={18} className="text-pink-600" />
          </a>
          <a 
            href="https://wa.me/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-200"
            aria-label="WhatsApp Clinic"
          >
            <MessageCircle size={18} />
          </a>
        </div>
        
        <Link 
          href="/book" 
          className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2.5 rounded-full text-sm font-semibold flex-grow text-center shadow-md"
        >
          Book an Appointment
        </Link>
      </div>

      {/* Instagram Story Dialog */}
      <Dialog open={!!selectedPost} onOpenChange={(open) => !open && setSelectedPost(null)}>
        <DialogContent className="sm:max-w-md p-0 overflow-hidden bg-white border-none rounded-2xl">
          {selectedPost && (
            <div className="flex flex-col">
              <div className="relative aspect-square w-full bg-slate-100">
                <Image 
                  src={`/instagram/${selectedPost.image}.jpg`} 
                  alt={selectedPost.title} 
                  fill 
                  className="object-cover" 
                />
              </div>
              <div className="p-6 text-center space-y-4">
                <DialogTitle className="text-2xl font-playfair text-navy">{selectedPost.title}</DialogTitle>
                <DialogDescription className="text-slate-500">View this patient story on our official Instagram.</DialogDescription>
                <div className="flex flex-col gap-3 pt-2">
                  <a 
                    href={`https://instagram.com/${selectedPost.slug}`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 py-3 rounded-full font-medium transition-colors flex items-center justify-center gap-2"
                  >
                    <Camera size={18} /> View on Instagram
                  </a>
                  <Link 
                    href="/book" 
                    onClick={() => setSelectedPost(null)} 
                    className="w-full bg-pink-600 hover:bg-pink-700 text-white py-3 rounded-full font-medium transition-colors"
                  >
                    Book a Visit
                  </Link>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

    </div>
  );
}
