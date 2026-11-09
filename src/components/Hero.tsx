import React from 'react';
import { ShieldCheck, Star, Award, Compass, PhoneCall, Plane } from 'lucide-react';
import { COMPANY_INFO } from '../data/travelData';
import { BookingBar } from './BookingBar';

interface HeroProps {
  onOpenBooking: (type?: 'package' | 'cab' | 'hotel' | 'volvo', item?: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking }) => {
  return (
    <section className="relative pt-28 pb-20 sm:pt-36 sm:pb-28 bg-slate-900 overflow-hidden">
      {/* Background Hero Image with Mountain gradient */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2000&q=85"
          alt="Himalayan Mountains landscape"
          className="w-full h-full object-cover object-center transform scale-105 filter brightness-75 contrast-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-slate-900/40" />
      </div>

      {/* Ambient Animated Airplane flying across the Mountain Sky */}
      <div className="absolute inset-0 pointer-events-none z-1 overflow-hidden">
        <div className="hero-sky-plane flex items-center">
          <div className="relative">
            {/* Vapor trail / contrail */}
            <div className="absolute right-5 top-1/2 -translate-y-1/2 w-36 h-1 bg-gradient-to-r from-transparent via-white/40 to-white/90 rounded-full blur-[1px]" />
            <Plane className="w-6 h-6 sm:w-7 sm:h-7 text-white fill-white drop-shadow-[0_0_10px_rgba(255,125,0,0.8)] transform rotate-45" />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes heroFlight {
          0% {
            left: -120px;
            top: 28%;
            opacity: 0;
            transform: scale(0.85);
          }
          5% {
            opacity: 0.9;
          }
          95% {
            opacity: 0.9;
          }
          100% {
            left: 105%;
            top: 10%;
            opacity: 0;
            transform: scale(1.15);
          }
        }
        .hero-sky-plane {
          position: absolute;
          animation: heroFlight 16s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
      `}</style>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        {/* Top Trust Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-medium mb-6">
          <span className="flex h-2 w-2 rounded-full bg-brand-orange animate-pulse" />
          <span className="text-brand-orange font-bold">Himachal Holiday Specialist</span>
          <span className="text-white/40">|</span>
          <span className="text-white/90">Direct Shimla Tutikandi Head Office</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight max-w-4xl mx-auto leading-tight sm:leading-none text-shadow-lg">
          Your Journey, <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-amber-300">Our Responsibility</span>
        </h1>

        <p className="mt-4 sm:mt-6 text-base sm:text-xl text-slate-200 max-w-2xl mx-auto font-normal text-shadow">
          Experience breathtaking mountain bliss across <strong className="text-white">Shimla, Manali, Spiti Valley, Kasol, Amritsar & Kashmir</strong> with private cabs, handpicked luxury stays, and 24x7 local care.
        </p>

        {/* CTA Button Group */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <button
            onClick={() => onOpenBooking('package')}
            className="px-6 py-3.5 rounded-xl bg-brand-orange hover:bg-brand-orange-dark text-white font-bold text-sm sm:text-base shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
          >
            <Compass className="w-5 h-5" />
            <span>Plan My Custom Tour</span>
          </button>

          <a
            href={COMPANY_INFO.whatsappUrl("Hello SafarSathi, I am planning a trip to Himachal. Please send me best packages and cab rates.")}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold text-sm sm:text-base shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
          >
            <PhoneCall className="w-5 h-5" />
            <span>Instant WhatsApp Quote</span>
          </a>
        </div>

        {/* Stats & Trust Badges */}
        <div className="mt-12 sm:mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
          <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-xl p-3 sm:p-4">
            <div className="flex items-center gap-2 text-brand-orange mb-1">
              <Star className="w-4 h-4 fill-brand-orange" />
              <span className="font-extrabold text-white text-base sm:text-lg">4.9 / 5.0</span>
            </div>
            <p className="text-xs text-slate-300 font-medium">Over 1,200+ Verified Google & Traveler Reviews</p>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-xl p-3 sm:p-4">
            <div className="flex items-center gap-2 text-brand-orange mb-1">
              <ShieldCheck className="w-4 h-4 text-brand-orange" />
              <span className="font-extrabold text-white text-base sm:text-lg">100% Local</span>
            </div>
            <p className="text-xs text-slate-300 font-medium">Certified Pahadi Mountain Drivers & Guides</p>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-xl p-3 sm:p-4">
            <div className="flex items-center gap-2 text-brand-orange mb-1">
              <Award className="w-4 h-4 text-brand-orange" />
              <span className="font-extrabold text-white text-base sm:text-lg">No Hidden Cost</span>
            </div>
            <p className="text-xs text-slate-300 font-medium">Tolls, Green Tax, Driver Allowance All Included</p>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-xl p-3 sm:p-4">
            <div className="flex items-center gap-2 text-brand-orange mb-1">
              <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
              <span className="font-extrabold text-white text-base sm:text-lg">24x7 Road Care</span>
            </div>
            <p className="text-xs text-slate-300 font-medium">Tutikandi Shimla Control Desk & Weather Alerts</p>
          </div>
        </div>
      </div>

      {/* Embedded Search and Quick Booking Bar */}
      <div className="mt-12 sm:mt-16 px-4">
        <BookingBar onQuickBook={(details) => onOpenBooking(details.type, details.destination || details.vehicle)} />
      </div>
    </section>
  );
};
