'use client';
import { useRef, useState, useEffect } from 'react';
import { ArrowUpRight, ArrowRight, ArrowLeft, MapPin, Heart, ShieldCheck, Stethoscope, Activity, Scissors, Syringe, Menu, Camera, CalendarDays, PawPrint, Phone, Clock, Star, Sparkles, ChevronRight } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetClose } from '@/components/ui/sheet';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import Brand from './brand';
import Link from 'next/link';
import Image from 'next/image';

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
  { Icon: Stethoscope, title: 'Everyday wellness', text: 'Unhurried check-ups, preventive care, and a plan for every life stage.', tag: 'A HEALTHY START', post: 8 },
  { Icon: Activity, title: 'Diagnostics & surgery', text: 'Digital imaging, in-house testing, surgical care, and supported recovery.', tag: 'ANSWERS. THEN ACTION.', post: 1 },
  { Icon: Syringe, title: 'Vaccines & protection', text: 'Vaccination visits and parasite care tailored to your companion.', tag: 'SMALL STEPS. BIG CARE.', post: 5 },
  { Icon: Scissors, title: 'Grooming & dental', text: 'Healthy coats, comfortable skin, and brighter smiles from nose to tail.', tag: 'FEEL-GOOD CARE', post: 7 },
];

const stats = [
  { value: 500, suffix: '+', label: 'Happy pets cared for' },
  { value: 15, suffix: '+', label: 'Years combined experience' },
  { value: 9, suffix: '', label: 'Specialized services' },
  { value: 7, suffix: '/7', label: 'Days open for you' },
];

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const counted = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !counted.current) {
          counted.current = true;
          const duration = 2000;
          const start = performance.now();
          const step = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return <div ref={ref} className="tap-stat-number text-4xl font-bold font-playfair">{count}{suffix}</div>;
}

export default function Page() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selectedPost, setSelectedPost] = useState<typeof posts[0] | null>(null);

  function tilt(e: React.PointerEvent<HTMLDivElement>) {
    if (e.pointerType !== 'mouse' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const b = e.currentTarget.getBoundingClientRect();
    if (sceneRef.current) {
      sceneRef.current.style.setProperty('--rx', `${-(e.clientY - b.top - b.height / 2) / 45}deg`);
      sceneRef.current.style.setProperty('--ry', `${(e.clientX - b.left - b.width / 2) / 45}deg`);
    }
  }

  function resetTilt() {
    if (sceneRef.current) {
      sceneRef.current.style.setProperty('--rx', '0deg');
      sceneRef.current.style.setProperty('--ry', '0deg');
    }
  }

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
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-20 md:pb-0">
      <div className="tap-topline bg-navy text-white py-2 text-xs text-center flex items-center justify-center gap-2">
        <MapPin size={14} /> Srinagar Colony, Hyderabad <span className="opacity-50 px-2">|</span> Open 7 days · 9 AM – 9 PM
      </div>
      
      <header className="tap-header sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <Brand size="small" />
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="#care" className="hover:text-pink-600 transition-colors">Our care</Link>
            <Link href="#approach" className="hover:text-pink-600 transition-colors">The TAP approach</Link>
            <Link href="#stories" className="hover:text-pink-600 transition-colors">Life at TAP</Link>
          </nav>
          <div className="hidden md:flex items-center gap-4">
            <Link href="/clinic" className="text-sm font-medium hover:text-pink-600 transition-colors">Clinic workspace</Link>
            <Link href="/book" className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded-full font-medium transition-colors">Book a visit</Link>
          </div>
          
          <Sheet>
            <SheetTrigger className="md:hidden p-2">
              <Menu />
            </SheetTrigger>
            <SheetContent side="right" className="bg-white">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <div className="flex flex-col gap-6 mt-10">
                <SheetClose asChild><Link href="#care" className="text-lg font-medium">Our care</Link></SheetClose>
                <SheetClose asChild><Link href="#approach" className="text-lg font-medium">The TAP approach</Link></SheetClose>
                <SheetClose asChild><Link href="#stories" className="text-lg font-medium">Life at TAP</Link></SheetClose>
                <div className="h-px bg-slate-100 my-2"></div>
                <SheetClose asChild><Link href="/clinic" className="text-lg font-medium">Clinic workspace</Link></SheetClose>
                <SheetClose asChild><Link href="/book" className="bg-pink-600 text-white px-6 py-3 rounded-full text-center font-medium mt-4">Book a visit</Link></SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <section className="tap-hero container mx-auto px-4 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center">
        <div className="tap-hero-copy space-y-6">
          <div className="inline-flex items-center gap-2 text-pink-600 font-medium tracking-wide text-sm uppercase">
            <Heart size={16} /> Welcome to the family
          </div>
          <h1 className="text-5xl md:text-7xl font-playfair font-semibold leading-tight text-navy">
            Big love.<br/>Better care.<br/>
            <span className="text-pink-600 italic">Because, family.</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-lg">
            Thoughtful veterinary care for your companions. Wellness, diagnostics, surgery, vaccinations, grooming & more in Srinagar Colony.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <Link href="/book" className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-3 rounded-full font-medium transition-colors flex items-center gap-2">
              Book a visit <ArrowUpRight size={18} />
            </Link>
            <Link href="#care" className="bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 px-8 py-3 rounded-full font-medium transition-colors">
              Explore our care
            </Link>
          </div>
          <div className="pt-8 flex items-center gap-3 text-sm font-medium text-slate-500">
            <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center text-pink-600">
              <Heart size={20} fill="currentColor" />
            </div>
            Made with love in Hyderabad
          </div>
        </div>
        
        <div className="tap-scene relative h-[400px] md:h-[600px] perspective-1000" onPointerMove={tilt} onPointerLeave={resetTilt}>
          <div ref={sceneRef} className="tap-scene-inner w-full h-full relative transition-transform duration-200 ease-out transform-gpu preserve-3d" style={{ transform: 'rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))' }}>
            <div className="tap-scene-orbit absolute inset-0 border-2 border-pink-100 rounded-full animate-[spin_20s_linear_infinite]" style={{ transform: 'translateZ(-50px) scale(0.9)' }}></div>
            <div className="absolute inset-0 flex items-center justify-center" style={{ transform: 'translateZ(0)' }}>
              <div className="tap-pet-frame relative w-full h-full max-w-md mx-auto">
                <Image src="/tap-3d-pets.png" alt="Happy pets" fill className="object-contain" priority />
                
                <div className="tap-float tap-float-top absolute top-10 left-10 bg-white p-3 rounded-2xl shadow-lg flex items-center gap-3 animate-bounce" style={{ transform: 'translateZ(50px)' }}>
                  <div className="bg-green-100 p-2 rounded-full text-green-600"><ShieldCheck size={24} /></div>
                  <div className="text-sm font-medium">Expert Care</div>
                </div>
                
                <div className="tap-float tap-float-bottom absolute bottom-20 right-10 bg-white p-3 rounded-2xl shadow-lg flex items-center gap-3" style={{ transform: 'translateZ(80px)' }}>
                  <div className="bg-blue-100 p-2 rounded-full text-blue-600"><CalendarDays size={24} /></div>
                  <div>
                    <div className="text-sm font-medium">Open Everyday</div>
                    <Link href="/book" className="text-xs text-pink-600 font-medium">Book now &rarr;</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="tap-ribbon bg-navy text-pink-200 py-4 overflow-hidden flex whitespace-nowrap text-sm font-medium tracking-widest uppercase">
        <div className="animate-[marquee_20s_linear_infinite] flex items-center gap-8 px-4">
          <span>Wellness</span> <span>✳</span> <span>Diagnostics</span> <span>✳</span> <span>Surgery</span> <span>✳</span> <span>Vaccinations</span> <span>✳</span> <span>Grooming</span>
          <span>Wellness</span> <span>✳</span> <span>Diagnostics</span> <span>✳</span> <span>Surgery</span> <span>✳</span> <span>Vaccinations</span> <span>✳</span> <span>Grooming</span>
        </div>
      </div>

      <section id="care" className="tap-section py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 text-pink-600 font-medium tracking-wide text-sm uppercase mb-4">
              <Sparkles size={16} /> Our Services
            </div>
            <h2 className="text-4xl md:text-5xl font-playfair font-semibold text-navy mb-6">
              Care that goes<br/><span className="text-pink-600 italic">the extra paw.</span>
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">From nose to tail, we're here with everything your companion needs for a long, happy life.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, i) => (
              <button key={i} onClick={() => setSelectedPost(posts[service.post])} className="text-left group bg-slate-50 p-8 rounded-3xl hover:bg-pink-50 transition-colors border border-slate-100 shadow-sm hover:shadow-md">
                <div className="bg-white w-14 h-14 rounded-2xl flex items-center justify-center text-pink-600 mb-6 shadow-sm group-hover:scale-110 transition-transform">
                  <service.Icon size={28} />
                </div>
                <div className="text-xs font-bold text-slate-400 mb-2">{service.tag}</div>
                <h3 className="text-xl font-semibold text-navy mb-3">{service.title}</h3>
                <p className="text-slate-600 text-sm mb-6">{service.text}</p>
                <div className="inline-flex items-center gap-2 text-pink-600 font-medium text-sm group-hover:translate-x-1 transition-transform">
                  See more <ArrowRight size={16} />
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="tap-stats bg-navy text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
            {stats.map((stat, i) => (
              <div key={i} className="flex flex-col items-center justify-center space-y-2">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                <div className="text-pink-200 text-sm font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="approach" className="tap-approach py-24 bg-slate-50">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="bg-white p-4 pb-16 shadow-xl rounded-sm transform -rotate-3 hover:rotate-0 transition-transform duration-500 max-w-md mx-auto">
              <div className="relative aspect-square w-full bg-slate-200 rounded-sm overflow-hidden">
                <Image src={`/p/bd8d25977046c7ae.jpg`} alt="The TAP Approach" fill className="object-cover" />
              </div>
              <div className="absolute bottom-6 left-0 right-0 text-center font-playfair italic text-slate-500">Your pet's new happy place</div>
            </div>
            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-pink-100 rounded-full mix-blend-multiply opacity-50 blur-2xl"></div>
            <div className="absolute -top-8 -left-8 w-32 h-32 bg-blue-100 rounded-full mix-blend-multiply opacity-50 blur-2xl"></div>
          </div>
          
          <div className="space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 text-pink-600 font-medium tracking-wide text-sm uppercase mb-4">
                <Star size={16} /> Why choose us
              </div>
              <h2 className="text-4xl md:text-5xl font-playfair font-semibold text-navy mb-6">
                Not your average<br/><span className="text-pink-600 italic">vet clinic.</span>
              </h2>
              <p className="text-slate-600 text-lg">We designed TAP to feel less like a hospital and more like a second home. Stress-free visits, transparent care, and a lot of treats.</p>
            </div>
            
            <ul className="space-y-6">
              {[
                { title: 'We listen first', text: 'To you and your pet. Every visit starts with a conversation, not a rush.' },
                { title: 'We make it clear', text: 'No confusing medical jargon. We explain every option, cost, and step.' },
                { title: 'We stay connected', text: 'Our care doesn\'t end when you leave. We follow up to ensure steady recovery.' }
              ].map((val, i) => (
                <li key={i} className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center font-bold">{i + 1}</div>
                  <div>
                    <h4 className="font-semibold text-navy text-lg">{val.title}</h4>
                    <p className="text-slate-600">{val.text}</p>
                  </div>
                </li>
              ))}
            </ul>
            
            <Link href="/book" className="inline-flex items-center gap-2 font-semibold text-pink-600 hover:text-pink-700">
              Experience the difference <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      <section id="stories" className="tap-stories py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-12">
            <div>
              <div className="inline-flex items-center gap-2 text-pink-600 font-medium tracking-wide text-sm uppercase mb-4">
                <Camera size={16} /> Life at TAP
              </div>
              <h2 className="text-4xl font-playfair font-semibold text-navy">Follow our journey</h2>
            </div>
            <div className="hidden md:flex gap-4">
              <button onClick={scrollLeft} className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors"><ArrowLeft size={20} /></button>
              <button onClick={scrollRight} className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors"><ArrowRight size={20} /></button>
            </div>
          </div>
          
          <div ref={scrollRef} className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
            {posts.map((post, i) => (
              <button key={i} onClick={() => setSelectedPost(post)} className="flex-shrink-0 w-72 md:w-80 snap-center group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow text-left">
                <div className="aspect-[4/5] relative bg-slate-100">
                  <Image src={`/p/${post.image}.jpg`} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                    <div className="text-white">
                      <h4 className="font-semibold text-lg">{post.title}</h4>
                      <p className="text-pink-200 text-sm flex items-center gap-1 mt-1">View on Instagram <ChevronRight size={14} /></p>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <a href="https://instagram.com/theanimalplace_vet" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-medium text-slate-600 hover:text-pink-600 transition-colors">
              @theanimalplace_vet
            </a>
          </div>
        </div>
      </section>

      <section className="tap-visit bg-navy py-24 relative overflow-hidden">
        <div className="absolute -right-20 -top-20 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl"></div>
        <div className="absolute -left-20 -bottom-20 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 text-pink-300 mb-8 backdrop-blur-sm">
            <PawPrint size={32} />
          </div>
          <h2 className="text-4xl md:text-6xl font-playfair font-semibold text-white mb-6">
            A familiar face.<br/>A healthier, <em className="text-pink-400">happier pet.</em>
          </h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-slate-300 mb-10">
            <div className="flex items-center gap-2"><MapPin size={18} className="text-pink-400" /> Srinagar Colony, Hyderabad</div>
            <div className="hidden md:block w-1 h-1 rounded-full bg-slate-500"></div>
            <div className="flex items-center gap-2"><Clock size={18} className="text-pink-400" /> Open 7 days, 9 AM – 9 PM</div>
          </div>
          <Link href="/book" className="inline-block bg-pink-600 hover:bg-pink-700 text-white px-10 py-4 rounded-full font-medium text-lg transition-colors shadow-lg hover:shadow-xl hover:-translate-y-1 transform duration-200">
            Book a visit now
          </Link>
        </div>
      </section>

      <footer className="tap-footer bg-white border-t border-slate-200 pt-16 pb-8 md:pb-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-2">
              <div className="mb-6"><Brand size="default" /></div>
              <p className="text-slate-500 max-w-sm mb-6">Modern, thoughtful veterinary care in Hyderabad. Because they are family.</p>
              <div className="flex gap-4">
                <a href="https://instagram.com/theanimalplace_vet" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-pink-100 hover:text-pink-600 transition-colors">
                  <Camera size={20} />
                </a>
                <a href="tel:+910000000000" className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-pink-100 hover:text-pink-600 transition-colors">
                  <Phone size={20} />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-navy mb-4">Quick Links</h4>
              <ul className="space-y-3">
                <li><Link href="#care" className="text-slate-500 hover:text-pink-600">Our Services</Link></li>
                <li><Link href="#approach" className="text-slate-500 hover:text-pink-600">Our Approach</Link></li>
                <li><Link href="/book" className="text-slate-500 hover:text-pink-600">Book an Appointment</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-navy mb-4">For Staff</h4>
              <ul className="space-y-3">
                <li><Link href="/clinic" className="text-slate-500 hover:text-pink-600 flex items-center gap-2">Clinic Workspace <ArrowUpRight size={14} /></Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-400">
            <div>&copy; {new Date().getFullYear()} The Animal Place. All rights reserved.</div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-slate-600">Privacy Policy</a>
              <a href="#" className="hover:text-slate-600">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      <div className="tap-mobile-cta fixed bottom-0 left-0 right-0 p-4 bg-white/90 backdrop-blur-md border-t border-slate-200 z-40 md:hidden flex items-center justify-between">
        <div className="text-sm font-medium text-navy">Good care is a TAP away.</div>
        <Link href="/book" className="bg-pink-600 text-white px-6 py-2 rounded-full text-sm font-medium">Book</Link>
      </div>

      <Dialog open={!!selectedPost} onOpenChange={(open) => !open && setSelectedPost(null)}>
        <DialogContent className="sm:max-w-md p-0 overflow-hidden bg-white border-none rounded-2xl">
          {selectedPost && (
            <div className="flex flex-col">
              <div className="relative aspect-square w-full bg-slate-100">
                <Image src={`/p/${selectedPost.image}.jpg`} alt={selectedPost.title} fill className="object-cover" />
              </div>
              <div className="p-6 text-center space-y-4">
                <DialogTitle className="text-2xl font-playfair text-navy">{selectedPost.title}</DialogTitle>
                <DialogDescription className="text-slate-500">View this and more on our Instagram.</DialogDescription>
                <div className="flex flex-col gap-3 pt-2">
                  <a href={`https://instagram.com/${selectedPost.slug}`} target="_blank" rel="noopener noreferrer" className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 py-3 rounded-full font-medium transition-colors flex items-center justify-center gap-2">
                    <Camera size={18} /> View on Instagram
                  </a>
                  <Link href="/book" onClick={() => setSelectedPost(null)} className="w-full bg-pink-600 hover:bg-pink-700 text-white py-3 rounded-full font-medium transition-colors">
                    Book a visit
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
