import React, { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { COMPANY_INFO } from '../data/travelData';

export const FloatingWhatsApp: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 250) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-40 flex items-center gap-2 group">
      {/* Speech bubble teaser */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 bg-white text-slate-800 text-xs font-bold px-3.5 py-2 rounded-2xl shadow-xl border border-slate-100 animate-bounce">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Shimla Desk Online • Instant Quotation</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowTooltip(false);
            }}
            className="text-slate-400 hover:text-slate-600 p-0.5 ml-1"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Floating Action Button */}
      <a
        href={COMPANY_INFO.whatsappUrl("Hello SafarSathi, I am planning a tour to Himachal. Please share best package and cab options.")}
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex items-center justify-center w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-2xl transition-all duration-300 transform hover:scale-110 focus:outline-none ring-4 ring-emerald-400/30"
        title="Chat with SafarSathi Shimla Office"
      >
        <MessageCircle className="w-7 h-7 sm:w-8 sm:h-8" />
        
        {/* Pulsing online badge */}
        <span className="absolute top-0 right-0 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-amber-500 border-2 border-white"></span>
        </span>
      </a>
    </div>
  );
};
