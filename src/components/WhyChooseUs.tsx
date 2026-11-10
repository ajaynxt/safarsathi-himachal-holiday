import React from 'react';
import { Compass, CarFront, MessageCircle, CalendarCheck, MapPinned, ClipboardList } from 'lucide-react';
import { COMPANY_INFO } from '../data/travelData';

export const WhyChooseUs: React.FC = () => {
  const points = [
    { icon: <Compass className="h-5 w-5" />, title: 'Trips shaped around you', description: 'Tell us your preferred places, pace, dates and group size to start a customised travel discussion.' },
    { icon: <CarFront className="h-5 w-5" />, title: 'Vehicle options', description: 'Ask about sedan, SUV, tempo traveller and Volvo options for your route and group.' },
    { icon: <CalendarCheck className="h-5 w-5" />, title: 'Plan before you confirm', description: 'Request an itinerary and quotation. Confirm only after you have reviewed the details.' },
    { icon: <MessageCircle className="h-5 w-5" />, title: 'Direct communication', description: 'Connect with the Safar Sathi team by phone or WhatsApp to discuss your requirements.' },
    { icon: <MapPinned className="h-5 w-5" />, title: 'Destinations across India', description: 'Explore Himachal, Kashmir, Uttarakhand, Rajasthan, Kerala and other destinations.' },
    { icon: <ClipboardList className="h-5 w-5" />, title: 'Clear trip details', description: 'Ask for inclusions, exclusions, vehicle details, payment terms and cancellation conditions in writing.' }
  ];

  return (
    <section id="why-us" className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <span className="mb-3 inline-block text-xs font-bold uppercase tracking-[.18em] text-amber-700">Travel, made clearer</span>
          <h2 className="font-serif-title text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Plan with the details that matter.</h2>
          <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">A simple enquiry process helps you compare the plan and understand what is included before making a decision.</p>
        </div>

        <div className="grid gap-x-8 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
          {points.map((point) => (
            <div key={point.title} className="border-t border-stone-200 pt-5">
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-700">{point.icon}</div>
              <h3 className="text-base font-bold text-slate-900">{point.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{point.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-5 rounded-3xl bg-slate-950 p-6 text-white sm:p-9 lg:flex-row lg:items-center">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-[.16em] text-amber-300">Talk to Safar Sathi</span>
            <h3 className="mt-2 text-2xl font-bold">{COMPANY_INFO.address}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-300">Discuss your travel dates, route, vehicle preference and quotation directly with the team.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href={`tel:${COMPANY_INFO.phone}`} className="rounded-xl bg-amber-400 px-5 py-3 text-sm font-bold text-slate-950 hover:bg-amber-300">Call {COMPANY_INFO.phoneDisplay}</a>
            <a href={COMPANY_INFO.whatsappUrl('Hello Safar Sathi, I would like to discuss a trip.')} target="_blank" rel="noopener noreferrer" className="rounded-xl border border-white/25 px-5 py-3 text-sm font-bold text-white hover:bg-white/10">WhatsApp</a>
          </div>
        </div>
      </div>
    </section>
  );
};
