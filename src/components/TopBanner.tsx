import React, { useState } from 'react';
import { Phone, MessageCircle, X, Sparkles } from 'lucide-react';
import { COMPANY_INFO } from '../data/travelData';

export const TopBanner: React.FC = () => {
  const [closed, setClosed] = useState(false);

  if (closed) return null;

  return (
    <div className="bg-gradient-to-r from-brand-navy via-slate-900 to-brand-navy text-white text-[11px] sm:text-xs py-2 px-4 relative z-50 border-b border-white/10 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 overflow-hidden">
          <span className="flex items-center gap-1 bg-brand-orange text-white text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full flex-shrink-0 animate-pulse">
            <Sparkles className="w-3 h-3" />
            Special Offer
          </span>
          <p className="truncate text-slate-200">
            <strong className="text-white font-bold">All States &amp; Snow Season:</strong> Flat 15% Off on All-White Innova Crysta &amp; Tour Packages Across India!
          </p>
        </div>

        <div className="flex items-center gap-3 flex-shrink-0">
          <a
            href={`tel:${COMPANY_INFO.phone}`}
            className="hidden md:flex items-center gap-1 text-slate-300 hover:text-white transition-colors font-medium"
          >
            <Phone className="w-3 h-3 text-brand-orange" />
            <span>{COMPANY_INFO.phoneDisplay}</span>
          </a>

          <a
            href={COMPANY_INFO.whatsappUrl("Hello SafarSathi, I want to avail the Snow Season 15% discount offer.")}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-bold transition-colors"
          >
            <MessageCircle className="w-3 h-3" />
            <span className="hidden sm:inline">Claim on WhatsApp</span>
            <span className="sm:hidden">Claim 15% Off</span>
          </a>

          <button
            onClick={() => setClosed(true)}
            className="text-slate-400 hover:text-white p-0.5 rounded transition-colors"
            title="Dismiss announcement"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
