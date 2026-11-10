import React, { useState } from 'react';
import { Users, Briefcase, Snowflake, Check, MessageCircle, Phone, ShieldCheck } from 'lucide-react';
import { VEHICLE_FLEET, COMPANY_INFO } from '../data/travelData';

interface VehicleFleetProps {
  onBookCab: (vehicleName: string) => void;
}

export const VehicleFleet: React.FC<VehicleFleetProps> = ({ onBookCab }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Sedan', 'MUV / SUV', 'Group Tempo', 'Luxury Volvo'];

  const filteredFleet = VEHICLE_FLEET.filter((v) => {
    if (selectedCategory === 'All') return true;
    return v.category === selectedCategory;
  });

  return (
    <section id="cabs" className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Vehicle options for your journey</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-brand-navy tracking-tight">
            Choose a vehicle for your route
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Explore the vehicle categories below. Share your route and travel dates to confirm availability, seating, luggage capacity and the final fare.
          </p>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedCategory === cat
                    ? 'bg-brand-orange text-white shadow-md'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Fleet Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredFleet.map((vehicle) => (
            <div
              key={vehicle.id}
              className="bg-slate-50 border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Vehicle Image */}
                <div className="relative h-48 overflow-hidden bg-slate-900">
                  <img
                    src={vehicle.image}
                    alt={vehicle.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Neutral blank plate cover: fleet assignments can change, so no registration is shown. */}
                  <span
                    aria-hidden="true"
                    className="absolute left-1/2 top-[72%] -translate-x-1/2 -translate-y-1/2 w-[19%] h-[9%] min-w-10 rounded-[2px] border border-slate-300 bg-slate-100 shadow-sm"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />
                  
                  <span className="absolute top-3 left-3 bg-brand-navy/90 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-md">
                    {vehicle.category}
                  </span>

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <h3 className="text-base sm:text-lg font-bold leading-tight">{vehicle.name}</h3>
                  </div>
                </div>

                {/* Specs Pill row */}
                <div className="p-4 grid grid-cols-3 gap-2 border-b border-slate-200/60 bg-white text-[11px] font-semibold text-slate-700">
                  <div className="flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-brand-orange" />
                    <span>{vehicle.seating.split('+')[0]} Seats</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Briefcase className="w-4 h-4 text-brand-orange" />
                    <span>{vehicle.luggage.split('+')[0]}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Snowflake className="w-4 h-4 text-brand-orange" />
                    <span>{vehicle.ac ? 'AC option' : 'Standard'}</span>
                  </div>
                </div>

                {/* Vehicle Details */}
                <div className="p-4 space-y-3">
                  <p className="text-xs text-slate-500 italic">
                    Best for: {vehicle.idealFor}
                  </p>

                  <div className="space-y-1.5 text-xs text-slate-700">
                    {vehicle.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Pricing & Booking Action */}
              <div className="p-4 bg-white border-t border-slate-200/80 flex items-center justify-between gap-2">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Fare</span>
                  <span className="text-sm font-extrabold text-brand-navy">Request a quote</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <a
                    href={COMPANY_INFO.whatsappUrl(`Hello SafarSathi, I want to book/enquire about ${vehicle.name} for my trip.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl border border-green-600/30 text-green-700 bg-green-50 hover:bg-green-600 hover:text-white transition-colors"
                    title="Enquire on WhatsApp"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </a>

                  <button
                    onClick={() => onBookCab(vehicle.name)}
                    className="px-3.5 py-2.5 rounded-xl bg-brand-orange hover:bg-brand-orange-dark text-white text-xs font-bold transition-all shadow-sm"
                  >
                    Book Cab
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Driver & Safety Assurance Note */}
        <div className="mt-12 bg-amber-50/70 border border-amber-200 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-center gap-4 text-xs sm:text-sm text-slate-700">
          <div className="p-3 bg-brand-orange text-white rounded-xl flex-shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-bold text-slate-900 text-sm sm:text-base">Before you confirm</h4>
            <p className="text-slate-600">
              Ask the team to confirm the assigned vehicle, driver details, permits, included charges and any route-specific requirements in your written quotation.
            </p>
          </div>
          <div className="flex-shrink-0">
            <a
              href={`tel:${COMPANY_INFO.phone}`}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-brand-navy hover:bg-brand-navy-dark text-white rounded-xl font-bold text-xs"
            >
              <Phone className="w-3.5 h-3.5 text-brand-orange" />
              <span>Call Taxi Desk</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
