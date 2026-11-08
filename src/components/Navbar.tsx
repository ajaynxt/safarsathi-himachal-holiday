import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle, Menu, X, MapPin } from 'lucide-react';
import { COMPANY_INFO } from '../data/travelData';

interface NavbarProps {
  onOpenBooking: (initialType?: 'package' | 'cab' | 'hotel', itemName?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-2.5' : 'bg-gradient-to-b from-black/70 via-black/40 to-transparent py-4'
    }`}>
      {/* Top micro banner on desktop when not scrolled */}
      {!isScrolled && (
        <div className="hidden lg:block border-b border-white/10 pb-2 mb-2 text-xs text-white/90">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <div className="flex items-center space-x-6">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-brand-orange" />
                Office: New Bus Stand, Tutikandi, Shimla (H.P.)
              </span>
              <span>•</span>
              <span>Taxis & Packages in Delhi, Chandigarh & Himachal</span>
            </div>
            <div className="flex items-center space-x-4">
              <span>Email: {COMPANY_INFO.email}</span>
              <span>•</span>
              <span className="font-semibold text-brand-orange">24x7 Road Support: {COMPANY_INFO.phoneDisplay}</span>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo with both SVG / image support */}
          <a href="#" className="flex items-center gap-2 group">
            <div className="h-11 sm:h-12 flex items-center">
              <img 
                src="/images/logo.svg" 
                alt="SafarSathi - Your Journey Our Responsibility" 
                className="h-full w-auto object-contain filter drop-shadow-sm transition-transform group-hover:scale-105"
                onError={(e) => {
                  // Fallback to png if needed
                  const target = e.target as HTMLImageElement;
                  if (target.src.endsWith('.svg')) {
                    target.src = '/images/logo.png';
                  }
                }}
              />
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-8">
            <a 
              href="#packages" 
              className={`text-sm font-semibold transition-colors hover:text-brand-orange ${
                isScrolled ? 'text-slate-700' : 'text-white drop-shadow'
              }`}
            >
              Tour Packages
            </a>
            <a 
              href="#cabs" 
              className={`text-sm font-semibold transition-colors hover:text-brand-orange ${
                isScrolled ? 'text-slate-700' : 'text-white drop-shadow'
              }`}
            >
              Taxi & Cabs
            </a>
            <a 
              href="#hotels" 
              className={`text-sm font-semibold transition-colors hover:text-brand-orange ${
                isScrolled ? 'text-slate-700' : 'text-white drop-shadow'
              }`}
            >
              Hotels & Stays
            </a>
            <a 
              href="#volvo" 
              className={`text-sm font-semibold transition-colors hover:text-brand-orange ${
                isScrolled ? 'text-slate-700' : 'text-white drop-shadow'
              }`}
            >
              Volvo Bus
            </a>
            <a 
              href="#why-us" 
              className={`text-sm font-semibold transition-colors hover:text-brand-orange ${
                isScrolled ? 'text-slate-700' : 'text-white drop-shadow'
              }`}
            >
              Why Us
            </a>
            <a 
              href="#contact" 
              className={`text-sm font-semibold transition-colors hover:text-brand-orange ${
                isScrolled ? 'text-slate-700' : 'text-white drop-shadow'
              }`}
            >
              Contact
            </a>
          </nav>

          {/* Actions & Buttons */}
          <div className="hidden sm:flex items-center space-x-3">
            <a
              href={`tel:${COMPANY_INFO.phone}`}
              className="flex items-center gap-1.5 px-3 py-2 rounded-full border border-brand-orange/40 text-brand-orange bg-brand-orange/10 hover:bg-brand-orange hover:text-white transition-all text-xs font-bold"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{COMPANY_INFO.phoneDisplay}</span>
            </a>

            <button
              onClick={() => onOpenBooking('package')}
              className="px-4 py-2 rounded-full bg-brand-orange hover:bg-brand-orange-dark text-white text-xs font-bold shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
            >
              Book Now
            </button>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex md:hidden items-center gap-2">
            <a
              href={`tel:${COMPANY_INFO.phone}`}
              className="p-2 rounded-full bg-brand-orange text-white"
              title="Call Us"
            >
              <Phone className="w-4 h-4" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-lg ${isScrolled ? 'text-slate-800' : 'text-white'}`}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 shadow-xl space-y-3 animate-in fade-in slide-in-from-top-2">
          <div className="py-2 border-b border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Shimla Tutikandi Office: 24x7 Assistance</span>
            <span className="font-bold text-brand-orange">8351987587</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm font-semibold">
            <a 
              href="#packages" 
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-lg bg-slate-50 text-slate-800 hover:bg-brand-orange-light hover:text-brand-orange"
            >
              🏔️ Tour Packages
            </a>
            <a 
              href="#cabs" 
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-lg bg-slate-50 text-slate-800 hover:bg-brand-orange-light hover:text-brand-orange"
            >
              🚖 Taxi & Cabs
            </a>
            <a 
              href="#hotels" 
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-lg bg-slate-50 text-slate-800 hover:bg-brand-orange-light hover:text-brand-orange"
            >
              🏨 Hotels & Stays
            </a>
            <a 
              href="#volvo" 
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-lg bg-slate-50 text-slate-800 hover:bg-brand-orange-light hover:text-brand-orange"
            >
              🚌 Volvo Bus
            </a>
            <a 
              href="#why-us" 
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-lg bg-slate-50 text-slate-800 hover:bg-brand-orange-light hover:text-brand-orange"
            >
              ⭐ Why Us
            </a>
            <a 
              href="#contact" 
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-lg bg-slate-50 text-slate-800 hover:bg-brand-orange-light hover:text-brand-orange"
            >
              📞 Contact Us
            </a>
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking('package');
              }}
              className="w-full py-2.5 bg-brand-orange text-white font-bold rounded-xl text-center text-sm shadow-md"
            >
              Book Custom Tour / Cab
            </button>
            <a
              href={COMPANY_INFO.whatsappUrl("Hello SafarSathi, I would like to enquire about Himachal Tour packages and cab booking.")}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 bg-green-600 text-white font-bold rounded-xl text-center text-sm flex items-center justify-center gap-2 shadow"
            >
              <MessageCircle className="w-4 h-4" />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
