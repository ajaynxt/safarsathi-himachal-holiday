import React, { useState, useEffect } from 'react';
import { Plane, X, MessageCircle, PhoneCall, Sparkles, CheckCircle2, MapPin } from 'lucide-react';
import { COMPANY_INFO } from '../data/travelData';

interface AnimatedOfferPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectDestination?: (dest: string) => void;
}

export const AnimatedOfferPopup: React.FC<AnimatedOfferPopupProps> = ({ isOpen, onClose, onSelectDestination }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [destination, setDestination] = useState('Shimla & Manali');
  const [travelMonth, setTravelMonth] = useState('This Month');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleWhatsAppInquiry = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (onSelectDestination) {
      onSelectDestination(destination);
    }
    const message = `Hello SafarSathi! 🏔️ I am interested in the Himalayan Tour Special Offer (20% OFF).%0A%0A👤 Name: ${name || 'Traveler'}%0A📱 Phone: ${phone || 'Not provided'}%0A📍 Destination: ${destination}%0A🗓️ Travel Period: ${travelMonth}%0A%0APlease share available packages, white cab options, and hotel details.`;
    window.open(`https://wa.me/918351987587?text=${message}`, '_blank');
    setIsSubmitted(true);
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-950/75 backdrop-blur-md transition-opacity animate-fade-in"
        onClick={onClose}
      />

      {/* Popup Container */}
      <div className="relative w-full max-w-lg bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white rounded-3xl shadow-2xl border border-amber-500/30 overflow-hidden z-10 my-auto transform transition-all animate-scale-up">
        
        {/* Animated Flight Path Sky Background */}
        <div className="absolute inset-x-0 top-0 h-44 pointer-events-none overflow-hidden">
          {/* Ambient Glow */}
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-80 h-80 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />
          
          {/* Animated Flight Curve */}
          <svg className="w-full h-full" viewBox="0 0 500 180" preserveAspectRatio="none">
            <path
              d="M -20,150 Q 150,130 250,70 T 520,20"
              fill="none"
              stroke="url(#flightGradPopup)"
              strokeWidth="2.5"
              strokeDasharray="6 6"
              className="animate-pulse"
            />
            <defs>
              <linearGradient id="flightGradPopup" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#F5A623" stopOpacity="0.1" />
                <stop offset="50%" stopColor="#F5A623" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#FFFFFF" stopOpacity="1" />
              </linearGradient>
            </defs>
          </svg>

          {/* Animated Airplane flying across popup */}
          <div className="absolute popup-plane-flight flex items-center">
            <div className="relative">
              <div className="absolute right-4 top-1/2 -translate-y-1/2 w-16 h-1.5 bg-gradient-to-r from-transparent via-amber-400 to-white rounded-full blur-[1px] opacity-90 animate-pulse" />
              <Plane className="w-6 h-6 text-amber-400 fill-amber-400 drop-shadow-[0_0_12px_rgba(245,166,35,0.9)] transform rotate-45" />
            </div>
          </div>
        </div>

        <style>{`
          @keyframes popupFlightMove {
            0% {
              left: -40px;
              top: 130px;
              opacity: 0;
              transform: scale(0.8);
            }
            15% {
              opacity: 1;
            }
            85% {
              opacity: 1;
            }
            100% {
              left: 105%;
              top: 20px;
              opacity: 0;
              transform: scale(1.1);
            }
          }
          .popup-plane-flight {
            position: absolute;
            animation: popupFlightMove 6s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          }
        `}</style>

        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          aria-label="Close popup"
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/10 hover:bg-white/25 text-white/80 hover:text-white flex items-center justify-center transition-colors border border-white/10 shadow-lg"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content Area */}
        <div className="relative z-10 px-6 pt-6 pb-6 sm:px-8 sm:pt-8 sm:pb-8">
          
          {/* Logo & Offer Badge */}
          <div className="flex items-center justify-between mb-4">
            <div className="bg-white/95 rounded-xl px-3 py-1.5 shadow-md flex items-center gap-2">
              <img 
                src={`${import.meta.env.BASE_URL}images/logo.svg`}
                alt="SafarSathi"
                className="h-8 w-auto object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  if (target.src.endsWith('.svg')) {
                    target.src = `${import.meta.env.BASE_URL}images/logo.png`;
                  }
                }}
              />
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-400/40 text-amber-300 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: '4s' }} />
              <span>Flat 20% OFF</span>
            </div>
          </div>

          {/* Headline */}
          <div className="text-left mb-5">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-amber-400 block mb-1">
              Limited-Time Himalayan Season Offer
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif-title font-bold text-white leading-tight">
              Plan Your Dream <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-orange-400">Himalayas</span> Escape
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1.5 leading-relaxed">
              Customized Tour Packages with 100% Commercial White Cabs, Handpicked Mountain View Hotels &amp; 24x7 Road Support.
            </p>
          </div>

          {/* Highlights Pills */}
          <div className="grid grid-cols-2 gap-2 mb-5 text-xs text-slate-300 bg-white/5 p-3 rounded-2xl border border-white/10">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>All-White Private Cab</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Deluxe Hotel + Meals</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Shimla &amp; Manali Tours</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Zero Hidden Charges</span>
            </div>
          </div>

          {/* Form */}
          {isSubmitted ? (
            <div className="bg-emerald-500/15 border border-emerald-500/30 rounded-2xl p-6 text-center animate-fade-in">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-2 animate-bounce" />
              <h4 className="text-lg font-bold text-white">Opening WhatsApp...</h4>
              <p className="text-xs text-slate-300 mt-1">
                Connecting you directly with our Shimla travel specialist for your 20% discount quote!
              </p>
            </div>
          ) : (
            <form onSubmit={handleWhatsAppInquiry} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[11px] font-bold text-slate-300 mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-amber-400 focus:bg-white/15 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-300 mb-1">WhatsApp Number</label>
                  <input
                    type="tel"
                    required
                    placeholder="10-digit mobile no."
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-amber-400 focus:bg-white/15 transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[11px] font-bold text-slate-300 mb-1">Select Destination</label>
                  <select
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-white/20 text-white text-sm focus:outline-none focus:border-amber-400 transition-all cursor-pointer"
                  >
                    <option value="Shimla & Manali">Shimla &amp; Manali (5N/6D)</option>
                    <option value="Spiti Valley Expedition">Spiti Valley Expedition (7N/8D)</option>
                    <option value="Shimla Manali Dharamshala">Grand Himachal (8N/9D)</option>
                    <option value="Leh Ladakh Road Trip">Leh – Ladakh Circuit</option>
                    <option value="Kashmir Paradise">Jammu &amp; Kashmir (6N/7D)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-300 mb-1">Travel Period</label>
                  <select
                    value={travelMonth}
                    onChange={(e) => setTravelMonth(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-white/20 text-white text-sm focus:outline-none focus:border-amber-400 transition-all cursor-pointer"
                  >
                    <option value="This Month">This Month (Immediate)</option>
                    <option value="Next Month">Next Month</option>
                    <option value="Summer Season">Summer Season (Apr - Jun)</option>
                    <option value="Snow Season">Snow &amp; Winter Vacation</option>
                  </select>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
                <button
                  type="submit"
                  className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-bold text-sm shadow-lg shadow-emerald-900/30 flex items-center justify-center gap-2 transition-all transform active:scale-95"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Get 20% OFF Quote on WhatsApp</span>
                </button>

                <a
                  href={`tel:${COMPANY_INFO.phone}`}
                  className="py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-sm shadow-lg shadow-amber-900/30 flex items-center justify-center gap-2 transition-all"
                >
                  <PhoneCall className="w-4 h-4 text-slate-950" />
                  <span>Call Us</span>
                </a>
              </div>
            </form>
          )}

          {/* Footer note */}
          <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-amber-400" />
              24x7 Support: {COMPANY_INFO.phoneDisplay}
            </span>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white underline transition-colors"
            >
              Browse Website
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
