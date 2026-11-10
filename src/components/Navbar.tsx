import React, { useState, useEffect } from 'react';
import { Phone, Menu, X } from 'lucide-react';
import { COMPANY_INFO } from '../data/travelData';

interface NavbarProps {
  onOpenBooking: (initialType?: 'package' | 'cab' | 'hotel', itemName?: string) => void;
  onOpenOfferPopup?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking, onOpenOfferPopup }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleEnquireClick = () => {
    if (onOpenOfferPopup) {
      onOpenOfferPopup();
    } else {
      onOpenBooking('package', 'Himalayan Tour Enquiry');
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-2.5' : 'bg-gradient-to-b from-black/70 via-black/40 to-transparent py-3.5 sm:py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Official SafarSathi Logo with Crisp Backing */}
          <a href="#" className="flex items-center gap-2 group">
            <div className="h-10 sm:h-12 px-3 py-1 bg-white/95 backdrop-blur-md rounded-xl shadow-md border border-white/50 flex items-center transition-transform group-hover:scale-105">
              <img 
                src={`${import.meta.env.BASE_URL}images/logo.png`} 
                alt="SafarSathi - Your Journey Our Responsibility" 
                className="h-7 sm:h-9 w-auto object-contain"
              />
            </div>
          </a>

          {/* Desktop Nav Links matching Reference 1: Home, Destinations, Packages, About Us, Contact Us */}
          <nav className="hidden lg:flex items-center space-x-7">
            <a 
              href="#" 
              className={`text-sm font-semibold transition-colors hover:text-amber-400 ${
                isScrolled ? 'text-slate-800' : 'text-white drop-shadow'
              }`}
            >
              Home
            </a>
            <a 
              href="#destinations" 
              className={`text-sm font-semibold transition-colors hover:text-amber-400 ${
                isScrolled ? 'text-slate-800' : 'text-white drop-shadow'
              }`}
            >
              Destinations
            </a>
            <a 
              href="#packages" 
              className={`text-sm font-semibold transition-colors hover:text-amber-400 ${
                isScrolled ? 'text-slate-800' : 'text-white drop-shadow'
              }`}
            >
              Packages
            </a>
            <a 
              href="#cabs" 
              className={`text-sm font-semibold transition-colors hover:text-amber-400 ${
                isScrolled ? 'text-slate-800' : 'text-white drop-shadow'
              }`}
            >
              Taxi &amp; Cabs
            </a>
            <a 
              href="#why-us" 
              className={`text-sm font-semibold transition-colors hover:text-amber-400 ${
                isScrolled ? 'text-slate-800' : 'text-white drop-shadow'
              }`}
            >
              About Us
            </a>
            <a 
              href="#contact" 
              className={`text-sm font-semibold transition-colors hover:text-amber-400 ${
                isScrolled ? 'text-slate-800' : 'text-white drop-shadow'
              }`}
            >
              Contact Us
            </a>
          </nav>

          {/* Right Header Actions matching Reference 1 */}
          <div className="hidden sm:flex items-center space-x-3.5">
            {/* Phone Pill */}
            <a 
              href={`tel:${COMPANY_INFO.phone}`}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs sm:text-sm font-bold transition-all ${
                isScrolled
                  ? 'border-slate-300 text-slate-800 hover:border-amber-500 hover:text-amber-600'
                  : 'border-white/30 text-white hover:border-white hover:bg-white/10 backdrop-blur-sm'
              }`}
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>{COMPANY_INFO.phoneDisplay}</span>
            </a>

            {/* Golden Enquire Now Pill Button */}
            <button
              onClick={handleEnquireClick}
              className="px-5 py-2 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-slate-950 font-extrabold text-xs sm:text-sm tracking-wide shadow-md hover:shadow-lg transition-all transform active:scale-95"
            >
              Enquire Now
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={handleEnquireClick}
              className="px-3 py-1.5 rounded-full bg-amber-500 text-slate-950 text-xs font-bold sm:hidden"
            >
              Enquire
            </button>

            <button 
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-xl transition-colors ${
                isScrolled ? 'text-slate-800 hover:bg-slate-100' : 'text-white hover:bg-white/10'
              }`}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950/95 backdrop-blur-xl border-b border-white/10 text-white px-5 py-5 space-y-4 animate-fade-in shadow-2xl">
          <nav className="flex flex-col space-y-3 font-semibold text-sm">
            <a 
              href="#" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-white hover:text-amber-400 py-1"
            >
              Home
            </a>
            <a 
              href="#destinations" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-white hover:text-amber-400 py-1"
            >
              Popular Destinations (Shimla, Manali, Spiti, Ladakh)
            </a>
            <a 
              href="#packages" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-white hover:text-amber-400 py-1"
            >
              Tour Packages
            </a>
            <a 
              href="#cabs" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-white hover:text-amber-400 py-1"
            >
              White Taxi Fleet
            </a>
            <a 
              href="#why-us" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-white hover:text-amber-400 py-1"
            >
              About Us &amp; Guarantee
            </a>
            <a 
              href="#contact" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-white hover:text-amber-400 py-1"
            >
              Contact &amp; 24x7 Online Desk
            </a>
          </nav>

          <div className="pt-3 border-t border-white/10 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleEnquireClick();
              }}
              className="w-full py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-sm text-center shadow-md"
            >
              ✨ Enquire Now (Flat 20% OFF)
            </button>

            <a
              href={`tel:${COMPANY_INFO.phone}`}
              className="w-full py-2.5 rounded-xl border border-white/20 text-white font-bold text-sm flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-amber-400" />
              <span>Call: {COMPANY_INFO.phoneDisplay}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
