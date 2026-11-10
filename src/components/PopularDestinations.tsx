import React from 'react';
import { ArrowUpRight, Compass, ShieldCheck, Clock3 } from 'lucide-react';

interface PopularDestinationsProps {
  onSelectDestination: (destName: string) => void;
}

export const PopularDestinations: React.FC<PopularDestinationsProps> = ({ onSelectDestination }) => {
  const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;

  const destinations = [
    {
      id: 'shimla',
      image: asset('images/destinations/shimla.jpg'),
      name: 'Shimla & Manali',
      state: 'Himachal Pradesh',
      duration: 'Custom trip',
      badge: 'Enquire for details',
      badgeColor: 'bg-emerald-100 text-emerald-800',
      highlights: 'Share your travel dates and preferences for a customised quote.',
      icon: '🏔️',
      available: true
    },
    {
      id: 'spiti',
      image: asset('images/destinations/spiti.jpg'),
      name: 'Spiti Valley',
      state: 'Himachal Pradesh',
      duration: 'Custom trip',
      badge: 'Enquire for details',
      badgeColor: 'bg-emerald-100 text-emerald-800',
      highlights: 'Ask us about route planning, travel dates and vehicle options.',
      icon: '❄️',
      available: true
    },
    {
      id: 'ladakh',
      image: asset('images/destinations/ladakh.jpg'),
      name: 'Leh – Ladakh',
      state: 'Ladakh (UT)',
      duration: 'On request',
      badge: 'Ask for availability',
      badgeColor: 'bg-slate-100 text-slate-600',
      highlights: 'Contact us to discuss a possible Ladakh trip.',
      icon: '🏔️',
      available: true
    }
  ];

  return (
    <section id="destinations" className="py-14 sm:py-20 bg-stone-50 border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="w-8 sm:w-12 h-0.5 bg-gradient-to-r from-transparent to-amber-500" />
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif-title font-bold text-slate-900 tracking-tight">
              Explore Destinations
            </h2>
            <span className="w-8 sm:w-12 h-0.5 bg-gradient-to-l from-transparent to-amber-500" />
          </div>
          <p className="text-sm sm:text-base text-slate-600 font-medium">
            Tell us where and when you want to travel. We’ll discuss a trip based on your requirements.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {destinations.map((dest) => (
            <div
              key={dest.id}
              role={dest.available ? 'button' : undefined}
              tabIndex={dest.available ? 0 : undefined}
              aria-disabled={!dest.available}
              onClick={() => dest.available && onSelectDestination(dest.name)}
              onKeyDown={(event) => {
                if (dest.available && (event.key === 'Enter' || event.key === ' ')) {
                  event.preventDefault();
                  onSelectDestination(dest.name);
                }
              }}
              className={`group bg-white rounded-2xl border shadow-sm transition-all duration-300 flex flex-col justify-between overflow-hidden ${
                dest.available
                  ? 'border-stone-200/90 hover:shadow-xl hover:border-amber-400 cursor-pointer'
                  : 'border-stone-200 opacity-75 cursor-not-allowed'
              }`}
            >
              <div>
                <div className="relative h-40 sm:h-44 overflow-hidden bg-slate-200">
                  <img
                    src={dest.image}
                    alt={`${dest.name} travel destination`}
                    loading="lazy"
                    decoding="async"
                    className={`h-full w-full object-cover transition-transform duration-700 ${dest.available ? 'group-hover:scale-105' : 'grayscale-[15%]'}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/65 via-transparent to-transparent" />
                  <span className="absolute bottom-3 left-4 text-white text-lg font-bold drop-shadow-lg">{dest.name}</span>
                  <span className={`absolute top-3 right-3 text-[10px] font-bold px-2.5 py-1 rounded-full ${dest.badgeColor}`}>{dest.badge}</span>
                </div>
                <div className="p-4 sm:p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-2xl p-2 rounded-xl ${dest.available ? 'bg-stone-100 group-hover:bg-amber-50' : 'bg-slate-100'} transition-colors`}>
                    {dest.icon}
                  </span>
                </div>

                <span className="text-xs text-slate-400 font-semibold block mb-2">
                  {dest.state} • {dest.duration}
                </span>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {dest.highlights}
                </p>
                </div>
              </div>

              <div className={`mx-4 sm:mx-5 mt-0 mb-4 sm:mb-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold ${dest.available ? 'text-amber-600' : 'text-slate-400'}`}>
                <span>{dest.available ? 'Enquire Now' : 'Coming Soon'}</span>
                {dest.available ? <ArrowUpRight className="w-4 h-4" /> : <Clock3 className="w-4 h-4" />}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 pt-6 border-t border-stone-200/80 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 font-medium">
          <span className="flex items-center gap-1.5">
            <Compass className="w-4 h-4 text-amber-500" />
            Tours across India
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            Enquire directly on WhatsApp
          </span>
          <span>•</span>
          <span>Custom itineraries available</span>
        </div>
      </div>
    </section>
  );
};
