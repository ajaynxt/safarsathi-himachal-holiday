import React from 'react';
import { Compass, Map, MessageCircle } from 'lucide-react';
import { COMPANY_INFO } from '../data/travelData';

interface BentoExperienceProps {
  onOpenBooking: (type?: 'package' | 'cab' | 'hotel', itemName?: string) => void;
}

export const BentoExperience: React.FC<BentoExperienceProps> = ({ onOpenBooking }) => (
  <section className="overflow-hidden border-t border-stone-200/70 bg-stone-50 py-16 sm:py-24">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mb-10 grid gap-5 lg:grid-cols-[1.1fr_.9fr] lg:items-end">
        <div className="max-w-2xl">
          <span className="mb-3 inline-block text-xs font-bold uppercase tracking-[.18em] text-amber-700">About Safar Sathi</span>
          <h2 className="font-serif-title text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            A better way to plan your next <span className="italic font-normal">escape.</span>
          </h2>
        </div>
        <p className="max-w-xl text-sm leading-7 text-slate-600 sm:text-base">
          From Himalayan road trips to holidays across India, tell us where you want to go. We’ll help you explore travel options, transport and a plan that fits your dates.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        <div className="flex min-h-[300px] flex-col justify-between rounded-3xl bg-slate-950 p-7 text-white sm:p-8">
          <div>
            <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10"><Compass className="h-6 w-6 text-amber-300" /></div>
            <h3 className="mb-3 font-serif-title text-2xl font-bold">Your trip, your pace.</h3>
            <p className="text-sm leading-6 text-slate-300">Share your destination, travel dates and group size. Ask for a customised itinerary and quotation before you decide.</p>
          </div>
          <button onClick={() => onOpenBooking('package', 'Custom trip enquiry')} className="mt-8 rounded-full bg-white px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-amber-300">Plan a trip</button>
        </div>

        <div className="relative min-h-[300px] overflow-hidden rounded-3xl bg-slate-200">
          <img src="https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=85" alt="Mountain landscape in the Himalayas" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <span className="mb-2 block text-xs font-bold uppercase tracking-[.16em] text-amber-300">Explore India</span>
            <h3 className="font-serif-title text-2xl font-bold">Mountains, coastlines and everything between.</h3>
          </div>
        </div>

        <div className="flex min-h-[300px] flex-col justify-between rounded-3xl border border-stone-200 bg-white p-7 sm:p-8">
          <div>
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-700"><MessageCircle className="h-6 w-6" /></div>
            <span className="font-serif-title text-4xl font-bold text-slate-900">16 years</span>
            <h3 className="mt-2 text-lg font-bold text-slate-900">Travel experience</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">Speak directly with the Safar Sathi team about routes, vehicle options and your travel requirements.</p>
          </div>
          <a href={COMPANY_INFO.whatsappUrl('Hello Safar Sathi, I would like help planning a trip.')} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-emerald-700 hover:text-emerald-800">Chat on WhatsApp <Map className="h-4 w-4" /></a>
        </div>
      </div>
    </div>
  </section>
);
