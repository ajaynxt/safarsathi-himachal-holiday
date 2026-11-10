import React, { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';
import { InstagramIcon } from './InstagramIcon';
import { COMPANY_INFO } from '../data/travelData';

export const AdventureBanner: React.FC = () => {
  const [contact, setContact] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleTripEnquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contact) return;
    const msg = `Hello SafarSathi! I would like to discuss a trip and receive a quotation.%0AContact: ${contact}`;
    window.open(`https://wa.me/918351987587?text=${msg}`, '_blank');
    setSubmitted(true);
  };

  return (
    <section className="relative bg-emerald-950 text-white overflow-hidden pt-12 pb-14 sm:pt-16 sm:pb-20">
      
      {/* Top Organic Wave Curve matching Reference 2 */}
      <div className="absolute top-0 inset-x-0 overflow-hidden leading-none z-10 pointer-events-none">
        <svg 
          className="relative block w-full h-8 sm:h-12 text-stone-50" 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none"
        >
          <path 
            d="M0,0 C150,90 350,-40 500,40 C650,120 900,10 1200,40 L1200,0 L0,0 Z" 
            fill="currentColor" 
          />
        </svg>
      </div>

      {/* Background ambient lighting */}
      <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-emerald-600/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          
          {/* Left info with paper plane / compass icon */}
          <div className="flex items-start sm:items-center gap-4 text-left max-w-xl">
            <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0 shadow-inner">
              <Send className="w-7 h-7 text-amber-400 transform -rotate-12" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  Have a trip in mind?
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif-title font-bold text-white tracking-tight">
                Let&apos;s Plan Your Next Adventure
              </h3>
              <p className="text-xs sm:text-sm text-emerald-100/80 mt-1 leading-relaxed">
                Share your contact details and the Safar Sathi team can follow up about your travel enquiry.
              </p>
            </div>
          </div>

          {/* Right Newsletter / WhatsApp Subscription Bar */}
          <div className="w-full lg:w-auto flex-1 max-w-md">
            {submitted ? (
              <div className="bg-white/10 backdrop-blur-md border border-emerald-400/30 rounded-2xl p-4 text-center flex items-center justify-center gap-2 text-emerald-300 font-semibold text-sm">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>Opening WhatsApp with your travel specialist!</span>
              </div>
            ) : (
              <form onSubmit={handleTripEnquiry} className="relative flex items-center">
                <input
                  type="text"
                  required
                  placeholder="Enter your WhatsApp number or email"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  className="w-full py-3.5 pl-5 pr-32 rounded-full bg-white text-slate-900 placeholder-slate-400 text-xs sm:text-sm font-medium focus:outline-none shadow-xl border border-white/40"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 py-2.5 px-5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm tracking-wide shadow-md transition-all flex items-center gap-1.5"
                >
                  <span>Send Enquiry</span>
                  <span className="text-xs">&rarr;</span>
                </button>
              </form>
            )}

            <div className="flex items-center justify-between text-[11px] text-emerald-200/70 mt-2.5 px-3">
              <span>Opens WhatsApp to send your enquiry</span>
              <a
                href={COMPANY_INFO.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-white transition-colors"
              >
                <InstagramIcon className="w-3 h-3 text-pink-400" />
                <span>{COMPANY_INFO.instagramHandle}</span>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
