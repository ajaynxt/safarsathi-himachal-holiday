import React, { useState } from 'react';
import { MapPin, Calendar, Users, Search, ChevronDown } from 'lucide-react';

interface HeroProps {
  onOpenBooking: (type?: 'package' | 'cab' | 'hotel' | 'volvo', item?: string) => void;
  onSearchPackages?: (destination: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onSearchPackages }) => {
  const [destination, setDestination] = useState('Shimla & Manali');
  const [travelDate, setTravelDate] = useState('Pick a Date');
  const [travellers, setTravellers] = useState('2 Adults');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearchPackages) {
      onSearchPackages(destination);
    }
    const packagesEl = document.getElementById('packages');
    if (packagesEl) {
      packagesEl.scrollIntoView({ behavior: 'smooth' });
    } else {
      onOpenBooking('package', destination);
    }
  };

  return (
    <section className="relative min-h-[580px] sm:min-h-[660px] lg:min-h-[720px] flex flex-col justify-between pt-28 pb-10 sm:pt-32 sm:pb-14 overflow-hidden bg-slate-950">
      
      {/* Background Image: Pure Snow Mountain Peaks (Barf Wale Pahad) with Crisp Winter Sky */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=75"
          alt="Majestic Snow Covered Himalayan Mountain Peaks"
          fetchPriority="high"
          loading="eager"
          decoding="async"
          className="w-full h-full object-cover object-center transform scale-105 filter brightness-95 contrast-105"
        />
        {/* Cinematic gradient overlay for perfect contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-black/40 to-black/50" />
      </div>



      {/* Center Hero Typography */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white my-auto">
        
        {/* Pre-title tracking text */}
        <div className="inline-block mb-3">
          <span className="text-xs sm:text-sm md:text-base font-extrabold uppercase tracking-[0.25em] text-white/95 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            Explore All Indian States &amp; The Breathtaking
          </span>
        </div>

        {/* Main Serif Heading: Himalayas */}
        <div className="relative mb-2">
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-serif-title font-bold tracking-tight text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
            Himalayas
          </h1>
          
          {/* Golden Brush Swoosh Underline matching Reference 1 */}
          <div className="flex justify-center -mt-1 sm:-mt-2 md:-mt-3 pointer-events-none">
            <svg 
              className="w-48 sm:w-72 md:w-96 h-4 sm:h-6 md:h-7" 
              viewBox="0 0 360 24" 
              fill="none"
            >
              <path 
                d="M 15,14 Q 180,3 345,11 Q 220,21 15,14 Z" 
                fill="#F5A623" 
                className="drop-shadow-[0_2px_8px_rgba(245,166,35,0.7)]"
              />
            </svg>
          </div>
        </div>

        {/* Subtitle with bullet points */}
        <p className="text-xs sm:text-base md:text-lg text-white/90 font-medium tracking-wide drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)] max-w-3xl mx-auto mt-2 sm:mt-3">
          All States Tour Packages <span className="text-amber-400 mx-1.5">•</span> 100% Online Booking <span className="text-amber-400 mx-1.5">•</span> Safe &amp; Sanitized White Cabs
        </p>

      </div>

      {/* Floating 3-Field Search Pill Bar directly inside Hero matching Reference 1 */}
      <div className="relative z-20 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 mt-6 sm:mt-10">
        <form 
          onSubmit={handleSearch}
          className="bg-white/95 backdrop-blur-xl rounded-2xl sm:rounded-full p-2.5 sm:p-2 shadow-2xl border border-white/50 text-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 sm:gap-0"
        >
          {/* Field 1: Where to? */}
          <div className="flex-1 px-4 py-2 sm:py-1.5 sm:border-r border-slate-200 text-left relative group">
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Where to? (All States)
            </label>
            <div className="flex items-center justify-between gap-1.5 mt-0.5">
              <div className="flex items-center gap-2 overflow-hidden">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0" />
                <select
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="bg-transparent text-xs sm:text-sm font-bold text-slate-800 focus:outline-none cursor-pointer w-full"
                >
                  <option value="Shimla & Manali (Himachal)">Shimla &amp; Manali (Himachal)</option>
                  <option value="Spiti Valley Expedition">Spiti Valley Expedition</option>
                  <option value="Leh – Ladakh Circuit">Leh – Ladakh Circuit</option>
                  <option value="Jammu & Kashmir Paradise">Jammu &amp; Kashmir Paradise</option>
                  <option value="Uttarakhand (Rishikesh / Mussoorie / Char Dham)">Uttarakhand Hills</option>
                  <option value="Rajasthan Royal Tour">Rajasthan Royal Heritage</option>
                  <option value="Kerala God's Own Country">Kerala Backwaters</option>
                  <option value="Goa Beach Holiday">Goa Beach Vacation</option>
                  <option value="Pan-India Custom Tour (All States)">Pan-India (All States)</option>
                </select>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0 pointer-events-none" />
            </div>
          </div>

          {/* Field 2: Travel Dates */}
          <div className="flex-1 px-4 py-2 sm:py-1.5 sm:border-r border-slate-200 text-left relative group">
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Travel Dates
            </label>
            <div className="flex items-center justify-between gap-1.5 mt-0.5">
              <div className="flex items-center gap-2 overflow-hidden">
                <Calendar className="w-4 h-4 text-amber-500 shrink-0" />
                <select
                  value={travelDate}
                  onChange={(e) => setTravelDate(e.target.value)}
                  className="bg-transparent text-xs sm:text-sm font-bold text-slate-800 focus:outline-none cursor-pointer w-full"
                >
                  <option value="Pick a Date">Pick a Date</option>
                  <option value="This Week (Urgent)">This Week (Immediate)</option>
                  <option value="Next 30 Days">Next 30 Days</option>
                  <option value="Summer Season (Apr-Jun)">Summer Season</option>
                  <option value="Winter & Snow Season">Winter &amp; Snow</option>
                </select>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0 pointer-events-none" />
            </div>
          </div>

          {/* Field 3: Travellers */}
          <div className="flex-1 px-4 py-2 sm:py-1.5 text-left relative group">
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Travellers
            </label>
            <div className="flex items-center justify-between gap-1.5 mt-0.5">
              <div className="flex items-center gap-2 overflow-hidden">
                <Users className="w-4 h-4 text-amber-500 shrink-0" />
                <select
                  value={travellers}
                  onChange={(e) => setTravellers(e.target.value)}
                  className="bg-transparent text-xs sm:text-sm font-bold text-slate-800 focus:outline-none cursor-pointer w-full"
                >
                  <option value="2 Adults">2 Adults (Couple)</option>
                  <option value="Family (3-4 Persons)">Family (3-4 Persons)</option>
                  <option value="Group (5-8 Persons)">Group (5-8 Persons)</option>
                  <option value="Large Group (Tempo / Bus)">Large Group (9+)</option>
                </select>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0 pointer-events-none" />
            </div>
          </div>

          {/* Golden Search Button */}
          <div className="sm:pl-2">
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3.5 sm:py-3 rounded-xl sm:rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-slate-950 font-extrabold text-xs sm:text-sm tracking-wide shadow-lg shadow-amber-500/30 flex items-center justify-center gap-2 transition-all transform active:scale-95 whitespace-nowrap"
            >
              <Search className="w-4 h-4 text-slate-950" />
              <span>Search Packages</span>
            </button>
          </div>
        </form>
      </div>

    </section>
  );
};
