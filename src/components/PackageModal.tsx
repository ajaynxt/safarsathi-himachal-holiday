import { useState } from 'react';
import { X, Check, Clock, MapPin, Calendar, Compass, MessageCircle } from 'lucide-react';
import { TourPackage, COMPANY_INFO } from '../data/travelData';

interface PackageModalProps {
  pkg: TourPackage | null;
  onClose: () => void;
  onBookNow: (pkgTitle: string) => void;
}

export const PackageModal: React.FC<PackageModalProps> = ({ pkg, onClose, onBookNow }) => {
  const [openDay, setOpenDay] = useState<number>(1);

  if (!pkg) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="relative bg-white w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden my-6 border border-slate-200 flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="relative h-48 sm:h-64 flex-shrink-0">
          <img
            src={pkg.featuredImage}
            alt={pkg.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/50 to-transparent" />
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full backdrop-blur-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-4 right-4 text-white">
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full bg-brand-orange text-white text-[11px] font-bold uppercase tracking-wider">
                {pkg.duration}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-white text-[11px] font-semibold">
                {pkg.difficulty} Pace
              </span>
              <span className="text-xs text-amber-300 font-bold flex items-center gap-1">
                ★ {pkg.rating} ({pkg.reviewsCount} reviews)
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold leading-snug">{pkg.title}</h2>
            <p className="text-xs sm:text-sm text-slate-300 line-clamp-1">{pkg.tagline}</p>
          </div>
        </div>

        {/* Modal Body (Scrollable) */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* Key Facts Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs">
            <div>
              <span className="text-slate-400 block font-medium">Pickup & Drop</span>
              <span className="font-bold text-slate-800 flex items-center gap-1 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-brand-orange" />
                {pkg.pickupDrop}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block font-medium">Best Season</span>
              <span className="font-bold text-slate-800 flex items-center gap-1 mt-0.5">
                <Calendar className="w-3.5 h-3.5 text-brand-orange" />
                {pkg.bestSeason}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block font-medium">Duration</span>
              <span className="font-bold text-slate-800 flex items-center gap-1 mt-0.5">
                <Clock className="w-3.5 h-3.5 text-brand-orange" />
                {pkg.days} Days / {pkg.nights} Nights
              </span>
            </div>
            <div>
              <span className="text-slate-400 block font-medium">Starting From</span>
              <span className="font-extrabold text-brand-orange text-sm mt-0.5 block">
                {pkg.startingPrice} <span className="text-[10px] text-slate-500 font-normal">/ person</span>
              </span>
            </div>
          </div>

          {/* Tour Highlights */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-2 flex items-center gap-2">
              <Compass className="w-4 h-4 text-brand-orange" />
              Key Tour Highlights
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {pkg.highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-slate-700 bg-amber-50/50 border border-amber-100 p-2 rounded-lg">
                  <span className="text-brand-orange font-bold">✓</span>
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Day Wise Itinerary Accordion */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-3 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-brand-orange" />
              Day-by-Day Detailed Itinerary
            </h3>
            <div className="space-y-2.5">
              {pkg.itinerary.map((item) => (
                <div
                  key={item.day}
                  className="border border-slate-200 rounded-xl overflow-hidden transition-all bg-white"
                >
                  <button
                    onClick={() => setOpenDay(openDay === item.day ? 0 : item.day)}
                    className="w-full text-left p-3 sm:p-3.5 flex items-center justify-between hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="flex-shrink-0 w-7 h-7 rounded-lg bg-brand-navy text-white text-xs font-bold flex items-center justify-center">
                        D{item.day}
                      </span>
                      <span className="text-xs sm:text-sm font-bold text-slate-800">
                        {item.title}
                      </span>
                    </div>
                    <span className="text-brand-orange text-xs font-bold">
                      {openDay === item.day ? '− Hide' : '+ View'}
                    </span>
                  </button>

                  {openDay === item.day && (
                    <div className="p-3.5 bg-slate-50/80 border-t border-slate-100 text-xs text-slate-600 space-y-2">
                      <p className="leading-relaxed">{item.description}</p>
                      <div className="flex flex-wrap gap-4 pt-1 font-medium text-[11px] text-slate-500">
                        <span className="flex items-center gap-1">
                          🏨 Stay: <strong className="text-slate-700">{item.stay}</strong>
                        </span>
                        <span className="flex items-center gap-1">
                          🍽️ Meals: <strong className="text-slate-700">{item.meals}</strong>
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Inclusions & Exclusions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-emerald-50/60 border border-emerald-200 rounded-xl p-3.5">
              <h4 className="text-xs font-bold uppercase text-emerald-800 mb-2 flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-600" />
                What's Included
              </h4>
              <ul className="space-y-1.5 text-xs text-emerald-950">
                {pkg.inclusions.map((inc, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>{inc}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-rose-50/60 border border-rose-200 rounded-xl p-3.5">
              <h4 className="text-xs font-bold uppercase text-rose-800 mb-2 flex items-center gap-1.5">
                <X className="w-4 h-4 text-rose-600" />
                What's Excluded
              </h4>
              <ul className="space-y-1.5 text-xs text-rose-950">
                {pkg.exclusions.map((exc, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-rose-600 font-bold">✗</span>
                    <span>{exc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Modal Footer (Sticky CTAs) */}
        <div className="p-3 sm:p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="text-[11px] text-slate-500 block">Package Price Starting From</span>
            <span className="text-lg sm:text-xl font-extrabold text-brand-navy">
              {pkg.startingPrice} <span className="text-xs font-normal text-slate-500">/ person (All taxes incl.)</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={COMPANY_INFO.whatsappUrl(`Hello SafarSathi, I am interested in the '${pkg.title}' (${pkg.duration}). Please send detailed PDF itinerary and custom quotes.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-green-600 hover:bg-green-700 text-white text-xs sm:text-sm font-bold flex items-center gap-1.5 shadow"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Get on WhatsApp</span>
            </a>

            <button
              onClick={() => {
                onClose();
                onBookNow(pkg.title);
              }}
              className="px-5 py-2.5 rounded-xl bg-brand-orange hover:bg-brand-orange-dark text-white text-xs sm:text-sm font-bold shadow-md transition-all"
            >
              Book This Package
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
