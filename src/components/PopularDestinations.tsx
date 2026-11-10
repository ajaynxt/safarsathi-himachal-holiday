import React from 'react';
import { ArrowUpRight, Compass, ShieldCheck } from 'lucide-react';

interface PopularDestinationsProps {
  onSelectDestination: (destName: string) => void;
}

export const PopularDestinations: React.FC<PopularDestinationsProps> = ({ onSelectDestination }) => {
  const destinations = [
    {
      id: 'shimla',
      name: 'Shimla',
      state: 'Himachal Pradesh',
      duration: '3 - 5 Days',
      badge: 'Popular',
      badgeColor: 'bg-amber-100 text-amber-800',
      highlights: 'Mall Road, Kufri Snow, Jakhoo Temple & Ridge',
      icon: '🏔️'
    },
    {
      id: 'manali',
      name: 'Manali & Solang',
      state: 'Himachal Pradesh',
      duration: '4 - 6 Days',
      badge: 'Trending',
      badgeColor: 'bg-emerald-100 text-emerald-800',
      highlights: 'Atal Tunnel, Solang Adventure, Sissu & Hadimba',
      icon: '🌲'
    },
    {
      id: 'spiti',
      name: 'Spiti Valley',
      state: 'Himachal Pradesh',
      duration: '7 - 9 Days',
      badge: 'Adventure',
      badgeColor: 'bg-blue-100 text-blue-800',
      highlights: 'Key Monastery, Chandratal, Hikkim & Kaza',
      icon: '❄️'
    },
    {
      id: 'ladakh',
      name: 'Leh – Ladakh',
      state: 'Ladakh (UT)',
      duration: '6 - 8 Days',
      badge: 'High Altitude',
      badgeColor: 'bg-purple-100 text-purple-800',
      highlights: 'Pangong Tso, Nubra Valley & Khardung La',
      icon: '🐪'
    },
    {
      id: 'kashmir',
      name: 'Jammu & Kashmir',
      state: 'J&K (UT)',
      duration: '5 - 7 Days',
      badge: 'Scenic',
      badgeColor: 'bg-rose-100 text-rose-800',
      highlights: 'Dal Lake Houseboat, Gulmarg Gondola & Pahalgam',
      icon: '🛶'
    },
    {
      id: 'uttarakhand',
      name: 'Uttarakhand Hills',
      state: 'Uttarakhand',
      duration: '4 - 6 Days',
      badge: 'Spiritual & Hill',
      badgeColor: 'bg-amber-100 text-amber-800',
      highlights: 'Rishikesh, Mussoorie, Nainital & Char Dham',
      icon: '🛕'
    },
    {
      id: 'rajasthan',
      name: 'Rajasthan Heritage',
      state: 'Rajasthan',
      duration: '5 - 7 Days',
      badge: 'Royal Culture',
      badgeColor: 'bg-orange-100 text-orange-800',
      highlights: 'Jaipur Forts, Udaipur Lakes & Jaisalmer Dunes',
      icon: '🏰'
    },
    {
      id: 'kerala',
      name: 'Kerala Backwaters',
      state: 'Kerala',
      duration: '5 - 6 Days',
      badge: 'Coastal & Tea',
      badgeColor: 'bg-teal-100 text-teal-800',
      highlights: 'Munnar Tea Hills, Alleppey Houseboat & Thekkady',
      icon: '🌴'
    }
  ];

  return (
    <section id="destinations" className="py-14 sm:py-20 bg-stone-50 border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header: Explore Holidays by Destination */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="w-8 sm:w-12 h-0.5 bg-gradient-to-r from-transparent to-amber-500" />
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif-title font-bold text-slate-900 tracking-tight">
              Explore Holidays by Destination
            </h2>
            <span className="w-8 sm:w-12 h-0.5 bg-gradient-to-l from-transparent to-amber-500" />
          </div>
          <p className="text-sm sm:text-base text-slate-600 font-medium">
            Custom Tour Packages &amp; Sanitized White Cabs Across All States (100% Online Booking)
          </p>
        </div>

        {/* Clean, Fast-Loading Grid WITHOUT Photos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {destinations.map((dest) => (
            <div
              key={dest.id}
              onClick={() => onSelectDestination(dest.name)}
              className="group bg-white rounded-2xl p-5 border border-stone-200/90 shadow-sm hover:shadow-xl hover:border-amber-400 transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl p-2 rounded-xl bg-stone-100 group-hover:bg-amber-50 transition-colors">
                    {dest.icon}
                  </span>
                  <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${dest.badgeColor}`}>
                    {dest.badge}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                  {dest.name}
                </h3>
                <span className="text-xs text-slate-400 font-semibold block mb-2">
                  {dest.state} • {dest.duration}
                </span>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {dest.highlights}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-amber-600 group-hover:text-amber-700">
                <span>View Packages</span>
                <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </div>
          ))}
        </div>

        {/* All States Trust Line */}
        <div className="mt-8 pt-6 border-t border-stone-200/80 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 font-medium">
          <span className="flex items-center gap-1.5">
            <Compass className="w-4 h-4 text-amber-500" />
            Covering 28 States &amp; 8 UTs Across India
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            100% Online Verified Bookings
          </span>
          <span>•</span>
          <span>Doorstep Outstation Pickup From Any City</span>
        </div>

      </div>
    </section>
  );
};
