import React from 'react';
import { Phone, MessageCircle, Calendar } from 'lucide-react';
import { COMPANY_INFO } from '../data/travelData';

interface StickyMobileBarProps {
  onOpenBooking: () => void;
}

export const StickyMobileBar: React.FC<StickyMobileBarProps> = ({ onOpenBooking }) => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-3 py-2 shadow-2xl flex items-center justify-between gap-2">
      {/* Direct Call Button */}
      <a
        href={`tel:${COMPANY_INFO.phone}`}
        className="flex-1 py-2.5 px-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors border border-slate-300"
      >
        <Phone className="w-4 h-4 text-brand-orange" />
        <span>Call Now</span>
      </a>

      {/* Direct WhatsApp Button */}
      <a
        href={COMPANY_INFO.whatsappUrl("Hello SafarSathi, I am looking for Himachal packages and taxi booking.")}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 py-2.5 px-2 bg-green-600 hover:bg-green-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow"
      >
        <MessageCircle className="w-4 h-4" />
        <span>WhatsApp</span>
      </a>

      {/* Book / Custom Tour Button */}
      <button
        onClick={onOpenBooking}
        className="flex-1 py-2.5 px-2 bg-brand-orange hover:bg-brand-orange-dark text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-md"
      >
        <Calendar className="w-4 h-4" />
        <span>Book Tour</span>
      </button>
    </div>
  );
};
