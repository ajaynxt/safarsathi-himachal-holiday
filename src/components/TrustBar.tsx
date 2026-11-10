import React from 'react';
import { Compass, ClipboardCheck, CarFront, MapPin } from 'lucide-react';

export const TrustBar: React.FC = () => {
  const items = [
    { icon: Compass, title: '9 years', subtitle: 'Travel experience' },
    { icon: ClipboardCheck, title: 'Plan before booking', subtitle: 'Ask for a clear quotation' },
    { icon: CarFront, title: 'Vehicle options', subtitle: 'Cars, SUVs and group travel' },
    { icon: MapPin, title: 'Explore India', subtitle: 'Destinations across the country' }
  ];
  return (
    <section className="relative z-20 border-y border-stone-200 bg-white py-6 sm:py-7">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-5 px-4 sm:px-6 lg:grid-cols-4 lg:px-8 lg:divide-x lg:divide-stone-200">
        {items.map(({ icon: Icon, title, subtitle }) => (
          <div key={title} className="flex items-center gap-3 px-1 sm:px-5 lg:justify-center">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-700"><Icon className="h-5 w-5" /></div>
            <div><h3 className="text-sm font-bold leading-snug text-slate-900 sm:text-base">{title}</h3><p className="mt-0.5 text-xs text-slate-500">{subtitle}</p></div>
          </div>
        ))}
      </div>
    </section>
  );
};
