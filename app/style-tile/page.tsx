import React from 'react';
import Brand from '@/app/brand';
import Link from 'next/link';

export default function StyleTile() {
  return (
    <div className="min-h-screen bg-slate-50 p-8 md:p-16">
      <div className="max-w-4xl mx-auto space-y-16">
        
        <header className="flex items-center justify-between border-b border-slate-200 pb-8">
          <div>
            <h1 className="text-3xl font-playfair font-semibold text-navy">The Animal Place</h1>
            <p className="text-slate-500 uppercase tracking-widest text-sm mt-2">Brand Style Tile - $10k Tier Upgrade</p>
          </div>
          <Brand size="small" />
        </header>

        <section className="space-y-6">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-slate-400">01. Colors</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="space-y-2">
              <div className="h-24 rounded-2xl bg-navy shadow-sm border border-slate-200"></div>
              <p className="text-xs font-mono">--tap-navy (#132e51)</p>
            </div>
            <div className="space-y-2">
              <div className="h-24 rounded-2xl bg-pink-600 shadow-sm border border-slate-200"></div>
              <p className="text-xs font-mono">--tap-pink (#c51b78)</p>
            </div>
            <div className="space-y-2">
              <div className="h-24 rounded-2xl bg-slate-50 shadow-sm border border-slate-200"></div>
              <p className="text-xs font-mono">--tap-muted (#f8fafc)</p>
            </div>
            <div className="space-y-2">
              <div className="h-24 rounded-2xl bg-white shadow-sm border border-slate-200"></div>
              <p className="text-xs font-mono">--tap-white (#ffffff)</p>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-slate-400">02. Typography</h2>
          <div className="space-y-8 bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
            <div>
              <p className="text-xs text-slate-400 mb-2 font-mono">Playfair Display / SemiBold / 72px</p>
              <h1 className="text-6xl md:text-7xl font-playfair font-semibold leading-tight text-navy">
                Big love.<br/>
                <span className="text-pink-600 italic">Because, family.</span>
              </h1>
            </div>
            <div>
              <p className="text-xs text-slate-400 mb-2 font-mono">Inter / Medium / 24px</p>
              <h2 className="text-2xl text-slate-800 font-medium">Care that goes the extra paw. No clinical coldness.</h2>
            </div>
            <div>
              <p className="text-xs text-slate-400 mb-2 font-mono">Inter / Regular / 16px</p>
              <p className="text-base text-slate-500 max-w-xl leading-relaxed">
                A familiar face. A healthier, happier pet. Open 7 days a week in Srinagar Colony. We provide thoughtful veterinary care, diagnostics, and wellness.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-slate-400">03. Interface Elements</h2>
          <div className="flex flex-wrap gap-8 items-center bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
            <Link href="#" className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-3 rounded-full font-medium transition-colors shadow-lg shadow-pink-600/20">
              Book a visit
            </Link>
            <Link href="#" className="bg-white text-navy px-8 py-3 rounded-full font-medium transition-colors border border-slate-200 hover:bg-slate-50">
              Secondary Action
            </Link>
            <div className="flex items-center gap-2 text-pink-600 text-sm font-medium tracking-wide uppercase">
              <span className="w-2 h-2 rounded-full bg-pink-600 animate-pulse"></span> Open 7 Days
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-slate-400">04. Cinematic Scroll Implementation</h2>
          <div className="bg-navy p-8 rounded-3xl text-white space-y-4">
            <p className="text-sm text-slate-300">The new architecture utilizes a pinned HTML Canvas sequence scrubber. Due to limitations in the current environment's connection to Higgsfield MCP, developers must generate the assets manually:</p>
            <ul className="list-disc pl-5 space-y-2 text-sm text-slate-300 font-mono">
              <li>Higgsfield prompt 1: Golden Retriever puppy on a warm exam table.</li>
              <li>Higgsfield prompt 2: Zoom into dog's coat and vet's gentle hand.</li>
              <li>Higgsfield prompt 3: Dog running across sunlit green meadow.</li>
            </ul>
            <p className="text-sm text-slate-300 mt-4">Generate in both 16:9 (Desktop) and 9:16 (Mobile), then run the included FFmpeg extractor script.</p>
          </div>
        </section>

      </div>
    </div>
  );
}
