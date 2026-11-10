import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { COMPANY_INFO } from '../data/travelData';

export const TopBanner: React.FC = () => (
  <div className="relative z-[60] w-full border-b border-slate-200 bg-white px-4 py-2 text-[11px] text-slate-700 sm:text-xs">
    <div className="mx-auto flex max-w-7xl items-center justify-between gap-3">
      <p className="truncate font-medium">Plan your next journey with Safar Sathi</p>
      <div className="flex shrink-0 items-center gap-3">
        <a href={`tel:${COMPANY_INFO.phone}`} className="inline-flex items-center gap-1.5 font-semibold hover:text-amber-700">
          <Phone className="h-3.5 w-3.5" /><span className="hidden sm:inline">{COMPANY_INFO.phoneDisplay}</span><span className="sm:hidden">Call</span>
        </a>
        <a href={COMPANY_INFO.whatsappUrl('Hello Safar Sathi, I would like to enquire about a trip.')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-bold text-emerald-700 hover:text-emerald-800">
          <MessageCircle className="h-3.5 w-3.5" /> WhatsApp
        </a>
      </div>
    </div>
  </div>
);
