import { useState } from 'react';
import { Clock, Star, MapPin, Calendar, Check, Car, Building, Utensils, MessageCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { TOUR_PACKAGES, TourPackage, COMPANY_INFO } from '../data/travelData';
import { PackageModal } from './PackageModal';

interface FeaturedPackagesProps {
  onBookPackage: (pkgTitle: string) => void;
}

export const FeaturedPackages: React.FC<FeaturedPackagesProps> = ({ onBookPackage }) => {
  const [selectedPackage, setSelectedPackage] = useState<TourPackage | null>(null);
  const [filter, setFilter] = useState<string>('all');

  const filteredPackages = TOUR_PACKAGES.filter((p) => {
    if (filter === 'all') return true;
    if (filter === 'himachal') return p.id.includes('shimla') || p.id.includes('spiti') || p.id.includes('full-himachal');
    if (filter === 'kashmir') return p.id.includes('kashmir');
    if (filter === 'kerala') return p.id.includes('kerala');
    return true;
  });

  return (
    <section id="packages" className="py-16 sm:py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-orange-light text-brand-orange text-xs font-bold uppercase tracking-wider mb-3">
            <span>Detailed Tour Itineraries</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-brand-navy tracking-tight">
            Best Selling All-India & Himalayan Tour Packages
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Transparent pricing, 100% private sanitized cabs, curated luxury stays, and personalized 24x7 online care across all states.
          </p>

          {/* Filter Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                filter === 'all'
                  ? 'bg-brand-navy text-white shadow'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              All Packages ({TOUR_PACKAGES.length})
            </button>
            <button
              onClick={() => setFilter('himachal')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                filter === 'himachal'
                  ? 'bg-brand-navy text-white shadow'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              Himachal & Spiti (3)
            </button>
            <button
              onClick={() => setFilter('kashmir')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                filter === 'kashmir'
                  ? 'bg-brand-navy text-white shadow'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              Jammu & Kashmir (1)
            </button>
            <button
              onClick={() => setFilter('kerala')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                filter === 'kerala'
                  ? 'bg-brand-navy text-white shadow'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              Kerala (1)
            </button>
          </div>
        </div>

        {/* Detail-Centric Packages Grid (No Photo, Pure Structured Details) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredPackages.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200/90 overflow-hidden flex flex-col justify-between group"
            >
              {/* Header Bar */}
              <div className="bg-gradient-to-r from-brand-navy via-brand-navy-light to-brand-navy text-white p-5 sm:p-6">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-md bg-brand-orange text-white text-[11px] font-bold uppercase tracking-wider shadow-sm">
                      {pkg.duration}
                    </span>
                    {pkg.badge && (
                      <span className="px-2.5 py-1 rounded-md bg-white/15 backdrop-blur-md text-amber-300 text-[11px] font-semibold border border-white/10">
                        {pkg.badge}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-amber-300 font-bold bg-black/30 px-2 py-1 rounded-md">
                    <Star className="w-3.5 h-3.5 fill-amber-300" />
                    <span>{pkg.rating} ({pkg.reviewsCount} reviews)</span>
                  </div>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold leading-snug group-hover:text-amber-200 transition-colors">
                  {pkg.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 line-clamp-1">
                  {pkg.tagline}
                </p>

                {/* Key Metadata Tags */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-4 pt-3 border-t border-white/10 text-xs text-slate-200">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-brand-orange flex-shrink-0" />
                    <span className="truncate">Route: {pkg.pickupDrop}</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-brand-orange flex-shrink-0" />
                    <span className="truncate">Best: {pkg.bestSeason.split('(')[0]}</span>
                  </span>
                  <span className="flex items-center gap-1.5 col-span-2 sm:col-span-1">
                    <Clock className="w-3.5 h-3.5 text-brand-orange flex-shrink-0" />
                    <span>{pkg.days} Days / {pkg.nights} Nights</span>
                  </span>
                </div>
              </div>

              {/* Package Details Content */}
              <div className="p-5 sm:p-6 space-y-5 flex-1">
                {/* 4 Pillars Summary Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <div className="flex items-center gap-2">
                    <Car className="w-4 h-4 text-brand-orange flex-shrink-0" />
                    <div>
                      <span className="text-[10px] text-slate-400 block font-semibold">CAB</span>
                      <span className="font-bold text-slate-800">Private SUV/Sedan</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Building className="w-4 h-4 text-brand-orange flex-shrink-0" />
                    <div>
                      <span className="text-[10px] text-slate-400 block font-semibold">STAYS</span>
                      <span className="font-bold text-slate-800">Deluxe 3★/4★</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Utensils className="w-4 h-4 text-brand-orange flex-shrink-0" />
                    <div>
                      <span className="text-[10px] text-slate-400 block font-semibold">MEALS</span>
                      <span className="font-bold text-slate-800">Breakfast + Dinner</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <div>
                      <span className="text-[10px] text-slate-400 block font-semibold">TAXES</span>
                      <span className="font-bold text-emerald-700">Tolls/Tax Included</span>
                    </div>
                  </div>
                </div>

                {/* Day-by-Day Itinerary Quick List */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-2.5 flex items-center justify-between">
                    <span>Day-by-Day Itinerary Overview:</span>
                    <span className="text-[11px] font-semibold text-brand-orange">Complete {pkg.days} Days Plan</span>
                  </h4>
                  <div className="space-y-1.5 text-xs text-slate-700">
                    {pkg.itinerary.map((it) => (
                      <div key={it.day} className="flex items-start gap-2 bg-slate-50 hover:bg-slate-100/80 p-2 rounded-lg border border-slate-100 transition-colors">
                        <span className="flex-shrink-0 w-6 h-5 rounded bg-brand-navy text-white text-[10px] font-bold flex items-center justify-center">
                          D{it.day}
                        </span>
                        <div className="flex-1 min-w-0">
                          <span className="font-semibold text-slate-900 block truncate">{it.title}</span>
                          <span className="text-[11px] text-slate-500 block truncate">Night Stay: {it.stay} • Meals: {it.meals}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Key Inclusions Highlights */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-2">
                    What's Included in This Package:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-slate-700">
                    {pkg.inclusions.map((inc, i) => (
                      <div key={i} className="flex items-start gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{inc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Pricing & Booking Footer */}
              <div className="p-5 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                    Starting Package Rate
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-extrabold text-brand-navy">{pkg.startingPrice}</span>
                    <span className="text-xs text-slate-500 font-medium">/ person (All taxes incl.)</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={COMPANY_INFO.whatsappUrl(`Hello SafarSathi, please send detailed PDF itinerary and custom quotes for ${pkg.title} (${pkg.duration}).`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl border border-green-600/30 text-green-700 bg-green-50 hover:bg-green-600 hover:text-white transition-colors"
                    title="Get Itinerary on WhatsApp"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </a>

                  <button
                    onClick={() => setSelectedPackage(pkg)}
                    className="px-3.5 py-2.5 rounded-xl border border-slate-300 hover:border-brand-navy bg-white text-slate-800 text-xs font-bold transition-all shadow-sm"
                  >
                    Full Details
                  </button>

                  <button
                    onClick={() => onBookPackage(pkg.title)}
                    className="px-4 py-2.5 rounded-xl bg-brand-orange hover:bg-brand-orange-dark text-white text-xs font-bold transition-all shadow-md flex items-center gap-1.5"
                  >
                    <span>Book Package</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Custom Package Planner Banner */}
        <div className="mt-12 bg-gradient-to-r from-brand-navy to-brand-navy-light text-white rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <span className="px-3 py-1 rounded-full bg-white/10 text-brand-orange text-xs font-bold uppercase tracking-wider">
              Tailor-Made Tour Specialist
            </span>
            <h3 className="text-xl sm:text-2xl font-bold">Want to Customize Days, Cab Model or Hotels?</h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Tell us your preferred dates, pickup location (Delhi, Chandigarh, Kalka), and vehicle choice (Etios, Innova Crysta, or Tempo Traveller). We will design your personalized tour.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => onBookPackage('Custom Tailor-made Tour')}
              className="px-5 py-3 rounded-xl bg-brand-orange hover:bg-brand-orange-dark text-white text-xs sm:text-sm font-bold shadow-lg transition-all"
            >
              Customize My Tour
            </button>
            <a
              href={`tel:${COMPANY_INFO.phone}`}
              className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-bold border border-white/20 transition-all"
            >
              Call Us: {COMPANY_INFO.phoneDisplay}
            </a>
          </div>
        </div>
      </div>

      {/* Package Detail Itinerary Modal */}
      {selectedPackage && (
        <PackageModal
          pkg={selectedPackage}
          onClose={() => setSelectedPackage(null)}
          onBookNow={(title) => {
            setSelectedPackage(null);
            onBookPackage(title);
          }}
        />
      )}
    </section>
  );
};
