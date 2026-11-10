import React, { useMemo, useState } from 'react';
import { Users, Briefcase, Snowflake, MessageCircle, ArrowUpRight, CarFront } from 'lucide-react';
import { VEHICLE_FLEET, COMPANY_INFO } from '../data/travelData';

interface VehicleFleetProps {
  onBookCab: (vehicleName: string) => void;
}

export const VehicleFleet: React.FC<VehicleFleetProps> = ({ onBookCab }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const categories = ['All', 'Sedan', 'MUV / SUV', 'Group Tempo', 'Luxury Volvo'];
  const filteredFleet = useMemo(
    () => VEHICLE_FLEET.filter((vehicle) => selectedCategory === 'All' || vehicle.category === selectedCategory),
    [selectedCategory]
  );

  return (
    <section id="cabs" className="relative overflow-hidden bg-[#f7f8fa] py-16 sm:py-24">
      <div className="pointer-events-none absolute -right-32 top-12 h-80 w-80 rounded-full bg-orange-100/60 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-9 flex flex-col gap-5 border-b border-slate-200 pb-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <div className="mb-3 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-brand-orange">
              <span className="h-px w-7 bg-brand-orange" />
              Travel your way
            </div>
            <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-brand-navy sm:text-4xl lg:text-5xl">
              The right ride for<br className="hidden sm:block" /> every kind of journey.
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-6 text-slate-600 sm:text-base">
              From comfortable city transfers to group travel, explore vehicle options for your route.
              Final vehicle and availability are confirmed with your enquiry.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <CarFront className="h-5 w-5 text-brand-orange" />
            <span>Vehicle options</span>
          </div>
        </div>

        <div className="mb-7 flex gap-2 overflow-x-auto pb-2" role="group" aria-label="Filter vehicle categories">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              aria-pressed={selectedCategory === category}
              className={`shrink-0 rounded-full border px-4 py-2.5 text-xs font-bold transition-colors sm:text-sm ${
                selectedCategory === category
                  ? 'border-brand-navy bg-brand-navy text-white'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-slate-400 hover:text-brand-navy'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {filteredFleet.map((vehicle, index) => (
            <article
              key={vehicle.id}
              className="group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_5px_24px_rgba(15,23,42,0.045)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(15,23,42,0.10)]"
            >
              <div className="relative h-52 overflow-hidden bg-slate-100 sm:h-56">
                <img
                  src={vehicle.image}
                  alt={vehicle.name}
                  loading={index < 3 ? 'eager' : 'lazy'}
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/55 via-transparent to-slate-950/10" />
                {/* Subtle dark blur conceals any visible registration without a stark white strip. */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute bottom-[17%] left-1/2 h-[8%] min-h-[9px] w-[18%] min-w-10 -translate-x-1/2 rounded-sm bg-slate-950/70 backdrop-blur-md"
                />
                <span className="absolute left-4 top-4 rounded-full border border-white/25 bg-slate-950/55 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-white backdrop-blur-sm">
                  {vehicle.category}
                </span>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-bold tracking-tight text-white drop-shadow-sm">{vehicle.name}</h3>
                </div>
              </div>

              <div className="flex flex-1 flex-col p-5">
                <div className="grid grid-cols-3 divide-x divide-slate-100 rounded-xl bg-slate-50 py-3">
                  <div className="flex flex-col items-center gap-1 px-1 text-center">
                    <Users className="h-4 w-4 text-brand-orange" />
                    <span className="text-[11px] font-bold text-slate-800">{vehicle.seating.split('+')[0]}</span>
                    <span className="text-[9px] uppercase tracking-wide text-slate-400">Passengers</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 px-1 text-center">
                    <Briefcase className="h-4 w-4 text-brand-orange" />
                    <span className="text-[11px] font-bold text-slate-800">{vehicle.luggage.split('+')[0]}</span>
                    <span className="text-[9px] uppercase tracking-wide text-slate-400">Luggage</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 px-1 text-center">
                    <Snowflake className="h-4 w-4 text-brand-orange" />
                    <span className="text-[11px] font-bold text-slate-800">{vehicle.ac ? 'AC option' : 'Standard'}</span>
                    <span className="text-[9px] uppercase tracking-wide text-slate-400">Climate</span>
                  </div>
                </div>

                <p className="mt-4 min-h-[40px] text-xs leading-5 text-slate-500">{vehicle.idealFor}</p>

                <div className="mt-5 flex items-center justify-between gap-3 border-t border-slate-100 pt-4">
                  <div>
                    <span className="block text-[9px] font-bold uppercase tracking-[0.16em] text-slate-400">Trip fare</span>
                    <span className="text-sm font-extrabold text-brand-navy">Get a quote</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <a
                      href={COMPANY_INFO.whatsappUrl(`Hello Safar Sathi, I would like to enquire about the ${vehicle.name} for my trip.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Enquire about ${vehicle.name} on WhatsApp`}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-emerald-200 text-emerald-700 transition-colors hover:bg-emerald-600 hover:text-white"
                    >
                      <MessageCircle className="h-4 w-4" />
                    </a>
                    <button
                      type="button"
                      onClick={() => onBookCab(vehicle.name)}
                      className="inline-flex items-center gap-2 rounded-full bg-brand-orange px-4 py-2.5 text-xs font-bold text-white shadow-sm transition-colors hover:bg-brand-orange-dark"
                    >
                      Enquire <ArrowUpRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-slate-200 pt-5 text-xs leading-5 text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>Vehicle assignment, seating, luggage space and final fare are confirmed before booking.</p>
          <a href={`tel:${COMPANY_INFO.phone}`} className="font-bold text-brand-navy hover:text-brand-orange">
            Call {COMPANY_INFO.phoneDisplay}
          </a>
        </div>
      </div>
    </section>
  );
};
