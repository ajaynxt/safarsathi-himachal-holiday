import React from 'react';
import { Compass } from 'lucide-react';

interface BentoExperienceProps {
  onOpenBooking: (type?: 'package' | 'cab' | 'hotel', itemName?: string) => void;
}

export const BentoExperience: React.FC<BentoExperienceProps> = ({ onOpenBooking }) => {
  return (
    <section className="py-16 sm:py-24 bg-stone-50 border-t border-stone-200/70 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header & Intro text matching Reference 3 */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-xl">
            <span className="inline-block px-3 py-1 rounded-full bg-slate-200/80 text-slate-700 text-[11px] font-extrabold uppercase tracking-wider mb-3">
              About SafarSathi
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-title font-bold text-slate-900 tracking-tight leading-tight">
              Himachal is more than a destination — <span className="italic font-normal">it&apos;s a journey.</span>
            </h2>
          </div>
          <div className="max-w-md">
            <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
              From snow-capped Himalayan peaks to ancient wooden temples, every experience brings you closer to authentic mountain nature, local Pahadi culture, and peace of mind.
            </p>
          </div>
        </div>

        {/* 3-Column Bento Grid matching Reference 3 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          
          {/* Bento Box 1: Dark Tailor-Made Journey Card */}
          <div className="bg-slate-950 text-white rounded-3xl p-7 sm:p-8 flex flex-col justify-between shadow-xl border border-slate-800 relative overflow-hidden group">
            <div className="absolute top-0 right-0 -mr-10 -mt-10 w-44 h-44 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
            
            <div>
              <div className="flex items-center justify-between mb-8">
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
                  <Compass className="w-6 h-6 text-amber-400" />
                </div>
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[11px] font-semibold text-slate-300">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Customizable</span>
                </div>
              </div>

              <h3 className="text-xl sm:text-2xl font-serif-title font-bold text-white mb-3">
                Tailor-Made <span className="italic font-normal">For You</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Journeys crafted around your pace. Discover hidden pine valleys, offbeat waterfalls, and authentic homestays beyond the ordinary tourist rush.
              </p>
            </div>

            <div className="pt-8">
              <button
                type="button"
                onClick={() => onOpenBooking('package', 'Custom Tailor-Made Itinerary')}
                className="w-full py-3 px-5 rounded-full bg-white text-slate-950 hover:bg-amber-400 font-extrabold text-xs sm:text-sm tracking-wide transition-all shadow-md active:scale-95"
              >
                Plan Tailor-Made Trip
              </button>
            </div>
          </div>

          {/* Bento Box 2: Mountain Photo Card */}
          <div className="relative rounded-3xl overflow-hidden shadow-xl aspect-[4/5] md:aspect-auto border border-slate-200 group">
            <img
              src="https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=85"
              alt="Himalayan traveler looking at snow peak"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />
            
            {/* Top Pill Tag */}
            <div className="absolute top-5 left-5 z-10">
              <span className="px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-slate-900 text-xs font-extrabold shadow-md">
                Made for You
              </span>
            </div>

            {/* Bottom info */}
            <div className="absolute bottom-5 inset-x-5 z-10 text-white">
              <span className="text-[11px] uppercase tracking-wider text-amber-300 font-bold block mb-1">
                Pahadi Chauffeurs &amp; Guides
              </span>
              <h4 className="text-lg font-bold">100% Commercial White Fleet</h4>
              <p className="text-xs text-slate-200 mt-0.5">Clean Dzire, Innova Crysta, Etios &amp; Tempo Travellers</p>
            </div>
          </div>

          {/* Bento Box 3: Experiences & Ratings Card */}
          <div className="bg-white rounded-3xl p-7 sm:p-8 flex flex-col justify-between shadow-xl border border-slate-200/80">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-3xl sm:text-4xl font-serif-title font-bold text-slate-900">50+</span>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md">Curated</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900">Unique Himalayan Experiences</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Carefully selected journeys designed to reveal the real beauty, culture and spirit of Himachal Pradesh.
              </p>

              {/* Dot Rating Bars matching Reference 3 */}
              <div className="mt-6 space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-700 mb-1.5">
                    <span>Snow &amp; Adventure (Solang, Rohtang, Spiti)</span>
                    <span className="text-slate-400">95%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div className="bg-amber-500 h-full rounded-full w-[95%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-700 mb-1.5">
                    <span>Cultural &amp; Temples (Hadimba, Jakhoo, Tabo)</span>
                    <span className="text-slate-400">90%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-full w-[90%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-700 mb-1.5">
                    <span>Peace &amp; Wellness (Kasol, Jibhi, Kalpa)</span>
                    <span className="text-slate-400">88%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div className="bg-sky-500 h-full rounded-full w-[88%]" />
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 mt-6 flex items-center justify-between text-xs text-slate-500">
              <span className="font-semibold text-slate-800">Govt. Registered Agency</span>
              <span className="text-amber-600 font-bold">100% Online Verified</span>
            </div>
          </div>

        </div>

        {/* 4 Big Numbers / Counter Stats matching Reference 3 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-10 border-t border-stone-200">
          <div className="text-center sm:text-left">
            <span className="text-3xl sm:text-4xl lg:text-5xl font-serif-title font-bold text-slate-900 block">
              10,000+
            </span>
            <span className="text-xs sm:text-sm font-semibold text-slate-500 mt-1 block">
              Happy Travelers Welcomed
            </span>
          </div>

          <div className="text-center sm:text-left">
            <span className="text-3xl sm:text-4xl lg:text-5xl font-serif-title font-bold text-slate-900 block">
              100%
            </span>
            <span className="text-xs sm:text-sm font-semibold text-slate-500 mt-1 block">
              All-White Cabs &amp; Chauffeurs
            </span>
          </div>

          <div className="text-center sm:text-left">
            <span className="text-3xl sm:text-4xl lg:text-5xl font-serif-title font-bold text-slate-900 block">
              50+
            </span>
            <span className="text-xs sm:text-sm font-semibold text-slate-500 mt-1 block">
              Curated Tour Itineraries
            </span>
          </div>

          <div className="text-center sm:text-left">
            <span className="text-3xl sm:text-4xl lg:text-5xl font-serif-title font-bold text-slate-900 block">
              4 Seasons
            </span>
            <span className="text-xs sm:text-sm font-semibold text-slate-500 mt-1 block">
              Snow, Spring, Summer &amp; Autumn
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
