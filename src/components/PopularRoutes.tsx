import React, { useState } from 'react';
import { MapPin, ArrowRight, Clock, Navigation, ShieldCheck, Car, MessageCircle } from 'lucide-react';
import { COMPANY_INFO } from '../data/travelData';

interface RouteItem {
  id: string;
  from: string;
  to: string;
  distance: string;
  duration: string;
  highway: string;
  popularVehicles: string;
  tags: string[];
}

const POPULAR_ROUTES: RouteItem[] = [
  {
    id: 'chd-shimla',
    from: 'Chandigarh / Airport',
    to: 'Shimla (Mall Road / ISBT)',
    distance: '115 km',
    duration: '3.5 Hours',
    highway: 'Himalayan Expressway (NH 5)',
    popularVehicles: 'White Swift Dzire / Etios / Innova Crysta',
    tags: ['Most Popular', 'Scenic Expressway', 'Zero Toll Hassle']
  },
  {
    id: 'delhi-shimla',
    from: 'Delhi NCR / IGI Airport',
    to: 'Shimla Hill Station',
    distance: '345 km',
    duration: '7.5 Hours',
    highway: 'Grand Trunk Road & NH 5',
    popularVehicles: 'White Toyota Etios / Innova Crysta / Ertiga',
    tags: ['Doorstep Delhi Pickup', 'Smooth 4-Lane Drive', 'All State Taxes Paid']
  },
  {
    id: 'chd-manali',
    from: 'Chandigarh Railway / Airport',
    to: 'Manali & Solang Valley',
    distance: '305 km',
    duration: '7 Hours',
    highway: 'Kiratpur-Nerchowk 4-Lane & NH 21',
    popularVehicles: 'White Toyota Innova Crysta / Ertiga / Dzire',
    tags: ['New 4-Lane Highway', 'Pandoh Dam View', 'Fast Route']
  },
  {
    id: 'delhi-manali',
    from: 'Delhi NCR / Airport',
    to: 'Manali & Old Manali',
    distance: '535 km',
    duration: '11 Hours / Overnight',
    highway: 'NH 44 & Kiratpur 4-Lane Express',
    popularVehicles: 'White Innova Crysta / Tempo Traveller / Volvo',
    tags: ['Overnight Travel', 'Comfortable Recliners', 'Driver Night Allowance Included']
  },
  {
    id: 'kalka-shimla',
    from: 'Kalka Railway Station',
    to: 'Shimla Hills / Kufri',
    distance: '85 km',
    duration: '2.5 Hours',
    highway: 'Himalayan Hill Road (NH 5)',
    popularVehicles: 'White Dzire / Etios / Innova',
    tags: ['Toy Train Connecting Pickup', 'Fast Mountain Transfer']
  },
  {
    id: 'shimla-manali',
    from: 'Shimla (Mall Road / Hotel)',
    to: 'Manali via Kullu Valley',
    distance: '240 km',
    duration: '6.5 Hours',
    highway: 'River Beas Valley Highway',
    popularVehicles: 'White Innova Crysta / Ertiga / Etios',
    tags: ['Beas River View', 'Kullu Shawl Factory Stop', 'Inter-Hill Transfer']
  },
  {
    id: 'manali-atal-sissu',
    from: 'Manali Town',
    to: 'Atal Tunnel & Sissu (Lahaul)',
    distance: '45 km (One-Way)',
    duration: 'Full Day Sightseeing',
    highway: 'Rohtang Pass Bypass Tunnel',
    popularVehicles: 'White Innova Crysta 4x4 / Ertiga',
    tags: ['Snow Point Tour', 'Pahadi Snow Driver', 'High Altitude Permit Assist']
  },
  {
    id: 'amritsar-dharamshala',
    from: 'Amritsar (Golden Temple / Airport)',
    to: 'Dharamshala & McLeodganj',
    distance: '205 km',
    duration: '4.5 Hours',
    highway: 'Pathankot - Kangra Highway',
    popularVehicles: 'White Innova Crysta / Dzire / Ertiga',
    tags: ['Spiritual & Hill Circuit', 'Clean AC Fleet']
  }
];

interface PopularRoutesProps {
  onBookRoute: (routeName: string) => void;
}

export const PopularRoutes: React.FC<PopularRoutesProps> = ({ onBookRoute }) => {
  const [selectedPickup, setSelectedPickup] = useState<string>('All');

  const pickupLocations = ['All', 'Delhi NCR', 'Chandigarh', 'Shimla', 'Manali', 'Kalka', 'Amritsar'];

  const filteredRoutes = POPULAR_ROUTES.filter((r) => {
    if (selectedPickup === 'All') return true;
    return r.from.toLowerCase().includes(selectedPickup.toLowerCase()) || r.to.toLowerCase().includes(selectedPickup.toLowerCase());
  });

  return (
    <section id="routes" className="py-16 sm:py-24 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 text-brand-orange text-xs font-bold uppercase tracking-wider mb-3">
            <Navigation className="w-3.5 h-3.5" />
            <span>Himachal Taxi Route & Distance Matrix</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-brand-navy tracking-tight">
            Popular Himalayan Taxi Routes & Doorstep Pickups
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Transparent estimated drive times, distances, and vehicle recommendations for our <strong className="text-slate-800">100% White Commercial Fleet</strong>. Driver night charges, toll gates & green taxes handled smoothly.
          </p>

          {/* Filter Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            {pickupLocations.map((loc) => (
              <button
                key={loc}
                onClick={() => setSelectedPickup(loc)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedPickup === loc
                    ? 'bg-brand-orange text-white shadow-md'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {loc === 'All' ? 'All Routes (8)' : loc}
              </button>
            ))}
          </div>
        </div>

        {/* Routes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredRoutes.map((route) => (
            <div
              key={route.id}
              className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
            >
              <div>
                {/* From / To Visual Route */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-start gap-2">
                    <div className="w-3 h-3 rounded-full bg-emerald-500 ring-4 ring-emerald-100 mt-1 flex-shrink-0" />
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Pickup From</span>
                      <span className="text-sm font-extrabold text-slate-900 leading-tight">{route.from}</span>
                    </div>
                  </div>

                  <div className="ml-1.5 pl-3 border-l-2 border-dashed border-slate-200 py-1">
                    <span className="text-[11px] text-slate-400 font-semibold">{route.highway}</span>
                  </div>

                  <div className="flex items-start gap-2">
                    <MapPin className="w-3.5 h-3.5 text-brand-orange mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Drop / Destination</span>
                      <span className="text-sm font-extrabold text-brand-orange leading-tight">{route.to}</span>
                    </div>
                  </div>
                </div>

                {/* Distance & Time Pills */}
                <div className="grid grid-cols-2 gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100 mb-4 text-xs font-bold text-slate-700">
                  <div className="flex items-center gap-1.5">
                    <Navigation className="w-3.5 h-3.5 text-brand-navy" />
                    <span>{route.distance}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-brand-orange" />
                    <span>{route.duration}</span>
                  </div>
                </div>

                {/* Recommended Vehicle */}
                <div className="mb-4">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Recommended White Cab</span>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-800">
                    <Car className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                    <span className="line-clamp-1">{route.popularVehicles}</span>
                  </div>
                </div>

                {/* Feature Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {route.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="text-[10px] font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <a
                  href={COMPANY_INFO.whatsappUrl(`Hello SafarSathi, please send me instant cab fare quote for route: ${route.from} to ${route.to}.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl border border-green-600/30 text-green-700 bg-green-50 hover:bg-green-600 hover:text-white transition-colors"
                  title="WhatsApp Instant Quote"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>

                <button
                  onClick={() => onBookRoute(`${route.from} to ${route.to} Cab`)}
                  className="w-full py-2.5 px-3 rounded-xl bg-brand-navy hover:bg-slate-900 text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm group-hover:bg-brand-orange"
                >
                  <span>Book Cab Route</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Route Trust Banner */}
        <div className="mt-12 bg-white rounded-2xl border border-slate-200 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm sm:text-base">Need a Custom Multi-City Route or Pickups from Other Cities?</h4>
              <p className="text-xs text-slate-500">We arrange doorstep private cabs from Ambala, Ludhiana, Jalandhar, Patiala, and Dehradun with zero return fare charges.</p>
            </div>
          </div>
          <a
            href={COMPANY_INFO.whatsappUrl("Hello SafarSathi, I have a custom route query for Himachal. Please connect with a travel manager.")}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow whitespace-nowrap flex items-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Custom Route Inquiry</span>
          </a>
        </div>
      </div>
    </section>
  );
};
